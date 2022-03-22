/* eslint-disable @next/next/no-server-import-in-page */
import { NextRequest, NextResponse } from 'next/server';

const PORTALUI_BASEPATH = new URL(process.env.PORTALUI_ADDR).pathname.replace(/\/$/, '');
const APP_BASEPATH = `${process.env.APP_BASEPATH}`.replace(/\/$/, '');

export const basepathRewriteMiddleware = (req: NextRequest): NextResponse | undefined => {
  const pathname = req.nextUrl.pathname.replace(/\/$/, '');
  
  if (pathname.startsWith(PORTALUI_BASEPATH)) {
    const new_pathname = pathname.replace(PORTALUI_BASEPATH, APP_BASEPATH);
    return NextResponse.redirect(new URL(new_pathname, req.url));
  }

  if (APP_BASEPATH.length > 0 && !pathname.includes('/api/auth')) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(APP_BASEPATH, '');
    return NextResponse.rewrite(url);
  }

  // else do nothing...
};
    
