import axios from 'axios';
import { getServerKeycloakToken } from '../keycloak/getServerKeycloakToken';

export const Entando6CMSContentsDataSource = async (contentType: string) => {
  console.log(`Fetching Entando6CMSContents: ${contentType}`);
  const token = await getServerKeycloakToken();
  const res = await axios.get(
    `${process.env.ENTANDO_CORE_API_URL}/api/plugins/cms/contents?filters[0].attribute=typeCode&filters[0].operator=eq&filters[0].value=${contentType}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data.payload;
};

export const Entando6CMSContentDataSource = async (contentId: string) => {
  console.log(`Fetching Entando6CMSContent: ${contentId}`);
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/plugins/cms/contents/${contentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
};
