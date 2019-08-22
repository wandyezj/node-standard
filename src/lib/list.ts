// list manipulation

/**
 * trims all strings and removes all strings that are pure whitespace from the list.
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


export function equivalent(a: string[], b: string[]): boolean {

    if (a.length !== b.length) {
        return false;
    }

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
}

// visualize whitespace . = ' ' , ---- = '\t'