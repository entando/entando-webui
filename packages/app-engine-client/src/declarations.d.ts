import { TokenCache } from './keycloak/getServerKeycloakToken';

declare global {
  // eslint-disable-next-line no-var
  var __KEYCLOAK_TOKEN_CACHE__: TokenCache;
}
