import axios from 'axios';
import { getServerKeycloakToken } from '../../keycloak/getServerKeycloakToken';
import { IUpdatePageStatusRequest } from './requests';

export const updatePageStatus = async (code: string, request: IUpdatePageStatusRequest) => {
  const token = await getServerKeycloakToken();
  console.log('Updating Entando Core Page Status', code);
  const res = await axios.put(`${process.env.ENTANDO_CORE_API_URL}/api/pages/${code}/status`,
    request, { headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }}
  );
      
  return res.data.payload;
};
