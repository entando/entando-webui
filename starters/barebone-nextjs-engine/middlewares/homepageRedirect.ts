/* eslint-disable @next/next/no-server-import-in-page */
import { NextRequest, NextResponse } from 'next/server';

const PORTALUI_BASEPATH = new URL(process.env.PORTALUI_ADDR).pathname.replace(/\/$/, '');
const APP_BASEPATH = `${process.env.APP_BASEPATH}`.replace(/\/$/, '');

export const homepageRedirectMiddleware = (req: NextRequest): NextResponse | undefined => {
  const pathname = req.nextUrl.pathname.replace(/\/$/, '');
  const defaultHomepage = process.env.DEFAULT_HOMEPAGE;

  if((pathname === '' || pathname === PORTALUI_BASEPATH || pathname === APP_BASEPATH)
        && defaultHomepage && defaultHomepage.length > 0) {
    const url = req.nextUrl.clone();
    url.pathname = `${APP_BASEPATH}${defaultHomepage}`;
    return NextResponse.redirect(url);
  }
  
  // else do nothing...
};
  
