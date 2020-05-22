import { writeFileText } from "./writeFileText";

/**
 * Transform a data object to a string and write it to the specified path.
 * @param path - path to write the file to
 * @param object - object to transform to JSON and write
 * @public
 */
export function writeFileJson(path: string, object: object): void {
    const json: string = JSON.stringify(object, undefined, 2);
    writeFileText(path, json);
}
