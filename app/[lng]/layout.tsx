import React from 'react';
import { dir } from 'i18next';
import './globals.css';
import { ReactNode } from 'react';
import { SupportedLanguages, languages } from '@/app/i18n/settings';
import StoreProvider from '@/app/StoreProvider';
import Header from '@/app/components/header/Header';
import Footer from '@/app/components/footer/Footer';
import CustomSnackbar from '../components/custom-snackback/CustomSnackbar';
import BottomModal from '../components/bottom-modal/BottomModal';

interface RootLayoutProps {
    children: ReactNode;
    params: { lng: SupportedLanguages };
}

export async function generateStaticParams() {
    return languages.map((lng) => ({
        lng,
    }));
}

function RootLayout({ children, params: { lng } }: RootLayoutProps) {
    return (
        <StoreProvider>
            <html lang={lng} dir={dir(lng)}>
                <head />
                <body>
                    {children}
                </body>
            </html>
        </StoreProvider>
    );
}

export default RootLayout;
