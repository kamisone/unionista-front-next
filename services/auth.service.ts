import { HttpService } from './http.service';
import { SnackbarService, snackbarSeverity } from './snackbar.service';

const httpService = HttpService.getInstance();
const snackbarService = SnackbarService.getInstance();

export const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class AuthService {
    static myInstance;

    static getInstance() {
        if (!AuthService.myInstance) {
            AuthService.myInstance = new AuthService();
        }
        return this.myInstance;
    }

    async signinUser(data) {
        try {
            const response = await httpService.post({
                path: '/user/signin',
                body: data,
            });
            return response.data;
        } catch (error) {
            if (error.response.status >= 500) {
                return snackbarService.openSnackbar({
                    message: `Error: ${
                        error.response.data?.message ?? error.message
                    }`,
                    severity: snackbarSeverity.ERROR,
                });
            }
            throw new Error(error.response.data?.message);
        }
    }
    async signupUser(data) {
        try {
            const response = await httpService.post({
                path: '/user/signup',
                body: data,
            });
            return response.data;
        } catch (error) {
            if (error.response.status >= 500) {
                return snackbarService.openSnackbar({
                    message: `Error: ${
                        error.response.data?.message ?? error.message
                    }`,
                    severity: snackbarSeverity.ERROR,
                });
            }
            throw new Error(error.response.data?.message);
        }
    }
}
