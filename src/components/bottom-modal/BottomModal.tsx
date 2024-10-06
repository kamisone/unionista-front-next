import { SupportedLanguages } from '@/i18n/settings';
import ModalSpot from '@/shared/modal-spot/ModalSpot';
import { getModalTitle, ModalContentMapping } from '@/utils/modal';
import { ReactElement, Suspense } from 'react';

import LoadingIndicator from '@/shared/loading-indicator/LoadingIndicator';
import LoginContent from '@/components/modal-content/login-in-content/LoginContent';
import MenuDrawerNavContent from '@/components/modal-content/menu-drawer-nav-content/MenuDrawerNavContent';
import ProductCategoryCreateContent from '@/components/modal-content/product-category/create-content/ProductCategoryCreateContent';

interface BottomModalProps {
    lng: SupportedLanguages;
    currentModalContent: ModalContentMapping;
    isMobile?: boolean;
    searchParams: { [key: string]: string | undefined };
}

async function BottomModal({
    lng,
    currentModalContent,
    isMobile = false,
    searchParams,
}: BottomModalProps) {
    if (currentModalContent) {
        let content: ReactElement | Promise<ReactElement> | null = null;
        switch (currentModalContent) {
            case ModalContentMapping.MENU_DRAWER:
                content = (
                    <MenuDrawerNavContent lng={lng} isMobile={isMobile} />
                );
                break;
            case ModalContentMapping.PRODUCT_CATEGERY_CREATE:
                content = (
                    <ProductCategoryCreateContent
                        lng={lng}
                        searchParams={searchParams}
                        isMobile={isMobile}
                    />
                );
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
                type="bottom"
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

export default BottomModal;
