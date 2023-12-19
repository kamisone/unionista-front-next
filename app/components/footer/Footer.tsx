'use client';

import React from 'react';
import styles from '@/app/components/footer/Footer.module.css';
import { Trans } from 'react-i18next/TransWithoutContext';
import Link from 'next/link';
import { SupportedLanguages, languages } from '@/app/i18n/settings';
import { useTranslation } from '@/app/i18n';
import { useUserAuth } from '@/app/hooks/useUserAuth';
import { usePathname, useRouter } from 'next/navigation';

interface FooterProps {
    lng: SupportedLanguages;
}

const Footer = ({ lng }: FooterProps) => {
    console.log('languagessss: ', lng);
    // const { t } = await useTranslation(lng);
    const pathname = usePathname();

    return (
        <footer style={{ marginTop: 50 }}>
            {languages
                .filter((l) => lng !== l)
                .map((l, index) => {
                    return (
                        <span key={l}>
                            {index > 0 && ' or '}
                            <Link href={`/${l}${pathname.slice(3)}`}>{l}</Link>
                        </span>
                    );
                })}
        </footer>
    );
};

export default Footer;
