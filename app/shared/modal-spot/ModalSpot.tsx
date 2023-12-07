import React, { ReactNode, useState } from 'react';
import PropTypes from 'prop-types';
import './ModalSpot.css';
import { useDispatch } from 'react-redux';
import { toggleBottomModal } from '@/app/lib/features/header/headerSlice';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import ScaleBgWrapper from '@/app/shared/scale-bg-wrapper/ScaleBgWrapper';
import CloseIcon from '@/app/icons/close-icon/CloseIcon';
import { Graphik, UthmanicFont } from '@/app/fonts/fonts';
import {
    SupportedLanguages,
    SupportedLanguagesEnum,
} from '@/app/i18n/settings';
// import ScaleBgWrapper from 'shared/scale-bg-wrapper/ScaleBgWrapper';

interface ModalSpotProps {
    children: ReactNode[] | ReactNode | string;
    lng: SupportedLanguages;
}

const ModalSpot = (props: ModalSpotProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { children, lng } = props;
    const [isDrawerQuitting, setIsDrawerQuitting] = useState(false);

    const onCloseDrawer = (duration = 300) => {
        setIsDrawerQuitting(true);
        setTimeout(() => {
            dispatch(
                toggleBottomModal({
                    isBottomModalOpen: false,
                    currentContent: null,
                })
            );
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
