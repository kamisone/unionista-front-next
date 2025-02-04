import { Admin } from '@/services/types/auth';
import { HttpService } from '@/services/server/http.service';
import { ListResponseType } from '../types/http';

const httpService = HttpService.instance;

export class AdminService {
    private static _instance: AdminService;

    static get instance() {
        if (!this._instance) {
            this._instance = new AdminService();
        }

        return this._instance;
    }

    async findAll(): Promise<ListResponseType<Admin>> {
        return httpService
            .get<Admin[]>({ path: 'admins' })
            .then((data) => {
                return {
                    success: true,
                    data,
                };
            })
            .catch((reason) => {
                return {
                    success: false,
                    message: reason.message,
                };
            });
    }
}
