// import { Trans } from 'react-i18next/TransWithoutContext';
import { SupportedLanguages, languages } from '@/i18n/settings';
import { PATHNAME_HEADER_NAME } from '@/utils/constants';
import { headers } from 'next/headers';
import Link from 'next/link';


interface FooterProps {
    lng: SupportedLanguages;
}

const MobileFooter = ({ lng }: FooterProps) => {
    const headersList = headers();
    const pathname = headersList.get(PATHNAME_HEADER_NAME) || '';
    return (
        <footer style={{ marginTop: 50 }}>
            {languages
                .filter((l) => lng !== l)
                .map((l, index) => {
                    return (
                        <span key={l}>
                            {index > 0 && ' or '}
                            <Link href={`/${l}${pathname.slice(3)}`}>{l}</Link>
                        </span>
                    );
                })}
        </footer>
    );
};

export default MobileFooter;
