import AdminFooter from '@/app/components/admin/footer/AdminFooter';
import AdminHeader from '@/app/components/admin/header/AdminHeader';
import { SupportedLanguages } from '@/app/i18n/settings';
import { ReactNode } from 'react';

interface AdminLayoutProps {
    children: ReactNode;
    params: { lng: SupportedLanguages };
}
const AdminLayout = ({ children, params: { lng } }: AdminLayoutProps) => {
    return (
        <>
            <AdminHeader />
            <h2>admin</h2>
            {children}
            <AdminFooter />
        </>
    );
};

export default AdminLayout;
