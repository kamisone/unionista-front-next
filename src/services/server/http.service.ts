import { HttpException } from '@/shared/http-exception/HttpException';
import { filterInvalidValues } from '@/utils';
import {
    accessTokenNames,
    httpHeadersNames,
    httpHeadersValues,
    httpMethods,
} from '@/utils/constants';
import { cookies } from 'next/headers';
import { IWhere } from '@/services/types/http';

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
            queryParams =
                filterInvalidValues<Record<string, unknown>>(queryParams);
        }

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
        queryParams?: Record<string, unknown>;
        headers?: Record<string, string>;
    }) {
        body = filterInvalidValues(body);
        if (queryParams) {
            queryParams =
                filterInvalidValues<Record<string, unknown>>(queryParams);
        }

        if (queryParams) {
            path = this._addQueryParams(path, queryParams);
        }

        const isFormData = body instanceof FormData;
        if (!isFormData) {
            headers[httpHeadersNames.CONTENT_TYPE] =
                httpHeadersValues.APPLICATION_JSON;
        }
        const accessToken =
            cookies().get(accessTokenNames.ACCESS_TOKEN) || null;
        return fetch(`${process.env.API_BASE_URL_SERVER}/${path}`, {
            method: httpMethods.POST,
            body: isFormData ? (body as FormData) : JSON.stringify(body),
            headers: {
                ...headers,
                Authorization: `bearer ${accessToken && accessToken.value}`,
            },
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
    }: {
        path: string;
        body: Record<string, unknown>;
        queryParams: Record<string, unknown>;
    }) {
        if (queryParams) {
            queryParams =
                filterInvalidValues<Record<string, unknown>>(queryParams);
        }
        if (queryParams) {
            path = this._addQueryParams(path, queryParams);
        }
        body = filterInvalidValues(body);
    }

    async delete({
        path,
        queryParams,
    }: {
        path: string;
        queryParams: Record<string, unknown>;
    }) {
        if (queryParams) {
            queryParams =
                filterInvalidValues<Record<string, unknown>>(queryParams);
        }
        if (queryParams) {
            path = this._addQueryParams(path, queryParams);
        }
    }

    _addQueryParams(path: string, queryParamsObj: Record<string, any>) {
        // remove trailing/leading slashes
        path = path.replace(/(^\/|\/$)/g, '');

        let keys = Object.keys(queryParamsObj);
        const queryParams = new URLSearchParams();

        for (let key of keys) {
            if (Array.isArray(queryParamsObj[key])) {
                for (let value of queryParamsObj[key]) {
                    queryParams.append(
                        `${key}[]`,
                        Object.prototype.toString.call(value) ===
                            '[object Object]'
                            ? JSON.stringify(value)
                            : value
                    );
                }
            } else {
                queryParams.append(
                    key,
                    Object.prototype.toString.call(queryParamsObj[key]) ===
                        '[object Object]'
                        ? JSON.stringify(queryParamsObj[key])
                        : queryParamsObj[key]
                );
            }
        }
        return `${path}?${queryParams.toString()}`;
    }
}
