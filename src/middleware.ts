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

    // exclude prefetch requests
    const headers = req.headers;
    if (
        Array.from(headers.keys()).includes('next-router-prefetch') ||
        headers.get('purpose') === 'prefetch'
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

    const getLocaleResult = getLocaleMiddleware(req);
    if (getLocaleResult instanceof NextResponse) {
        return getLocaleResult;
    }
    if (getLocaleResult.cb) {
        cbs.push(getLocaleResult.cb);
    }

    const lng = getLocaleResult.lng as SupportedLanguages;

    // Auth middleware
    const authResult = await setAuthMiddleware(req, lng);
    if (authResult instanceof NextResponse) {
        return authResult;
    }
    if (authResult.cb) {
        cbs.push(authResult.cb);
    }

    // I18n middleware
    const i18Result = i18nMiddleware(authResult.request, lng);
    if (i18Result instanceof NextResponse) {
        return i18Result;
    }
    if (i18Result.cb) {
        cbs.push(i18Result.cb);
    }

    // Modal middleware
    const modalResult = modalMiddleware(i18Result.request);
    if (modalResult instanceof NextResponse) {
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
    [key: string]: unknown;
}
