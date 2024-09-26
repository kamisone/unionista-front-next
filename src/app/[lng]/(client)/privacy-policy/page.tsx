import { i18nTranslation } from '@/i18n';
import { SupportedLanguages } from '@/i18n/settings';

export async function generateMetadata({
    params: { lng },
}: {
    params: { lng: SupportedLanguages };
}) {
    const t = i18nTranslation(lng, 'metadata');
    return {
        title: t('privacy-policy-home.title'),
        description: t('privacy-policy-home.description'),
    };
}

interface PrivacyPolicyProps {
    params: {
        lng: SupportedLanguages;
    };
}

const PrivacyPolicy = async ({ params: { lng } }: PrivacyPolicyProps) => {
    const t = i18nTranslation(lng, 'privacy-policy');
    return (
        <main className="py-4 px-12">
            <h1 className="text-center mb-8">
                {t('title', { brandTitle: 'UnionistaShop' })}
            </h1>
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
