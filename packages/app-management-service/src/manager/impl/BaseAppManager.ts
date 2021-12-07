import fs from 'fs';

export abstract class BaseAppManager {

  appDevPath(): string {
    return `${process.env.MANAGED_APP_PATH}`;
  }

  pagesDevPath(): string {
    return `${this.appDevPath()}/pages/entando-de-app/[language]`;
  }

  savePageFile(code: string, data: string): void {
    const folderpath = this.pagesDevPath();
    const filepath = `${folderpath}/${code}.page.tsx`;
    
    if (!fs.existsSync(folderpath)) {
      fs.mkdirSync(folderpath, { recursive: true });
    }
    fs.writeFileSync(filepath, data);
  }
  
  abstract createPage(code: string): void;
}
