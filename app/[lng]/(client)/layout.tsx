import BottomModal from '@/app/components/bottom-modal/BottomModal';
import CustomSnackbar from '@/app/components/custom-snackback/CustomSnackbar';
import Footer from '@/app/components/footer/Footer';
import Header from '@/app/components/header/Header';
import { useUserAuth } from '@/app/hooks/useUserAuth';
import { SupportedLanguages } from '@/app/i18n/settings';
import { ReactNode } from 'react';
import { useUpdateQuery } from '@/app/hooks/useUpdateQuery';
import { isBrowser } from '@/app/utils/is-browser';
import ModalSpot from '@/app/shared/modal-spot/ModalSpot';
import { ProductCategoryService } from '@/app/services/product-category.service';

interface ClientLayoutProps {
    children: ReactNode;
    params: { lng: SupportedLanguages };
}

const productCategoryService = ProductCategoryService.getInstance();
const ClientLayout = async ({
    children,
    params: { lng },
}: ClientLayoutProps) => {
    return (
        <>
            <Header lng={lng} />
            {children}
            <Footer lng={lng} />
            <CustomSnackbar lng={lng} />
            <BottomModal lng={lng} />
        </>
    );
};

export default ClientLayout;
