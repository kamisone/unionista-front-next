'use client';

import { isBrowser } from '@/utils/is-browser';
import { ComponentsStateNotify } from '../components-state-notify.service';
import { RouterService } from './router.service';
import { stripQueryParamFromUrl } from '@/utils/query-params';
import { modalContentNames } from '@/utils/constants';

export interface INotifyOptions {
    state: ModalState;
}

export interface ModalState {}

const routerService = RouterService.instance;

export class ModalService extends ComponentsStateNotify<
    ModalState,
    INotifyOptions
> {
    private static _instance: ModalService;

    constructor(initialState: ModalState) {
        super(initialState);

        if (isBrowser()) {
            document.addEventListener('click', (e) => {
                if ((e.target as HTMLElement).matches('[data-modal-spot]')) {
                    const pathWithSearch = location.pathname + location.search;

                    routerService.state = {
                        url: stripQueryParamFromUrl(
                            pathWithSearch,
                            modalContentNames.QUERY_NAME
                        ),
                    };
                }
            });
        }
    }

    static get instance() {
        if (!this._instance) {
            this._instance = new ModalService({});
        }
        return this._instance;
    }
}
