/**
 * are a strings [a-z] letters all upper case?
 * @param string - the string to check
 * @returns true if all [a-z] characters in the string are upper case
 * @public
 */
export function isUpperCase(string: string): boolean {
    return string === string.toUpperCase();
}
