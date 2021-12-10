import axios from 'axios';
import { getServerKeycloakToken } from '../../keycloak/getServerKeycloakToken';
import { ICreatePageRequest } from './requests';

export const updatePage = async (request: ICreatePageRequest) => {
  const token = await getServerKeycloakToken();
  console.log('Updating Entando Core Page:', request.code);
  const res = await axios.put(`${process.env.ENTANDO_CORE_API_URL}/api/pages/${request.code}`,
    request, { headers: { Authorization: `Bearer ${token}` } }
  );
      
  return res.data.payload;
};

export default updatePage;
