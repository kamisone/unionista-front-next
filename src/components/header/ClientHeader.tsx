import DesktopHeader from '@/components/header/desktop/DesktopHeader';
import MobileHeader from '@/components/header/mobile/MobileHeader';
import { SupportedLanguages } from '@/i18n/settings';
import { JwtPayload } from '@/services/types/auth';

interface ClientHeaderProps {
    lng: SupportedLanguages;
    isMobile?: boolean;
    userPayload: JwtPayload | null;
}

function ClientHeader({
    lng,
    isMobile = false,
    userPayload,
}: ClientHeaderProps) {
    return isMobile ? (
        <MobileHeader userPayload={userPayload} lng={lng} />
    ) : (
        <DesktopHeader userPayload={userPayload} lng={lng} />
    );
}

export default ClientHeader;
