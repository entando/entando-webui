import { getSession } from 'next-auth/react';
import getConfig from 'next/config';
import React from 'react';
import Head from 'next/head';
import path from 'path';

import { Entando6PortalUIUrlDataSource } from 'datasources/entando6-portalui';
import { Entando6CorePageDataSource } from '../datasources/entando6-core';


/**
 * This Catch All Rule proxies requests to Portal UI
 * allowing to gradually migrate from a monolith
 * into a modern MFE Entando Architecture using the WebUI
 * project and minimizes impact during refactoring stages
 **/
export default class EntandoPage extends React.Component {
  render() {
    return (
      <Head>
        <link rel="entando" href="/favicon.ico" />
      </Head>
    );
  }
}

export async function getServerSideProps({ req, res }) {
  const { serverRuntimeConfig } = getConfig();
  const pageCode = path.parse(req.url).base.replace('.page', '');
  const pageData = await Entando6CorePageDataSource(pageCode);
  const isPrivatePage = pageData && pageData.ownerGroup !== 'free';
  const session = await getSession({ req });

  if (isPrivatePage && (!session || !session.user)) {
    //Redirect to NextAuth.js authorization url
    return {
      redirect: {
        destination: `${process.env.NEXTAUTH_URL}/api/auth/signin?callbackUrl=${process.env.NEXTAUTH_URL}${req.url}`,
      },
    };
  }

  // Request rendered page from legacy system.
  // In this case it's PortalUI, but technically can be any system
  const { html, statusCode, headers } = await Entando6PortalUIUrlDataSource(
    req.method,
    `${serverRuntimeConfig.PORTALUI_ADDR}${req.url}`,
    req.headers
  );

  /** 
   * TODO: Here we can load some service configuration, for instance new Entando Core Micro Service,
   * and inject MFEs in loaded HTML according to a specific configuration or business logic
   * 
   * This technique allows to gradually migrate a Monolith into Entando and have full control
   * of the resulted proxyed html.
   * 
   * Here we show an example loading pages from PortalUI, but technically can be any Legacy System
   **/

  for (const header in headers) {
    res.setHeader(header, headers[header]);
  }

  res.setHeader('X-Entando-Webui-Header', 'Origin: WebUI');

  res.statusCode = statusCode;
  res.write(html);
  res.end();

  return {
    props: { },
  };
}
