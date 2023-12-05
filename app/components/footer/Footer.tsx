import React from 'react';
import styles from '@/app/components/footer/Footer.module.css';
import { Trans } from 'react-i18next/TransWithoutContext';
import Link from 'next/link';
import { languages } from '@/app/i18n/settings';
import { useTranslation } from '@/app/i18n';

const Footer = async ({ lng }: any) => {
    const { t } = await useTranslation(lng);
    return (
        <footer style={{ marginTop: 50 }}>
            <Trans i18nKey="languageSwitcher" t={t}>
                {t('page-not-found.title')} <strong>{lng}</strong> to:{' '}
            </Trans>
            {languages
                .filter((l) => lng !== l)
                .map((l, index) => {
                    return (
                        <span key={l}>
                            {index > 0 && ' or '}
                            <Link href={`/${l}`}>{l}</Link>
                        </span>
                    );
                })}
        </footer>
    );
};

export default Footer;
