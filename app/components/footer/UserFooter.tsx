'use client';
import React from 'react';
import { AuthService } from '@/app/services/auth.service';

import { useEffect, useState } from 'react';
import { SupportedLanguages } from '@/app/i18n/settings';
import { useUpdatePathQuery } from '@/app/hooks/useUpdatePathQuery';
import MobileFooter from './mobile/MobileFooter';
import DesktopFooter from './desktop/DesktopFooter';

const authService = AuthService.getInstance();

interface UserFooterProps {
    lng: SupportedLanguages;
    isMobile?: boolean;
}

const UserFooter = ({ lng, isMobile = false }: UserFooterProps) => {
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
    return isMobile ? (
        <MobileFooter isUserAuthenticated={isUserAuthenticated} lng={lng} />
    ) : (
        <DesktopFooter isUserAuthenticated={isUserAuthenticated} lng={lng} />
    );
};

export default UserFooter;
