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
        title: t('cart-home.title'),
        description: t('cart-home.description'),
    };
}

interface CartPageProps {
    params: {
        lng: SupportedLanguages;
    };
    searchParams: { [key: string]: string | undefined };
}

function CartPage({ params: { lng }, searchParams }: CartPageProps) {
    return (
        <ClientPageLayout params={{ lng }} searchParams={searchParams}>
            <h2>Cart page</h2>
        </ClientPageLayout>
    );
}

export default CartPage;
