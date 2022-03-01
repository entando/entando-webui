/* eslint-disable @next/next/no-server-import-in-page */
import { NextRequest, NextResponse } from 'next/server';

const PORTALUI_BASEPATH = new URL(process.env.PORTALUI_ADDR).pathname.replace(/\/$/, '');

const PORTALUI_REWRITES = [
  '/cmsresources/',
  '/resources/',
  '/favicon.',
  '/keycloak.json',
  '/api/',
];

export const portaluiRewriteMiddleware = (req: NextRequest): NextResponse | undefined => {
  const { pathname } = req.nextUrl;

  if(PORTALUI_REWRITES.filter(p => pathname.includes(`${PORTALUI_BASEPATH}${p}`)).length != 0) {
    const url = req.nextUrl.clone();
    url.host = new URL(process.env.PORTALUI_ADDR).host;
    url.pathname = pathname;
    return NextResponse.rewrite(url);
  }

  // else do nothing...
};
