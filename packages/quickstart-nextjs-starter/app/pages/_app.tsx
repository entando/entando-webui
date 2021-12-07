import { SessionProvider } from 'next-auth/react';
import type { AppInitialProps, AppProps } from 'next/app';
import React from 'react';
import { TokenCache } from 'datasources/entando6-keycloak/getServerKeycloakToken';

declare global {
  namespace NodeJS {
    interface Global {
      entandoCoreKycloakTokenCache: TokenCache;
    }
  }
}

global.entandoCoreKycloakTokenCache = new TokenCache();

function WebUiApp({ Component, pageProps }: AppProps & AppInitialProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default WebUiApp;
