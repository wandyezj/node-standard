import { DirectoryRecurseOptions } from "./DirectoryRecurseOptions";
import { directoryRecurse } from "./directoryRecurse";

/**
 * gets subdirectory paths relative to the root
 * @param rootPath - starting directory
 * @returns all relative sub directory names
 * @public
 */
export function directoryDirectoriesRecursive(rootPath: string): string[] {
    const directories: string[] = [];

    const options: DirectoryRecurseOptions = {
        onDirectory: (directory: string) => {
            directories.push(directory.slice(rootPath.length));
        },
    };

    directoryRecurse(rootPath, options);

    return directories;
}
