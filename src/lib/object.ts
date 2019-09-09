export type AllDefined<T> = {
    [P in keyof T]: T[P];
}

// type Partial<T> = {
//     [K in keyof T]?: T[K];
// }
/**
 * create a new object that ensure all default properties are present
 * @param original 
 * @param defaults 
 */
export function mergeWithDefaults<T extends object>(original: Partial<T>, defaults: T): T {

    const o: any = original;
    const d: any = defaults;
    const merge: any = shallowCopyOwnProperties(original);

    Object.getOwnPropertyNames(defaults).forEach((name) => {
        merge[name] = Object.hasOwnProperty(name) ? o[name] : d[name];
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