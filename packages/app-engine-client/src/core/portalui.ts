import axios from 'axios';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Entando6PortalUIUrlDataSource = async (url: string, headers: Record<string,string>, username: string) => {
  const parsed = path.parse(url);
  const pageCode = parsed.name;
  const dirArray = parsed.dir.split('/');
  const langCode = dirArray.pop();
  const newDir = dirArray.join('/');
  const res = await axios.post(`${newDir}/webui`, {
    pageCode,
    langCode,
    username,
  }, {headers});

  return {
    html: res.data,
    statusCode: res.status,
    headers: res.headers,
  };
};
