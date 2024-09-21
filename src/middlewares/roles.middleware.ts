import { getAdminPaths } from '@/config';
import { i18nTranslation } from '@/i18n';
import { SupportedLanguages } from '@/i18n/settings';
import { SubMiddlewareReturnType } from '@/middleware';
import { JwtPayload } from '@/services/server/auth.service';
import { SnackbarSeverity } from '@/services/snackbar.service';
import { CURRENT_USER_HEADER_NAME, TOAST_COOKIE_NAME } from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function rolesMiddleware(
    req: NextRequest,
    lng: SupportedLanguages
): Promise<SubMiddlewareReturnType | NextResponse> {
    const t = i18nTranslation(lng, 'error');
    const pathWithSearch = req.nextUrl.pathname + req.nextUrl.search;
    const user: JwtPayload | null =
        req.headers.get(CURRENT_USER_HEADER_NAME) &&
        JSON.parse(req.headers.get(CURRENT_USER_HEADER_NAME) as string);

    if (
        getAdminPaths().some((path) => pathWithSearch.includes(path)) &&
        user &&
        user.role !== 'admin'
    ) {
        const response = NextResponse.rewrite(new URL(`/${lng}`, req.url));
        response.cookies.set(
            TOAST_COOKIE_NAME,
            JSON.stringify({
                message: t('unauthorized.role'),
                severity: SnackbarSeverity.ERROR,
            })
        );
        return response;
    }
    return {
        request: req,
    };
}
