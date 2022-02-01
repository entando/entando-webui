import { TokenCache } from '@entando-webui/app-engine-client';
import KeycloakConnect, { KeycloakConfig, KeycloakOptions } from 'keycloak-connect';
import { ForbiddenError } from './error';

declare global {
  // eslint-disable-next-line no-var
  var __KEYCLOAK_TOKEN_CACHE__: TokenCache;
}

export default class Keycloak extends KeycloakConnect {
  constructor() {
    global.__KEYCLOAK_TOKEN_CACHE__ = new TokenCache();
    const options: KeycloakOptions = {};
    
    //Force a cast because Types are broken on original library: https://github.com/keycloak/keycloak-nodejs-connect/pull/250
    const config: KeycloakConfig = <KeycloakConfig> <unknown> {
      //More details on these properties: https://www.keycloak.org/docs/latest/securing_apps/
      'auth-server-url': `${process.env.KEYCLOAK_URL}`,
      realm: `${process.env.KEYCLOAK_REALM}`,
    };

    super(options, config);
  }

  redirectToLogin() {
    return false;
  }

  accessDenied() {
    throw new ForbiddenError();
  }
}

export const keycloak = new Keycloak();
