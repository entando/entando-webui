import React from 'react';
import { Layout } from 'components/Layout';

/**
 * Example Route Override.
 * 
 * This example shows how to override a route that is usually
 * provided by PortalUI: /entando-de-app/en/service.page
 * 
 * This specific page is now controlled by WebUI and you can apply
 * any web development techinique you want.
 * 
 * Routes that are not overriden by specific next.js routes,
 * are fallbacked to the [...catchall].js route
 *
 **/

interface Products {
  name: string
}

interface Props {
  products: Array<Products>,
}

const ExamplePage = ({ products }: Props) => {
  
  return (
    <Layout title="Test Page">
      <>
        <h1 className="my-5">Welcome to the Next Generation Entando Web Renderization Engine 👋</h1>
        <div className="mb-5 lead text-muted">
          <ul>
            {
              products.map(({name}) => <li key={name}>{name}</li>)
            }
          </ul>
        </div>
      </>
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      products: [{ name: 'Product'}],
    },
  };
}

export default ExamplePage;
