import DesktopHeader from '@/components/header/desktop/DesktopHeader';
import MobileHeader from '@/components/header/mobile/MobileHeader';
import { SupportedLanguages } from '@/i18n/settings';


interface UserHeaderProps {
    lng: SupportedLanguages;
    isMobile?: boolean;
    user: any;
}

function UserHeader({
    lng,
    isMobile = false,
    user,
}: UserHeaderProps) {

    return isMobile ? (
        <MobileHeader user={user} lng={lng} />
    ) : (
        <DesktopHeader user={user} lng={lng} />
    );
}

export default UserHeader;
