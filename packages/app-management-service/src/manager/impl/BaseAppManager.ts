import fs from 'fs';

export abstract class BaseAppManager {

  appPath(): string {
    return `${process.env.MANAGED_APP_PATH}`;
  }

  pagesDevPath(): string {
    return `${this.appPath()}/pages/entando-de-app/[language]`;
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

  updatePageStatus(code: string, status: 'draft' | 'published'): void {
    const draftFilepath = `${this.pagesDevPath()}/${code}.page.tsx`;
    const publishedFilepath = `${this.pagesDevPath()}/${code}.published.page.tsx`;
    if(fs.existsSync(draftFilepath) && status === 'published') {
      fs.copyFileSync(draftFilepath, publishedFilepath);
    } else if(fs.existsSync(publishedFilepath) && status === 'draft') {
      fs.unlinkSync(publishedFilepath);
    } //else fails silently...
  }
  
  abstract createPage(code: string): void;
  abstract clonePage(code: string, newPageCode: string): void;
}
