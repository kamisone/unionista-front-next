// import { environment } from 'environment/environment';
import { ApiTokenService } from './api-token.service';
import axios, { AxiosHeaders, AxiosInstance } from 'axios';

export class HttpService {
    static myInstance: HttpService;
    axiosInstance: AxiosInstance;
    constructor(private apiTokenService: ApiTokenService) {
        console.log('hi the : ', process.env.REACT_APP_BASE_URL);
        this.axiosInstance = axios.create({
            baseURL: '/api',
            headers: {
                // Authorization: this._getToken(),
                Authorization: 'Bearer ',
            },
        });
    }

    static getInstance() {
        if (!this.myInstance) {
            this.myInstance = new HttpService(ApiTokenService.getInstance());
        }
        return this.myInstance;
    }

    async get({
        path,
        queryParams,
    }: {
        path: string;
        queryParams: Record<string, string>;
    }) {
        if (queryParams) {
            path = this._addQueryParams(path, queryParams);
        }
        return this.axiosInstance.get(path);
    }

    async post({
        path,
        body,
        queryParams,
        headers,
    }: {
        path: string;
        body: Record<string, unknown>;
        queryParams?: Record<string, string>;
        headers?: AxiosHeaders;
    }) {
        if (queryParams) {
            path = this._addQueryParams(path, queryParams);
        }
        return this.axiosInstance.post(path, body, {
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

    _addQueryParams(path: string, queryParamsObj: Record<string, string>) {
        // remove trailing/leading slashes
        path = path.replace(/(^\/|\/$)/g, '');
        // if (!queryParams) {
        //     return environment.backBaseUrl + path;
        // }
        let keys = Object.keys(queryParamsObj);
        // let url = new URL(path, environment.backBaseUrl);
        const queryParams = new URLSearchParams();

        for (let key of keys) {
            queryParams.append(key, queryParamsObj[key]);
        }
        return `${path}?${queryParams.toString()}`;
    }
}
