import AdminPageLayout from '@/components/layouts/admin-page-layout/AdminPageLayout';
import { SupportedLanguages } from '@/i18n/settings';

export const dynamic = 'force-dynamic';

interface SearchPageProps {
    params: { lng: SupportedLanguages };
    searchParams: Record<string, string>;
}

export default function SearchPage({ params, searchParams }: SearchPageProps) {
    return (
        <AdminPageLayout params={params} searchParams={searchParams}>
            <p>Search page</p>
        </AdminPageLayout>
    );
}
