import {
    SupportedLanguages,
    fallbackLng,
    languages,
    cookieName,
} from '@/app/i18n/settings';
import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { createContext } from 'react';

acceptLanguage.languages(languages);

export function i18nMiddleware(req: NextRequest) {
    let lng: SupportedLanguages | null = null;
    if (req.cookies.has(cookieName)) {
        lng = acceptLanguage.get(
            req.cookies.get(cookieName)?.value
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

    if (
        !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
        !req.nextUrl.pathname.startsWith('/_next')
    ) {
        return NextResponse.redirect(
            new URL(
                `/${lng}${req.nextUrl.pathname === '/' ? '' : req.nextUrl.pathname}`,
                req.url
            )
        );
    }

    if (req.headers.has('referer')) {
        const refererUrl = new URL(req.headers.get('referer') ?? '');
        const lngInReferer = languages.find((loc) =>
            refererUrl.pathname.startsWith(`/${loc}`)
        );
        const response = NextResponse.next();
        if (lngInReferer) {
            response.cookies.set(cookieName, lngInReferer);
        }
        return response;
    }
}
