import * as fs from "fs";
/**
 * removes a file
 * @param path - path to remove
 * @public
 */
export function removeFile(path: string): void {
    fs.unlinkSync(path);
}
