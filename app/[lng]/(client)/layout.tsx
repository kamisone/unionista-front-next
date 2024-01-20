import {
    SupportedLanguages,
    SupportedLanguagesEnum,
} from '@/app/i18n/settings';
import React, { ReactNode } from 'react';
import { ProductCategoryService } from '@/app/services/product-category.service';
import { headers } from 'next/headers';
import clsx from 'clsx';
import { UthmanicFont } from '@/app/fonts/fonts';
import { isMobile } from '@/app/utils/is-browser';
import UserHeader from '@/app/components/header/UserHeader';
import UserFooter from '@/app/components/footer/UserFooter';
import CustomSnackbar from '@/app/components/custom-snackback/CustomSnackbar';
import BottomModal from '@/app/components/bottom-modal/BottomModal';
import styles from '@/app/[lng]/(client)/layout.module.css';

interface ClientLayoutProps {
    children: ReactNode;
    analytics: ReactNode;
    params: { lng: SupportedLanguages };
}

const productCategoryService = ProductCategoryService.getInstance();
const ClientLayout = async ({
    children,
    analytics,
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
                <div className="mobile_container">
                    <UserHeader isMobile lng={lng} />
                    {children}
                    <UserFooter isMobile lng={lng} />
                    <CustomSnackbar lng={lng} />
                    <BottomModal lng={lng} />
                </div>
            ) : (
                <div className="desktop_container">
                    <UserHeader lng={lng} />
                    {children}
                    <UserFooter lng={lng} />
                    <CustomSnackbar lng={lng} />
                </div>
            )}
            {analytics}
        </main>
    );
};

export default ClientLayout;
