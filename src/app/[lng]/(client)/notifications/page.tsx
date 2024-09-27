import ClientPageLayout from '@/components/layouts/client-page-layout/ClientPageLayout';
import { i18nTranslation } from '@/i18n';
import { SupportedLanguages } from '@/i18n/settings';

export async function generateMetadata({
    params: { lng },
}: {
    params: { lng: SupportedLanguages };
}) {
    const t = i18nTranslation(lng, 'metadata');
    return {
        title: t('notifications-home.title'),
        description: t('notifications-home.description'),
    };
}

interface NotificationsPage {
    params: {
        lng: SupportedLanguages;
    };
    searchParams: { [key: string]: string | undefined };
}

function NotificationsPage({
    params: { lng },
    searchParams,
}: NotificationsPage) {
    return (
        <ClientPageLayout params={{ lng }} searchParams={searchParams}>
            <h2>notifications page</h2>
        </ClientPageLayout>
    );
}

export default NotificationsPage;
