import React from 'react';
import '@/app/[lng]/globals.css';
import { ReactNode } from 'react';
import {
    SupportedLanguages,
    SupportedLanguagesEnum,
    languages,
} from '@/i18n/settings';
import SkeletonLoader from '@/shared/skeleton-loader/SkeletonLoader';

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
        <html
            lang={lng}
            dir={lng === SupportedLanguagesEnum.AR ? 'rtl' : 'ltr'}
        >
            <body>
                {children}
                {/* <SkeletonLoader /> */}
            </body>
        </html>
    );
}

export default RootLayout;
