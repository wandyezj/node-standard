import * as fs from "fs";
import { isDirectory } from "./isDirectory";

/**
 * does a directory exist at the path?
 * note: returns false if a directory exists at the path
 * @param path - path of directory
 * @returns true when the path is a directory
 * @public
 */
export function directoryExists(path: string): boolean {
    return fs.existsSync(path) && isDirectory(path);
}
