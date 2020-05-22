import { readFileText } from "./readFileText";

/**
 * Read a file that contains JSON and turn it into an object
 *
 * Note: no validation is done on the data.
 * TODO: add validation of JSON to ensure it conforms to schema to type.
 *
 * @param path - path to the JSON file
 * @public
 */
export function readFileJson<T>(path: string): T {
    const data: string = readFileText(path);
    const object: T = JSON.parse(data);
    return object;
}
