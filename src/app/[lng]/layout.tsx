import React from 'react';
import { dir } from 'i18next';
import '@/app/[lng]/globals.css';
import { ReactNode } from 'react';
import { SupportedLanguages, languages } from '@/i18n/settings';

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
        <html lang={lng} dir={dir(lng)}>
            <body>{children}</body>
        </html>
    );
}

export default RootLayout;
