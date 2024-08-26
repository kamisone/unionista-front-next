import styles from '@/app/[lng]/(client)/layout.module.css';
import CustomSnackbar from '@/components/custom-snackback/CustomSnackbar';
import UserFooter from '@/components/footer/UserFooter';
import { UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import { isMobile } from '@/utils/is-browser';
import clsx from 'clsx';
import { headers } from 'next/headers';
import { ReactNode } from 'react';
// import '@/fb-pixel/pixel-script';

interface ClientLayoutProps {
    children: ReactNode;
    analytics: ReactNode;
    centerModal: ReactNode;
    params: { lng: SupportedLanguages };
    searchParams: {[key: string]: string | string[] | undefined}
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
                {/* <UserHeader isMobile={isMobileDevice} lng={lng} /> */}
                {children}
                <UserFooter isMobile={isMobileDevice} lng={lng} />
                <CustomSnackbar lng={lng} />
                {/* <FlexModal
                    lng={lng}
                    isMobileDevice={isMobileDevice}
                /> */}
            </div>
        </main>
    );
};

export default ClientLayout;
