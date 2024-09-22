import { i18nMiddleware } from '@/middlewares/i18n.middleware';
import { NextRequest, NextResponse } from 'next/server';
import { lngCookieName, SupportedLanguages } from './i18n/settings';
import { getLocaleMiddleware } from './middlewares/get-locale.middleware';
import { modalMiddleware } from './middlewares/modal.middleware';
import { setAuthMiddleware } from './middlewares/set-auth.middleware';
import { setPathnameMiddleware } from './middlewares/set-pathname.middleware';
import { rolesMiddleware } from './middlewares/roles.middleware';

export const config = {
    matcher: [
        {
            source: '/((?!api|_next|assets|favicon.ico|sw.js|sitemap.xml|robots.txt).*)',
            // missing: [
            //     { type: 'header', key: 'next-router-prefetch' },
            //     { type: 'header', key: 'purpose', value: 'prefetch' },
            // ],
        },
    ],
};

export async function middleware(req: NextRequest) {
    // Sub middlewares can return NextResponse only for redirecting.
    const cbs = [];
    console.log(
        'request: ',
        req.method + ' -- ' + req.nextUrl.pathname + req.nextUrl.search
    );
    const getLocaleResult = getLocaleMiddleware(req);
    if (getLocaleResult instanceof NextResponse) {
        return getLocaleResult;
    }
    if (getLocaleResult.cb) {
        cbs.push(getLocaleResult.cb);
    }

    const lng = getLocaleResult.lng as SupportedLanguages;

    // exclude prefetch requests from other middlewares (only in PROD)
    const headers = getLocaleResult.request.headers;
    const isPrefetch =
        headers.get('x-next-router-prefetch') ||
        headers.get('x-purpose') === 'prefetch';
    if (isPrefetch) {
        // Modal middleware
        const modalResult = modalMiddleware(req);
        if (modalResult instanceof NextResponse) {
            return modalResult;
        }
        if (modalResult.cb) {
            cbs.push(modalResult.cb);
        }

        // Auth middleware
        const authResult = await setAuthMiddleware(modalResult.request, lng);
        if (authResult instanceof NextResponse) {
            return authResult;
        }
        if (authResult.cb) {
            cbs.push(authResult.cb);
        }

        // Roles middleware
        const rolesResult = await rolesMiddleware(authResult.request, lng);
        if (rolesResult instanceof NextResponse) {
            return rolesResult;
        }
        if (rolesResult.cb) {
            cbs.push(rolesResult.cb);
        }

        // Prepare response
        const response = NextResponse.next({
            request: rolesResult.request,
        });
        cbs.forEach((cb) => {
            cb(response);
        });
        return response;
    }

    // I18n middleware
    const i18Result = i18nMiddleware(getLocaleResult.request, lng);
    if (i18Result instanceof NextResponse) {
        return i18Result;
    }
    if (i18Result.cb) {
        cbs.push(i18Result.cb);
    }

    // Auth middleware
    const authResult = await setAuthMiddleware(i18Result.request, lng);
    if (authResult instanceof NextResponse) {
        return authResult;
    }
    if (authResult.cb) {
        cbs.push(authResult.cb);
    }

    // Roles middleware
    const rolesResult = await rolesMiddleware(authResult.request, lng);
    if (rolesResult instanceof NextResponse) {
        return rolesResult;
    }
    if (rolesResult.cb) {
        cbs.push(rolesResult.cb);
    }

    // Modal middleware
    const modalResult = modalMiddleware(rolesResult.request);
    if (modalResult instanceof NextResponse) {
        return modalResult;
    }
    if (modalResult.cb) {
        cbs.push(modalResult.cb);
    }

    // SetPathname middleware
    const pathnameResult = setPathnameMiddleware(modalResult.request);
    if (pathnameResult instanceof NextResponse) {
        return pathnameResult;
    }
    if (pathnameResult.cb) {
        cbs.push(pathnameResult.cb);
    }

    // Prepare response
    let response = NextResponse.next({
        request: pathnameResult.request,
    });
    cbs.forEach((cb) => {
        response = cb(response);
    });

    response.cookies.set(lngCookieName, lng);

    console.log(
        'arrived here: ',
        pathnameResult.request.method +
            ' ... ' +
            pathnameResult.request.nextUrl.pathname +
            pathnameResult.request.nextUrl.search
    );

    return response;
}

export interface SubMiddlewareReturnType {
    request: NextRequest;
    cb?: (response: NextResponse) => NextResponse;
    [key: string]: unknown;
}
