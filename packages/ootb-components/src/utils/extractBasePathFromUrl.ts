export const extractBasePathFromUrl = (url: string): string => {
  return new URL(url).pathname.replace(/\/$/, '');
};
