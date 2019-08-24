// string manipulation

/**
 * standardize newlines to proper unix line endings
 * @param string to standardize
 */
export function standardizeNewlines(string: string): string {
    return string.replace(/\r/gm, "");
}

/**
 * split a string into a list of lines
 * @param string
 * @returns list of the individual lines in the string
 */
export function lineSplit(string: string): string[] {
    return standardizeNewlines(string).split("\n");
}

/**
 * inserts tabs in front of every line in s
 * @param string the string to insert tabs in front of
 * @param count whole number of tabs to use.
 */
export function insertTabs(string: string, count: number = 1): string {
    const tabs = "\t".repeat(count);
    return `${tabs}${string.replace(/\n/g, `\n${tabs}`)}`;
}

/**
 * uppercases the first character in a string.
 * in the case that the first character in the string can not be upper cased (for example a white space character or an empty string) the string is unmodified.
 * @param string
 * @returns the string with it's first character upper cased.
 */
export function capitalize(string: string): string {
    if (string.length === 0) {
        return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function escapeRegularExpression(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
