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
 * @param count the number of tabs to use
 */
export function insertTabs(string: string, count: number = 1): string {
    const tabs = "\t".repeat(count);
    return `${tabs}${string.replace(/\n/g, `\n${tabs}`)}`;
}
