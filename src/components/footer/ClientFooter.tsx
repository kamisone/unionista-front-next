import DesktopFooter from '@/components/footer/desktop/DesktopFooter';
import MobileFooter from '@/components/footer/mobile/MobileFooter';
import { SupportedLanguages } from '@/i18n/settings';

interface ClientFooterProps {
    lng: SupportedLanguages;
    isMobile?: boolean;
}

const ClientFooter = ({ lng, isMobile = false }: ClientFooterProps) => {
    return isMobile ? (
        <MobileFooter lng={lng} />
    ) : (
        <DesktopFooter lng={lng} />
    );
};

export default ClientFooter;
