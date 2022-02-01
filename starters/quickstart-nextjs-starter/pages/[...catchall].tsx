import { getSession } from 'next-auth/react';
import getConfig from 'next/config';

import { getPage, renderPortalUIPage } from '@entando-webui/app-engine-client';
import {
  handleErrorAndRedirectToErrorPage,
  extractEntandoParamsFromUrl
} from 'utils';

/**
 * This Catch All Rule proxies requests to Portal UI
 * allowing to gradually migrate from a monolith
 * into a modern MFE Entando Architecture using the WebUI
 * project and minimizes impact during refactoring stages
 **/
const LegacyPage = () => {
  return null;
};

export default LegacyPage;

export async function getServerSideProps({ req, res }) {
  let html, statusCode, headers;
  try {
    const { serverRuntimeConfig } = getConfig();
    const {
      PORTALUI_ADDR: url,
      NEXTAUTH_URL: loginUrl,
    } = serverRuntimeConfig;

    const { code, language } = extractEntandoParamsFromUrl(req.url);
    const pageData = await getPage(code);
    const isPrivatePage = pageData && pageData.ownerGroup !== 'free';
    const session = await getSession({ req });
    const username = session?.user?.name;

    if (isPrivatePage && (!session || !session.user)) {
      //Redirect to NextAuth.js authorization url
      return {
        redirect: {
          destination: `${loginUrl}/api/auth/signin?callbackUrl=${req.url}`,
        },
      };
    }

    // Request rendered page from legacy system.
    // In this case it's PortalUI, but technically can be any system
    ({ html, statusCode, headers } = await renderPortalUIPage(url, code, language, username));
  } catch (error) {
    console.log('Handling PortalUI Error: ', error);
    return handleErrorAndRedirectToErrorPage(error.response.status);
  }

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
    props: {},
  };
}
