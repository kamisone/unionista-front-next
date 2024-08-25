import React from 'react';

import { SupportedLanguages } from '@/i18n/settings';
import { cookies, headers } from 'next/headers';
import { isMobile } from '@/utils/is-browser';
import { Metadata } from 'next';
import UserHome from '@/components/user-home/UserHome';
import FlexModal from '@/components/Modal/FlexModal';
import UserHeader from '@/components/header/UserHeader';
import { CURRENT_USER_HEADER_NAME, modalContentNames } from '@/utils/constants';

export const metadata: Metadata = {
    title: 'UnionistaShop | Home',
};

interface HomeProps {
    params: {
        lng: SupportedLanguages;
    };
    searchParams: { [key: string]: string | undefined };
}

function Home({ params: { lng }, searchParams }: HomeProps) {
    const headersList = headers();

    const user = headersList.get(CURRENT_USER_HEADER_NAME) || null;

    const isMobileDevice = isMobile(headersList.get('user-agent'));

    return (
        <>
            <UserHeader isMobile={isMobileDevice} lng={lng} user={user} />
            <UserHome
                isMobile={isMobile(headersList.get('user-agent'))}
                lng={lng}
            />
            <FlexModal
                lng={lng}
                isMobileDevice={isMobileDevice}
                searchParams={searchParams}
            />
        </>
    );
}

export default Home;
