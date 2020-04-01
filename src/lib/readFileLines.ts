import { readFileText } from "./readFileText";

/**
 * Read utf-8 file and transform to standard new lines.
 * @param path - file path
 * @public
 */
export function readFileLines(path: string): string[] {
    return readFileText(path).split("\n");
}
