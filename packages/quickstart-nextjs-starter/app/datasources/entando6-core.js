import axios from 'axios';
import { getServerKeycloakToken } from 'datasources/entando6-keycloak/getServerKeycloakToken';

export async function Entando6CorePagesDataSource() {
  console.log('Fetching Entando6CorePages...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/pages?status=published`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
}

export async function Entando6CorePageDataSource(pageCode) {
  console.log(`Fetching Entando6CorePage: ${pageCode}`);
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/pages/${pageCode}?status=published`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
}

export async function Entando6CorePageTemplateDataSource(pageTemplateCode) {
  console.log('Fetching Entando6CorePageTemplate...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/pageModels/${pageTemplateCode}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
}

export async function Entando6CoreFragmentSource(fragmentCode) {
  console.log('Fetching Entando6CoreFragment...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/fragments/${fragmentCode}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
}

export async function Entando6CorePageConfigurationSource(pageCode) {
  console.log('Fetching Entando6CorePageConfiguration...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/page/${pageCode}/widgets?status=published`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
}

export async function Entando6CorePageSettingsDataSource() {
  console.log('Fetching Entando6CorePageSettings...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/pageSettings`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
}

export async function Entando6UserAuthoritiesDataSource(username) {
  console.log('Fetching Entando6CoreUserAuthorities...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/users/${username}/authorities`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
}

export async function Entando6CoreLanguagesDataSource() {
  console.log('Fetching Entando6CoreLanguages...');
  const token = await getServerKeycloakToken();
  const res = await axios.get(`${process.env.ENTANDO_CORE_API_URL}/api/languages`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.payload;
}
