/**
 * are a strings [a-z] letters all lower case?
 * @param string - the string to check
 * @returns true if all [a-z] characters in the string are lower case
 * @public
 */
export function isLowerCase(word: string): boolean {
    return word.toLowerCase() === word;
}
