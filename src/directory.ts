// directory manipulation

import * as fs from 'fs';
import * as nodePath from 'path';
import * as standardPath from './path'

/**
 * get subdirectory names that exist in the provided directory path
 * @param path path of the directory to get the sub directories of
 * @returns directory names
 */
export function subDirectories(path: string): string[] {
    const all = fs.readdirSync(path);
    const directories = all.filter((sub) => standardPath.isDirectory(nodePath.join(path, sub)));
    // paths sorted to enforce determinism
    return directories.sort();
}

/**
 * retrieves the file names present in the directory
 * @param path path of the directory to get the files in
 * @returns list of file names in the directory
 */
export function files(path: string): string[] {
    const all = fs.readdirSync(path);
    const files = all.filter((file) => standardPath.isFile(nodePath.join(path, file)));
    // paths are sorted because determinism is convenient for testing and reproduction of issues.
    return files.sort();
}