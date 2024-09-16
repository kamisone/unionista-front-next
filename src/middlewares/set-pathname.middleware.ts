import { SupportedLanguages } from '@/i18n/settings';
import { SubMiddlewareReturnType } from '@/middleware';
import { PATHNAME_HEADER_NAME } from '@/utils/constants';
import { NextRequest } from 'next/server';

export function setPathnameMiddleware(
    req: NextRequest,
    lng?: SupportedLanguages
) {
    req.headers.set(
        PATHNAME_HEADER_NAME,
        req.nextUrl.pathname + req.nextUrl.search
    );

    return {
        request: req,
    } as SubMiddlewareReturnType;
}
