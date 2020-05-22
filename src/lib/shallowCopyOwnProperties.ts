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
