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
}
