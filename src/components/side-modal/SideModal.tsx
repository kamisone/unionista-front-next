import { SupportedLanguages } from '@/i18n/settings';
import LoadingIndicator from '@/shared/loading-indicator/LoadingIndicator';
import ModalSpot from '@/shared/modal-spot/ModalSpot';
import { getModalTitle, ModalContentMapping } from '@/utils/modal';
import { ReactElement, Suspense } from 'react';
import MenuDrawerNavContent from '../modal-content/menu-drawer-nav-content/MenuDrawerNavContent';

interface SideModalProps {
    lng: SupportedLanguages;
    currentModalContent: ModalContentMapping;
    isMobile?: boolean;
}

export default function SideModal({
    lng,
    currentModalContent,
    isMobile = false,
}: SideModalProps) {
    if (currentModalContent) {
        let content: ReactElement | Promise<ReactElement> | null = null;
        switch (currentModalContent) {
            case ModalContentMapping.MENU_DRAWER:
                content = (
                    <MenuDrawerNavContent lng={lng} isMobile={isMobile} />
                );
                break;
        }

        return (
            <ModalSpot
                lng={lng}
                headingTitle={getModalTitle(currentModalContent, lng)}
                type="side"
                isMobile={isMobile}
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
}
