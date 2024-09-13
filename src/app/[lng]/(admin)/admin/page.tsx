import AdminFooter from '@/components/admin/footer/AdminFooter';
import AdminHeader from '@/components/admin/header/AdminHeader';
import { CURRENT_USER_HEADER_NAME } from '@/utils/constants';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import React from 'react';

export const metadata: Metadata = {
    title: 'UnionistaShop | Admin',
};

const AdminHome = () => {
    const headersList = headers();
    const user = headersList.get(CURRENT_USER_HEADER_NAME) || null;

    if (!user) return;
    return (
        <>
            <AdminHeader />
            <h2 className=''>admin</h2>
            <AdminFooter />
        </>
    );
};

export default AdminHome;
