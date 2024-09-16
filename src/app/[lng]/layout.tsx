import '@/app/[lng]/globals.css';
import ExternalRouter from '@/components/ExternalRouter/ExternalRouter';
import Notifier from '@/components/notifier/Notifier';
import {
    SupportedLanguages,
    SupportedLanguagesEnum,
    languages,
} from '@/i18n/settings';
import { ReactNode } from 'react';

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
                <Notifier />
                <ExternalRouter />
            </body>
        </html>
    );
}

export default RootLayout;
