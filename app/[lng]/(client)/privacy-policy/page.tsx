import { useTranslation } from '@/app/i18n';
import { SupportedLanguages } from '@/app/i18n/settings';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'UnionistaShop | Privacy-Policy',
};

interface PrivacyPolicyProps {
    params: {
        lng: SupportedLanguages;
    };
}

const PrivacyPolicy = async ({ params: { lng } }: PrivacyPolicyProps) => {
    const { t } = await useTranslation(lng, 'privacy-policy');
    return (
        <main>
            <h1>{t('title', { brandTitle: 'UnionistaShop' })}</h1>
            <p>
                {t('introduction.last-updated', {
                    lastUpdatedDate: new Date(),
                })}
            </p>
            <br />
            <p>
                {t('introduction.text', { siteUrl: 'www.unionistashop.com' })}
            </p>
            <h2>{t('sub-title-1.title')}</h2>
            <p>{t('sub-title-1.text')}</p>

            <h2>{t('sub-title-2.title')}</h2>
            <p>{t('sub-title-2.text')}</p>

            <h2>{t('sub-title-3.title')}</h2>
            <p>{t('sub-title-3.text')}</p>

            <h2>{t('sub-title-4.title')}</h2>
            <p>{t('sub-title-4.text')}</p>

            <h2>{t('sub-title-5.title')}</h2>
            <p>{t('sub-title-5.text-1')}</p>
            <br />
            <p>{t('sub-title-5.text-2')}</p>

            <h2>{t('sub-title-6.title')}</h2>
            <p>{t('sub-title-6.text', {contactEmail: 'contact@unionistashop.com'})}</p>
        </main>
    );
};

export default PrivacyPolicy;
