import axios from 'axios';
import { getServerKeycloakToken } from '../../keycloak/getServerKeycloakToken';
import { IClonePageRequest } from './requests';

export const clonePage = async (code: string, request: IClonePageRequest) => {
  const token = await getServerKeycloakToken();
  console.log('Cloning Entando Core Page:', code);
  const res = await axios.post(`${process.env.ENTANDO_CORE_API_URL}/api/pages/${code}/clone`,
    request, { headers: { Authorization: `Bearer ${token}` } }
  );
      
  return res.data.payload;
};
