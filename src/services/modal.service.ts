import { ModalContentMapping } from '@/utils/modal';
import { ComponentsStateNotify } from '@/services/components-state-notify.service';

export interface ModalState {
    isModalOpen: boolean;
    currentModalContent: ModalContentMapping | null;
}

interface INotifyOptions {
    state: ModalState;
}

export class ModalService extends ComponentsStateNotify<
    ModalState,
    INotifyOptions
> {
    constructor(initialState: ModalState) {
        super(initialState);
    }

    static myInstance: ModalService;

    static getInstance() {
        if (!ModalService.myInstance) {
            ModalService.myInstance = new ModalService({
                isModalOpen: false,
                currentModalContent: null,
            });
        }
        return this.myInstance;
    }
}
