import { directoryFileNames } from "./directoryFileNames";
import { join } from "path";
/**
 * get all paths to files present in the directory
 * @param path - path of directory
 * @returns list of all paths to files in the directory
 * @public
 */
export function directoryFilePaths(path: string): string[] {
    const names = directoryFileNames(path);
    const paths = names.map((name: string) => join(path, name));
    return paths;
}
