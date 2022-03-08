import React from 'react';

interface Products {
  name: string
}

interface Props {
  products: Array<Products>
}

const ExamplePage = ({ products }: Props) => {
  
  return (
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
  );
};

export async function getServerSideProps() {
  return {
    props: {
      products: [{ name: 'My Product Name'}],
    },
  };
}

export default ExamplePage;
