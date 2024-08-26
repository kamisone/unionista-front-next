import { SupportedLanguages } from '@/i18n/settings';
import LoadingIndicator from '@/shared/loading-indicator/LoadingIndicator';
import ModalSpot from '@/shared/modal-spot/ModalSpot';
import { modalContentNames } from '@/utils/constants';
import { getModalTitle, ModalContentMapping } from '@/utils/modal';
import { headers } from 'next/headers';
import { ReactElement, Suspense } from 'react';
import LoginContent from '../modal-content/login-in-content/LoginContent';
import MenuDrawerNavContent from '../modal-content/menu-drawer-nav-content/MenuDrawerNavContent';

interface CenterModalProps {
    lng: SupportedLanguages;
}

const CenterModal = async function ({ lng }: CenterModalProps) {
    const currentModalContent = headers().get(
        modalContentNames.HEADER_NAME
    ) as ModalContentMapping | null;
    let content: ReactElement | Promise<ReactElement> | null = null;
        switch (currentModalContent) {
            case ModalContentMapping.MENU_DRAWER:
                content = (
                    <MenuDrawerNavContent lng={lng} />
                );
                break;
            case ModalContentMapping.SIGN_IN:
            case ModalContentMapping.SIGN_UP:
                content = <LoginContent lng={lng} />;
                break;
        }
    return (
        <ModalSpot lng={lng} headingTitle={getModalTitle(currentModalContent)}>
            <Suspense fallback={<LoadingIndicator />}>{content}</Suspense>
        </ModalSpot>
    );
};

export default CenterModal;
