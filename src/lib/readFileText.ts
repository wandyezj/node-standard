import { standardizeNewlines } from "..";
import * as fs from "fs";

/**
 * Read utf-8 file and transform to standard new lines.
 * @param path - path of the file to read
 * @public
 */
export function readFileText(path: string): string {
    let string: string = fs.readFileSync(path, "utf-8");

    // remove the BOM
    // https://en.wikipedia.org/wiki/Byte_order_mark
    // The BOM is generally unexpected in text files and causes JSON.parse to fail.
    // U+FEFF is the Byte Order Mark for UTF-8
    string = string.replace(/^\uFEFF/, "");

    const clean = standardizeNewlines(string);
    return clean;
}
