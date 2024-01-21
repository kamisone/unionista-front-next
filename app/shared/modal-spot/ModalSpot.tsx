import React, { ReactNode, useEffect, useState } from 'react';
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
import { AuthService } from '@/app/services/auth.service';
import { ComponentsStateNotify } from '@/app/services/components-state-notify.service';
import { ModalService } from '@/app/services/modal.service';
// import ScaleBgWrapper from 'shared/scale-bg-wrapper/ScaleBgWrapper';

const authService = AuthService.getInstance();
const modalService = ModalService.getInstance();

// interface ModalService extends ComponentsStateNotify<any, any> {}

interface ModalSpotProps {
    children: ReactNode[] | ReactNode | string;
    lng: SupportedLanguages;
    animationDirection?:
        | 'animate_to_top'
        | 'animate_to_bottom'
        | 'animate_to_center';
    headingTitle?: string;
    isDesktop?: boolean;
}

const ModalSpot = ({
    children,
    headingTitle,
    lng,
    animationDirection = 'animate_to_top',
    isDesktop = false
}: ModalSpotProps) => {
    const { t } = useTranslation();
    const [isDrawerQuitting, setIsDrawerQuitting] = useState(false);
    const [ModalContent, setModalContent] = useState(
        modalService.state.currentModalContent
    );

    const onCloseDrawer = (duration = 300) => {
        // if (
        //     (
        //         [
        //             ModalContentMapping.SIGN_IN,
        //             ModalContentMapping.SIGN_UP,
        //         ] as (ModalContentMapping | null)[]
        //     ).includes(bottomModalContent)
        // ) {
        //     authService.state = {
        //         isUserNotifiedToSignin: true,
        //     };
        // }
        setIsDrawerQuitting(true);
        setTimeout(() => {
            modalService.state = {
                isModalOpen: false,
                currentModalContent: null,
            };
        }, duration);
    };

    // set notifiers
    useEffect(() => {
        modalService.addNotifier(
            (options) =>
                options && setModalContent(options.state.currentModalContent)
        );
    }, []);

    return (
        <div
            className={clsx('ms_container', animationDirection, {
                ms_quitting: isDrawerQuitting,
                is_desktop: isDesktop
            })}
            onClick={() => onCloseDrawer()}
        >
            <div
                className={clsx('ms_content')}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={clsx({ ms_title_container: !!headingTitle })}>
                    {headingTitle && (
                        <>
                            <span>{/*placeholder*/}</span>
                            <h2
                                className={clsx(
                                    lng === SupportedLanguagesEnum.AR
                                        ? UthmanicFont.className
                                        : Graphik.className
                                )}
                            >
                                {/* {t('drawer.title')} */}
                                {headingTitle}
                            </h2>
                        </>
                    )}
                    <div
                        className={clsx('ms_close_icon', {
                            floating: !headingTitle,
                        })}
                    >
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
