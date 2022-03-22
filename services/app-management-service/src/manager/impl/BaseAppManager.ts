import fs from 'fs';
import simpleGit, { SimpleGit } from 'simple-git';

// eslint-disable-next-line max-len
const GIT_SSH_COMMAND = `ssh -i ${process.env.GIT_PVT_KEY_PATH} -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no`;

export abstract class BaseAppManager {
  git: SimpleGit;

  constructor() {
    this.git = simpleGit(process.env.MANAGED_APP_PATH, { binary: 'git' })
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
  }
  }
  
  abstract createPage(code: string): void;
  abstract clonePage(code: string, newPageCode: string): void;
}
