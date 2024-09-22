import { ComponentsStateNotify } from '@/services/components-state-notify.service';
import { HttpService } from '@/services/http.service';
import { isBrowser } from '@/utils/is-browser';
import { getCookies } from '@/utils/query-params';
import { Role } from './server/auth.service';

type CBType = typeof Function;

export interface JwtPayload {
    email: string;
    fullName: string;
    avatarUrl: string;
    sub: string;
    role: Role;
}

// constants
const ONE_DAY_MS = 8.64e7;
const AUTH_CHECK_INTERVAL_TIME = 2000;

// export const EMAIL_REGEX =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface AuthState {
    user: JwtPayload | null;
}

interface INotifyOptions {
    state: AuthState;
}

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
        return JSON.parse(decodeURIComponent(cookies.user));
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
