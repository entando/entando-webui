import axios from 'axios';

export const renderPortalUIPage = async (url: string, pageCode: string, langCode: string, username?: string) => {
  const headers = username
    ? { 'X-FORWARDED-USER': username }
    : undefined;

  console.log('Fetching Rendered PortalUI Page: ', pageCode);

  const res = await axios.post(`${url}/webui`, {
    pageCode,
    langCode,
  }, { headers });

  return {
    html: res.data,
    statusCode: res.status,
    headers: res.headers,
  };
};
