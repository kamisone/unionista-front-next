import { SupportedLanguages } from '@/i18n/settings';
import LoadingIndicator from '@/shared/loading-indicator/LoadingIndicator';
import ModalSpot from '@/shared/modal-spot/ModalSpot';
import { getModalTitle, ModalContentMapping } from '@/utils/modal';
import { FC, Suspense } from 'react';
import LoginContent from '@/components/modal-content/login-in-content/LoginContent';
import MenuDrawerNavContent from '@/components/modal-content/menu-drawer-nav-content/MenuDrawerNavContent';
import ProductCategoryCreateContent from '@/components/modal-content/product-category/create-content/ProductCategoryCreateContent';

interface CenterModalProps {
    lng: SupportedLanguages;
    currentModalContent: ModalContentMapping;
    isMobile?: boolean;
    searchParams: { [key: string]: string | undefined };
}

const CenterModal = async function ({
    lng,
    currentModalContent,
    isMobile = false,
    searchParams,
}: CenterModalProps) {
    let Content: FC | null = null;
    switch (currentModalContent) {
        case ModalContentMapping.MENU_DRAWER:
            Content = function Content() {
                return <MenuDrawerNavContent lng={lng} isMobile={isMobile} />;
            };
            break;
        case ModalContentMapping.PRODUCT_CATEGERY_CREATE:
            Content = function Content() {
                return (
                    <ProductCategoryCreateContent
                        lng={lng}
                        searchParams={searchParams}
                        isMobile={isMobile}
                    />
                );
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
            type="center"
            isMobile={isMobile}
        >
            <Suspense key={currentModalContent} fallback={<LoadingIndicator />}>
                <Content />
            </Suspense>
        </ModalSpot>
    );
};

export default CenterModal;
