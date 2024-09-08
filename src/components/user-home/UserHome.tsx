import DesktopHome from '@/components/user-home/desktop/DesktopHome';
import MobileHome from '@/components/user-home/mobile/MobileHome';
import { SupportedLanguages } from '@/i18n/settings';


interface UserHomeProps {
    lng: SupportedLanguages;
    isMobile?: boolean;
}

const UserHome = ({ lng, isMobile = false }: UserHomeProps) => {
    return isMobile ? <MobileHome lng={lng} /> : <DesktopHome lng={lng} />;
};

export default UserHome;
