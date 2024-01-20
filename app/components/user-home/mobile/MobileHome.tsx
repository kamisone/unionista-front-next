import { SupportedLanguages } from '@/app/i18n/settings';
import React from 'react';

interface MobileHomeProps {
    lng: SupportedLanguages;
    isUserAuthenticated: boolean;
}

const MobileHome = ({ lng, isUserAuthenticated }: MobileHomeProps) => {
    return <h2>Mobile body: </h2>;
};

export default MobileHome;
