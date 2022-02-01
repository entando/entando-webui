import moment from 'moment';
import { getContents } from '@entando-webui/app-engine-client';

export interface INews {
  id: string
  title: string
  link: string
  abstract: string
  body: string
  date: string
  category: string
  image: string
}

export const listNews = async (): Promise<Array<INews>> => {
  console.log('Fetching News...');
  const news = await getContents('NWS');
  return news.reverse().map((n: INews) => normalizeNews(`${process.env.ENTANDO_CORE_API_URL}`, n));
}

// private utils
// TODO should be using object-mapper lib

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeNews = (baseurl: string, content: any) => {
  const [url] = baseurl.split('/entando-de-app');
  const id = content.id;
  const title = content.attributes.find((attr: { code: string; }) => attr.code === 'title')?.values?.en;
  const link = content.attributes.find((attr: { code: string; }) => attr.code === 'link')?.values?.en || null;
  const abstract = content.attributes.find((attr: { code: string; }) => attr.code === 'abstract')?.values?.en;
  const body = content.attributes.find((attr: { code: string; }) => attr.code === 'body')?.values?.en;
  const date = moment(content.attributes.find((attr: { code: string; }) => attr.code === 'date')?.value)
    .format('DD MMMM YYYY');
  const category = content.attributes.find((attr: { code: string; }) => attr.code === 'category')?.values?.en;
  const imagePath = content.attributes.find((attr: { code: string; }) => attr.code === 'image')?.values?.en?.versions[0]
    .path;
  const image = imagePath ? `${url}${imagePath}` : undefined;
  
  return {
    id,
    title,
    link,
    abstract,
    body,
    date,
    category,
    image,
  };
};
