import { joinWords } from "./joinWords";
import { decapitalize } from "./decapitalize";

/**
 * camelCase
 * splits on spaces and capitalizes words in between
 * @param string - string to camelCase
 * @returns camel case version of the string
 * @public
 */
export function camelCase(string: string): string {
    string = joinWords(string);
    return decapitalize(string);
}
