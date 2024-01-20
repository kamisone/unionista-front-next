import React from 'react';

import {
    SupportedLanguages,
    SupportedLanguagesEnum,
} from '../../i18n/settings';
import { useTranslation } from '../../i18n';
import clsx from 'clsx';
import { UthmanicFont } from '@/app/fonts/fonts';
import { headers } from 'next/headers';
import { isMobile } from '@/app/utils/is-browser';
import MobileHeader from '@/app/components/header/mobile/MobileHeader';
import MobileFooter from '@/app/components/footer/mobile/MobileFooter';
import CustomSnackbar from '@/app/components/custom-snackback/CustomSnackbar';
import BottomModal from '@/app/components/bottom-modal/BottomModal';
import DesktopHeader from '@/app/components/header/desktop/DesktopHeader';
import DesktopFooter from '@/app/components/footer/desktop/DesktopFooter';
import MobileBody from '@/app/components/user-home/mobile/MobileHome';
import DesktopBody from '@/app/components/user-home/desktop/DesktopHome';
import { Metadata } from 'next';
import UserHeader from '@/app/components/header/UserHeader';
import UserFooter from '@/app/components/footer/UserFooter';
import UserHome from '@/app/components/user-home/UserHome';

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
    return isMobile(headersList.get('user-agent')) ? (
        <UserHome isMobile lng={lng} />
    ) : (
        <UserHome lng={lng} />
    );
}

export default Home;
