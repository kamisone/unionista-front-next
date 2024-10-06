import AdminPageLayout from '@/components/layouts/admin-page-layout/AdminPageLayout';
import { i18nTranslation } from '@/i18n';
import { SupportedLanguages } from '@/i18n/settings';
import { AdminService } from '@/services/server/admin.service';
import { ClientService } from '@/services/server/client.service';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
    params: { lng },
}: {
    params: { lng: SupportedLanguages };
}) {
    const t = i18nTranslation(lng, 'metadata');
    return {
        title: t('admin-users-home.title'),
        description: t('admin-users-home.description'),
    };
}

interface UsersPageProps {
    params: { lng: SupportedLanguages };
    searchParams: Record<string, string>;
}

const clientService = ClientService.instance;
const adminService = AdminService.instance;
export default async function UsersPage({
    params,
    searchParams,
}: UsersPageProps) {
    const clientsRes = await clientService.findAll();
    const adminsRes = await adminService.findAll();

    const errors = [];
    if (!clientsRes.success) {
        errors.push(clientsRes.message);
    }
    if (!adminsRes.success) {
        errors.push(adminsRes.message);
    }

    if (errors.length) {
        return (
            <div>
                <p>Error occured:</p>
                {errors.map((message) => (
                    <p key={message}>{message}</p>
                ))}
            </div>
        );
    }

    return (
        <AdminPageLayout params={params} searchParams={searchParams}>
            {[
                <h1 key="clients">clients ({clientsRes.data!.length})</h1>,
                clientsRes.data!.map((client) => (
                    <div key={client.id}>
                        <p>{client.fullName}</p>
                        <p>{client.email}</p>
                    </div>
                )),
                <br key="br"></br>,
                <h1 key="admins">admins ({adminsRes.data!.length})</h1>,
                adminsRes.data!.map((admin) => (
                    <div key={admin.id}>
                        <p>
                            {admin.firstName} {admin.lastName}
                        </p>
                        <p>{admin.email}</p>
                    </div>
                )),
            ]}
        </AdminPageLayout>
    );
}
