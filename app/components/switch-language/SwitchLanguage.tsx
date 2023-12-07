import { useTranslation } from '@/app/i18n';
import { SupportedLanguages } from '@/app/i18n/settings';
import Link from 'next/link';
import React from 'react';
import { Trans } from 'react-i18next';
import styles from '@/app/components/switch-language/SwitchLanguage.module.css';
import FranceFlagIcon from '@/app/icons/country/FranceFlagIcon';
import EnglandFlagIcon from '@/app/icons/country/EnglandFlagIcon';
import SpainFlagIcon from '@/app/icons/country/SpainFlagIcon';

interface SwitchLanguageProps {
    lng: SupportedLanguages;
}

const languages: SupportedLanguages[] = ['fr', 'en', 'es'];

const SwitchLanguage = async ({ lng }: SwitchLanguageProps) => {
    const { t } = await useTranslation(lng);
    return (
        <div className={styles.container}>
            <div className={styles.current_lng}>
                {LanguageIconsMapping[lng]}
            </div>
            <ul className={styles.lng_choices}>
                <Trans i18nKey="languageSwitcher" t={t}>
                    {t('page-not-found.title')} <strong>{lng}</strong> to:{' '}
                </Trans>
                {languages
                    .filter((l) => lng !== l)
                    .map((l) => {
                        return (
                            <li key={l}>
                                {LanguageIconsMapping[l]}
                                <Link href={`/${l}`}>{l}</Link>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

const LanguageIconsMapping = {
    fr: <FranceFlagIcon />,
    en: <EnglandFlagIcon />,
    es: <SpainFlagIcon />,
};

export default SwitchLanguage;
