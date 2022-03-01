import Head from 'next/head';
import * as React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
//import { Footer, Header } from '@entando-webui-ootb-components/react';

type Props = {
  title?: string;
};

export const Layout: React.FC<Props> = ({ children, title = 'Entando WebUI Example' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.png" />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      />
    </Head>

    <Header />
    <div className="container my-5">{children}</div>
    <Footer />
  </div>
);
