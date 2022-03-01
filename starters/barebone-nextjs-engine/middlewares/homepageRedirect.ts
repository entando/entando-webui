/* eslint-disable @next/next/no-server-import-in-page */
import { NextRequest, NextResponse } from 'next/server';

const PORTALUI_BASEPATH = new URL(process.env.PORTALUI_ADDR).pathname.replace(/\/$/, '');
const BASEPATH = `${process.env.BASEPATH}`.replace(/\/$/, '');

export const homepageRedirectMiddleware = (req: NextRequest): NextResponse | undefined => {
  const pathname = req.nextUrl.pathname.replace(/\/$/, '');
  const defaultHomepage = process.env.DEFAULT_HOMEPAGE;

  if((pathname === '' || pathname === PORTALUI_BASEPATH || pathname === BASEPATH)
        && defaultHomepage && defaultHomepage.length > 0) {
    const url = req.nextUrl.clone();
    url.pathname = `${BASEPATH}${defaultHomepage}`;
    return NextResponse.redirect(url);
  }
  
  // else do nothing...
};
  
