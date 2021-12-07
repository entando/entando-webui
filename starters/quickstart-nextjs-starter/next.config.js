//import { Entando6CorePageSettingsDataSource } from '../datasources/entando6-core';

module.exports = {
  future: {
    webpack5: true,
  },
  serverRuntimeConfig: {
    PORTALUI_ADDR: process.env.PORTALUI_ADDR || 'http://localhost:8088',
  },
  async entandoPageSettings() {
    //const pageSettings = await new Entando6CorePageSettingsDataSource(WEBUI_SERVICE_ACCOUNT_TOKEN)
    //TODO mocked page settings
    const pageSettings = {
      loginPageCode: 'login',
      useJsessionId: 'false',
      urlStyle: 'classic',
      baseUrl: 'request',
      errorPageCode: 'errorpage',
      treeStyle_page: 'classic',
      notFoundPageCode: 'notfound',
      homePageCode: 'homepage',
      startLangFromBrowser: 'false',
      baseUrlContext: 'true',
    };

    return pageSettings;
  },
  async rewrites() {
    return [
      {
        source: '/entando-de-app/cmsresources/:path*',
        destination: `${
          process.env.PORTALUI_ADDR || 'http://localhost:8088'
        }/entando-de-app/cmsresources/:path*`,
      },
      {
        source: '/entando-de-app/resources/:path*',
        destination: `${
          process.env.PORTALUI_ADDR || 'http://localhost:8088'
        }/entando-de-app/resources/:path*`,
      },
      {
        source: '/entando-de-app/favicon.:ext*',
        destination: `${
          process.env.PORTALUI_ADDR || 'http://localhost:8088'
        }/entando-de-app/favicon.:ext*`,
      },
      {
        source: '/entando-de-app/keycloak.json',
        destination: `${
          process.env.PORTALUI_ADDR || 'http://localhost:8088'
        }/entando-de-app/keycloak.json`,
      },
      {
        source: '/entando-de-app/api/:path*',
        destination: `${
          process.env.PORTALUI_ADDR || 'http://localhost:8088'
        }/entando-de-app/api/:path*`,
      },
    ];
  },
};
