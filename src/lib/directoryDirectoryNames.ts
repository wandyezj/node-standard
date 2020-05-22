import { isDirectory } from "./isDirectory";
import { join } from "path";
import { readdirSync } from "fs";

/**
 * get subdirectory names that exist in the provided directory path
 * @param path - path of the directory to get the sub directories of
 * @returns directory names
 */
export function directoryDirectoryNames(path: string): string[] {
    const all = readdirSync(path);
    const directories = all.filter((sub: string) =>
        isDirectory(join(path, sub))
    );
    // paths sorted to enforce determinism
    return directories.sort();
}
