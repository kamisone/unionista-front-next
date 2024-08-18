import React from 'react';

import { SupportedLanguages } from '@/i18n/settings';
import { headers } from 'next/headers';
import { isMobile } from '@/utils/is-browser';
import { Metadata } from 'next';
import UserHome from '@/components/user-home/UserHome';

export const metadata: Metadata = {
    title: 'UnionistaShop | Home',
};

interface HomeProps {
    params: {
        lng: SupportedLanguages;
    };
}

function Home({ params: { lng } }: HomeProps) {
    const headersList = headers();

    return (
        <UserHome
            isMobile={isMobile(headersList.get('user-agent'))}
            lng={lng}
        />
    );
}

export default Home;
