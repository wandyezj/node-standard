// directory manipulation

import * as fs from 'fs';
import * as path from 'path';

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
 * get subdirectory names that exist in the provided directory path
 * @param directory path of the directory to get the sub directories of
 * @returns directory names
 */
export function subDirectories(directory: string): string[] {
    const all = fs.readdirSync(directory);
    const directories = all.filter((sub) => isDirectory(path.join(directory, sub)));
    return directories.sort();
}

/**
 * retrieves the file names present in the directory
 * @param directory path of the directory to get the files in
 * @returns list of file names in the directory
 */
export function files(directory: string): string[] {
    const all = fs.readdirSync(directory);
    const files = all.filter((file) => isFile(path.join(directory, file)));
    // paths are sorted because determinism is convenient for testing and reproduction of issues.
    return files.sort();
}