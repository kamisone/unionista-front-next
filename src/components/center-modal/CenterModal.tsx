import { SupportedLanguages } from '@/i18n/settings';
import LoadingIndicator from '@/shared/loading-indicator/LoadingIndicator';
import ModalSpot from '@/shared/modal-spot/ModalSpot';
import { getModalTitle, ModalContentMapping } from '@/utils/modal';
import { FC, Suspense } from 'react';
import LoginContent from '../modal-content/login-in-content/LoginContent';
import MenuDrawerNavContent from '../modal-content/menu-drawer-nav-content/MenuDrawerNavContent';

interface CenterModalProps {
    lng: SupportedLanguages;
    currentModalContent: ModalContentMapping;
}

const CenterModal = async function ({
    lng,
    currentModalContent,
}: CenterModalProps) {
    let Content: FC | null = null;
    switch (currentModalContent) {
        case ModalContentMapping.MENU_DRAWER:
            Content = function Content() {
                return <MenuDrawerNavContent lng={lng} />;
            };
            break;
        case ModalContentMapping.SIGN_IN:
        case ModalContentMapping.SIGN_UP:
            Content = function Content() {
                return <LoginContent lng={lng} />;
            };
            break;
    }
    return (
        <ModalSpot
            lng={lng}
            headingTitle={getModalTitle(currentModalContent, lng)}
            isDesktop
        >
            <Suspense key={currentModalContent} fallback={<LoadingIndicator />}>
                <Content />
            </Suspense>
        </ModalSpot>
    );
};

export default CenterModal;
