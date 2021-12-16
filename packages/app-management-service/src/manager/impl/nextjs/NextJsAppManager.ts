import fs from 'fs';
import Handlebars from 'handlebars';
import { camelCase, upperFirst } from 'lodash';
import { BaseAppManager } from '../BaseAppManager';

export class NextJsAppManager extends BaseAppManager {
  createPage(code: string): void {
    const source = fs.readFileSync(__dirname + '/newPageTemplate.hbs', 'utf8');
    const template = Handlebars.compile(source);
    const data = {
      pageCode: code,
      pageVarName: upperFirst(camelCase(code + 'Page')),
    };
    
    this.savePageFile(code, template(data));
  }

  clonePage(code: string, newPageCode: string): void {
    const draftFilepath = `${this.pagesDevPath()}/${code}.page.tsx`;
    const clonedFilepath = `${this.pagesDevPath()}/${newPageCode}.page.tsx`;
    if(fs.existsSync(draftFilepath)) {
      const contents = fs.readFileSync(draftFilepath, 'utf8');
      const clonedContents = contents.replace(
        /const pageCode = '[a-zA-Z_]+';/g,
        `const pageCode = '${newPageCode}';`
      );
      fs.writeFileSync(clonedFilepath, clonedContents);
    } //else fails silently...
  }
}
