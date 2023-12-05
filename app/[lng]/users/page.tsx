'use client';

import React, { useEffect } from 'react';
import { useTranslation } from '@/app/i18n/client';
import { SupportedLanguages } from '@/app/i18n/settings';
import Link from 'next/link';
import Footer from '@/app/components/footer/Footer';

interface UsersPageProps {
    params: {
        lng: SupportedLanguages;
    };
}

const UsersPage = ({ params: { lng } }: UsersPageProps) => {
    const { t } = useTranslation(lng);
    useEffect(() => {
        console.log(t);
    });
    return (
        <div>
            <h2>{t('page-not-found.title')}</h2>
            <Link href={`/${lng}`}>go back</Link>
            {/* <Footer /> */}
        </div>
    );
};

export default UsersPage;
