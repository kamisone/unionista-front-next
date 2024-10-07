import '@/app/[lng]/globals.css';
import ExternalRouter from '@/components/ExternalRouter/ExternalRouter';
import Notifier from '@/components/notifier/Notifier';
import TransitionLoader from '@/components/transition-loader/TransitionLoader';
import {
    SupportedLanguages,
    SupportedLanguagesEnum,
    languages,
} from '@/i18n/settings';
import { Viewport } from 'next';
import { ReactNode } from 'react';

export const viewport: Viewport = {
    themeColor: '#f1641e',
};

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
            <body className="relative">
                {children}
                <Notifier />
                <ExternalRouter />
                <TransitionLoader />
            </body>
        </html>
    );
}

export default RootLayout;
