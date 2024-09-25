import DesktopHome from '@/components/client-home/desktop/DesktopHome';
import MobileHome from '@/components/client-home/mobile/MobileHome';
import { SupportedLanguages } from '@/i18n/settings';

interface ClientHomeProps {
    lng: SupportedLanguages;
    isMobile?: boolean;
}

const ClientHome = ({ lng, isMobile = false }: ClientHomeProps) => {
    return isMobile ? <MobileHome lng={lng} /> : <DesktopHome lng={lng} />;
};

export default ClientHome;
