import DesktopFooter from '@/components/footer/desktop/DesktopFooter';
import MobileFooter from '@/components/footer/mobile/MobileFooter';
import { SupportedLanguages } from '@/i18n/settings';

interface UserFooterProps {
    lng: SupportedLanguages;
    isMobile?: boolean;
}

const UserFooter = ({ lng, isMobile = false }: UserFooterProps) => {
    return isMobile ? (
        <MobileFooter lng={lng} />
    ) : (
        <DesktopFooter lng={lng} />
    );
};

export default UserFooter;
