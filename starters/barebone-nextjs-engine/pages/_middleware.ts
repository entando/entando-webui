import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import path from 'path';

const PORTALUI_REWRITES = [
  '/cmsresources/',
  '/resources/',
  '/favicon.',
  '/keycloak.json',
  '/api/',
];

const PORTALUI_BASEPATH = new URL(`${process.env.PORTALUI_ADDR}`).pathname.replace(/\/$/, '');
const BASEPATH = `${process.env.BASEPATH}`.replace(/\/$/, '');

const shouldRewriteToPortalUi = (pathname: string): boolean => {
  return PORTALUI_REWRITES.filter(p => pathname.includes(`${PORTALUI_BASEPATH}${p}`)).length != 0;
};

const rewriteToPortalUi = (pathname: string): NextResponse => {
  const hostname = path.parse(process.env.PORTALUI_ADDR).dir;
  const url = `${hostname}${pathname}`;
  return NextResponse.rewrite(url);
};

const shouldRedirectToDefaultHomepage = (pathname: string): boolean => {
  const defaultHomepage = process.env.DEFAULT_HOMEPAGE;
  return (pathname === '/' || pathname === PORTALUI_BASEPATH || pathname === BASEPATH)
    && defaultHomepage && defaultHomepage.length > 0;
};

const redirectToHomepage = (): NextResponse => {
  return NextResponse.redirect(`${BASEPATH}${process.env.DEFAULT_HOMEPAGE}`);
};

const shouldRedirectBasePath = (pathname: string): boolean => {
  return pathname.startsWith(PORTALUI_BASEPATH);
};

const redirectBasePath = (req: NextRequest): NextResponse => {
  const old_pathname = req.nextUrl.pathname;
  const pathname = old_pathname.replace(PORTALUI_BASEPATH, BASEPATH);
  console.log('Redirecting basepath: ', old_pathname, pathname);
  return NextResponse.redirect(new URL(pathname, req.url));
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  if (shouldRewriteToPortalUi(pathname)) {
    return rewriteToPortalUi(pathname);
  }

  if (shouldRedirectToDefaultHomepage(pathname)) {
    return redirectToHomepage();
  }

  if (shouldRedirectBasePath(pathname)) {
    return redirectBasePath(req);
  }

  if (!pathname.startsWith(BASEPATH)) {
    return NextResponse.redirect(new URL(`${BASEPATH}/404`, req.url));
  }

  if (BASEPATH.length > 0 && !pathname.includes('/api/auth')) {
    return NextResponse.rewrite(pathname.replace(BASEPATH, ''));
  }
}
