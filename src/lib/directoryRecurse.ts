import { directoryExists } from "./directoryExists";
import { directoryDirectoryPaths } from "./directoryDirectoryPaths";
import { DirectoryRecurseOptions } from "./DirectoryRecurseOptions";
import { directoryFilePaths } from "./directoryFilePaths";

/**
 * calls functions over files and directories
 * calls the onDirectory function for the directory, then it's files, then all subdirectories and so on
 * goes through files then directories in alphabetical order
 * @param path - directory to start in
 * @param options - recurse options
 * @public
 */
export function directoryRecurse(
    path: string,
    options: DirectoryRecurseOptions
): void {
    if (!directoryExists(path)) {
        throw `invalid directory: ${path}`;
    }

    const onDirectory = options.onDirectory;
    if (onDirectory !== undefined) {
        onDirectory(path);
    }

    const onFile = options.onFile;
    if (onFile !== undefined) {
        // go through all files
        directoryFilePaths(path).forEach((filePath) => onFile(filePath));
    }

    // recurse through all directories
    directoryDirectoryPaths(path).forEach((directory) =>
        directoryRecurse(directory, options)
    );

    const onAfterDirectories = options.onAfterDirectories;
    if (onAfterDirectories !== undefined) {
        onAfterDirectories(path);
    }
}
