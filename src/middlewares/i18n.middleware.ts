import {
    SupportedLanguages,
    fallbackLng,
    languages,
    lngCookieName,
} from '@/i18n/settings';
import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';

acceptLanguage.languages(languages);

export function i18nMiddleware(req: NextRequest): {
    request: NextRequest;
    cb?: (response: NextResponse) => NextResponse;
} {
    let lng: SupportedLanguages | null = null;
    if (req.cookies.has(lngCookieName)) {
        lng = acceptLanguage.get(
            req.cookies.get(lngCookieName)?.value
        ) as SupportedLanguages;
    }
    if (!lng) {
        lng = acceptLanguage.get(
            req.headers.get('accept-language')
        ) as SupportedLanguages;
    }
    if (!lng) {
        lng = fallbackLng;
    }

    if (!languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`))) {
        console.log(
            'origin: ',
            req.nextUrl.origin,
            'host: ',
            req.nextUrl.pathname
        );
        return NextResponse.redirect(
            new URL(
                `/${lng}${req.nextUrl.pathname !== '/' ? req.nextUrl.pathname : ''}${req.nextUrl.search}`,
                req.nextUrl.origin
            )
        ) as any;
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
