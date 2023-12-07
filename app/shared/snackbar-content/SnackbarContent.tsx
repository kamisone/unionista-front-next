import React from 'react';
import '@/app/shared/snackbar-content/SnackbarContent.css';
import PropTypes from 'prop-types';
import CloseIcon from '@/app/icons/close-icon/CloseIcon';
import clsx from 'clsx';
import ScaleBgWrapper from '@/app/shared/scale-bg-wrapper/ScaleBgWrapper';
import { Roboto, UthmanicFont } from '@/app/fonts/fonts';
import {
    SupportedLanguages,
    SupportedLanguagesEnum,
} from '@/app/i18n/settings';

interface SnackbarContentProps {
    lng: SupportedLanguages;
    message: string;
    onClose: () => void;
    severity: string;
}

const SnackbarContent = ({
    lng,
    message,
    onClose,
    severity,
}: SnackbarContentProps) => {
    return (
        <div
            className={clsx(
                'sbc_container',
                lng === SupportedLanguagesEnum.AR
                    ? UthmanicFont.className
                    : Roboto.className,
                severity
            )}
        >
            <p>{message}</p>
            <div style={{ color: 'white' }}>
                <ScaleBgWrapper Icon={<CloseIcon />} onClick={onClose} />
            </div>
        </div>
    );
};

SnackbarContent.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    severity: PropTypes.string,
};

export default SnackbarContent;
