'use client';
import React from 'react';
import { AuthService } from '@/services/auth.service';
import DesktopHeader from '@/components/header/desktop/DesktopHeader';
import MobileHeader from '@/components/header/mobile/MobileHeader';
import { useEffect, useState } from 'react';
import { SupportedLanguages } from '@/i18n/settings';
import { useUpdatePathQuery } from '@/hooks/useUpdatePathQuery';

const authService = AuthService.getInstance();

interface UserHeaderProps {
    lng: SupportedLanguages;
    isMobile?: boolean;
}

const UserHeader = ({ lng, isMobile = false }: UserHeaderProps) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(
        authService.state.isUserAuthenticated
    );
    useUpdatePathQuery();
    useEffect(() => {
        // add notifiers
        authService.addNotifier(
            (options) =>
                options &&
                setIsUserAuthenticated(options.state.isUserAuthenticated)
        );

        // set auth intialstate
        const refreshToken = AuthService.getRefreshToken();
        authService.state = {
            isUserAuthenticated: refreshToken
                ? !AuthService.isTokenExpired(refreshToken)
                : false,
            isUserNotifiedToSignin: AuthService.getIsUserNotifiedToSignin(),
        };
    }, []);
    return isMobile ? (
        <MobileHeader isUserAuthenticated={isUserAuthenticated} lng={lng} />
    ) : (
        <DesktopHeader isUserAuthenticated={isUserAuthenticated} lng={lng} />
    );
};

export default UserHeader;
