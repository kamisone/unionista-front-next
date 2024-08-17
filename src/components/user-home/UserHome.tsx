'use client';

import { isMobile } from '@/utils/is-browser';
import MobileBody from '@/components/user-home/mobile/MobileHome';
import DesktopBody from '@/components/user-home/desktop/DesktopHome';
import { SupportedLanguages } from '@/i18n/settings';
import { useEffect, useState } from 'react';
import { AuthService } from '@/services/auth.service';
import MobileHome from '@/components/user-home/mobile/MobileHome';
import DesktopHome from '@/components/user-home/desktop/DesktopHome';

const authService = AuthService.getInstance();

interface UserHomeProps {
    lng: SupportedLanguages;
    isMobile?: boolean;
}

const UserHome = ({ lng, isMobile = false }: UserHomeProps) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(
        authService.state.isUserAuthenticated
    );

    useEffect(() => {
        authService.addNotifier(
            (options) =>
                options &&
                setIsUserAuthenticated(options.state.isUserAuthenticated)
        );
    }, []);

    return isMobile ? (
        <MobileHome isUserAuthenticated={isUserAuthenticated} lng={lng} />
    ) : (
        <DesktopHome isUserAuthenticated={isUserAuthenticated} lng={lng} />
    );
};

export default UserHome;
