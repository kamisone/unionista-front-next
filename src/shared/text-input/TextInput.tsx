'use client';

import { SupportedLanguages } from '@/i18n/settings';
import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import './TextInput.css';

interface TextInputProps {
    lng: SupportedLanguages;
    name: string;
    placeholder?: string;
    children?: ReactNode[] | ReactNode | string;
    switch?: ReactNode[] | ReactNode | string;
    size?: 'small' | 'medium' | 'large';
    labelId?: string;
    type?: 'text' | 'password' | 'switchable';
    isIconBgActive?: boolean;
    iconGap?: 'tiny' | 'medium' | 'large';
    isSubmit?: boolean;
}

const TextInput = (props: TextInputProps) => {
    const {
        children: Icon,
        switch: Switch,
        type = 'text',
        size = 'small',
        labelId,
        placeholder,
        isIconBgActive = false,
        iconGap = 'tiny',
        isSubmit = false,
    } = props;

    const [currentType, setCurrentType] = useState('password');

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
                    className={clsx(size)}
                    id={labelId}
                    type={type === 'switchable' ? currentType : type}
                    placeholder={placeholder}
                    name={props.name}
                />
                {Icon && (
                    <button
                        type={isSubmit ? 'submit' : 'button'}
                        className="ti_input_icon"
                        onClick={() => {
                            if (isSubmit || type !== 'switchable') return;
                            setCurrentType((value) =>
                                value === 'password' ? 'text' : 'password'
                            );
                        }}
                    >
                        {type !== 'switchable'
                            ? Icon
                            : currentType === 'text'
                              ? Icon
                              : Switch}
                    </button>
                )}
            </div>
        </>
    );
};

export default TextInput;
