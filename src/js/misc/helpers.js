export function isArray(obj) {
    return !Array.isArray
        ? toString.call(obj) === '[object Array]'
        : Array.isArray(obj);
}

export function eachOf(obj, callback) {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {

            callback(obj[prop], prop);
        }
    }
}

export function extend(obj, from) {
    eachOf(from, (v, k) => obj[k] = v);
}
