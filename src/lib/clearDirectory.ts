import { createDirectory } from "./createDirectory";
import { removeDirectory } from "./removeDirectory";

/**
 * delete the directory and recreate it to ensure it is free of items
 * note: can only handle directories that only contain files and directories
 * @param path - path to remove contents from
 * @public
 */
export function clearDirectory(path: string): void {
    removeDirectory(path);
    createDirectory(path);
}
