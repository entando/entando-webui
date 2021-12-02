import fs from 'fs';

export abstract class BaseAppManager {

  savePageFile(code: string, data: string) {
    const filepath = `${process.env.MANAGED_APP_PATH_DEV}/pages/entando-de-app/[language]/${code}.page.tsx`;
    //TODO @w.caffiero: should we check if file already exists? Should we throw an error or log a warning and override if already exists?
    fs.writeFileSync(filepath, data);
  }
  
  abstract createPage(code: string): void;
}
