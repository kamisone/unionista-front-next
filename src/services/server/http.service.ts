import { IWhere } from '@/services/product-category.service';
import { HttpException } from '@/shared/http-exception/HttpException';
import {
    accessTokenNames,
    httpHeadersNames,
    httpHeadersValues,
    httpMethods,
} from '@/utils/constants';
import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';

export class HttpService {
    private static _instance: HttpService;

    static get instance() {
        if (!this._instance) {
            this._instance = new HttpService();
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

        const accessToken =
            cookies().get(accessTokenNames.ACCESS_TOKEN) || null;
        return fetch(process.env.API_BASE_URL_SERVER + '/' + path, {
            method: httpMethods.GET,
            headers: {
                Authorization: `bearer ${accessToken && accessToken.value}`,
            },
        }).then(async (headers) => {
            if (headers.status >= 200 && headers.status < 300) {
                return headers.json() as T;
            }
            const error = await headers.json();
            throw new HttpException(error.message, error.status);
        });
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
        return fetch(`${process.env.API_BASE_URL_SERVER}/${path}`, {
            method: httpMethods.POST,
            body: isFormData ? body : JSON.stringify(body),
            headers,
        }).then(async (headers) => {
            if (headers.status >= 200 && headers.status < 300) {
                return headers.json();
            }
            const error = await headers.json();
            throw new HttpException(error.message, error.status);
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
        // return this._axiosInstance.put(path, body, {
        //     headers,
        // });
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
        // return this._axiosInstance.delete(path, { headers });
    }

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
