import { ModalContentMapping } from '../utils/bottom-modal';
import { ComponentsStateNotify } from './components-state-notify.service';

export interface BottomModalState {
    isBottomModalOpen: boolean;
    currentBottomModalContent: ModalContentMapping | null;
}

interface INotifyOptions {
    state: BottomModalState;
}

export class BottomModalService extends ComponentsStateNotify<
    BottomModalState,
    INotifyOptions
> {
    constructor(initialState: BottomModalState) {
        super(initialState);
    }

    static myInstance: BottomModalService;

    static getInstance() {
        if (!BottomModalService.myInstance) {
            BottomModalService.myInstance = new BottomModalService({
                isBottomModalOpen: false,
                currentBottomModalContent: null,
            });
        }
        return this.myInstance;
    }
}
