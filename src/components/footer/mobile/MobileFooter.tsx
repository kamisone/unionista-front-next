'use client';

import React from 'react';
import styles from '@/components/footer/mobile/MobileFooter.module.css';
import { Trans } from 'react-i18next/TransWithoutContext';
import Link from 'next/link';
import { SupportedLanguages, languages } from '@/i18n/settings';

import { usePathname } from 'next/navigation';

interface FooterProps {
    lng: SupportedLanguages;
    isUserAuthenticated: boolean;
}

const MobileFooter = ({ lng, isUserAuthenticated }: FooterProps) => {
    console.log('languagessss: ', lng);
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

export default MobileFooter;
