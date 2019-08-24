
/**
 * create a new object that ensure all default properties are present
 * @param original 
 * @param defaults 
 */
export function mergeWithDefaults<T extends any>(original: T, defaults: T): T {

    const merge: T = shallowCopyOwnProperties(original);

    Object.getOwnPropertyNames(defaults).forEach((name) => {
        merge[name] = Object.hasOwnProperty(name) ? original[name] : defaults[name];
    });

    return merge;
}

/**
 * creates a shallow copy of the original
 * @param original 
 */
export function shallowCopyOwnProperties<T extends any>(original: T): T {

    const copy: any = {};

    Object.getOwnPropertyNames(original).forEach((name) => {
        copy[name] = original[name];
    });

    return copy;
}