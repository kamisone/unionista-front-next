import AdminPageLayout from '@/components/layouts/admin-page-layout/AdminPageLayout';
import { i18nTranslation } from '@/i18n';
import { SupportedLanguages } from '@/i18n/settings';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
    params: { lng },
}: {
    params: { lng: SupportedLanguages };
}) {
    const t = i18nTranslation(lng, 'metadata');
    return {
        title: t('admin-settings-home.title'),
        description: t('admin-settings-home.description'),
    };
}

interface SettingsPageProps {
    params: { lng: SupportedLanguages };
    searchParams: Record<string, string>;
}

export default function SettingsPage({
    params,
    searchParams,
}: SettingsPageProps) {
    return (
        <AdminPageLayout params={params} searchParams={searchParams}>
            <p>Settings page</p>
        </AdminPageLayout>
    );
}
