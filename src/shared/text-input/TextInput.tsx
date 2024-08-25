import React, { ReactNode } from 'react';
import './TextInput.css';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { SupportedLanguages } from '@/i18n/settings';

interface TextInputProps {
    lng: SupportedLanguages;
    name: string;
    placeholder?: string;
    children?: ReactNode[] | ReactNode | string;
    size?: 'small' | 'medium' | 'large';
    labelId?: string;
    type?: 'text' | 'password';
    isIconBgActive?: boolean;
    iconGap?: 'tiny' | 'medium' | 'large';
    register?: any;
    isError?: boolean;
}

const TextInput = (props: TextInputProps) => {
    const {
        children: Icon,
        type = 'text',
        size = 'small',
        labelId,
        placeholder,
        isIconBgActive = true,
        iconGap = 'tiny',
        register,
        isError,
    } = props;

    return (
        <>
            <div
                className={clsx(
                    'ti_container',
                    `icon_gap_${iconGap}`,
                    props.lng,
                    {
                        bg_icon_active: isIconBgActive,
                    }
                )}
            >
                <input
                    className={clsx(size, { error: isError })}
                    id={labelId}
                    type={type}
                    placeholder={placeholder}
                    {...register}
                    name={props.name}
                />
                {Icon && (
                    <label htmlFor={labelId} className="ti_input_icon">
                        {Icon}
                    </label>
                )}
            </div>
        </>
    );
};

TextInput.propTypes = {
    placeholder: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    labelId: PropTypes.string,
    type: PropTypes.oneOf(['text', 'password']),
    isIconBgActive: PropTypes.bool,
    iconGap: PropTypes.oneOf(['tiny', 'medium', 'large']),
    register: PropTypes.object,
    isError: PropTypes.bool,
};

export default TextInput;
