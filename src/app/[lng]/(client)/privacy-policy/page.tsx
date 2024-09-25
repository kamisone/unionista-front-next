import { i18nTranslation } from '@/i18n';
import { SupportedLanguages } from '@/i18n/settings';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Privacy-Policy',
    description: 'Read the privacy policy of Unionistashop. Learn how we collect, use, and protect your personal data and information. Your privacy is important to us.'
};

interface PrivacyPolicyProps {
    params: {
        lng: SupportedLanguages;
    };
}

const PrivacyPolicy = async ({ params: { lng } }: PrivacyPolicyProps) => {
    const t = i18nTranslation(lng, 'privacy-policy');
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
            <p>
                {t('sub-title-6.text', {
                    contactEmail: 'contact@unionistashop.com',
                })}
            </p>
        </main>
    );
};

export default PrivacyPolicy;
