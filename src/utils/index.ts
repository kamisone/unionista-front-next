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
