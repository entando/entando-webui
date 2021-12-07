import { fetchKeycloakToken, KeycloakConfig, TokenResponse } from './fetchKeycloakToken';

export const refreshClientToken = async (refreshToken: string): Promise<TokenResponse> => {
  console.log('Refreshing a new Keycloak Token (Client)');
  const payload: KeycloakConfig = {
    client_id: `${process.env.KEYCLOAK_CLIENT_ID}`,
    client_secret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  };

  const token = await fetchKeycloakToken(payload);
  
  return token;
};
