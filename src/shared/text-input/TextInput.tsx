'use client';

import { SupportedLanguages } from '@/i18n/settings';
import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import styles from '@/shared/text-input/TextInput.module.css';

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
                    styles.container,
                    styles[`icon_gap_${iconGap}`],
                    styles[props.lng],
                    {
                        [styles['bg_icon_active']]: isIconBgActive,
                    }
                )}
            >
                <input
                    className={clsx(styles[size])}
                    id={labelId}
                    type={type === 'switchable' ? currentType : type}
                    placeholder={placeholder}
                    name={props.name}
                />
                {Icon && (
                    <button
                        type={isSubmit ? 'submit' : 'button'}
                        className={styles['input-icon']}
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
