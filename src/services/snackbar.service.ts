import { Notification } from '@/components/notifier/Notifier';
import { isBrowser } from '@/utils/is-browser';
import { deleteCookie, getCookies } from '@/utils/query-params';
import { ComponentsStateNotify } from './components-state-notify.service';

export interface INotifyOptions {
    state: SnackbarState;
}

export interface SnackbarState {
    notification: Notification | null;
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
                notification: null,
            });

            if (isBrowser()) {
                setInterval(() => {
                    const cookies = getCookies();
                    if (cookies.notification) {
                        this._instance.state = {
                            notification: JSON.parse(
                                decodeURIComponent(cookies.notification)
                            ) as Notification,
                        };
                        deleteCookie('notification');
                    }
                }, 1000);
            }
        }
        return this._instance;
    }
}
