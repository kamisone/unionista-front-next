import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import clsx from 'clsx';
import { ReactNode } from 'react';
import LoadingIndicator from '../loading-indicator/LoadingIndicator';
import './ActionButton.css';

interface ActionButtonProps {
    lng: SupportedLanguages;
    radius?: 'rounded' | 'pilled';
    boxShadow?: boolean;
    children: ReactNode[] | ReactNode | string;
    variant?: 'primary' | 'secondary';
    fit?: 'min' | 'max';
    animationOnHover?: boolean;
    disabled?: boolean;
    loading?: boolean;
}

const ActionButton = (props: ActionButtonProps) => {
    const {
        lng,
        radius,
        variant,
        boxShadow = false,
        children,
        fit = 'min',
        animationOnHover = false,
        disabled = false,
        loading = false,
    } = props;
    return (
        <button
            disabled={disabled}
            className={clsx(
                'ab_container',
                lng === SupportedLanguagesEnum.AR
                    ? UthmanicFont.className
                    : Graphik.className,
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
    );
};


export default ActionButton;
