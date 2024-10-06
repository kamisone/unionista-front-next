export function shallowCompareObjs(
    obj1: Record<string, any> | null,
    obj2: Record<string, any> | null
) {
    if (!obj1 || !obj2) return false;
    return (
        Object.keys(obj1).length === Object.keys(obj2).length &&
        Object.keys(obj1).every((key) => obj1[key] === obj2[key])
    );
}

export function filterInvalidValues<T>(
    data: FormData | Record<string, unknown>
) {
    let temp: [string, any][] = [];
    let body: FormData | Record<string, unknown>;
    if (Object.prototype.toString.call(data) === '[object FormData]') {
        temp = Array.from(data as FormData).filter(([_, value]) => value);
        body = new FormData();
        temp.forEach(([key, value]) => (body as FormData).set(key, value));
    } else {
        temp = Array.from(Object.entries(data)).filter(
            ([_, value]) =>
                !['', null, undefined, 'null', 'undefined'].includes(
                    typeof value === 'string' ? value.trim() : value
                )
        );
        body = {};
        temp.forEach(
            ([key, value]) => ((body as Record<string, unknown>)[key] = value)
        );
    }

    return body as T;
}
