import { SupportedLanguages, languages, lngCookieName } from '@/i18n/settings';
import { SubMiddlewareReturnType } from '@/middleware';
import acceptLanguage from 'accept-language';
import { NextRequest, NextResponse } from 'next/server';

acceptLanguage.languages(languages);

export function i18nMiddleware(
    req: NextRequest,
    lng: SupportedLanguages
): SubMiddlewareReturnType | NextResponse {
    if (
        !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
        req.headers.get('Accept')?.includes('text/html')
    ) {
        return NextResponse.redirect(
            new URL(
                `/${lng}${req.nextUrl.pathname !== '/' ? req.nextUrl.pathname : ''}${req.nextUrl.search}`,
                req.nextUrl.origin
            )
        ) as NextResponse;
    } else if (
        !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`))
    ) {
        return NextResponse.rewrite(
            new URL(
                `/${lng}${req.nextUrl.pathname !== '/' ? req.nextUrl.pathname : ''}${req.nextUrl.search}`,
                req.nextUrl.origin
            )
        );
    }

    if (req.headers.has('referer')) {
        const refererUrl = new URL(req.headers.get('referer') ?? '');
        const lngInReferer = languages.find((loc) =>
            refererUrl.pathname.startsWith(`/${loc}`)
        );

        if (lngInReferer) {
            const cookies = req.cookies;
            if (
                !cookies.has(lngCookieName) ||
                (cookies.has(lngCookieName) &&
                    cookies.get(lngCookieName)!.value !== lngInReferer)
            ) {
                req.cookies.set(lngCookieName, lngInReferer);
            }
        }
    }
    return {
        request: req,
    };
}
