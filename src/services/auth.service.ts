// import { FormValues } from '@/app/components/modal-content/login-in-content/LoginContent';
import { ComponentsStateNotify } from '@/services/components-state-notify.service';
import { HttpService } from '@/services/http.service';
import { ModalService } from '@/services/modal.service';
import { SnackbarService } from '@/services/snackbar.service';
import { isBrowser } from '@/utils/is-browser';
import * as jose from 'jose';

const snackbarService = SnackbarService.instance;
const modalService = ModalService.instance;

type CBType = typeof Function;

export interface JwtPayload {
    email: string;
    sub: string;
    iat: number;
    exp: number;
    iss: string;
}

// constants
const ONE_DAY_MS = 8.64e7;
const AUTH_CHECK_INTERVAL_TIME = 5000;

export const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

    async signinUser(data: Record<string, unknown> | FormData) {
        try {
            const response = await this.httpService.post<UserWithTokens>({
                path: AuthService.endpoints.SIGN_IN,
                body: data,
            });
            this.state = {
                isUserAuthenticated: true,
                isUserNotifiedToSignin: false,
            };
            AuthService.setPersistedIsUserNotifiedToAuth(false);
            modalService.state = {
                isModalOpen: false,
                currentModalContent: null,
            };
            return response.data;
        } catch (error: any) {
            console.log('error in signinuser: ', error);
            // if (error.response.status >= 500) {
            //     return snackbarService.openSnackbar({
            //         message: `Error: ${
            //             error.response.data?.message ?? error.message
            //         }`,
            //         severity: SnackbarSeverity.ERROR,
            //     });
            // }
            // throw new Error(error.response.data?.message);
        }
    }
    async signupUser(data: Record<string, any>) {
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        try {
            const response = await this.httpService.post<UserWithTokens>({
                path: AuthService.endpoints.SIGN_UP,
                body: formData,
            });
            this.state = {
                isUserAuthenticated: true,
                isUserNotifiedToSignin: false,
            };
            AuthService.setPersistedIsUserNotifiedToAuth(false);
            modalService.state = {
                isModalOpen: false,
                currentModalContent: null,
            };

            return response.data;
        } catch (error: unknown) {
            // console.log('error occured: ', error.response);
            // if (error instanceof AxiosError && error.response) {
            //     if (error.response.status >= 500) {
            //         return snackbarService.openSnackbar({
            //             message: `Error: ${
            //                 error.response.data?.message ?? error.message
            //             }`,
            //             severity: SnackbarSeverity.ERROR,
            //         });
            //     }
            //     throw new Error(error.response.data.message);
            // } else {
            //     throw error;
            // }
        }
    }

    static async refreshToken(
        refreshToken: string,
        thenCB?: (data: any) => unknown
    ) {
        return fetch(
            `${process.env.API_BASE_URL_BROWSER}/${AuthService.endpoints.REFRESH_TOKEN}`,
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

    static updateAccessToken(accessToken: string) {
        if (isBrowser()) {
            localStorage.setItem(
                AuthService.localStorageKeys.ACCESS_TOKEN_ID,
                accessToken
            );
            document.cookie = `${AuthService.localStorageKeys.ACCESS_TOKEN_ID}=${accessToken}; Path=/; Secure;`;
        }
    }
    static updateRefreshToken(refreshToken: string) {
        isBrowser() &&
            localStorage.setItem(
                AuthService.localStorageKeys.REFRESH_TOKEN_ID,
                refreshToken
            );
    }

    static getIsUserNotifiedToSignin(): boolean {
        if (!isBrowser()) return false;
        const userNotifToSignIn = localStorage.getItem(
            this.localStorageKeys.USER_NOTIFIED_TO_SIGN_IN_ID
        );
        if (!userNotifToSignIn) return false;
        const userNotifToSignInObj = JSON.parse(
            userNotifToSignIn
        ) as UserNotificationToSignIn;
        return (
            Math.floor(Date.now() / 1000) <
            userNotifToSignInObj.time + ONE_DAY_MS
        );
    }

    static setPersistedIsUserNotifiedToAuth(isNotified: boolean = true) {
        if (!isBrowser()) return null;
        isNotified
            ? localStorage.setItem(
                  this.localStorageKeys.USER_NOTIFIED_TO_SIGN_IN_ID,
                  JSON.stringify({
                      time: Date.now(),
                  })
              )
            : localStorage.removeItem(
                  this.localStorageKeys.USER_NOTIFIED_TO_SIGN_IN_ID
              );
    }

    static isTokenInvalid(token: string) {
        try {
            const jwtBody = token.split('.')[1];
            if (!jwtBody) return true;
            const expiry = JSON.parse(atob(jwtBody)).exp as number;
            return Math.floor(Date.now() / 1000) >= expiry;
        } catch (_) {
            return true;
        }
    }

    static async verifyJwt(token: string, isRefresh: boolean = false) {
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
