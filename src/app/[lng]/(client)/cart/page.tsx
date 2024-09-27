import FlexModal from '@/components/Modal/FlexModal';
import { i18nTranslation } from '@/i18n';
import { SupportedLanguages } from '@/i18n/settings';
import { JwtPayload } from '@/services/types/auth';
import { CURRENT_USER_PAYLOAD_HEADER_NAME } from '@/utils/constants';
import { isMobile } from '@/utils/is-browser';
import { headers } from 'next/headers';

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
    const headersList = headers();

    const userPayload: JwtPayload | null =
        (headersList.get(CURRENT_USER_PAYLOAD_HEADER_NAME) &&
            JSON.parse(headersList.get(CURRENT_USER_PAYLOAD_HEADER_NAME)!)) ||
        null;

    const isMobileDevice = isMobile(headersList.get('user-agent'));
    return (
        <>
            <h2>Cart page</h2>

            <FlexModal
                lng={lng}
                isMobileDevice={isMobileDevice}
                searchParams={searchParams}
            />
        </>
    );
}

export default CartPage;
