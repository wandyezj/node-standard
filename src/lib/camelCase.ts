import { joinWords } from "./joinWords";
import { decapitalize } from "./decapitalize";

/**
 * camelCase
 * splits on spaces and capitalizes words in between
 * @param string 
 */
export function camelCase(string: string): string {
    string = joinWords(string)
    return decapitalize(string);
}
