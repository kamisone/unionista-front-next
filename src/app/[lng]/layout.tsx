import '@/app/[lng]/globals.css';
import ExternalRouter from '@/components/ExternalRouter/ExternalRouter';
import ClientHeader from '@/components/header/ClientHeader';
import Notifier from '@/components/notifier/Notifier';
import TransitionLoader from '@/components/transition-loader/TransitionLoader';
import {
    SupportedLanguages,
    SupportedLanguagesEnum,
    languages,
} from '@/i18n/settings';
import { JwtPayload } from '@/services/types/auth';
import { CURRENT_USER_PAYLOAD_HEADER_NAME } from '@/utils/constants';
import { isMobile } from '@/utils/is-browser';
import { headers } from 'next/headers';
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
    const headersList = headers();

    const userPayload: JwtPayload | null =
        (headersList.get(CURRENT_USER_PAYLOAD_HEADER_NAME) &&
            JSON.parse(headersList.get(CURRENT_USER_PAYLOAD_HEADER_NAME)!)) ||
        null;

    const isMobileDevice = isMobile(headersList.get('user-agent'));
    return (
        <html
            lang={lng}
            dir={lng === SupportedLanguagesEnum.AR ? 'rtl' : 'ltr'}
        >
            <body className="relative">
                <ClientHeader
                    isMobile={isMobileDevice}
                    lng={lng}
                    userPayload={userPayload}
                />
                {children}
                <Notifier />
                <ExternalRouter />
                <TransitionLoader />
            </body>
        </html>
    );
}

export default RootLayout;
