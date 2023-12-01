import React, { ReactNode, useEffect } from 'react';
import PropTypes from 'prop-types';
import './InputControl.css';
import clsx from 'clsx';

interface InputControlProps {
    children: ReactNode[] | ReactNode | string;
    radius?: 'rounded' | 'rounded_1' | 'rounded_2' | 'pilled';
    borderVariant?: 'border_light' | 'border_dark';
    insetShadow?: boolean;
    fieldError?: any;
    isDirty?: boolean;
}

const InputControl = (props: InputControlProps) => {
    const {
        radius,
        borderVariant,
        insetShadow = false,
        children,
        fieldError,
        isDirty,
    } = props;

    useEffect(() => {
        console.log('field email error: ', fieldError);
    });

    return (
        <div
            className={clsx('ic_container', {
                error: !!fieldError,
            })}
        >
            <div
                className={clsx('ic_input_container', radius, borderVariant, {
                    error: !!fieldError,
                    valid: isDirty && !fieldError,
                    inset_shadow: insetShadow,
                })}
            >
                {children}
            </div>
            {fieldError && <p className="ic_error">{fieldError.message}</p>}
        </div>
    );
};

export default InputControl;
