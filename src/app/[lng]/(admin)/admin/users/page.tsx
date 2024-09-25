import { AdminService } from '@/services/server/admin.service';
import { ClientService } from '@/services/server/client.service';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';


export const metadata: Metadata = {
    title: 'Admin | Users',
    description:
        'Admin panel for managing users. View, update, and manage user profiles efficiently. Edit user details, adjust roles, and ensure smooth user management on Unionistashop.',
};

const clientService = ClientService.instance;
const adminService = AdminService.instance;
export default async function UsersPage() {
    const clientsRes = await clientService.findAll();
    const adminsRes = await adminService.findAll();

    const errors = [];
    if (!clientsRes.success) {
        errors.push(clientsRes.message);
    }
    if (!adminsRes.success) {
        errors.push(adminsRes.message);
    }

    if(errors.length) {
        return (
            <div>
                <p>Error occured:</p>
                {
                    errors.map((message) => <p key={message}>{message}</p>)
                }
            </div>
        )
    }

    return [
        <h1 key="clients">clients</h1>,
        clientsRes.data!.map((client) => (
            <div key={client.id}>
                <p>{client.fullName}</p>
                <p>{client.email}</p>
            </div>
        )),
        <br key="br"></br>,
        <h1 key="admins">admins</h1>,
        adminsRes.data!.map((admin) => (
            <div key={admin.id}>
                <p>
                    {admin.firstName} {admin.lastName}
                </p>
                <p>{admin.email}</p>
            </div>
        )),
    ];
}
