import FlexModal from '@/components/Modal/FlexModal';
import UserHeader from '@/components/header/UserHeader';
import UserHome from '@/components/user-home/UserHome';
import {
    languages,
    SupportedLanguages,
    SupportedLanguagesEnum,
} from '@/i18n/settings';
import { CURRENT_USER_HEADER_NAME } from '@/utils/constants';
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
    
    const user = headersList.get(CURRENT_USER_HEADER_NAME) || null;

    const isMobileDevice = isMobile(headersList.get('user-agent'));

    return (
        <>
            <UserHeader isMobile={isMobileDevice} lng={lng} user={user} />
            <UserHome
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

// export function generateStaticParams() {
//     languages.map((lng) => ({ lng }));
// }

export default Home;
