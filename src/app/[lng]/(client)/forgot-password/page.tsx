import { i18nTranslation } from '@/i18n';
import { SupportedLanguages } from '@/i18n/settings';
import { Metadata } from 'next';

export async function generateMetadata({
    params: { lng },
}: {
    params: { lng: SupportedLanguages };
}) {
    const t = i18nTranslation(lng, 'metadata');
    return {
        title: t('forgot-password.title'),
        description: t('forgot-password.description'),
    };
}

interface ForgotPasswordPageProps {
    params: { lng: SupportedLanguages };
}

export default function ForgotPasswordPage({
    params: { lng },
}: ForgotPasswordPageProps) {
    return (
        <main>
            <h1>Reset your password</h1>
        </main>
    );
}
