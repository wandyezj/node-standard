import { directoryDirectoryNames } from "./directoryDirectoryNames";
import { join } from "path";

/**
 * get the names of the directories in a directory
 * @param path - path to get the directories from
 * @public
 */
export function directoryDirectoryPaths(path: string): string[] {
    const names = directoryDirectoryNames(path);
    const paths = names.map((name: string) => join(path, name));
    return paths;
}
