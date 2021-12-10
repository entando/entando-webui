import axios from 'axios';
import { getServerKeycloakToken } from '../../keycloak/getServerKeycloakToken';
import { ICreatePageRequest } from './requests';

const createPage = async (request: ICreatePageRequest) => {
  const token = await getServerKeycloakToken();
  console.log('Creating Entando Core Page:', request.code);
  const res = await axios.post(`${process.env.ENTANDO_CORE_API_URL}/api/pages`,
    request,
    { headers: { Authorization: `Bearer ${token}` } }
  );
    
  return res.data.payload;
};

export default createPage;
