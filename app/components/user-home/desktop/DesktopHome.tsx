import { SupportedLanguages } from '@/app/i18n/settings';
import React from 'react';

interface DesktopHomeProps {
    lng: SupportedLanguages;
    isUserAuthenticated: boolean;
}

const DesktopHome = ({ lng, isUserAuthenticated }: DesktopHomeProps) => {
    return <h2>Desktop body</h2>;
};

export default DesktopHome;
