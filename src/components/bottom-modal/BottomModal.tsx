import { SupportedLanguages } from '@/i18n/settings';
import ModalSpot from '@/shared/modal-spot/ModalSpot';
import { getModalTitle, ModalContentMapping } from '@/utils/modal';
import React, {
    Suspense
} from 'react';

import LoadingIndicator from '@/shared/loading-indicator/LoadingIndicator';
import LoginContent from '../modal-content/login-in-content/LoginContent';
import MenuDrawerNavContent from '../modal-content/menu-drawer-nav-content/MenuDrawerNavContent';

interface BottomModalProps {
    lng: SupportedLanguages;
    currentModalContent: ModalContentMapping;
}

async function BottomModal({ lng, currentModalContent }: BottomModalProps) {
    if (currentModalContent) {
        let Content: React.LazyExoticComponent<
            typeof LoginContent | typeof MenuDrawerNavContent
        > | null = null;
        switch (currentModalContent) {
            case ModalContentMapping.MENU_DRAWER:
                Content = React.lazy(
                    () =>
                        import(
                            '@/components/modal-content/menu-drawer-nav-content/MenuDrawerNavContent'
                        )
                );
                break;
            case ModalContentMapping.SIGN_IN:
            case ModalContentMapping.SIGN_UP:
                Content = React.lazy(
                    () =>
                        import(
                            '@/components/modal-content/login-in-content/LoginContent'
                        )
                );
                break;
        }

        return (
            <ModalSpot
                lng={lng}
                headingTitle={getModalTitle(currentModalContent)}
            >
                <Suspense fallback={<LoadingIndicator />}>
                    {<Content lng={lng} />}
                </Suspense>
            </ModalSpot>
        );
    }
}

export default BottomModal;
