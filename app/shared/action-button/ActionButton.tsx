import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import './ActionButton.css';
import clsx from 'clsx';
import LoadingIndicator from '../loading-indicator/LoadingIndicator';
import Link from 'next/link';
import { Graphik } from '@/app/fonts/fonts';

interface ActionButtonProps {
    onClick?: () => void;
    radius?: 'rounded' | 'pilled';
    boxShadow?: boolean;
    to?: string;
    children: ReactNode[] | ReactNode | string;
    variant?: 'primary' | 'secondary';
    fit?: 'min' | 'max';
    animationOnHover?: boolean;
    disabled?: boolean;
    loading?: boolean;
}

const ActionButton = (props: ActionButtonProps) => {
    const {
        onClick,
        radius,
        variant,
        boxShadow = false,
        to = '/',
        children,
        fit = 'min',
        animationOnHover = false,
        disabled = false,
        loading = false,
    } = props;
    return onClick ? (
        <button
            disabled={disabled}
            onClick={onClick}
            className={clsx(
                'ab_container',
                Graphik.className,
                radius,
                variant,
                fit,
                {
                    'box-shadow': boxShadow,
                    animated: animationOnHover,
                }
            )}
        >
            {loading ? <LoadingIndicator size="1.25rem" /> : children}
        </button>
    ) : (
        <Link
            data-disabled={disabled}
            href={to}
            className={clsx('ab_container', radius, variant, fit, {
                'box-shadow': boxShadow,
                animated: animationOnHover,
            })}
        >
            {children}
        </Link>
    );
};

ActionButton.propTypes = {
    onClick: PropTypes.func,
    radius: PropTypes.oneOf(['rounded', 'pilled']),
    boxShadow: PropTypes.bool,
    to: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string,
    ]).isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary']),
    fit: PropTypes.oneOf(['min', 'max']),
    animationOnHover: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
};

export default ActionButton;
