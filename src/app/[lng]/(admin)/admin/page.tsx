import AdminFooter from '@/components/admin/footer/AdminFooter';
import AdminHeader from '@/components/admin/header/AdminHeader';
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
