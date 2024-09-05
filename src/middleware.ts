import { i18nMiddleware } from '@/middlewares/i18n.middleware';
import { NextRequest, NextResponse } from 'next/server';
import { SupportedLanguages } from './i18n/settings';
import { getLocaleMiddleware } from './middlewares/get-locale.middleware';
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

    const getLocaleResult = getLocaleMiddleware(req);
    if (getLocaleResult instanceof NextResponse) {
        return getLocaleResult;
    }
    if (getLocaleResult.cb) {
        cbs.push(getLocaleResult.cb);
    }

    const lng = getLocaleResult.lng as SupportedLanguages;

    // I18n middleware
    const i18Result = i18nMiddleware(req, lng);
    if (i18Result instanceof NextResponse) {
        return i18Result;
    }
    if (i18Result.cb) {
        cbs.push(i18Result.cb);
    }

    // exclude prefetch requests from other middlewares
    //@ts-ignore
    const headers = req.headers;
    if (
        headers.get('x-next-router-prefetch') ||
        headers.get('x-purpose') === 'prefetch'
    ) {
        // Modal middleware
        const modalResult = modalMiddleware(req);
        if (modalResult instanceof NextResponse) {
            return modalResult;
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

    // Auth middleware
    const authResult = await setAuthMiddleware(i18Result.request, lng);
    if (authResult instanceof NextResponse) {
        return authResult;
    }
    if (authResult.cb) {
        cbs.push(authResult.cb);
    }

    // Modal middleware
    const modalResult = modalMiddleware(i18Result.request);
    if (modalResult instanceof NextResponse) {
        return modalResult;
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
    [key: string]: unknown;
}
