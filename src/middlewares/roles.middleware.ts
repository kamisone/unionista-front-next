import { getAdminPaths } from '@/config';
import { i18nTranslation } from '@/i18n';
import { SupportedLanguages } from '@/i18n/settings';
import { SubMiddlewareReturnType } from '@/middleware';
import { SnackbarSeverity } from '@/services/snackbar.service';
import { JwtPayload } from '@/services/types/auth';
import { CURRENT_USER_PAYLOAD_HEADER_NAME } from '@/utils/constants';
import { addServerToastsCookie } from '@/utils/server';
import { NextRequest, NextResponse } from 'next/server';

export async function rolesMiddleware(
    req: NextRequest,
    lng: SupportedLanguages
): Promise<SubMiddlewareReturnType | NextResponse> {
    const t = i18nTranslation(lng, 'error');
    const pathWithSearch = req.nextUrl.pathname + req.nextUrl.search;
    const userPayload: JwtPayload | null =
        req.headers.get(CURRENT_USER_PAYLOAD_HEADER_NAME) &&
        JSON.parse(req.headers.get(CURRENT_USER_PAYLOAD_HEADER_NAME) as string);

    if (
        getAdminPaths().some((path) => pathWithSearch.includes(path)) &&
        userPayload &&
        userPayload.role !== 'admin'
    ) {
        const response = NextResponse.redirect(new URL(`/${lng}`, req.url));

        return addServerToastsCookie(
            t('unauthorized.role'),
            SnackbarSeverity.ERROR,
            response
        )!;
    }
    return {
        request: req,
    };
}
