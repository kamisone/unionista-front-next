import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import React, { ReactNode } from 'react';
import { headers } from 'next/headers';
import clsx from 'clsx';
import { UthmanicFont } from '@/fonts/fonts';
import { isMobile } from '@/utils/is-browser';
import UserHeader from '@/components/header/UserHeader';
import UserFooter from '@/components/footer/UserFooter';
import CustomSnackbar from '@/components/custom-snackback/CustomSnackbar';
import styles from '@/app/[lng]/(client)/layout.module.css';
import '@/fb-pixel/pixel-script';
import FlexModal from '@/components/Modal/FlexModal';




interface ClientLayoutProps {
    children: ReactNode;
    analytics: ReactNode;
    centerModal: ReactNode;
    params: { lng: SupportedLanguages };
}


const ClientLayout = async ({
    children,
    params: { lng },
}: ClientLayoutProps) => {
    const headersList = headers();
    const isMobileDevice = isMobile(headersList.get('user-agent'));
    return (
        <main
            className={clsx(lng, styles.app_container, {
                [UthmanicFont.className]: lng === SupportedLanguagesEnum.AR,
            })}
        >
            <div className={styles.mobile_container}>
                <UserHeader isMobile={isMobileDevice} lng={lng} />
                {children}
                <UserFooter isMobile={isMobileDevice} lng={lng} />
                <CustomSnackbar lng={lng} />
                <FlexModal lng={lng} isMobileDevice={isMobileDevice}/>
            </div>
        </main>
    );
};

export default ClientLayout;
