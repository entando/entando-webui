import axios from 'axios';
import { getServerKeycloakToken } from '../../keycloak/getServerKeycloakToken';

export const deletePage = async (pageCode: string) => {
  const token = await getServerKeycloakToken();
  console.log('Deleting Entando Core Page:', pageCode);
  const res = await axios.delete(`${process.env.ENTANDO_CORE_API_URL}/api/pages/${pageCode}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
      
  return res.data.payload;
};
