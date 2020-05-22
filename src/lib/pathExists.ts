import { existsSync } from "fs";

/**
 * does the path exist?
 * @param path - string path
 * @public
 */
export function pathExists(path: string): boolean {
    return existsSync(path);
}
