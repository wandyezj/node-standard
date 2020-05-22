import { unlinkSync } from "fs";
/**
 * removes a file
 * @param path - path to remove
 * @public
 */
export function removeFile(path: string): void {
    unlinkSync(path);
}
