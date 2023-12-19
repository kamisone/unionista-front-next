'use client';
import { useTranslation } from '@/app/i18n/client';
import {
    SupportedLanguages,
    SupportedLanguagesEnum,
    languages,
} from '@/app/i18n/settings';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import styles from '@/app/components/switch-language/SwitchLanguage.module.css';
import FranceFlagIcon from '@/app/icons/country/FranceFlagIcon';
import EnglandFlagIcon from '@/app/icons/country/EnglandFlagIcon';
import SpainFlagIcon from '@/app/icons/country/SpainFlagIcon';
import clsx from 'clsx';
import { Graphik, UthmanicFont } from '@/app/fonts/fonts';
import ArabeFlagIcon from '@/app/icons/country/ArabeFlagIcon';
import { usePathname } from 'next/navigation';

interface SwitchLanguageProps {
    lng: SupportedLanguages;
}

// const languages: SupportedLanguages[] = ['fr', 'en', 'es'];

const SwitchLanguage = ({ lng }: SwitchLanguageProps) => {
    const [isSwitchOpened, setIsSwitchOpened] = useState(false);
    const buttonElement = useRef<HTMLButtonElement>(null);
    const { t } = useTranslation(lng, 'switch_language');
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
    ar: <ArabeFlagIcon />,
};

export default SwitchLanguage;
