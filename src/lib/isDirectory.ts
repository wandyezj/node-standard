import {lstatSync} from "fs";
/**
 * is the path a directory?
 * @param path
 * @returns true when the path is a directory
 */
export function isDirectory(path: string): boolean {
    return lstatSync(path).isDirectory();
}