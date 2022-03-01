/* eslint-disable @next/next/no-server-import-in-page */
import { NextRequest, NextResponse } from 'next/server';

const PORTALUI_BASEPATH = new URL(process.env.PORTALUI_ADDR).pathname.replace(/\/$/, '');
const BASEPATH = `${process.env.BASEPATH}`.replace(/\/$/, '');

export const basepathRewriteMiddleware = (req: NextRequest): NextResponse | undefined => {
  const pathname = req.nextUrl.pathname.replace(/\/$/, '');
  
  if (pathname.startsWith(PORTALUI_BASEPATH)) {
    const new_pathname = pathname.replace(PORTALUI_BASEPATH, BASEPATH);
    return NextResponse.redirect(new URL(new_pathname, req.url));
  }

  if (BASEPATH.length > 0 && !pathname.includes('/api/auth')) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(BASEPATH, '');
    return NextResponse.rewrite(url);
  }

  // else do nothing...
};
    
