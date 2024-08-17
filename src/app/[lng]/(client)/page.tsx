import React from 'react';

import {
    SupportedLanguages,
    SupportedLanguagesEnum,
} from '../../../i18n/settings';
import { useTranslation } from '../../../i18n';
import clsx from 'clsx';
import { UthmanicFont } from '@/fonts/fonts';
import { headers } from 'next/headers';
import { isMobile } from '@/utils/is-browser';
import MobileHeader from '@/components/header/mobile/MobileHeader';
import MobileFooter from '@/components/footer/mobile/MobileFooter';
import CustomSnackbar from '@/components/custom-snackback/CustomSnackbar';
import BottomModal from '@/components/bottom-modal/BottomModal';
import DesktopHeader from '@/components/header/desktop/DesktopHeader';
import DesktopFooter from '@/components/footer/desktop/DesktopFooter';
import MobileBody from '@/components/user-home/mobile/MobileHome';
import DesktopBody from '@/components/user-home/desktop/DesktopHome';
import { Metadata } from 'next';
import UserHeader from '@/components/header/UserHeader';
import UserFooter from '@/components/footer/UserFooter';
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
    return isMobile(headersList.get('user-agent')) ? (
        <UserHome isMobile lng={lng} />
    ) : (
        <UserHome lng={lng} />
    );
}

export default Home;
