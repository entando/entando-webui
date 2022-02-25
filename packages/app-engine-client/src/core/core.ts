import axios from 'axios';
import { getServerKeycloakToken } from '../keycloak/getServerKeycloakToken';

export const getPageTemplate = async (pageTemplateCode: string) => {
  console.log('Fetching Entando6CorePageTemplate...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/pageModels/${pageTemplateCode}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
};

export const getFragment = async (fragmentCode: string) => {
  console.log('Fetching Entando6CoreFragment...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/fragments/${fragmentCode}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
};

export const getPageConfiguration = async (pageCode: string) => {
  console.log('Fetching Entando6CorePageConfiguration...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/page/${pageCode}/widgets?status=published`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
};

export const getPageSettings = async () => {
  console.log('Fetching Entando6CorePageSettings...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/pageSettings`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
};

export const getUserAuthorities = async (username: string) => {
  console.log('Fetching Entando6CoreUserAuthorities...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/users/${username}/authorities`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
};

export const getLanguages = async () => {
  console.log('Fetching Entando6CoreLanguages...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/languages`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
};
