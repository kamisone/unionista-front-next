// import { FormValues } from '@/app/components/modal-content/login-in-content/LoginContent';
import { isBrowser } from '../utils/is-browser';
import { BottomModalService } from './bottom-modal.service';
import { ComponentsStateNotify } from './components-state-notify.service';
import { HttpService } from './http.service';
import { SnackbarService, SnackbarSeverity } from './snackbar.service';
import { AxiosError } from 'axios';

const snackbarService = SnackbarService.getInstance();
const bottomModalService = BottomModalService.getInstance();

const ONE_DAY_MS = 8.64e7;

export const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface AuthState {
    isAuthenticated: boolean;
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
    static myInstance: AuthService;
    httpService: HttpService = HttpService.getInstance();

    static getInstance() {
        if (!AuthService.myInstance) {
            AuthService.myInstance = new AuthService({
                isAuthenticated: true,
                isUserNotifiedToSignin: false,
            });
        }
        return this.myInstance;
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

    async signinUser(data: Record<string, unknown>) {
        try {
            const response = await this.httpService.post<UserWithTokens>({
                path: AuthService.endpoints.SIGN_IN,
                body: data,
            });
            this.state = {
                isAuthenticated: true,
            };
            bottomModalService.state = {
                isBottomModalOpen: false,
                currentBottomModalContent: null,
            };
            return response.data;
        } catch (error: any) {
            if (error.response.status >= 500) {
                return snackbarService.openSnackbar({
                    message: `Error: ${
                        error.response.data?.message ?? error.message
                    }`,
                    severity: SnackbarSeverity.ERROR,
                });
            }
            throw new Error(error.response.data?.message);
        }
    }
    async signupUser(data: Record<string, unknown>) {
        try {
            const response = await this.httpService.post<UserWithTokens>({
                path: AuthService.endpoints.SIGN_UP,
                body: data,
            });
            this.state = {
                isAuthenticated: true,
            };
            bottomModalService.state = {
                isBottomModalOpen: false,
                currentBottomModalContent: null,
            };
            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                if (error.response.status >= 500) {
                    return snackbarService.openSnackbar({
                        message: `Error: ${
                            error.response.data?.message ?? error.message
                        }`,
                        severity: SnackbarSeverity.ERROR,
                    });
                }
                throw new Error(error.response.data.message);
            } else {
                throw error;
            }
        }
    }

    static async refreshToken() {
        const httpService = HttpService.getInstance();
        try {
            const response = await httpService.get<AuthTokens>({
                path: AuthService.endpoints.REFRESH_TOKEN,
            });
            return response.data;
        } catch (error: unknown) {
            console.log('refresh error occurred');
            if (error instanceof AxiosError && error.response) {
                snackbarService.openSnackbar({
                    message: `Error: ${
                        error.response.data?.message ?? error.message
                    }`,
                    severity: SnackbarSeverity.ERROR,
                });
            }
        }
    }

    static updateAccessToken(accessToken: string) {
        isBrowser() &&
            localStorage.setItem(
                AuthService.localStorageKeys.ACCESS_TOKEN_ID,
                accessToken
            );
    }
    static updateRefreshToken(refreshToken: string) {
        isBrowser() &&
            localStorage.setItem(
                AuthService.localStorageKeys.REFRESH_TOKEN_ID,
                refreshToken
            );
    }

    static getAccessToken() {
        return isBrowser()
            ? localStorage.getItem(AuthService.localStorageKeys.ACCESS_TOKEN_ID)
            : null;
    }
    static getRefreshToken() {
        return isBrowser()
            ? localStorage.getItem(
                  AuthService.localStorageKeys.REFRESH_TOKEN_ID
              )
            : null;
    }

    static getIsUserNotifiedToSignin() {
        if (!isBrowser()) return null;
        const userNotifToSignIn = localStorage.getItem(
            this.localStorageKeys.USER_NOTIFIED_TO_SIGN_IN_ID
        );
        if (!userNotifToSignIn) return null;
        const userNotifToSignInObj = JSON.parse(
            userNotifToSignIn
        ) as UserNotificationToSignIn;
        return (
            Math.floor(Date.now() / 1000) <
            userNotifToSignInObj.time + ONE_DAY_MS
        );
    }

    static setIsUserNotifiedToSignIn(isNotified: boolean = true) {
        if (!isBrowser()) return null;
        localStorage.setItem(
            this.localStorageKeys.USER_NOTIFIED_TO_SIGN_IN_ID,
            JSON.stringify({
                isNotified,
                time: Date.now(),
            })
        );
    }

    static isTokenExpired(token: string) {
        const jwtBody = token.split('.')[1];
        if (!jwtBody) return true;
        const expiry = JSON.parse(atob(jwtBody)).exp as number;
        return Math.floor(Date.now() / 1000) >= expiry;
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
