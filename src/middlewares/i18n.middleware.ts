import {
    SupportedLanguages,
    fallbackLng,
    languages,
    lngCookieName,
} from '@/i18n/settings';
import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';

acceptLanguage.languages(languages);

export function i18nMiddleware(
    req: NextRequest,
    lng: SupportedLanguages
):
    | {
          request: NextRequest;
          cb?: (response: NextResponse) => NextResponse;
      }
    | NextResponse {
    // let lng: SupportedLanguages | null = null;
    // if (req.cookies.has(lngCookieName)) {
    //     lng = acceptLanguage.get(
    //         req.cookies.get(lngCookieName)?.value
    //     ) as SupportedLanguages;
    // }
    // if (!lng) {
    //     lng = acceptLanguage.get(
    //         req.headers.get('accept-language')
    //     ) as SupportedLanguages;
    // }
    // if (!lng) {
    //     lng = fallbackLng;
    // }

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
