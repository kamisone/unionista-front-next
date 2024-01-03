import BottomModal from '@/app/components/bottom-modal/BottomModal';
import CustomSnackbar from '@/app/components/custom-snackback/CustomSnackbar';
import Footer from '@/app/components/footer/Footer';
import MobileHeader from '@/app/components/header/mobile/MobileHeader';
import { useUserAuth } from '@/app/hooks/useUserAuth';
import { SupportedLanguages } from '@/app/i18n/settings';
import { ReactNode } from 'react';
import { useUpdateQuery } from '@/app/hooks/useUpdateQuery';
import { isBrowser, isMobile } from '@/app/utils/is-browser';
import ModalSpot from '@/app/shared/modal-spot/ModalSpot';
import { ProductCategoryService } from '@/app/services/product-category.service';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import DesktopHeader from '@/app/components/header/desktop/DesktopHeader';

interface ClientLayoutProps {
    children: ReactNode;
    params: { lng: SupportedLanguages };
}

const productCategoryService = ProductCategoryService.getInstance();
const ClientLayout = async ({
    children,
    params: { lng },
}: ClientLayoutProps) => {
    const headersList = headers();
    return (
        <>
            {isMobile(headersList.get('user-agent')) ? (
                <MobileHeader lng={lng} />
            ) : (
                <DesktopHeader />
            )}
            {children}
            <Footer lng={lng} />
            <CustomSnackbar lng={lng} />
            <BottomModal lng={lng} />
        </>
    );
};

export default ClientLayout;
