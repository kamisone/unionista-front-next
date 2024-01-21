import {
    SupportedLanguages,
    SupportedLanguagesEnum,
} from '@/app/i18n/settings';
import React, { ReactNode, Suspense } from 'react';
import { ProductCategoryService } from '@/app/services/product-category.service';
import { headers } from 'next/headers';
import clsx from 'clsx';
import { UthmanicFont } from '@/app/fonts/fonts';
import { isMobile } from '@/app/utils/is-browser';
import UserHeader from '@/app/components/header/UserHeader';
import UserFooter from '@/app/components/footer/UserFooter';
import CustomSnackbar from '@/app/components/custom-snackback/CustomSnackbar';
// import BottomModal from '@/app/components/bottom-modal/BottomModal';
import styles from '@/app/[lng]/(client)/layout.module.css';
import dynamic from 'next/dynamic';
import LoadingIndicator from '@/app/shared/loading-indicator/LoadingIndicator';
// import CenterModal from '@/app/components/center-modal/CenterModal';

// const BottomModal = dynamic(() => import('../../components/bottom-modal/BottomModal'))

const BottomModal = React.lazy(() => import('@/app/components/bottom-modal/BottomModal'));
const CenterModal = React.lazy(() => import('@/app/components/center-modal/CenterModal'));


interface ClientLayoutProps {
    children: ReactNode;
    analytics: ReactNode;
    centerModal: ReactNode;
    params: { lng: SupportedLanguages };
}

const productCategoryService = ProductCategoryService.getInstance();
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
                    <Suspense fallback={<LoadingIndicator isExtended  />}>
                        <BottomModal lng={lng} />
                    </Suspense>
                </div>
            ) : (
                <div className={styles.desktop_container}>
                    <UserHeader lng={lng} />
                    {children}
                    <UserFooter lng={lng} />
                    <CustomSnackbar lng={lng} />
                    <Suspense fallback={<LoadingIndicator isExtended  />}>
                        <CenterModal lng={lng} />
                    </Suspense>
                </div>
            )}
        </main>
    );
};

export default ClientLayout;
