import { HttpException } from '@/shared/http-exception/HttpException';
import { filterInvalidValues } from '@/utils';
import {
    accessTokenNames,
    httpHeadersNames,
    httpHeadersValues,
    httpMethods,
    modalContentNames,
    PENDING_REDIRECT_PATH_NAME,
} from '@/utils/constants';
import {
    addQueryParamToUrl,
    getCookies,
    setCookie,
} from '@/utils/query-params';
import { IWhere } from '@/services/types/http';
import { JwtRefreshResponseType } from '@/services/types/auth';
import { AuthService } from './auth.service';
import { RouterService } from './router.service';
import { ModalContentMapping } from '@/utils/modal';

const routerService = RouterService.instance;

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
        // @ts-ignore
        const args = arguments;
        if (queryParams) {
            queryParams =
                filterInvalidValues<Record<string, unknown>>(queryParams);
        }

        if (queryParams) {
            path = this._addQueryParams(path, queryParams);
        }
        const accessToken = getCookies()[accessTokenNames.ACCESS_TOKEN] || null;
        return fetch(process.env.API_BASE_URL_BROWSER + '/' + path, {
            method: httpMethods.GET,
            headers: {
                Authorization: `bearer ${accessToken && accessToken}`,
            },
        }).then(async (headers) => {
            if (headers.status >= 200 && headers.status < 300) {
                return headers.json() as Promise<T>;
            }

            if (headers.status === 401 || headers.status === 403) {
                const refreshToken =
                    getCookies()[accessTokenNames.REFRESH_TOKEN];
                return this._interceptAndRefreshJwt<T>(
                    accessToken,
                    refreshToken
                );
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
        const accessToken = getCookies()[accessTokenNames.ACCESS_TOKEN] || null;
        return fetch(`${process.env.API_BASE_URL_BROWSER}/${path}`, {
            method: httpMethods.POST,
            body: isFormData ? (body as FormData) : JSON.stringify(body),
            headers: {
                ...headers,
                Authorization: `bearer ${accessToken && accessToken}`,
            },
        }).then(async (headers) => {
            if (headers.status >= 200 && headers.status < 300) {
                return headers.json();
            }
            if (headers.status === 401 || headers.status === 403) {
                const refreshToken =
                    getCookies()[accessTokenNames.REFRESH_TOKEN];
                return this._interceptAndRefreshJwt<T>(
                    accessToken,
                    refreshToken
                );
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

    private async _interceptAndRefreshJwt<T>(
        accessToken: string | null,
        refreshToken: string | null
    ) {
        return fetch(
            process.env.API_BASE_URL_BROWSER +
                '/' +
                AuthService.endpoints.REFRESH_TOKEN,
            {
                method: httpMethods.POST,
                body: JSON.stringify({
                    [accessTokenNames.REFRESH_TOKEN]: refreshToken,
                }),
                headers: {
                    Authorization: `bearer ${accessToken && accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        ).then((headers): Promise<T> | undefined => {
            if (headers.status < 200 || headers.status > 299) {
                const pathWithSearch = location.pathname + location.search;
                setCookie(PENDING_REDIRECT_PATH_NAME, pathWithSearch);
                routerService.state = {
                    url: addQueryParamToUrl(
                        pathWithSearch,
                        modalContentNames.QUERY_NAME,
                        ModalContentMapping.SIGN_IN
                    ),
                };
                return;
            }
            return (headers.json() as Promise<JwtRefreshResponseType>).then(
                (data) => {
                    setCookie(accessTokenNames.ACCESS_TOKEN, data.accessToken!);
                    // @ts-ignore
                    return this.get.apply(this, args) as Promise<T>;
                }
            );
        });
    }
}
