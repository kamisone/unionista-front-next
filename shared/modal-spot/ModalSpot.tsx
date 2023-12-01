import React, { ReactNode, useState } from 'react';
import PropTypes from 'prop-types';
import './ModalSpot.css';
import { useDispatch } from 'react-redux';
import { toggleBottomModal } from '@/lib/features/header/headerSlice';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import ScaleBgWrapper from '@/shared/scale-bg-wrapper/ScaleBgWrapper';
import CloseIcon from '@/icons/close-icon/CloseIcon';
// import ScaleBgWrapper from 'shared/scale-bg-wrapper/ScaleBgWrapper';

interface ModalSpotProps {
    children: ReactNode[] | ReactNode | string;
}

const ModalSpot = (props: ModalSpotProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { children } = props;
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
            {/*placeholder to close menuDrawer quickly*/}
            {/* <input id="ms_close_checkbox" type="checkbox" /> */}
            <button
                className={clsx('ms_content')}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="ms_title_container">
                    <span>{/*placeholder*/}</span>
                    <h2>{t('drawer.title')}</h2>
                    <div className="ms_close_icon">
                        <ScaleBgWrapper
                            Icon={<CloseIcon />}
                            onClick={() => onCloseDrawer()}
                        />
                    </div>
                </div>
                {children}
            </button>
        </div>
    );
};

ModalSpot.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default ModalSpot;
