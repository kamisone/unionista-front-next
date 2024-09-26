import FlexModal from '@/components/Modal/FlexModal';
import ClientHome from '@/components/client-home/ClientHome';
import ClientHeader from '@/components/header/ClientHeader';
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
        title: t('client-home.title'),
        description: t('client-home.description'),
    };
}

interface HomeProps {
    params: {
        lng: SupportedLanguages;
    };
    searchParams: { [key: string]: string | undefined };
}

function Home({ params: { lng }, searchParams }: HomeProps) {
    const headersList = headers();

    const userPayload: JwtPayload | null =
        (headersList.get(CURRENT_USER_PAYLOAD_HEADER_NAME) &&
            JSON.parse(headersList.get(CURRENT_USER_PAYLOAD_HEADER_NAME)!)) ||
        null;

    const isMobileDevice = isMobile(headersList.get('user-agent'));

    return (
        <>
            <ClientHeader
                isMobile={isMobileDevice}
                lng={lng}
                userPayload={userPayload}
            />
            <ClientHome
                isMobile={isMobile(headersList.get('user-agent'))}
                lng={lng}
            />
            <FlexModal
                lng={lng}
                isMobileDevice={isMobileDevice}
                searchParams={searchParams}
            />
        </>
    );
}

export default Home;
