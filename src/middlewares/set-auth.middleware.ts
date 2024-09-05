import { getProtectedPaths } from '@/config';
import { SupportedLanguages } from '@/i18n/settings';
import { SubMiddlewareReturnType } from '@/middleware';
import { AuthService } from '@/services/server/auth.service';
import {
    accessTokenNames,
    CURRENT_USER_HEADER_NAME,
    PENDING_REDIRECT_PATH_NAME,
} from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function setAuthMiddleware(
    req: NextRequest,
    lng: SupportedLanguages
): Promise<SubMiddlewareReturnType | NextResponse> {
    const cookies = req.cookies;
    const accessToken = cookies.get(accessTokenNames.ACCESS_TOKEN);
    const refreshToken = cookies.get(accessTokenNames.REFRESH_TOKEN);
    let res;
    if (
        accessToken &&
        (res = await AuthService.verifyJwt(accessToken.value)).success
    ) {
        req.headers.set(
            CURRENT_USER_HEADER_NAME,
            JSON.stringify({
                ...res.payload,
                accessToken: accessToken.value,
            })
        );
    } else if (
        refreshToken &&
        (res = await AuthService.verifyJwt(refreshToken.value, true)).success
    ) {
        return AuthService.refreshToken(
            refreshToken.value,
            async (data: any) => {
                const res = await AuthService.verifyJwt(data.accessToken);
                req.headers.set(
                    CURRENT_USER_HEADER_NAME,
                    JSON.stringify({
                        ...res.payload,
                        accessToken: data.accessToken,
                    })
                );
                return {
                    request: req,
                    cb: (response: NextResponse) => {
                        response.cookies.set(
                            accessTokenNames.ACCESS_TOKEN,
                            data.accessToken
                        );
                        return response;
                    },
                };
            }
        ) as unknown as SubMiddlewareReturnType;
    } else {
        const path = req.nextUrl.pathname + req.nextUrl.search;
        if (getProtectedPaths(lng).some((p) => path.includes(p))) {
            return NextResponse.redirect(
                new URL(`/${lng}?modal_content=signin`, req.url),
                {
                    headers: {
                        'Set-Cookie': `${PENDING_REDIRECT_PATH_NAME}=${path};Path=/;`,
                    },
                }
            ) as NextResponse;
        }
    }

    return {
        request: req,
    } as SubMiddlewareReturnType;
}
