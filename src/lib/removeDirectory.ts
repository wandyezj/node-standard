import { directoryExists } from "./directoryExists";
import { removeFile } from "./removeFile";
import { rmdirSync } from "fs";
import { DirectoryRecurseOptions } from "./DirectoryRecurseOptions";
import { directoryRecurse } from "./directoryRecurse";

/**
 * ensures that a directory only filled with files and directories is removed
 * recursively removes all files and subdirectories as well as the root directory
 * @param path - path to remove
 * @public
 */
export function removeDirectory(path: string): void {
    if (!directoryExists(path)) {
        // nothing needs to be done the path has already been removed
        return;
    }
    // need to recursively delete items in the directory

    // can only delete an empty directory

    const options: DirectoryRecurseOptions = {
        onFile: (path: string) => {
            removeFile(path);
        },
        onAfterDirectories: (path: string) => {
            rmdirSync(path);
        },
    };

    directoryRecurse(path, options);
}
