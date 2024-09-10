// import { FormValues } from '@/app/components/modal-content/login-in-content/LoginContent';
import { ComponentsStateNotify } from '@/services/components-state-notify.service';
import { HttpService } from '@/services/server/http.service';
import * as jose from 'jose';

type CBType = typeof Function;

export interface JwtPayload {
    email: string;
    sub: string;
    iat: number;
    exp: number;
    iss: string;
}

export interface AuthState {
    isUserAuthenticated: boolean;
    isUserNotifiedToSignin: boolean;
}

interface INotifyOptions {
    state: AuthState;
}

export interface UserNotificationToSignIn {
    isNotified: boolean;
    time: number;
}

export class AuthService extends ComponentsStateNotify<
    AuthState,
    INotifyOptions
> {
    constructor(initialState: AuthState) {
        super(initialState);
    }

    private static _instance: AuthService;
    static userIntervalCheckAuth: NodeJS.Timeout | undefined = undefined;
    httpService: HttpService = HttpService.instance;

    static get instance() {
        if (!this._instance) {
            this._instance = new AuthService({
                isUserAuthenticated: true,
                isUserNotifiedToSignin: false,
            });
        }

        return this._instance;
    }

    static get endpoints() {
        return {
            REFRESH_TOKEN: 'auth/refresh',
            SIGN_IN: 'auth/signin',
            SIGN_UP: 'auth/signup',
        };
    }

    static get localStorageKeys() {
        return {
            // local storage
            ACCESS_TOKEN_ID: 'access-token-id',
            REFRESH_TOKEN_ID: 'refresh-token-id',
            USER_NOTIFIED_TO_SIGN_IN_ID: 'user-notified-to-signin',
        };
    }

    static get routerSegments() {
        return {
            SIGN_IN: '?modal_content=signin',
        };
    }

    async signinUser(
        data: Record<string, unknown> | FormData,
        onSuccess: (...args: any) => unknown
    ): Promise<{ success: boolean }> {
        return this.httpService
            .post<UserWithTokens>({
                path: AuthService.endpoints.SIGN_IN,
                body: data,
            })
            .then((response: UserWithTokens) => {
                onSuccess(response);
                return {
                    success: true,
                };
            })
            .catch((error) => {
                return {
                    message: error.message,
                    success: false,
                };
            }) as Promise<{ success: boolean; message?: string }>;
    }
    async signupUser(
        data: Record<string, any>,
        onSuccess: (...args: any[]) => unknown
    ): Promise<{ success: boolean }> {
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }

        return this.httpService
            .post<UserWithTokens>({
                path: AuthService.endpoints.SIGN_UP,
                body: formData,
            })
            .then((response) => {
                onSuccess(response);
                return {
                    success: true,
                };
            })
            .catch((error) => {
                return {
                    message: error.message,
                    success: false,
                };
            }) as Promise<{ success: boolean; message?: string }>;
    }

    static async refreshToken(
        refreshToken: string,
        thenCB?: (data: any) => unknown
    ) {
        return fetch(
            `${process.env.API_BASE_URL_SERVER}/${AuthService.endpoints.REFRESH_TOKEN}`,
            {
                method: 'post',
                body: JSON.stringify({
                    refresh_token: refreshToken,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((headers) => {
                if (headers.status < 200 || headers.status > 299) {
                    throw new Error(`${headers.status}: ${headers.statusText}`);
                }
                return headers.json();
            })
            .then((data) => thenCB && thenCB(data))
            .catch((error) => {
                console.log('error: ', error.message);
            });
    }

    static async verifyJwt(
        token: string,
        isRefresh: boolean = false
    ): Promise<JwtResponse> {
        const secret = isRefresh
            ? new TextEncoder().encode(process.env.JWT_REFRESH_KEY)
            : new TextEncoder().encode(process.env.JWT_ACCESS_KEY);
        try {
            const result = await jose.jwtVerify(token, secret);
            return {
                success: true,
                payload: result.payload,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
}

export interface UserWithTokens {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface User {
    id: string;

    fullName: string;

    emailAddress: string;

    phoneNumber: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface JwtResponse {
    success: boolean;
    payload?: jose.JWTPayload;
    message?: string;
}
