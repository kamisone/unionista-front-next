'use client';
import { useTranslation } from '@/app/i18n/client';
import { SupportedLanguages } from '@/app/i18n/settings';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { Trans } from 'react-i18next';
import styles from '@/app/components/switch-language/SwitchLanguage.module.css';
import FranceFlagIcon from '@/app/icons/country/FranceFlagIcon';
import EnglandFlagIcon from '@/app/icons/country/EnglandFlagIcon';
import SpainFlagIcon from '@/app/icons/country/SpainFlagIcon';
import clsx from 'clsx';
import { Graphik } from '../../fonts/fonts';

interface SwitchLanguageProps {
    lng: SupportedLanguages;
}

const languages: SupportedLanguages[] = ['fr', 'en', 'es'];

const SwitchLanguage = ({ lng }: SwitchLanguageProps) => {
    const [isSwitchOpened, setIsSwitchOpened] = useState(false);
    const buttonElement = useRef<HTMLButtonElement>(null);
    const { t } = useTranslation(lng, 'switch_language');
    return (
        <button
            ref={buttonElement}
            onBlur={() => {
                setIsSwitchOpened(false);
            }}
            onFocusCapture={() => {
                setIsSwitchOpened(true);
            }}
            className={styles.container}
        >
            <div className={styles.current_lng}>
                {LanguageIconsMapping[lng]}
            </div>
            <ul
                className={clsx(styles.lng_choices, Graphik.className, {
                    [styles.open]: isSwitchOpened,
                })}
            >
                {languages
                    .filter((l) => lng !== l)
                    .map((l) => {
                        return (
                            <li className={styles.lng_option} key={l}>
                                <Link
                                    href={`/${l}`}
                                    // onClick={() => setIsSwitchOpened(false)}
                                >
                                    <div className={styles.icon}>
                                        {LanguageIconsMapping[l]}
                                    </div>
                                    {t(`language.${l}.title`)}
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        </button>
    );
};

const LanguageIconsMapping = {
    fr: <FranceFlagIcon />,
    en: <EnglandFlagIcon />,
    es: <SpainFlagIcon />,
};

export default SwitchLanguage;
