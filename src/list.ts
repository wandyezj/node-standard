// list manipulation

/**
 * Remove all strings that are whitespace from the list.
 * @param list list of strings.
 */
export function removeEmpty(list: readonly string[]): string[] {
    return list.map(
        (x) => x.trim()
    ).filter(
        (x) => x !== ""
    );
}

/**
 * removes duplicates from the list, comparing using th default comparison operator, keeping only the first occurrence.
 * @param list 
 */
export function removeDuplicates<T>(list: readonly T[]): T[] {

    // only take the first item
    return list.filter(
        (value: T, index: number, array: readonly T[]) => array.indexOf(value) === index
    );
}
