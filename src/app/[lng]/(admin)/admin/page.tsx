export const dynamic = 'force-dynamic';
import AdminFooter from '@/components/admin/footer/AdminFooter';
import AdminHeader from '@/components/admin/header/AdminHeader';
import { JwtPayload } from '@/services/types/auth';
import { CURRENT_USER_PAYLOAD_HEADER_NAME } from '@/utils/constants';
import { Metadata } from 'next';
import { headers } from 'next/headers';

export const metadata: Metadata = {
    title: 'UnionistaShop | Admin',
};

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
                <AdminHeader />
                <h2 className="">admin</h2>
                <AdminFooter />
            </div>
        </>
    );
};

export default AdminHome;
