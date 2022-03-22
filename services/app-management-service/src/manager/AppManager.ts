import { NextJsAppManager } from './impl/nextjs/NextJsAppManager';

export interface AppManager {
  appPath(): string;
  pagesDevPath(): string;
  savePageFile(code: string, data: string): void;
  createPage(code: string): void;
  deletePage(code: string): void;
  clonePage(code: string, newPageCode: string): void;
  updatePageStatus(code: string, status: 'draft' | 'published'): Promise<void>;
}

export class Factory {
  static fromEnv(): AppManager {
    const type = `${process.env.MANAGED_APP_TYPE}`;
    switch (type) {
    case 'nextjs':
    default:
      return new NextJsAppManager();
    }
  }
}

export const appManager = Factory.fromEnv();
