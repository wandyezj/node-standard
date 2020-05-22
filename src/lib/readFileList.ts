import { listWithoutDuplicateElements, lineSplit } from "..";
import { readFileText } from "./readFileText";

/**
 * reads lines from a file and removes the ones that are whitespace.
 * @param path - path to read the file from
 * @public
 */
export function readFileList(path: string): string[] {
    const data: string = readFileText(path);
    return listWithoutDuplicateElements(lineSplit(data));
}
