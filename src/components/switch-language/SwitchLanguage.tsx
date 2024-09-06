'use client';
import {
    SupportedLanguages,
    SupportedLanguagesEnum,
    languages,
} from '@/i18n/settings';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import styles from '@/components/switch-language/SwitchLanguage.module.css';
import FranceFlagIcon from '@/icons/country/FranceFlagIcon';
import EnglandFlagIcon from '@/icons/country/EnglandFlagIcon';
import SpainFlagIcon from '@/icons/country/SpainFlagIcon';
import clsx from 'clsx';
import { Graphik, UthmanicFont } from '@/fonts/fonts';
import ArabeFlagIcon from '@/icons/country/ArabeFlagIcon';
import { usePathname } from 'next/navigation';

import { i18nTranslation } from '@/i18n';

interface SwitchLanguageProps {
    lng: SupportedLanguages;
}

const SwitchLanguage = ({ lng }: SwitchLanguageProps) => {
    const [isSwitchOpened, setIsSwitchOpened] = useState(false);
    const buttonElement = useRef<HTMLButtonElement>(null);
    const t = i18nTranslation(lng, 'switch_language');
    const pathname = usePathname();
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
                className={clsx(
                    styles.lng_choices,
                    lng === SupportedLanguagesEnum.AR
                        ? UthmanicFont.className
                        : Graphik.className,
                    {
                        [styles.open]: isSwitchOpened,
                    }
                )}
            >
                {languages
                    .filter((l) => lng !== l)
                    .map((l) => {
                        return (
                            <li className={styles.lng_option} key={l}>
                                <Link
                                    href={`/${l}${pathname.slice(3)}`}
                                    onClick={() => {
                                        document.cookie = `lng=${l}`;
                                    }}
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
    ar: <ArabeFlagIcon />,
};

export default SwitchLanguage;
