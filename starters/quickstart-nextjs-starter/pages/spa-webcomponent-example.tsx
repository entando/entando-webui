/* eslint-disable @next/next/no-sync-scripts */
import React from 'react';
import { NextPage } from 'next';

import { Layout } from 'components/Layout';
import WebComponentWidget from 'components/WebComponentWidget';

const mfWcApp = {
  elemName: 'x-rwc',
  mfName: '@entando/wcApp',
  mfURL: '/entando-react-app-wc-umd.js',
  customProps: {
    echo: 'my custom wc echo',
  },
};

const SpaWebComponentExamplePage: NextPage = () => {
  return (
    <Layout>
      <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.js"></script>
      <WebComponentWidget {...mfWcApp} />
    </Layout>
  );
};

export default SpaWebComponentExamplePage;
