import BottomModal from '@/app/components/bottom-modal/BottomModal';
import CustomSnackbar from '@/app/components/custom-snackback/CustomSnackbar';
import Footer from '@/app/components/footer/Footer';
import Header from '@/app/components/header/Header';
import { SupportedLanguages } from '@/app/i18n/settings';
import { ReactNode } from 'react';

interface ClientLayoutProps {
    children: ReactNode;
    params: { lng: SupportedLanguages };
}
const ClientLayout = ({ children, params: { lng } }: ClientLayoutProps) => {
    return (
        <>
            <Header lng={lng} />
            <h2>admin</h2>
            {children}
            <Footer lng={lng} />
            <CustomSnackbar lng={lng} />
            <BottomModal lng={lng} />
        </>
    );
};

export default ClientLayout;
