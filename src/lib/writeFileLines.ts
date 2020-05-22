import { writeFileText } from "./writeFileText";

/**
 * Read utf-8 file and transform to standard new lines.
 * @param path - file path
 * @param lines - lines to write
 * @public
 */
export function writeFileLines(path: string, lines: string[]) {
    const string: string = lines.join("\n");
    writeFileText(path, string);
}
