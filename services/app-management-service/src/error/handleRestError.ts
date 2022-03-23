import { InternalServerError, RestError } from './errors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleRestError = (e: any): RestError => {
  if (e.isAxiosError) {
    return new RestError(e.response.status, e.response.statusText, e.response.data.errors);
  }

  return new InternalServerError(e.message);
};
