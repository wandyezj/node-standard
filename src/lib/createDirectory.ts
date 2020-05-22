import { pathExists } from "./pathExists";
import { directoryExists } from "./directoryExists";
import { mkdirSync } from "fs";

/**
 * ensure that the path directory is created
 * throws if the path is not a directory or was not created
 * @param path - path of the directory to create
 * @public
 */
export function createDirectory(path: string): void {
    if (directoryExists(path)) {
        // is a directory
        return;
    }

    if (pathExists(path)) {
        throw "path exists and is not a directory";
    }

    mkdirSync(path, { recursive: true });

    if (!directoryExists(path)) {
        throw "directory could not be created";
    }
}
