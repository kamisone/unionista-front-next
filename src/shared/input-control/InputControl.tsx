import React, { ReactNode, useEffect } from 'react';
import PropTypes from 'prop-types';
import './InputControl.css';
import clsx from 'clsx';
import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';

interface InputControlProps {
    children: ReactNode[] | ReactNode | string;
    lng: SupportedLanguages;
    radius?: 'rounded' | 'rounded_1' | 'rounded_2' | 'pilled';
    border?: 'transparent' | 'bordered' | 'dotted';
    borderVariant?: 'border_light' | 'border_dark';
    insetShadow?: boolean;
    fieldError?: any;
    isDirty?: boolean;
    isFormChild?: boolean;
}

const InputControl = (props: InputControlProps) => {
    const {
        lng,
        radius,
        border = 'bordered',
        borderVariant,
        insetShadow = false,
        children,
        fieldError,
        isDirty,
        isFormChild = true,
    } = props;

    return (
        <div
            className={clsx('ic_container', lng, {
                error: !!fieldError,
                form_child: isFormChild,
            })}
        >
            <div
                className={clsx(
                    'ic_input_container',
                    border,
                    radius,
                    borderVariant,
                    {
                        error: !!fieldError,
                        valid: isDirty && !fieldError,
                        inset_shadow: insetShadow,
                    }
                )}
            >
                {children}
            </div>
            {fieldError && (
                <p
                    className={clsx(
                        'ic_error',
                        lng === SupportedLanguagesEnum.AR
                            ? UthmanicFont.className
                            : Graphik.className
                    )}
                >
                    {fieldError.message}
                </p>
            )}
        </div>
    );
};

export default InputControl;
