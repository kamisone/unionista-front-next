'use client';

import { isMobile } from '@/app/utils/is-browser';
import MobileBody from './mobile/MobileHome';
import DesktopBody from './desktop/DesktopHome';
import { SupportedLanguages } from '@/app/i18n/settings';
import { useEffect, useState } from 'react';
import { AuthService } from '@/app/services/auth.service';
import MobileHome from './mobile/MobileHome';
import DesktopHome from './desktop/DesktopHome';

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
