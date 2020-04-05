/**
 * escapes a string so it can be used as a string in a regular expression constructor
 * @param s - string to escape
 * @public
 */
export function escapeRegularExpression(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
