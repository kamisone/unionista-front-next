import { FormValues } from '@/components/modal-content/login-in-content/LoginContent';
import { HttpService } from './http.service';
import { SnackbarService, SnackbarSeverity } from './snackbar.service';
import { AxiosError } from 'axios';

const httpService = HttpService.getInstance();
const snackbarService = SnackbarService.getInstance();

export const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class AuthService {
    static myInstance: AuthService;

    static getInstance() {
        if (!AuthService.myInstance) {
            AuthService.myInstance = new AuthService();
        }
        return this.myInstance;
    }

    async signinUser(data: Record<string, unknown>) {
        try {
            const response = await httpService.post({
                path: '/user/signin',
                body: data,
            });
            return response.data;
        } catch (error: any) {
            if (error.response.status >= 500) {
                return snackbarService.openSnackbar({
                    message: `Error: ${
                        error.response.data?.message ?? error.message
                    }`,
                    severity: SnackbarSeverity.ERROR,
                });
            }
            throw new Error(error.response.data?.message);
        }
    }
    async signupUser(data: Record<string, unknown>) {
        try {
            const response = await httpService.post({
                path: '/user/signup',
                body: data,
            });
            return response.data;
        } catch (error: any) {
            if (error.response.status >= 500) {
                return snackbarService.openSnackbar({
                    message: `Error: ${
                        error.response.data?.message ?? error.message
                    }`,
                    severity: SnackbarSeverity.ERROR,
                });
            }
            throw new Error(error.response.data?.message);
        }
    }
}
