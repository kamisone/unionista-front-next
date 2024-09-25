import { getAdminPaths } from '@/config';
import { SupportedLanguages } from '@/i18n/settings';
import { SubMiddlewareReturnType } from '@/middleware';
import { AuthService } from '@/services/server/auth.service';
import { JwtResponse } from '@/services/types/auth';
import {
    accessTokenNames,
    CURRENT_USER_COOKIE_NAME,
    CURRENT_USER_PAYLOAD_HEADER_NAME,
    modalContentNames,
    PENDING_REDIRECT_PATH_NAME,
} from '@/utils/constants';
import { ModalContentMapping } from '@/utils/modal';
import { NextRequest, NextResponse } from 'next/server';

export async function setAuthMiddleware(
    req: NextRequest,
    lng: SupportedLanguages
): Promise<SubMiddlewareReturnType | NextResponse> {
    const cookies = req.cookies;
    const accessToken = cookies.get(accessTokenNames.ACCESS_TOKEN);
    const refreshToken = cookies.get(accessTokenNames.REFRESH_TOKEN);
    const pathWithSearch = req.nextUrl.pathname + req.nextUrl.search;
    let res: JwtResponse;
    if (
        accessToken &&
        (res = await AuthService.verifyJwt(accessToken.value)).success
    ) {
        req.headers.set(
            CURRENT_USER_PAYLOAD_HEADER_NAME,
            JSON.stringify(res.payload)
        );

        return {
            request: req,
            cb: (response: NextResponse) => {
                response.cookies.set(
                    CURRENT_USER_COOKIE_NAME,
                    JSON.stringify(res.payload),
                    {
                        path: '/',
                        secure: true,
                        maxAge: 99999999,
                    }
                );
                return response;
            },
        } as SubMiddlewareReturnType;
    } else if (
        refreshToken &&
        (res = await AuthService.verifyJwt(refreshToken.value, true)).success
    ) {
        return AuthService.refreshToken(
            refreshToken.value,
            async (data: { accessToken: string }) => {
                const res = await AuthService.verifyJwt(data.accessToken);
                req.headers.set(
                    CURRENT_USER_PAYLOAD_HEADER_NAME,
                    JSON.stringify(res.payload)
                );
                return {
                    request: req,
                    cb: (response: NextResponse) => {
                        response.cookies.set(
                            accessTokenNames.ACCESS_TOKEN,
                            data.accessToken,
                            {
                                httpOnly: true,
                                path: '/',
                                secure: true,
                                maxAge: 99999999,
                            }
                        );
                        response.cookies.set(
                            CURRENT_USER_COOKIE_NAME,
                            JSON.stringify(res.payload),
                            {
                                path: '/',
                                secure: true,
                                maxAge: 99999999,
                            }
                        );
                        return response;
                    },
                };
            }
        ) as unknown as SubMiddlewareReturnType;
    } else {
        if (getAdminPaths().some((p) => pathWithSearch.includes(p))) {
            const response = NextResponse.redirect(
                new URL(
                    `/${lng}?${modalContentNames.QUERY_NAME}=${ModalContentMapping.SIGN_IN}`,
                    req.url
                )
            );
            response.cookies.set(PENDING_REDIRECT_PATH_NAME, pathWithSearch);
            response.cookies.set(
                CURRENT_USER_COOKIE_NAME,
                JSON.stringify(null),
                {
                    path: '/',
                    secure: true,
                    maxAge: 99999999,
                }
            );
            return response;
        }
    }

    return {
        request: req,
        cb: (response: NextResponse) => {
            response.cookies.set(
                CURRENT_USER_COOKIE_NAME,
                JSON.stringify(null),
                {
                    path: '/',
                    secure: true,
                    maxAge: 99999999,
                }
            );
            return response;
        },
    } as SubMiddlewareReturnType;
}
