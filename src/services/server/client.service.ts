import { Client } from '@/services/types/auth';
import { HttpService } from './http.service';
import { ListResponseType } from '../types/http';

const httpService = HttpService.instance;

export class ClientService {
    private static _instance: ClientService;

    static get instance() {
        if (!this._instance) {
            this._instance = new ClientService();
        }

        return this._instance;
    }

    async findAll(): Promise<ListResponseType<Client>> {
        return httpService
            .get<Client[]>({ path: 'clients' })
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
