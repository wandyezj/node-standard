import { joinWords } from "./joinWords";
import { capitalize } from "./capitalize";


/**
 * PascalCase
 * splits on spaces and capitalizes words in between
 * @param string 
 */
export function pascalCase(string: string): string {
    string = joinWords(string)
    return capitalize(string);
}
