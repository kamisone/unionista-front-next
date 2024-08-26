import { protected_paths } from '@/config';
import { SupportedLanguages } from '@/i18n/settings';
import { SubMiddlewareReturnType } from '@/middleware';
import { AuthService } from '@/services/auth.service';
import {
    accessTokenNames,
    CURRENT_USER_HEADER_NAME,
    PENDING_REDIRECT_PATH_NAME,
} from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function setAuthMiddleware(
    req: NextRequest,
    lng?: SupportedLanguages
): Promise<{
    request: NextRequest;
    cb?: (response: NextResponse) => NextResponse;
}> {
    // const path = req.nextUrl.pathname + req.nextUrl.search;
    // if (/.*modal_content=(signin|signup).*/.test(req.nextUrl.search)) {
    //     return NextResponse.next();
    // }
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
                // const response = NextResponse.next({
                //     request: req,
                // });
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

                // return response;
            }
        ) as unknown as SubMiddlewareReturnType;
    } else {
        const path = req.nextUrl.pathname + req.nextUrl.search;
        if (protected_paths.some((p) => path.includes(p))) {
            return NextResponse.redirect(
                new URL(`/${lng}?modal_content=signin`, req.url),
                {
                    headers: {
                        'Set-Cookie': `${PENDING_REDIRECT_PATH_NAME}=${path};Path=/;HttpOnly;Secure`,
                    },
                }
            ) as any;
        }
        // return NextResponse.next();
    }

    return {
        request: req,
        cb: null,
    } as any;
}
