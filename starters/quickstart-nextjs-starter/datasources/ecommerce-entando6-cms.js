import axios from 'axios';
import useSWR from 'swr';

import { Entando6CMSContentDataSource, Entando6CMSContentsDataSource } from '@entando-webui/app-engine-client';

export async function ProductsDataSource() {
  console.log('Fetching Products...');
  const products = await Entando6CMSContentsDataSource('PRD');
  return products.map((p) => normalizeProduct(process.env.ENTANDO_CORE_API_URL, p));
}

export async function CategoriesDataSource() {
  console.log('Fetching Categories...');
  const categories = await Entando6CMSContentsDataSource('CTG');
  return categories.map((c) => normalizeCategory(process.env.ENTANDO_CORE_API_URL, c));
}

export async function BannersDataSource() {
  console.log('Fetching Banners...');
  const banners = await Entando6CMSContentsDataSource('BAN');
  return banners.map((b) => normalizeBanner(process.env.ENTANDO_CORE_API_URL, b));
}

export async function ProductPriceAndStockDataSource(productId) {
  console.log('Fetching ProductPriceAndStock...');
  const product = await Entando6CMSContentDataSource(productId);

  const attributes = product.attributes;
  const price = attributes.filter((a) => a.code === 'price');
  const stock = attributes.filter((a) => a.code === 'stock');

  return {
    price,
    stock,
  };
}

// Work in Progress
export const ProductsDataSourceWithSwr = (baseurl, initialData, token) => {
  //const token = await Entando6KeycloakAccessTokenDataSource(url, clientId, clientSecret)();
  const productsUrl = `${baseurl}/api/plugins/cms/contents?filters[0].attribute=typeCode&filters[0].operator=eq&filters[0].value=PRD`;

  const fetcher = (url) =>
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.data.payload.map((p) => normalizeProduct(baseurl, p)));

  const { data, error } = useSWR(productsUrl, fetcher, { initialData });

  return {
    data,
    error,
  };
};

// private utils
// TODO should be using object-mapper lib
const normalizeCategory = (baseurl, category) => {
  const [url] = baseurl.split('/entando-de-app');
  const title = category.attributes.find((attr) => attr.code === 'title')?.values?.en;
  const link = category.attributes.find((attr) => attr.code === 'link')?.values?.en;
  const iconPath = category.attributes.find((attr) => attr.code === 'icon')?.values?.en?.versions[0]
    .path;
  const icon = iconPath ? `${url}${iconPath}` : undefined;
  return {
    title,
    link,
    icon,
  };
};

const normalizeBanner = (baseurl, banner) => {
  const [url] = baseurl.split('/entando-de-app');
  const image = banner.attributes.find((attr) => attr.code === 'image');
  return `${url}${image.values.en?.versions[0].path}`;
};

export const normalizeProduct = (baseurl, product) => {
  const [url] = baseurl.split('/entando-de-app');

  const title = product.attributes.find((attr) => attr.code === 'title')?.values?.en;
  const code = product.attributes.find((attr) => attr.code === 'code')?.values?.en;
  const price = product.attributes.find((attr) => attr.code === 'price')?.value;
  const stock = product.attributes.find((attr) => attr.code === 'stock')?.value;
  const category = product.attributes.find((attr) => attr.code === 'category')?.value;
  const imagesAttr = product.attributes.find((attr) => attr.code === 'images')?.elements;

  const images = imagesAttr.map((img) => `${url}${img.values?.en?.versions[3]?.path}`);

  return {
    title,
    code,
    price,
    stock,
    category,
    images,
  };
};
