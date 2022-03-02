import { NextFetchEvent, NextRequest } from 'next/server';
import {
  portaluiRewriteMiddleware,
  homepageRedirectMiddleware,
  basepathRewriteMiddleware,
  Middleware,
} from 'middlewares';

const ENABLED_MIDDLEWARES: Array<Middleware> = [
  portaluiRewriteMiddleware,
  homepageRedirectMiddleware,
  basepathRewriteMiddleware,
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  for (const mdlw of ENABLED_MIDDLEWARES) {
    const response = mdlw(req);

    if (response) return response;
    // else, execute next middleware
  }
}
