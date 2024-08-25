import { i18nMiddleware } from '@/middlewares/i18n.middleware';
import { NextRequest, NextResponse } from 'next/server';
import { modalMiddleware } from './middlewares/modal.middleware';
import { setAuthMiddleware } from './middlewares/set-auth.middleware';

export const config = {
    matcher: [
        {
            source: '/((?!api|_next|assets|favicon.ico|sw.js|sitemap.xml|robots.txt).*)',
        },
    ],
};

export async function middleware(req: NextRequest) {
    // Sub middlewares can return NextResponse only for redirecting.
    const cbs = [];

    // I18n middleware
    const i18Result = i18nMiddleware(req);
    if (i18Result instanceof NextResponse) {
        return i18Result;
    }
    if (i18Result.cb) {
        cbs.push(i18Result.cb);
    }

    // Auth middleware
    const authResult = await setAuthMiddleware(i18Result.request);
    if (authResult instanceof NextResponse) {
        console.log('yes is response');
        return authResult;
    }
    if (authResult.cb) {
        cbs.push(authResult.cb);
    }

    // Modal middleware
    const modalResult = modalMiddleware(authResult.request);
    if (modalResult instanceof NextResponse) {
        console.log('yes is response');
        return authResult;
    }
    if (modalResult.cb) {
        cbs.push(modalResult.cb);
    }

    // Prepare response
    const response = NextResponse.next({
        request: modalResult.request,
    });
    cbs.forEach((cb) => {
        cb(response);
    });
    return response;
}

export interface SubMiddlewareReturnType {
    request: NextRequest;
    cb?: (response: NextResponse) => NextResponse;
}
