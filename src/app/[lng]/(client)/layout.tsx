import styles from '@/app/[lng]/(client)/layout.module.css';
import UserFooter from '@/components/footer/UserFooter';
import { UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
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

    return (
        <main
            className={clsx(lng, styles.app_container, {
                [UthmanicFont.className]: lng === SupportedLanguagesEnum.AR,
            })}
        >
            <div className={styles.mobile_container}>
                {/* <UserHeader isMobile={isMobileDevice} lng={lng} /> */}
                {children}
                <UserFooter isMobile={isMobileDevice} lng={lng} />
                {/* <FlexModal
                    lng={lng}
                    isMobileDevice={isMobileDevice}
                /> */}
            </div>
        </main>
    );
}

export default ClientLayout;
