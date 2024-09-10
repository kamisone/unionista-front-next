import { isBrowser } from '@/utils/is-browser';
import { deleteCookie, getCookies } from '@/utils/query-params';
import { ComponentsStateNotify } from './components-state-notify.service';
import { TOAST_COOKIE_NAME } from '@/utils/constants';
import { Toast } from '@/components/notifier/Notifier';

export interface INotifyOptions {
    state: SnackbarState;
}

export interface SnackbarState {
    toast: Toast | null;
}

export enum SnackbarSeverity {
    SUCCESS = 'success',
    INFO = 'info',
    ERROR = 'error',
    WARNING = 'warning',
}

export const SNACKBAR_DURATION = 5000;

export class SnackbarService extends ComponentsStateNotify<
    SnackbarState,
    INotifyOptions
> {
    private static _instance: SnackbarService;

    static get instance() {
        if (!this._instance) {
            this._instance = new SnackbarService({
                toast: null,
            });

            if (isBrowser()) {
                setInterval(() => {
                    const cookies = getCookies();
                    if (cookies[TOAST_COOKIE_NAME]) {
                        this._instance.state = {
                            toast: JSON.parse(
                                decodeURIComponent(cookies[TOAST_COOKIE_NAME])
                            ) as Toast,
                        };
                        deleteCookie(TOAST_COOKIE_NAME);
                    }
                }, 1000);
            }
        }
        return this._instance;
    }
}
