import { readFileList } from "./readFileList";

/**
 * Reads a CSV file (does not handle complex CSVs, only splits on `,`)
 * splits each line on commas
 * @param path - file to read
 * @public
 */
export function readFileCsv(path: string): string[][] {
    const lines = readFileList(path);

    const csvLines = lines.map((line) => {
        return line.split(",");
    });

    return csvLines;
}
