import * as fs from "fs";

/**
 * is the path a directory?
 * @param path
 * @returns true when the path is a directory
 */
export function isDirectory(path: string): boolean {
    return fs.lstatSync(path).isDirectory();
}

/**
 * is the path a file?
 * @param path
 * @returns true when the path is a file
 */
export function isFile(path: string): boolean {
    return fs.lstatSync(path).isFile();
}

/**
 * does the path exist?
 * @param path
 */
export function exists(path: string): boolean {
    return fs.existsSync(path);
}
