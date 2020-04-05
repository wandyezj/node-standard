import { existsSync } from "fs";
import { isFile } from "./isFile";
/**
 * does a file exist at the path?
 * note: returns false if the path exists but it is not a file
 * @param path - path to check if exists
 * @returns true when the path is a file
 * @public
 */
export function exists(path: string): boolean {
    return existsSync(path) && isFile(path);
}
