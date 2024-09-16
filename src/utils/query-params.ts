export function stripQueryParamFromUrl(url: string, paramKey: string) {
    const [path, queryParams] = url.split('?');
    if (!queryParams) return url;
    const nativeUrlSearchParams = new URLSearchParams(queryParams);
    nativeUrlSearchParams.delete(paramKey);
    return `${path}?${nativeUrlSearchParams.toString()}`;
}

export function addQueryParamToUrl(
    url: string,
    paramKey: string,
    paramValue: string
) {
    const [path, queryParams] = url.split('?');
    const nativeUrlSearchParams = new URLSearchParams(queryParams);
    if (nativeUrlSearchParams.has(paramKey)) {
        nativeUrlSearchParams.set(paramKey, paramValue);
    } else {
        nativeUrlSearchParams.append(paramKey, paramValue);
    }

    return `${path}?${nativeUrlSearchParams.toString()}`;
}

export function getCookies() {
    let cookies = document.cookie.split(';');
    let cookiesObj: Record<string, string> = {};
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=').map((val) => val.trim());
        cookiesObj[key] = value;
    }

    return cookiesObj ?? {};
}

export function deleteCookie(key: string) {
    document.cookie = `${key}=; Max-Age=0;`;
}
