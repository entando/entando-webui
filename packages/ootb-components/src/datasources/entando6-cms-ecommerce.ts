import { getContents, IContent } from '@entando-webui/app-engine-client';

export interface ICategory {
  title: string
  link: string
  icon?: string
}

export interface IProduct {
  title: string
  code: string
  price: string
  stock: string
  category: string
  images?: Array<string>
}

export interface IBanner {
  image: string
}

export async function getProducts(language?: string): Promise<IProduct> {
  console.log('Fetching Products...');
  const products = await getContents('PRD');
  return products.map((p: IContent) => normalizeProduct(`${process.env.ENTANDO_CORE_API_URL}`, p, language));
}

export async function getCategories(language?: string): Promise<ICategory> {
  console.log('Fetching Categories...');
  const categories = await getContents('CTG');
  return categories.map((c: IContent) => normalizeCategory(`${process.env.ENTANDO_CORE_API_URL}`, c, language));
}

export async function getBanners(language?: string): Promise<IBanner> {
  console.log('Fetching Banners...');
  const banners = await getContents('BAN');
  return banners.map((b: IContent) => normalizeBanner(`${process.env.ENTANDO_CORE_API_URL}`, b, language));
}

// private utils
// TODO should be using object-mapper lib
const normalizeCategory = (baseurl: string, category: IContent, language: string | undefined): ICategory => {
  const lang = language || 'en';
  const [url] = baseurl.split('/entando-de-app');
  const title = category.attributes.find(attr => attr.code === 'title')?.values?.get(lang);
  const link = category.attributes.find((attr: { code: string; }) => attr.code === 'link')?.values?.get(lang);
  const iconPath = category.attributes.find((attr: { code: string; }) => attr.code === 'icon')?.values?.get(lang)?.versions[0]
    .path;
  const icon = iconPath ? `${url}${iconPath}` : undefined;

  return {
    title,
    link,
    icon,
  };
};

const normalizeBanner = (baseurl: string, banner: IContent, language: string | undefined): IBanner => {
  const lang = language || 'en';
  const [url] = baseurl.split('/entando-de-app');
  const image = banner.attributes.find(attr => attr.code === 'image');

  return {
    image: `${url}${image?.values.get(lang)?.versions[0].path}`
  };
};

const normalizeProduct = (baseurl: string, product: IContent, language: string | undefined): IProduct => {
  const lang = language || 'en';
  const [url] = baseurl.split('/entando-de-app');

  const title = product.attributes.find(attr => attr.code === 'title')?.values?.get(lang);
  const code = product.attributes.find(attr => attr.code === 'code')?.values?.get(lang);
  const price = product.attributes.find(attr => attr.code === 'price')?.value;
  const stock = product.attributes.find(attr => attr.code === 'stock')?.value;
  const category = product.attributes.find((attr: { code: string; }) => attr.code === 'category')?.value;
  const imagesAttr = product.attributes.find((attr: { code: string; }) => attr.code === 'images')?.elements;

  const images = imagesAttr?.map(img => `${url}${img.values?.get(lang)?.versions[3]?.path}`);

  return {
    title,
    code,
    price,
    stock,
    category,
    images,
  };
};
