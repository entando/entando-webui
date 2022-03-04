import React from 'react';

import productList from './data/products.json';

interface Props {
  pageId: string
}

const ExamplePage = ({ pageId }: Props) => {
  
  return (
    <>
      <h1 className="my-5">Welcome to the Next Generation Entando Web Renderization Engine 👋</h1>
      <div className="mb-5 lead text-muted">
        {pageId}
      </div>
    </>
  );
};

export async function getStaticProps({ params }) {
  const { product } = params;

  return {
    props: {
      pageId: product,
    },
  };
}

export async function getStaticPaths() {

  const paths = productList.map(({ name }) => ({ params: { product: name }}));

  return {
    paths,
    fallback: true
  };
}

export default ExamplePage;
