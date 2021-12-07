import axios from 'axios';

export interface TokenResponse {
  access_token: string
  refresh_token: string
}

export interface KeycloakConfig {
  client_id: string
  client_secret: string
  grant_type: string
  refresh_token?: string
}

export const fetchKeycloakToken = async (config: KeycloakConfig): Promise<TokenResponse> => {
  const tokenUrl = `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`;
    
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  
  const res = await axios.post(tokenUrl, urlEncoder(config), { headers });
  return res.data;
};
  
const urlEncoder = (config: KeycloakConfig) => {
  return Object.keys(config)
    .map((k) => `${k}=${config[k as keyof KeycloakConfig]}`)
    .reduce((a, v, i) => (i === 0 ? v : `${a}&${v}`), '');
};
