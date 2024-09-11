import { SupportedLanguages } from '@/i18n/settings';
import ModalSpot from '@/shared/modal-spot/ModalSpot';
import { getModalTitle, ModalContentMapping } from '@/utils/modal';
import { ReactElement } from 'react';
import LoadingIndicator from '@/shared/loading-indicator/LoadingIndicator';
import dynamic from 'next/dynamic';

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

interface BottomModalProps {
    lng: SupportedLanguages;
    currentModalContent: ModalContentMapping;
}

async function BottomModal({ lng, currentModalContent }: BottomModalProps) {
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
                headingTitle={getModalTitle(currentModalContent, lng)}
            >
                {content}
            </ModalSpot>
        );
    }
}

export default BottomModal;
