export const extractHostnameFromUrl = (url: string): string => {
  return new URL(url).hostname;
};
