import { SupportedLanguages } from '@/i18n/settings';
import LoadingIndicator from '@/shared/loading-indicator/LoadingIndicator';
import ModalSpot from '@/shared/modal-spot/ModalSpot';
import { getModalTitle, ModalContentMapping } from '@/utils/modal';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

interface CenterModalProps {
    lng: SupportedLanguages;
    currentModalContent: ModalContentMapping;
}

const MenuDrawerNavContent = dynamic(
    () =>
        import(
            '@/components/modal-content/menu-drawer-nav-content/MenuDrawerNavContent'
        ),
    { loading: () => <LoadingIndicator /> }
);
const LoginContent = dynamic(
    () => import('@/components/modal-content/login-in-content/LoginContent'),
    { loading: () => <LoadingIndicator /> }
);

const CenterModal = async function ({
    lng,
    currentModalContent,
}: CenterModalProps) {
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
            headingTitle={getModalTitle(currentModalContent, lng)}
            isDesktop
        >
            {content}
        </ModalSpot>
    );
};

export default CenterModal;
