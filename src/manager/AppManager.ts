import { NextJsAppManager } from './impl/nextjs/NextJsAppManager';

export interface AppManager {
  appDevPath(): string;
  pagesDevPath(): string;
  savePageFile(code: string, data: string): void;
  createPage(code: string): void;
}

export class Factory {
  static fromEnv(): AppManager {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const type = process.env.MANAGED_APP_TYPE!;
    switch (type) {
    case 'nextjs':
      return new NextJsAppManager(); 
    default:
      throw new Error('Invalid AppManager type from env variable: MANAGED_APP_TYPE');
    }
  }
}

export const appManager = Factory.fromEnv();
