/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Head from 'next/head';
import { Layout } from 'components/Layout';
import { Menu } from 'components/Menu';
import { Banner } from 'components/Banner';
import { ProductCard } from 'components/ProductCard';
import styles from './index.module.css';

import {
  BannersDataSource,
  CategoriesDataSource,
  ProductsDataSource,
} from 'datasources/ecommerce-entando6-cms';

interface Props {
  products: Array<any>
  categories: Array<any>
  banners: Array<any>
}

const EcommerceExamplePage = ({ products, categories, banners }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{'Entando'}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Layout title="Entando WebUI | E-commerce Example Page">
        <Menu categories={categories} />
        <Banner banners={banners} />

        <main className={styles.main}>
          <h2 className={styles.title}>{'Daily Offers'}</h2>
          <div className={styles.productList}>
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </main>
      </Layout>
    </div>
  );
};

export async function getStaticProps() {
  console.log('EcommercePage: Calling getStaticProps');

  const datasources = [
    ProductsDataSource,
    CategoriesDataSource,
    BannersDataSource,
  ];

  const results = await Promise.all(datasources.map(async (d) => d()));
  const [products, categories, banners] = results;

  return {
    props: {
      products,
      categories,
      banners,
    },
    revalidate: 15 * 60, //15 minutes
  };
}

export default EcommerceExamplePage;
