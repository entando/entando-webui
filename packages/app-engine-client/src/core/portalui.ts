import axios, { Method } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Entando6PortalUIUrlDataSource = async (method: Method, url: string, headers: Record<string,string>) => {
  //TODO: Call PortalUI API instead of direct web html calling
  //TODO: Should handle all 400 and 500 errors
  console.log(`Fetching from PortalUI: ${method} ${url}`);

  const res = await axios({
    method,
    url,
    //headers,
  });

  return {
    html: res.data,
    statusCode: res.status,
    headers: res.headers,
  };
};
