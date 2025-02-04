import React from 'react';
import '@/shared/checkbox-input/CheckboxInput.css';
import clsx from 'clsx';

interface CheckboxInputProps {
    radius: 'rounded' | 'rounded_1' | 'rounded_2';
    variant: 'primary' | 'secondary';
    labelId: string;
    size: 'small' | 'medium' | 'large';
    checked: boolean;
}

const CheckboxInput = (props: CheckboxInputProps) => {
    const {
        radius,
        variant = 'primary',
        labelId,
        size = 'medium',
        checked,
    } = props;
    return (
        <label
            className={clsx('cbi_container', radius, variant, size, {
                checked: checked,
            })}
        >
            <input
                type="checkbox"
                className="visually-hidden"
                tabIndex={0}
                id={labelId}
            />
        </label>
    );
};


export default CheckboxInput;
