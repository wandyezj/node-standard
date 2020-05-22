import { existsSync } from "fs";
import { equivalentLists } from "./equivalentLists";
import { equivalentDirectoryFiles } from "./equivalentDirectoryFiles";
import { join } from "path";
import { directoryDirectoriesRecursive } from "./directoryDirectoriesRecursive";
/**
 * Checks recursively that the contents of folderA are exactly equivalent to folderB
 *
 * Checks that all the same files exist and the file contents are the same.
 *
 * @param pathA - folder to compare
 * @param pathB - folder to compare
 * @returns true if folders contain the exact same subfolders and files and the files contents are the same.
 * @public
 */
export function equivalentDirectories(pathA: string, pathB: string): boolean {
    if (!existsSync(pathA)) {
        throw `Comparison folder does not exist: ${pathA}`;
    }

    if (!existsSync(pathB)) {
        throw `Comparison folder does not exist: ${pathB}`;
    }

    const subdirectoriesA = directoryDirectoriesRecursive(pathA);
    const subdirectoriesB = directoryDirectoriesRecursive(pathB);

    if (!equivalentLists(subdirectoriesA, subdirectoriesB)) {
        // Different subdirectories are present

        console.log("Different subdirectories are present");
        // console.log(subdirectoriesA);
        // console.log(subdirectoriesB);
        return false;
    }

    // Check that root folders have equivalent files
    if (!equivalentDirectoryFiles(pathA, pathB)) {
        console.log("root directory files not equal");
        return false;
    }

    // Check that all the subfolders have equivalent files
    for (let i = 0; i < subdirectoriesA.length; i++) {
        const subA = subdirectoriesA[i];
        const subB = subdirectoriesB[i];

        const directoryA = join(pathA, subA);
        const directoryB = join(pathB, subB);

        if (!equivalentDirectoryFiles(directoryA, directoryB)) {
            return false;
        }
    }

    return true;
}
