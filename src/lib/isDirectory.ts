import { lstatSync } from "fs";

/**
 * is the path a directory?
 *
 * @param path - path to test
 * @returns true when the path is a directory
 * @public
 */
export function isDirectory(path: string): boolean {
    return lstatSync(path).isDirectory();
}
