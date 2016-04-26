export function isArray(obj) {
    return !Array.isArray
        ? toString.call(obj) === '[object Array]'
        : Array.isArray(obj);
}
