import { SupportedLanguages } from '@/i18n/settings';
import ModalSpot from '@/shared/modal-spot/ModalSpot';
import { getModalTitle, ModalContentMapping } from '@/utils/modal';
import { ReactElement, Suspense } from 'react';

import LoadingIndicator from '@/shared/loading-indicator/LoadingIndicator';
import { modalContentNames } from '@/utils/constants';
import { headers } from 'next/headers';
import LoginContent from '../modal-content/login-in-content/LoginContent';
import MenuDrawerNavContent from '../modal-content/menu-drawer-nav-content/MenuDrawerNavContent';

interface BottomModalProps {
    lng: SupportedLanguages;
}

const BottomModal = async function ({ lng }: BottomModalProps) {
    const currentModalContent = headers().get(
        modalContentNames.HEADER_NAME
    ) as ModalContentMapping | null;

    if (currentModalContent) {
        let content: ReactElement | Promise<ReactElement> | null = null;
        switch (currentModalContent) {
            case ModalContentMapping.MENU_DRAWER:
                content = <MenuDrawerNavContent lng={lng} />;
                break;
            case ModalContentMapping.SIGN_IN:
            case ModalContentMapping.SIGN_UP:
                content = <LoginContent lng={lng} />;
                break;
        }

        return (
            <ModalSpot
                lng={lng}
                headingTitle={getModalTitle(currentModalContent)}
            >
                <Suspense
                    key={currentModalContent}
                    fallback={<LoadingIndicator />}
                >
                    {content}
                </Suspense>
            </ModalSpot>
        );
    }
};

export default BottomModal;
