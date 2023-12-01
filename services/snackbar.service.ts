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
    static myInstance: SnackbarService;
    static getInstance() {
        if (!SnackbarService.myInstance) {
            SnackbarService.myInstance = new SnackbarService();
        }
        return this.myInstance;
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
