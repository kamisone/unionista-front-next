import styles from '@/app/[lng]/(client)/layout.module.css';
import ClientFooter from '@/components/footer/ClientFooter';
import ClientHeader from '@/components/header/ClientHeader';
import { UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import { JwtPayload } from '@/services/types/auth';
import { CURRENT_USER_PAYLOAD_HEADER_NAME } from '@/utils/constants';
import { isMobile } from '@/utils/is-browser';
import clsx from 'clsx';
import { headers } from 'next/headers';
import { ReactNode } from 'react';

interface ClientLayoutProps {
    params: { lng: SupportedLanguages };
    children: ReactNode;
}

async function ClientLayout({ children, params: { lng } }: ClientLayoutProps) {
    const headersList = headers();
    const isMobileDevice = isMobile(headersList.get('user-agent'));

    const userPayload: JwtPayload | null =
        (headersList.get(CURRENT_USER_PAYLOAD_HEADER_NAME) &&
            JSON.parse(headersList.get(CURRENT_USER_PAYLOAD_HEADER_NAME)!)) ||
        null;

    return (
        <main
            className={clsx(lng, styles.container, {
                [UthmanicFont.className]: lng === SupportedLanguagesEnum.AR,
            })}
        >
            <ClientHeader
                isMobile={isMobileDevice}
                lng={lng}
                userPayload={userPayload}
            />
            {children}
            <ClientFooter isMobile={isMobileDevice} lng={lng} />
        </main>
    );
}

export default ClientLayout;
