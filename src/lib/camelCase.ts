import { decapitalize } from "./decapitalize";
import { pascalCase } from "./pascalCase";

/**
 * camelCase
 * splits on spaces and capitalizes words in between
 * @param string - string to camelCase
 * @returns camel case version of the string
 * @public
 */
export function camelCase(string: string): string {
    string = pascalCase(string);
    return decapitalize(string);
}
