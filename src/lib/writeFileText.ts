import { writeFileSync } from "fs";
import { standardizeNewlines } from "..";

/**
 * write data to path with standard newlines.
 * @param path - file path
 * @param data - string data to write
 * @public
 */
export function writeFileText(path: string, string: string): void {
    const clean = standardizeNewlines(string);
    writeFileSync(path, clean);
}
