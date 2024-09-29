import AdminHeader from '@/components/admin/header/AdminHeader';
import SidePanel from '@/components/admin/side-panel/SidePanel';
import { SupportedLanguages } from '@/i18n/settings';
import { ReactNode } from 'react';
import styles from './layout.module.css';

interface AdminLayoutProps {
    children: ReactNode;
    params: { lng: SupportedLanguages };
}
const AdminLayout = ({ children, params: { lng } }: AdminLayoutProps) => {
    return (
        <main className={styles.container}>
            <AdminHeader utilities="col-[1/-1]" />
            <SidePanel lng={lng} />
            <section className="p-4">{children}</section>

            {/* <section className="col-[1/-1]">
                <AdminFooter />
            </section> */}
        </main>
    );
};

export default AdminLayout;
