export default function handleErrorAndRedirectToErrorPage(statusCode: number) {
  //TODO should this be improved to use a single error page
  let page;
  if (statusCode === 404) {
    page = '/404';
  } else if (statusCode >= 400 && statusCode < 500) {
    page = '/400';
  } else {
    page = '/500';
  }

  return {
    redirect: {
      permanent: false,
      destination: page,
    }
  };
}
