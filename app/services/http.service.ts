// import { environment } from 'environment/environment';
import { ApiTokenService } from './api-token.service';
import axios, {
    AxiosError,
    AxiosHeaders,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from 'axios';
import { IWhere } from './product-category.service';
import { AuthService } from './auth.service';
import { SnackbarService, SnackbarSeverity } from './snackbar.service';
import { ModalService } from './modal.service';
import { ModalContentMapping } from '../utils/modal';

// const authService = AuthService.getInstance();
const snackbarService = SnackbarService.getInstance();
const modalService = ModalService.getInstance();

export class HttpService {
    static myInstance: HttpService;
    axiosInstance: AxiosInstance;

    constructor(private apiTokenService: ApiTokenService) {
        this.axiosInstance = axios.create({
            baseURL: process.env.API_BASE_URL,
            headers: {
                Authorization: AuthService.getAccessToken(),
                // Authorization: 'Bearer ',
            },
        });

        // interceptors:
        this.axiosInstance.interceptors.request.use(
            async (config) => {
                console.log('request will go now');
                if (config.url === AuthService.endpoints.REFRESH_TOKEN) {
                    const refreshToken = AuthService.getRefreshToken();
                    config.headers['Authorization'] = `bearer ${refreshToken}`;
                } else {
                    const accessToken = AuthService.getAccessToken();
                    config.headers['Authorization'] = `bearer ${accessToken}`;
                }

                return config;
            },

            async (error) => {
                snackbarService.openSnackbar({
                    message: error.message,
                    severity: SnackbarSeverity.ERROR,
                });
            }
        );

        this.axiosInstance.interceptors.response.use(
            async (response) => {
                const originalRequest = response.config;
                console.log('original request path: ', originalRequest.url);
                if (
                    [
                        AuthService.endpoints.SIGN_IN,
                        AuthService.endpoints.SIGN_UP,
                    ].includes(originalRequest.url ?? '')
                ) {
                    const { accessToken, refreshToken } = response.data;
                    AuthService.updateRefreshToken(refreshToken);
                    AuthService.updateAccessToken(accessToken);
                }
                return response;
            },
            async (error: AxiosError) => {
                const originalRequest = error.config as
                    | InternalAxiosRequestConfig<any>
                    | undefined;
                if (
                    originalRequest &&
                    error.response?.status === 401 &&
                    originalRequest.url != AuthService.endpoints.REFRESH_TOKEN
                ) {
                    console.log('refresh here: ', originalRequest.url);
                    const data = await AuthService.refreshToken();
                    if (!data) return;
                    const { accessToken, refreshToken } = data;
                    AuthService.updateRefreshToken(refreshToken);
                    AuthService.updateAccessToken(accessToken);

                    this.axiosInstance(originalRequest);
                } else if (
                    originalRequest &&
                    error.response?.status === 401 &&
                    originalRequest.url === AuthService.endpoints.REFRESH_TOKEN
                ) {
                    console.log('refresh failed: ');

                    modalService.state = {
                        isModalOpen: true,
                        currentModalContent: ModalContentMapping.SIGN_IN,
                    };
                } else {
                    throw error;
                }
            }
        );
    }

    static getInstance() {
        if (!HttpService.myInstance) {
            HttpService.myInstance = new HttpService(
                ApiTokenService.getInstance()
            );
        }
        return HttpService.myInstance;
    }

    async get<T>({
        path,
        queryParams,
    }: {
        path: string;
        queryParams?: Record<string, unknown> & {
            where?: IWhere[] | IWhere[][];
        };
    }) {
        if (queryParams) {
            path = this._addQueryParams(path, queryParams);
        }
        return this.axiosInstance.get<T>(path);
    }

    async post<T>({
        path,
        body,
        queryParams,
        headers,
    }: {
        path: string;
        body: Record<string, unknown> | FormData;
        queryParams?: Record<string, string>;
        headers?: AxiosHeaders;
    }) {
        if (queryParams) {
            path = this._addQueryParams(path, queryParams);
        }
        return this.axiosInstance.post<T>(path, body, {
            headers,
        });
    }

    async put({
        path,
        body,
        queryParams,
        headers,
    }: {
        path: string;
        body: Record<string, unknown>;
        queryParams: Record<string, string>;
        headers: AxiosHeaders;
    }) {
        if (queryParams) {
            path = this._addQueryParams(path, queryParams);
        }
        return this.axiosInstance.put(path, body, {
            headers,
        });
    }

    async delete({
        path,
        queryParams,
        headers,
    }: {
        path: string;
        queryParams: Record<string, string>;
        headers: AxiosHeaders;
    }) {
        if (queryParams) {
            path = this._addQueryParams(path, queryParams);
        }
        return this.axiosInstance.delete(path, { headers });
    }

    // _getToken() {
    //     if (environment.withAuth) {
    //         return `Bearer ${this.apiTokenService.getToken()}`;
    //     }
    //     return '';
    // }

    _addQueryParams(path: string, queryParamsObj: Record<string, any>) {
        // remove trailing/leading slashes
        path = path.replace(/(^\/|\/$)/g, '');
        // if (!queryParams) {
        //     return environment.backBaseUrl + path;
        // }
        let keys = Object.keys(queryParamsObj);
        // let url = new URL(path, environment.backBaseUrl);
        const queryParams = new URLSearchParams();

        for (let key of keys) {
            queryParams.append(
                key,
                Array.isArray(queryParamsObj[key])
                    ? JSON.stringify(queryParamsObj[key])
                    : queryParamsObj[key]
            );
        }
        return `${path}?${queryParams.toString()}`;
    }
}
