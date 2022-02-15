import React from 'react';
import { Layout } from 'components/Layout';

import productList from './data/products.json';

interface Products {
  name: string
}

interface Props {
  products: Array<Products>
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

export async function getServerSideProps() {
  return {
    props: {
      products: productList,
    },
  };
}

export default ExamplePage;
