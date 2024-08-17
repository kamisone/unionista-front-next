import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import React, { ReactNode, Suspense } from 'react';
import { ProductCategoryService } from '@/services/product-category.service';
import { headers } from 'next/headers';
import clsx from 'clsx';
import { UthmanicFont } from '@/fonts/fonts';
import { isMobile } from '@/utils/is-browser';
import UserHeader from '@/components/header/UserHeader';
import UserFooter from '@/components/footer/UserFooter';
import CustomSnackbar from '@/components/custom-snackback/CustomSnackbar';
// import BottomModal from '@/app/components/bottom-modal/BottomModal';
import styles from '@/app/[lng]/(client)/layout.module.css';
import LoadingIndicator from '@/shared/loading-indicator/LoadingIndicator';
// import CenterModal from '@/app/components/center-modal/CenterModal';
import '@/fb-pixel/pixel-script';

// const BottomModal = dynamic(() => import('../../components/bottom-modal/BottomModal'));

const BottomModal = React.lazy(
    () => import('@/components/bottom-modal/BottomModal')
);
const CenterModal = React.lazy(
    () => import('@/components/center-modal/CenterModal')
);

interface ClientLayoutProps {
    children: ReactNode;
    analytics: ReactNode;
    centerModal: ReactNode;
    params: { lng: SupportedLanguages };
}

const productCategoryService = ProductCategoryService.instance;
const ClientLayout = async ({
    children,
    params: { lng },
}: ClientLayoutProps) => {
    const headersList = headers();

    return (
        <main
            className={clsx(lng, styles.app_container, {
                [UthmanicFont.className]: lng === SupportedLanguagesEnum.AR,
            })}
        >
            {isMobile(headersList.get('user-agent')) ? (
                <div className={styles.mobile_container}>
                    <UserHeader isMobile lng={lng} />
                    {children}
                    <UserFooter isMobile lng={lng} />
                    <CustomSnackbar lng={lng} />
                    <Suspense fallback={<LoadingIndicator isExtended />}>
                        <BottomModal lng={lng} />
                    </Suspense>
                </div>
            ) : (
                <div className={styles.desktop_container}>
                    <UserHeader lng={lng} />
                    {children}
                    <UserFooter lng={lng} />
                    <CustomSnackbar lng={lng} />
                    <Suspense fallback={<LoadingIndicator isExtended />}>
                        <CenterModal lng={lng} />
                    </Suspense>
                </div>
            )}
        </main>
    );
};

export default ClientLayout;
