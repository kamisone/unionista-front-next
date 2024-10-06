// auth
export enum accessTokenNames {
    ACCESS_TOKEN = 'access_token',
    REFRESH_TOKEN = 'refresh_token',
}

export enum modalContentNames {
    QUERY_NAME = 'modal_content',
    HEADER_NAME = 'x-modal_content',
}

export const LANGUAGE_FILTER_QUERY_NAME = 'lng_filter';

export const PENDING_REDIRECT_PATH_NAME = 'pending_redirect_path';

export const CURRENT_USER_PAYLOAD_HEADER_NAME = 'x-user-payload';

export const CURRENT_USER_COOKIE_NAME = 'user';

export const PATHNAME_HEADER_NAME = 'x-pathname';

export const TOAST_COOKIE_NAME = 'toast';

export enum httpMethods {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    HEAD = 'head',
}

export enum httpHeadersNames {
    CONTENT_TYPE = 'Content-Type',
}

export enum httpHeadersValues {
    APPLICATION_JSON = 'application/json',
}
