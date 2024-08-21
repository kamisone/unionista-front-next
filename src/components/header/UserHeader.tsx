'use client';
import DesktopHeader from '@/components/header/desktop/DesktopHeader';
import MobileHeader from '@/components/header/mobile/MobileHeader';
import { useUpdatePathQuery } from '@/hooks/useUpdatePathQuery';
import { SupportedLanguages } from '@/i18n/settings';
import { AuthService } from '@/services/auth.service';
import { useEffect, useState } from 'react';

const authService = AuthService.instance;

interface UserHeaderProps {
    lng: SupportedLanguages;
    isMobile?: boolean;
}

const UserHeader = ({ lng, isMobile = false }: UserHeaderProps) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(
        authService.state.isUserAuthenticated
    );

    useEffect(() => {
        // add notifiers
        authService.addNotifier(
            (options) =>
                options &&
                setIsUserAuthenticated(options.state.isUserAuthenticated)
        );
    }, []);

    useUpdatePathQuery();

    useEffect(() => {
        // set auth intialstate
        const accessToken = AuthService.getAccessToken();
        const refreshToken = AuthService.getRefreshToken();

        authService.state = {
            isUserAuthenticated: accessToken
                ? !AuthService.isTokenInvalid(accessToken)
                : false,
            isUserNotifiedToSignin: AuthService.getIsUserNotifiedToSignin(),
        };
        if (
            !authService.state.isUserAuthenticated &&
            refreshToken &&
            !AuthService.isTokenInvalid(refreshToken)
        ) {
            AuthService.refreshToken();
        }
    }, []);

    return isMobile ? (
        <MobileHeader isUserAuthenticated={isUserAuthenticated} lng={lng} />
    ) : (
        <DesktopHeader isUserAuthenticated={isUserAuthenticated} lng={lng} />
    );
};

export default UserHeader;
