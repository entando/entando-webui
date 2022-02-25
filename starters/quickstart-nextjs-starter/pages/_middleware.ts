import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import path from 'path';

const PORTALUI_REWRITES = [
  '/entando-de-app/cmsresources/',
  '/entando-de-app/resources/',
  '/entando-de-app/favicon.',
  '/entando-de-app/keycloak.json',
  '/entando-de-app/api/',
];

const shouldRewriteToPortalUi = (pathname: string): boolean => {
  return PORTALUI_REWRITES.filter(p => pathname.includes(p)).length != 0;
};

const rewriteToPortalUi = (pathname: string): NextResponse => {
  const hostname = path.parse(process.env.PORTALUI_ADDR).dir;
  const url = `${hostname}${pathname}`;
  return NextResponse.rewrite(url);
};

const shouldRedirectToDefaultHomepage = (pathname: string): boolean => {
  const defaultHomepage = process.env.DEFAULT_HOMEPAGE;
  return pathname === '/' && defaultHomepage && defaultHomepage.length > 0;
};

const redirectToHomepage = (): NextResponse => {
  return NextResponse.redirect(process.env.DEFAULT_HOMEPAGE);
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
}
