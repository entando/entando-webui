import jwt_decode from 'jwt-decode';
import AsyncLock from 'async-lock';
import { fetchKeycloakToken } from './fetchKeycloakToken';

interface DecodedToken {
    exp: number;
}

export class TokenCache {
    token?: string;
    decoded?: DecodedToken;
    expiration?: Date;
    lock: AsyncLock;

    constructor() {
      this.lock = new AsyncLock();
    }
}

export const getServerKeycloakToken = async (): Promise<string> => {
  const cache = global.entandoCoreKycloakTokenCache;
  await cache.lock.acquire('keycloakToken', () => {
    if (cache.token && cache.expiration && cache.expiration > new Date()) {
      console.log('Resolving cached Keycloak Token (Server)');
      return Promise.resolve(cache.token);
    } else {
      return fetchServerToken(cache);
    }    
  });
    
  return cache.token;
};

const fetchServerToken = async (cache: TokenCache): Promise<string> => {
  console.log('Fetching a new Keycloak Token (Server)');
  const payload = {
    client_id: process.env.KEYCLOAK_CLIENT_ID,
    client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
    grant_type: 'client_credentials',
  };

  const token = await fetchKeycloakToken(payload);
  
  cache.token = token.access_token;
  cache.decoded = jwt_decode<DecodedToken>(cache.token);
  cache.expiration = new Date(parseInt(cache.decoded.exp.toString() + '000'));
  
  return cache.token;
};

