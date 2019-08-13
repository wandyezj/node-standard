
/**
 * Remove all strings that are whitespace from the list.
 * @param list list of strings.
 */
export function removeEmpty(list: string[]): string[] {
    return list.map(
        (x) => x.trim()
    ).filter(
        (x) => x !== ""
    );
}

export function removeDuplicates<T>(list: T[]): T[] {

    // only take the first item
    return list.filter(
        (value: T, index: number, array: T[]) => array.indexOf(value) === index
    );
}
