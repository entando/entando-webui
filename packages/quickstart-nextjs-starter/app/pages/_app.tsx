import { SessionProvider } from 'next-auth/react';
import type { AppInitialProps, AppProps } from 'next/app';
import React from 'react';
import { TokenCache } from '@entando-webui/app-engine-client';

declare global {
  // eslint-disable-next-line no-var
  var __KEYCLOAK_TOKEN_CACHE__: TokenCache;
}

global.__KEYCLOAK_TOKEN_CACHE__ = new TokenCache();

function WebUiApp({ Component, pageProps }: AppProps & AppInitialProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default WebUiApp;
