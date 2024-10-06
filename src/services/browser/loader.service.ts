import { ComponentsStateNotify } from '../components-state-notify.service';

export interface INotifyOptions {
    state: LoaderState;
}

export interface LoaderState {
    isLoadingIds: string[];
}

export class LoaderService extends ComponentsStateNotify<
    LoaderState,
    INotifyOptions
> {
    private static _instance: LoaderService;

    static get instance() {
        if (!this._instance) {
            this._instance = new LoaderService({
                isLoadingIds: [],
            });
        }
        return this._instance;
    }
}
