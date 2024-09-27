import ClientHome from '@/components/client-home/ClientHome';
import ClientPageLayout from '@/components/layouts/client-page-layout/ClientPageLayout';
import { i18nTranslation } from '@/i18n';
import { SupportedLanguages } from '@/i18n/settings';
import { isMobile } from '@/utils/is-browser';
import { Metadata } from 'next';
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
    } as Metadata;
}

interface HomeProps {
    params: {
        lng: SupportedLanguages;
    };
    searchParams: { [key: string]: string | undefined };
}

function Home({ params: { lng }, searchParams }: HomeProps) {
    const headersList = headers();

    return (
        <ClientPageLayout params={{ lng }} searchParams={searchParams}>
            {/* <ClientHeader
                isMobile={isMobileDevice}
                lng={lng}
                userPayload={userPayload}
            /> */}
            <ClientHome
                isMobile={isMobile(headersList.get('user-agent'))}
                lng={lng}
            />
        </ClientPageLayout>
    );
}

export default Home;
