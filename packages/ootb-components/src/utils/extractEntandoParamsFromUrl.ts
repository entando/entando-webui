import path from 'path';

export interface PageParams {
  code: string
  language: string
}

export function extractEntandoParamsFromUrl(url: string): PageParams {
  const parsed = path.parse(url);

  const language = parsed.dir.split('/')[2];
  
  const code = parsed.dir.includes('_next')
    ? parsed.name.split('.json')[0].replace('.page', '')
    : parsed.name;

  return {
    code,
    language,
  };
}
  
