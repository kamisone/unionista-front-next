import React from 'react';
import Header from '@/app/components/header/Header';
import Footer from '@/app/components/footer/Footer';

import './globals.css';
import CustomSnackbar from '@/app/components/custom-snackback/CustomSnackbar';
import BottomModal from '@/app/components/bottom-modal/BottomModal';

import { SupportedLanguages } from '../i18n/settings';
import { useTranslation } from '../i18n';

interface HomeProps {
    params: {
        lng: SupportedLanguages;
    };
}

async function Home({ params: { lng } }: HomeProps) {
    const { t } = await useTranslation(lng);
    return (
        <div className="app_container">
            <Header lng={lng} />
            <div className="app_body_container">{/* <RenderRoutes /> */}</div>
            <Footer lng={lng} />
            <CustomSnackbar />
            <BottomModal lng={lng} />
        </div>
    );
}

export default Home;
