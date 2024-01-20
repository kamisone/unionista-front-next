import React from 'react';
import { dir } from 'i18next';
import './globals.css';
import { ReactNode } from 'react';
import { SupportedLanguages, languages } from '@/app/i18n/settings';

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
            <head>
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1060049744591818"
                    crossOrigin="anonymous"
                ></script>
            </head>
            <body>{children}</body>
        </html>
    );
}

export default RootLayout;
