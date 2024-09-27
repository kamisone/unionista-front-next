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
    const headersList = headers();

    const userPayload: JwtPayload | null =
        (headersList.get(CURRENT_USER_PAYLOAD_HEADER_NAME) &&
            JSON.parse(headersList.get(CURRENT_USER_PAYLOAD_HEADER_NAME)!)) ||
        null;

    const isMobileDevice = isMobile(headersList.get('user-agent'));
    return (
        <>
            <FlexModal
                lng={lng}
                isMobileDevice={isMobileDevice}
                searchParams={searchParams}
            />
        </>
    );
}

export default NotificationsPage;
