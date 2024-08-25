import { ApiTokenService } from '@/services/api-token.service';
import { ModalService } from '@/services/modal.service';
import { IWhere } from '@/services/product-category.service';
import { SnackbarService } from '@/services/snackbar.service';
import {
    CURRENT_USER_HEADER_NAME,
    httpHeadersNames,
    httpHeadersValues,
    httpMethods,
} from '@/utils/constants';
import axios, { AxiosHeaders, AxiosInstance } from 'axios';
import { headers } from 'next/headers';

const snackbarService = SnackbarService.instance;
const modalService = ModalService.instance;

export class HttpService {
    private static _instance: HttpService;
    private _axiosInstance: AxiosInstance;
    private _lastFailedPath: string | null = null;

    constructor(private apiTokenService: ApiTokenService) {
        this._axiosInstance = axios.create({
            baseURL: process.env.API_BASE_URL,
        });

        // interceptors:
        // this._axiosInstance.interceptors.request.use(
        //     async (config) => {
        //         if (config.url !== AuthService.endpoints.REFRESH_TOKEN) {
        //             const user = headers().get(CURRENT_USER_HEADER_NAME);
        //             console.log('user : ', user && JSON.parse(user));
        //             // const accessToken = AuthService.getAccessToken();
        //             if (user) {
        //                 //@ts-ignore
        //                 config.headers['Authorization'] =
        //                     `bearer ${user.accessToken}`;
        //             }
        //         }
        //         return config;
        //     },

        //     async (error) => {
        //         console.log('http.service error: ', error.message);
        //         // snackbarService.openSnackbar({
        //         //     message: error.message,
        //         //     severity: SnackbarSeverity.ERROR,
        //         // });
        //     }
        // );

        // this._axiosInstance.interceptors.response.use(
        //     async (response) => {
        //         const originalRequest = response.config;
        //         if (
        //             [
        //                 AuthService.endpoints.SIGN_IN,
        //                 AuthService.endpoints.SIGN_UP,
        //             ].includes(originalRequest.url ?? '')
        //         ) {
        //             const { accessToken, refreshToken } = response.data;
        //             AuthService.updateRefreshToken(refreshToken);
        //             AuthService.updateAccessToken(accessToken);
        //         } else if (
        //             originalRequest.url === AuthService.endpoints.REFRESH_TOKEN
        //         ) {
        //             const authService = AuthService.instance;
        //             const { accessToken } = response.data;
        //             AuthService.updateAccessToken(accessToken);
        //             authService.state = {
        //                 isUserAuthenticated:
        //                     !AuthService.isTokenInvalid(accessToken),
        //             };
        //         }
        //         if (this._lastFailedPath && isBrowser()) {
        //             window.location.href = this._lastFailedPath;
        //             this._lastFailedPath = null;
        //         }
        //         return response;
        //     },
        //     async (error: AxiosError) => {
        //         const originalRequest = error.config as
        //             | InternalAxiosRequestConfig<any>
        //             | undefined;
        //         if (!originalRequest || error.response?.status !== 401) {
        //             throw error;
        //         }

        //         if (
        //             originalRequest.url !== AuthService.endpoints.REFRESH_TOKEN
        //         ) {
        //             if (isBrowser()) {
        //                 this._lastFailedPath =
        //                     window.location.pathname + window.location.search;
        //             }
        //             // return await AuthService.refreshToken(() => {
        //             //     // retry the same original request after refreshing the token
        //             //     return this._axiosInstance(originalRequest);
        //             // });
        //         } else {
        //             modalService.state = {
        //                 isModalOpen: true,
        //                 currentModalContent: ModalContentMapping.SIGN_IN,
        //             };

        //             AuthService.setPersistedIsUserNotifiedToAuth(true);

        //             const authService = AuthService.instance;
        //             authService.state = {
        //                 isUserAuthenticated: false,
        //                 isUserNotifiedToSignin: true,
        //             };

        //             throw error;
        //         }
        //     }
        // );
    }

    static get instance() {
        if (!this._instance) {
            this._instance = new HttpService(ApiTokenService.instance);
        }
        return this._instance;
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

        const user = JSON.parse(headers().get(CURRENT_USER_HEADER_NAME) || '');
        return fetch(process.env.API_BASE_URL + '/' + path, {
            method: httpMethods.GET,
            headers: {
                Authorization: `bearer ${user && user.accessToken}`,
            },
        }).then((headers) => headers.json());
    }

    async post<T>({
        path,
        body,
        queryParams,
        headers = {},
    }: {
        path: string;
        body: Record<string, unknown> | FormData;
        queryParams?: Record<string, string>;
        headers?: Record<string, string>;
    }) {
        if (queryParams) {
            path = this._addQueryParams(path, queryParams);
        }

        const isFormData = body instanceof FormData;
        if (!isFormData) {
            headers[httpHeadersNames.CONTENT_TYPE] =
                httpHeadersValues.APPLICATION_JSON;
        }
        return fetch(`${process.env.API_BASE_URL}/${path}`, {
            method: httpMethods.POST,
            body: isFormData ? body : JSON.stringify(body),
            headers,
        }).then((headers) => {
            if (headers.status >= 200 && headers.status < 300) {
                return headers.json();
            }
            throw new Error(`${headers.status} - ${headers.statusText}`);
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
        return this._axiosInstance.put(path, body, {
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
        return this._axiosInstance.delete(path, { headers });
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
