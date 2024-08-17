export interface INotifyOptions {
    message: string;
    severity: SnackbarSeverity;
    onClose?: () => void;
}

type ToNotifiyFunc = (options: INotifyOptions) => void;

export enum SnackbarSeverity {
    SUCCESS = 'success',
    INFO = 'info',
    ERROR = 'error',
    WARNING = 'warning',
}

export const SNACKBAR_DURATION = 5000;

export class SnackbarService {
    private static _instance: SnackbarService;

    static get instance() {
        if (!this._instance) {
            this._instance = new SnackbarService();
        }
        return this._instance;
    }

    toNotifiy: ToNotifiyFunc[] = [];

    addNotifier(notifyFunction: (options: INotifyOptions) => void) {
        this.toNotifiy.push(notifyFunction);
    }

    openSnackbar(options: INotifyOptions) {
        this.toNotifiy.forEach((func) => {
            func(options);
        });
    }
}
