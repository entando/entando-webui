import axios from 'axios';
import { getServerKeycloakToken } from '../../keycloak/getServerKeycloakToken';

export const listPages = async () => {
  const token = await getServerKeycloakToken();
  console.log('Listing Entando Core Page');
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/pages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return res.data.payload;
};

export default listPages;
