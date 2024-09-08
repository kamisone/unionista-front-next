import { SupportedLanguages } from '@/i18n/settings';
import { SubMiddlewareReturnType } from '@/middleware';
import { NextRequest } from 'next/server';

export function setPathnameMiddleware(
    req: NextRequest,
    lng?: SupportedLanguages
) {
    req.headers.set('x-pathname', req.nextUrl.pathname);

    return {
        request: req,
    } as SubMiddlewareReturnType;
}
