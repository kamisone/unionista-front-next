import React from 'react';
import { dir } from 'i18next';
import { ReactNode } from 'react';
import { languages } from '@/app/i18n/settings';
import StoreProvider from '@/app/StoreProvider';

interface RootLayoutProps {
    children: ReactNode;
    params: { lng: string };
}

export async function generateStaticParams() {
    return languages.map((lng) => ({
        lng,
    }));
}

export default function RootLayout({
    children,
    params: { lng },
}: RootLayoutProps) {
    return (
        <StoreProvider>
            <html lang={lng} dir={dir(lng)}>
                <head />
                <body>{children}</body>
            </html>
        </StoreProvider>
    );
}

// export default RootLayout;
