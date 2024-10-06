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
        title: t('admin-dashboard-home.title'),
        description: t('admin-dashboard-home.description'),
    };
}

interface DashboardPageProps {
    params: { lng: SupportedLanguages };
    searchParams: { [key: string]: string | undefined };
}

export default function DashboardPage({
    params,
    searchParams,
}: DashboardPageProps) {
    return (
        <AdminPageLayout searchParams={searchParams} params={params}>
            <p>dashboard</p>
        </AdminPageLayout>
    );
}
