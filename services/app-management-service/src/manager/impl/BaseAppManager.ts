import fs from 'fs';
import simpleGit, { SimpleGit } from 'simple-git';

// eslint-disable-next-line max-len
const GIT_SSH_COMMAND = `ssh -i ${process.env.GIT_PVT_KEY_PATH} -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no`;

const timestampedTag = (): string => {
  const options = {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false, timeZone: 'UTC',
  };

  const formatter = new Intl.DateTimeFormat('en-US', <Intl.DateTimeFormatOptions> options);
  const [month, day, year, hour, minute, second] = formatter.formatToParts(new Date())
    .filter(p => p.type !== 'literal')
    .map(p => p.value);

  return `${year}${month}${day}${hour}${minute}${second}`;
};

export abstract class BaseAppManager {
  git: SimpleGit;

  constructor() {
    this.git = simpleGit(process.env.MANAGED_APP_PATH, { binary: 'git', maxConcurrentProcesses: 1 })
      .env('GIT_SSH_COMMAND', GIT_SSH_COMMAND);
  }

  appPath(): string {
    return `${process.env.MANAGED_APP_PATH}`;
  }

  pagesDevPath(): string {
    return `${this.appPath()}/pages/[language]`;
  }

  savePageFile(code: string, data: string): void {
    const folderpath = this.pagesDevPath();
    const filepath = `${folderpath}/${code}.page.tsx`;
    
    if (!fs.existsSync(folderpath)) {
      fs.mkdirSync(folderpath, { recursive: true });
    }
    // Silently replaces file if already existed
    fs.writeFileSync(filepath, data);
  }

  deletePage(code: string): void {
    const draftFilepath = `${this.pagesDevPath()}/${code}.page.tsx`;
    const publishedFilepath = `${this.pagesDevPath()}/${code}.published.page.tsx`;
    
    // Delete draft version
    if(fs.existsSync(draftFilepath)) {
      fs.unlinkSync(draftFilepath);
    }

    // Delete published version
    if(fs.existsSync(publishedFilepath)) {
      fs.unlinkSync(publishedFilepath);
    }
  }

  async updatePageStatus(code: string, status: 'draft' | 'published'): Promise<void> {
    const filepath = `${this.pagesDevPath()}/${code}.page.tsx`;
    let message;

    if (status === 'published') {
      await this.git.add(filepath);
      console.log('Creating page publish commit: ', filepath.replace(this.appPath(), ''));
      message = `Publishing page: ${code}`;
    } else {
      await this.git.rmKeepLocal(filepath);
      console.log('Creating page unpublish commit: ', filepath.replace(this.appPath(), ''));
      message = `Unpublishing page: ${code}`;
    }

    await this.git.checkout('master');
    await this.git.commit(message); //TODO: receive author as a parameter
    await this.git.push(['origin', 'master']);
  }

  async deployApp(name: string, email: string, tag?: string): Promise<string> {
    const suffix = tag ? tag : timestampedTag();
    const new_tag = `BUILD_SCHEDULED_${suffix}`;
    const new_branch = `release_${suffix}`;

    //TODO: validate if there is already a deployment in progress
    //TODO: validate if there is already a branch with this tag

    const commitAuthor = name && email ? { '--author': `${name} <${email}>` } : undefined;
    
    await this.git.checkout('master');
    await this.git.add('.');
    //TODO: git reset pages
    await this.git.commit('Publishing app', commitAuthor);
    const hash = await this.git.revparse('HEAD');
    
    await this.git.checkout(['-b', new_branch]);

    const deploymentStatusFilepath = `${this.appPath()}/deployment.status.json`;
    fs.writeFileSync(deploymentStatusFilepath, JSON.stringify({
      build_scheduled_time: new Date(),
      build_started_time: null,
      build_finished_time: null,
      deploy_finished_time: null,
    }, null, 2));

    await this.git.add(deploymentStatusFilepath);
    await this.git.commit('Triggering app deployment pipelines', commitAuthor);
    await this.git.addTag(new_tag);
    await this.git.push(['--atomic', 'origin', 'master', new_branch, new_tag]);
    await this.git.checkout('master');

    return hash;
  }
  
  abstract createPage(code: string): void;
  abstract clonePage(code: string, newPageCode: string): void;
}
