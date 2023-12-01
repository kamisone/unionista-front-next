import React from 'react';
import 'shared/snackbar-content/SnackbarContent.css';
import PropTypes from 'prop-types';
import CloseIcon from '@/icons/close-icon/CloseIcon';
import clsx from 'clsx';
import ScaleBgWrapper from '@/shared/scale-bg-wrapper/ScaleBgWrapper';

interface SnackbarContentProps {
    message: string;
    onClose: () => void;
    severity: string;
}

const SnackbarContent = ({
    message,
    onClose,
    severity,
}: SnackbarContentProps) => {
    return (
        <div className={clsx('sbc_container', severity)}>
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
