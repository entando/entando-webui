import path from 'path';

export interface PageParams {
  code: string
  language: string
}

export class NotFoundError extends Error {
  status: number;
  
  constructor(message: string) {
    super(message);
    this.status = 404;
  }
}

export const extractEntandoParamsFromUrl = (url: string): PageParams => {
  const parsed = path.parse(url);

  const PORTALUI_BASEPATH = new URL(`${process.env.PORTALUI_ADDR}`).pathname.replace(/\/$/, '');
  const APP_BASEPATH = `${process.env.APP_BASEPATH}`.replace(/\/$/, '');
  const pathname = parsed.dir.replace(/\/$/, '');

  if (!pathname.includes('_next') && (!pathname.startsWith(APP_BASEPATH) || pathname.split('/').length - APP_BASEPATH.split('/').length != 1)) {
    console.log('Invalid Entando URL: ', pathname, PORTALUI_BASEPATH);
    throw new NotFoundError(`Invalid Entando URL: ${pathname}`);
  }

  const language = pathname.split('/')[-2];
  
  const code = pathname.includes('_next')
    ? parsed.name.split('.json')[0].replace('.page', '')
    : parsed.name;

  return {
    code,
    language,
  };
};
  
