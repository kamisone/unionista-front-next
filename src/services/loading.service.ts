import { ComponentsStateNotify } from '@/services/components-state-notify.service';

export interface LoadingState {
    isLoading: boolean;
}

interface INotifyOptions {
    state: LoadingState;
}

export class LoadingService extends ComponentsStateNotify<
    LoadingState,
    INotifyOptions
> {
    constructor(initialState: LoadingState) {
        super(initialState);
    }

    static _instance: LoadingService;

    static get instance() {
        if (!this._instance) {
            this._instance = new LoadingService({
                isLoading: false,
            });
        }
        return this._instance;
    }
}
