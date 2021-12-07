import axios from 'axios';

export interface TokenResponse {
  access_token: string
  refresh_token: string
}

export const fetchKeycloakToken = async (payload: object): Promise<TokenResponse> => {
  const tokenUrl = `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`;
    
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  
  const res = await axios.post(tokenUrl, urlEncoder(payload), { headers });
  return res.data;
};
  
const urlEncoder = function (payload) {
  return Object.keys(payload)
    .map((k) => `${k}=${payload[k]}`)
    .reduce((a, v, i) => (i === 0 ? v : `${a}&${v}`), '');
};
