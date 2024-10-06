import AdminPageLayout from '@/components/layouts/admin-page-layout/AdminPageLayout';
import { SupportedLanguages } from '@/i18n/settings';

export const dynamic = 'force-dynamic';

interface StatisticsPageProps {
    params: { lng: SupportedLanguages };
    searchParams: Record<string, string>;
}

export default function StatisticsPage({
    params,
    searchParams,
}: StatisticsPageProps) {
    return (
        <AdminPageLayout params={params} searchParams={searchParams}>
            <p>Statistics page</p>
        </AdminPageLayout>
    );
}
