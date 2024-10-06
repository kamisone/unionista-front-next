'use client';

import { ComponentsStateNotify } from '../components-state-notify.service';

export interface INotifyOptions {
    state: RouterState;
}

export interface RouterState {
    url: string | null;
}

export class RouterService extends ComponentsStateNotify<
    RouterState,
    INotifyOptions
> {
    private static _instance: RouterService;

    constructor(initialState: RouterState) {
        super(initialState);
    }

    static get instance() {
        if (!this._instance) {
            this._instance = new RouterService({
                url: null,
            });
        }
        return this._instance;
    }
}
