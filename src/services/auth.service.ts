import { ComponentsStateNotify } from '@/services/components-state-notify.service';
import { HttpService } from '@/services/http.service';
import { isBrowser } from '@/utils/is-browser';
import { getCookies } from '@/utils/query-params';

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
const AUTH_CHECK_INTERVAL_TIME = 2000;

// export const EMAIL_REGEX =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface AuthState {
    user: any;
}

interface INotifyOptions {
    state: AuthState;
}

// export interface UserNotificationToSignIn {
//     isNotified: boolean;
//     time: number;
// }

export class AuthService extends ComponentsStateNotify<
    AuthState,
    INotifyOptions
> {
    constructor(initialState: AuthState) {
        super(initialState);

        if (isBrowser()) {
            AuthService._auth_check_interval_id = setInterval(() => {
                const user = AuthService.checkUserAuth();
                if (!!user !== !!this.state.user) {
                    this.state = {
                        user: user,
                    };
                }
            }, AUTH_CHECK_INTERVAL_TIME) as unknown as number;
        }
    }

    private static _instance: AuthService;
    private static _auth_check_interval_id: number;
    static userIntervalCheckAuth: NodeJS.Timeout | undefined = undefined;
    httpService: HttpService = HttpService.instance;

    static get instance() {
        if (!this._instance) {
            this._instance = new AuthService({
                user: isBrowser() ? this.checkUserAuth() : null,
            });
        }

        return this._instance;
    }

    static checkUserAuth() {
        const cookies = getCookies();
        console.log(JSON.parse(decodeURIComponent(cookies.user)));
        return JSON.parse(decodeURIComponent(cookies.user));
    }

    // static get endpoints() {
    //     return {
    //         REFRESH_TOKEN: 'auth/refresh',
    //         SIGN_IN: 'auth/signin',
    //         SIGN_UP: 'auth/signup',
    //     };
    // }

    // static get localStorageKeys() {
    //     return {
    //         // local storage
    //         ACCESS_TOKEN_ID: 'access-token-id',
    //         REFRESH_TOKEN_ID: 'refresh-token-id',
    //         USER_NOTIFIED_TO_SIGN_IN_ID: 'user-notified-to-signin',
    //     };
    // }

    // static get routerSegments() {
    //     return {
    //         SIGN_IN: '?modal_content=signin',
    //     };
    // }
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
