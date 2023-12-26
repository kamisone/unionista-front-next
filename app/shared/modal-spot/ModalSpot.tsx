import React, { ReactNode, useState } from 'react';
import PropTypes from 'prop-types';
import './ModalSpot.css';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import ScaleBgWrapper from '@/app/shared/scale-bg-wrapper/ScaleBgWrapper';
import CloseIcon from '@/app/icons/close-icon/CloseIcon';
import { Graphik, UthmanicFont } from '@/app/fonts/fonts';
import {
    SupportedLanguages,
    SupportedLanguagesEnum,
} from '@/app/i18n/settings';
import { usePathname, useRouter } from 'next/navigation';
import { ModalContentMapping } from '@/app/utils/bottom-modal';
import { BottomModalService } from '@/app/services/bottom-modal.service';
import { AuthService } from '@/app/services/auth.service';
// import ScaleBgWrapper from 'shared/scale-bg-wrapper/ScaleBgWrapper';

const bottomModalService = BottomModalService.getInstance();
const authService = AuthService.getInstance();

interface ModalSpotProps {
    children: ReactNode[] | ReactNode | string;
    lng: SupportedLanguages;
}

const ModalSpot = (props: ModalSpotProps) => {
    const { t } = useTranslation();
    const { children, lng } = props;
    const [isDrawerQuitting, setIsDrawerQuitting] = useState(false);
    // const router = useRouter();
    const [bottomModalContent, setBottomModalContent] = useState(
        bottomModalService.state.currentBottomModalContent
    );

    const onCloseDrawer = (duration = 300) => {
        if (
            (
                [
                    ModalContentMapping.SIGN_IN,
                    ModalContentMapping.SIGN_UP,
                ] as (ModalContentMapping | null)[]
            ).includes(bottomModalContent)
        ) {
            authService.state = {
                isUserNotifiedToSignin: true,
            };
        }
        setIsDrawerQuitting(true);
        setTimeout(() => {
            bottomModalService.state = {
                isBottomModalOpen: false,
                currentBottomModalContent: null,
            };
        }, duration);
    };

    return (
        <div
            className={clsx('ms_container', {
                ms_quitting: isDrawerQuitting,
            })}
            onClick={() => onCloseDrawer()}
        >
            <div
                className={clsx('ms_content')}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="ms_title_container">
                    <span>{/*placeholder*/}</span>
                    <h2
                        className={clsx(
                            lng === SupportedLanguagesEnum.AR
                                ? UthmanicFont.className
                                : Graphik.className
                        )}
                    >
                        {t('drawer.title')}
                    </h2>
                    <div className="ms_close_icon">
                        <ScaleBgWrapper
                            Icon={<CloseIcon />}
                            onClick={() => onCloseDrawer()}
                        />
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

ModalSpot.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default ModalSpot;
