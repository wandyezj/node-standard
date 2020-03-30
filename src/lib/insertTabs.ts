/**
 * inserts tabs in front of every line in s
 * @param string the string to insert tabs in front of
 * @param count whole number of tabs to use.
 */
export function insertTabs(string: string, count: number = 1): string {
    const tabs = "\t".repeat(count);
    return `${tabs}${string.replace(/\n/g, `\n${tabs}`)}`;
}
