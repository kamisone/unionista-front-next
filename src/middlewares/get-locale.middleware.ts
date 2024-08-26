import {
    fallbackLng,
    lngCookieName,
    SupportedLanguages,
} from '@/i18n/settings';
import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { SubMiddlewareReturnType } from '@/middleware';

export function getLocaleMiddleware(
    req: NextRequest
): SubMiddlewareReturnType | NextResponse {
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

    return {
        request: req,
        lng,
    };
}
