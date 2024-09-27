import FlexModal from '@/components/Modal/FlexModal';
import { SupportedLanguages } from '@/i18n/settings';
import { JwtPayload } from '@/services/types/auth';
import { CURRENT_USER_PAYLOAD_HEADER_NAME } from '@/utils/constants';
import { isMobile } from '@/utils/is-browser';
import { headers } from 'next/headers';
import { ReactNode } from 'react';

interface ClientPageLayoutProps {
    params: { lng: SupportedLanguages };
    children: ReactNode;
    searchParams: { [key: string]: string | undefined };
}

export default function ClientPageLayout({
    params: { lng },
    searchParams,
    children,
}: ClientPageLayoutProps) {
    const headersList = headers();
    // const userPayload: JwtPayload | null =
    //     (headersList.get(CURRENT_USER_PAYLOAD_HEADER_NAME) &&
    //         JSON.parse(headersList.get(CURRENT_USER_PAYLOAD_HEADER_NAME)!)) ||
    //     null;

    const isMobileDevice = isMobile(headersList.get('user-agent'));
    return (
        <>
            {children}
            <FlexModal
                lng={lng}
                isMobileDevice={isMobileDevice}
                searchParams={searchParams}
            />
        </>
    );
}
