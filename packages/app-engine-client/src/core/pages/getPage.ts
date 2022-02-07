import axios from 'axios';
import { getServerKeycloakToken } from '../../keycloak/getServerKeycloakToken';

export const getPage = async (pageCode: string) => {
  const token = await getServerKeycloakToken();
  console.log('Fetching Entando Core Page:', pageCode);
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/pages/${pageCode}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return res.data.payload;
};
