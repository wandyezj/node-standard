import { writeFileList } from "./writeFileList";

/**
 * Writes a CSV file
 * Joins all lists on comma and writes the lines.
 * @param path - path to write to
 * @param values - values to write
 * @public
 */
export function writeFileCsv(path: string, values: readonly string[][]) {
    const lines = values.map((line) => line.join(","));
    writeFileList(path, lines);
}
