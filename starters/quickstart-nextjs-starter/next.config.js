//import { Entando6CorePageSettingsDataSource } from '../datasources/entando6-core';

module.exports = {
  future: {
    webpack5: true,
  },
  experimental: {
    externalDir: true,
  },
  serverRuntimeConfig: {
    PORTALUI_ADDR: `${process.env.PORTALUI_ADDR || 'http://localhost:8080/entando-de-app'}`,
    NEXTAUTH_URL: `${process.env.NEXTAUTH_URL || 'http://localhost:5000'}`,
  },
  async rewrites() {
    return [
      {
        source: '/entando-de-app/cmsresources/:path*',
        destination: `${process.env.PORTALUI_ADDR}/cmsresources/:path*`,
      },
      {
        source: '/entando-de-app/resources/:path*',
        destination: `${process.env.PORTALUI_ADDR}/resources/:path*`,
      },
      {
        source: '/entando-de-app/favicon.:ext*',
        destination: `${process.env.PORTALUI_ADDR}/favicon.:ext*`,
      },
      {
        source: '/entando-de-app/keycloak.json',
        destination: `${process.env.PORTALUI_ADDR}/keycloak.json`,
      },
      {
        source: '/entando-de-app/api/:path*',
        destination: `${process.env.PORTALUI_ADDR}/api/:path*`,
      },
    ];
  },
};
