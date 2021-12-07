import axios from 'axios';

export async function Entando6PortalUIUrlDataSource(method, url, headers) {
  //TODO: Call PortalUI API instead of direct web html calling
  //TODO: Should handle all 400 and 500 errors
  console.log(`Fetching from PortalUI: ${method} ${url}`);
  
  let res = {};
  res = await axios({
    method: method,
    url: url,
    headers: { headers }
  });

  return {
    html: res.data,
    statusCode: res.status,
    headers: res.headers,
  };
}
