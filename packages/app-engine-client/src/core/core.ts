import axios from 'axios';
import { getServerKeycloakToken } from '../keycloak/getServerKeycloakToken';

export const Entando6CorePageTemplateDataSource = async (pageTemplateCode: string) => {
  console.log('Fetching Entando6CorePageTemplate...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/pageModels/${pageTemplateCode}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
};

export const Entando6CoreFragmentSource = async (fragmentCode: string) => {
  console.log('Fetching Entando6CoreFragment...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/fragments/${fragmentCode}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
};

export const Entando6CorePageConfigurationSource = async (pageCode: string) => {
  console.log('Fetching Entando6CorePageConfiguration...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/page/${pageCode}/widgets?status=published`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
};

export const Entando6CorePageSettingsDataSource = async () => {
  console.log('Fetching Entando6CorePageSettings...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/pageSettings`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
};

export const Entando6UserAuthoritiesDataSource = async (username: string) => {
  console.log('Fetching Entando6CoreUserAuthorities...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/users/${username}/authorities`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
};

export const Entando6CoreLanguagesDataSource = async () => {
  console.log('Fetching Entando6CoreLanguages...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/languages`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
};
