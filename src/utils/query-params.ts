export enum FrontQueryParams {
    MODAL_CONTENT = 'modal_content',
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
