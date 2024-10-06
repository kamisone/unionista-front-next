import { ComponentsStateNotify } from '@/services/components-state-notify.service';
import { HttpService } from '@/services/browser/http.service';
import { isBrowser } from '@/utils/is-browser';
import { getCookies } from '@/utils/query-params';
import { shallowCompareObjs } from '@/utils';
import { JwtPayload } from '@/services/types/auth';

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
                const userPayload = AuthService.checkUserAuth();
                if (!shallowCompareObjs(userPayload, this.state.user)) {
                    this.state = {
                        user: userPayload,
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

    static get endpoints() {
        return {
            REFRESH_TOKEN: 'auth/refresh',
            SIGN_IN: 'auth/signin',
            SIGN_UP: 'auth/signup',
        };
    }

    static checkUserAuth(): JwtPayload | null {
        const cookies = getCookies();
        return cookies.user
            ? JSON.parse(decodeURIComponent(cookies.user))
            : null;
    }
}
