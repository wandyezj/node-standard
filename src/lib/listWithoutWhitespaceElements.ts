/**
 * trims all strings and removes all strings that are pure whitespace from the list.
 * @public
 * @param original - list of strings.
 * @returns a list based on the original with all strings trimmed and any empty strings removed.
 */
export function listWithoutWhitespaceElements(original: readonly string[]): string[] {
    const whitespaceRemoved = original.map((x) => x.trim());
    const emptyRemoved = whitespaceRemoved.filter((x) => x !== "");
    return emptyRemoved;
}
