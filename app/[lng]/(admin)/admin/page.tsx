import AdminFooter from '@/app/components/admin/footer/AdminFooter';
import AdminHeader from '@/app/components/admin/header/AdminHeader';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'UnionistaShop | Admin',
};

const AdminHome = () => {
    return (
        <>
            <AdminHeader />
            <h2>admin</h2>
            <AdminFooter />
        </>
    );
};

export default AdminHome;
