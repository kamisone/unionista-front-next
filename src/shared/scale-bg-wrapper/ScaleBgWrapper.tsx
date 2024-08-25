import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import '@/shared/scale-bg-wrapper/ScaleBgWrapper.css';

interface ScaleBgWrapperProps {
    Icon: ReactNode;
    onClick?: () => void;
}

const ScaleBgWrapper = (props: ScaleBgWrapperProps) => {
    const { Icon, onClick } = props;
    return (
        <button 
        // onClick={onClick} 
        className={clsx('sbw_container')}>
            {Icon}
        </button>
    );
};

export default ScaleBgWrapper;
