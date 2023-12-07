import React from 'react';
import Header from '@/app/components/header/Header';
import Footer from '@/app/components/footer/Footer';

import './globals.css';
import CustomSnackbar from '@/app/components/custom-snackback/CustomSnackbar';
import BottomModal from '@/app/components/bottom-modal/BottomModal';

import { SupportedLanguages, SupportedLanguagesEnum } from '../i18n/settings';
import { useTranslation } from '../i18n';
import clsx from 'clsx';
import { UthmanicFont } from '@/app/fonts/fonts';

interface HomeProps {
    params: {
        lng: SupportedLanguages;
    };
}

async function Home({ params: { lng } }: HomeProps) {
    const { t } = await useTranslation(lng);
    return (
        <div
            className={clsx('app_container', lng, {
                [UthmanicFont.className]: lng === SupportedLanguagesEnum.AR,
            })}
        >
            <Header lng={lng} />
            <div className="app_body_container">{/* <RenderRoutes /> */}</div>
            <Footer lng={lng} />
            <CustomSnackbar lng={lng} />
            <BottomModal lng={lng} />
        </div>
    );
}

export default Home;
