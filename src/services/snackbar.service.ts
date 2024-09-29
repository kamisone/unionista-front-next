// import 'client-only';
'use client';

import { Toast } from '@/components/notifier/Notifier';
import { TOAST_COOKIE_NAME } from '@/utils/constants';
import { isBrowser } from '@/utils/is-browser';
import { deleteCookie, getCookies } from '@/utils/query-params';
import { ComponentsStateNotify } from './components-state-notify.service';

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
                        const toasts = JSON.parse(
                            decodeURIComponent(cookies[TOAST_COOKIE_NAME])
                        ) as Toast[];
                        for (let toast of toasts) {
                            this._instance.state = {
                                toast,
                            };
                        }
                        deleteCookie(
                            TOAST_COOKIE_NAME,
                            cookies[TOAST_COOKIE_NAME]
                        );
                    }
                }, 1000);
            }
        }
        return this._instance;
    }
}
