export const dynamic = 'force-dynamic';
import AdminFooter from '@/components/admin/footer/AdminFooter';
import { i18nTranslation } from '@/i18n';
import { SupportedLanguages } from '@/i18n/settings';
import { JwtPayload } from '@/services/types/auth';
import { CURRENT_USER_PAYLOAD_HEADER_NAME } from '@/utils/constants';
import { headers } from 'next/headers';

export async function generateMetadata({
    params: { lng },
}: {
    params: { lng: SupportedLanguages };
}) {
    const t = i18nTranslation(lng, 'metadata');
    return {
        title: t('admin-home.title'),
        description: t('admin-home.description'),
    };
}

const AdminHome = () => {
    const headersList = headers();
    const userPayload: JwtPayload | null =
        (headersList.get(CURRENT_USER_PAYLOAD_HEADER_NAME) &&
            JSON.parse(headersList.get(CURRENT_USER_PAYLOAD_HEADER_NAME)!)) ||
        null;

    if (!userPayload) return;
    return (
        <>
            <div className="p-4">
                <h2 className="">admin</h2>
            </div>
        </>
    );
};

export default AdminHome;
