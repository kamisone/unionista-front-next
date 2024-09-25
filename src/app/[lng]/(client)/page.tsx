import FlexModal from '@/components/Modal/FlexModal';
import ClientHome from '@/components/client-home/ClientHome';
import ClientHeader from '@/components/header/ClientHeader';
import { SupportedLanguages } from '@/i18n/settings';
import { JwtPayload } from '@/services/types/auth';
import { CURRENT_USER_PAYLOAD_HEADER_NAME } from '@/utils/constants';
import { isMobile } from '@/utils/is-browser';
import { Metadata } from 'next';
import { headers } from 'next/headers';

export const metadata: Metadata = {
    title: 'UnionistaShop | Home',
};

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
