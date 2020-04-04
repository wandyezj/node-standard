import { isLowerCase } from "./isLowerCase";
import { isUpperCase } from "./isUpperCase";

/**
 * is a words first character uppercase and is a following character not upper case?
 * true: \{`A`, `Aa`, `.A`, `.a`, `A.`, `AaA`\}
 * false: \{`a`, `aA`, `AA`\}
 * @param word - string to check is capitalized
 * @public
 */
export function isCapitalized(word: string): boolean {
    return (
        (word &&
            ((word.length === 1 && isUpperCase(word[0])) ||
                (word.length > 1 &&
                    isUpperCase(word[0]) &&
                    isLowerCase(word[1])))) === true
    );
}
