import AdminPageLayout from '@/components/layouts/admin-page-layout/AdminPageLayout';
import { SupportedLanguages } from '@/i18n/settings';

export const dynamic = 'force-dynamic';

interface OrdersPageProps {
    params: { lng: SupportedLanguages };
    searchParams: Record<string, string>;
}

export default function OrdersPage({ params, searchParams }: OrdersPageProps) {
    return (
        <AdminPageLayout params={params} searchParams={searchParams}>
            <p>Orders page</p>
        </AdminPageLayout>
    );
}
