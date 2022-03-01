/* eslint-disable @next/next/no-server-import-in-page */
import { NextRequest, NextResponse } from 'next/server';

export type Middleware = (req: NextRequest) => NextResponse | undefined
