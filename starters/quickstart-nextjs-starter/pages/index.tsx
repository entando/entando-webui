import type { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import { Layout } from 'components/Layout';

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1 className="mt-5">Hello Entando WebUI Developer 👋</h1>
      <div className="mb-5 lead text-muted">
        Please find below a list of examples of what you can build with Entando WebUI
      </div>

      <span>Standard Next.js React UI Components:</span>
      <ul>
        <li>
          <Link href="/">
            <a>Sample Next.js with UI React Components</a>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <a>Sample Next.js Private Page protected by Keycloak</a>
          </Link>
        </li>
        <li>
          <Link href="/ecommerce">
            <a>E-commerce Example Page integrated with Entando CMS Datasources</a>
          </Link>
        </li>
      </ul>
      <span>Advanced SingleSPA MFE Examples:</span>
      <ul>
        <li>
          <Link href="/spa-parcel-example">
            <a>Simple SingleSPA Page wrapping Parcels</a>
          </Link>
        </li>
        <li>
          <Link href="/spa-remote-parcel-example">
            <a>Advanced SingleSPA Page Example wrapping Remote MFEs</a>
          </Link>
        </li>
        <li>
          <Link href="/spa-webcomponent-example">
            <a>Example Page using Entando Webcomponents</a>
          </Link>
        </li>
      </ul>
      <span>Retrocompatibility with PortalUI:</span>
      <ul>
        <li>
          <Link href="/entando-de-app/en/service.page">
            <a>Overriden PortalUI Route</a>
          </Link>
        </li>
        <li>
          <Link href="/entando-de-app/en/my_homepage.page">
            <a>Reverse Proxied Page to PortalUI</a>
          </Link>
        </li>
      </ul>
    </Layout>
  );
};

export default IndexPage;
