import React from 'react';
import '@/shared/snackbar-content/SnackbarContent.css';
import PropTypes from 'prop-types';
import CloseIcon from '@/icons/close-icon/CloseIcon';
import clsx from 'clsx';
import ScaleBgWrapper from '@/shared/scale-bg-wrapper/ScaleBgWrapper';
import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';

interface SnackbarContentProps {
    lng: SupportedLanguages;
    message: string;
    severity: string;
}

const SnackbarContent = ({
    lng,
    message,
    severity,
}: SnackbarContentProps) => {
    return (
        <div
            className={clsx(
                'sbc_container',
                lng === SupportedLanguagesEnum.AR
                    ? UthmanicFont.className
                    : Graphik.className,
                severity
            )}
        >
            <p>{message}</p>
            <div style={{ color: 'white' }}>
                <ScaleBgWrapper Icon={<CloseIcon />} />
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
