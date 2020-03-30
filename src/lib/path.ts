import * as fs from "fs";

/**
 * contains path manipulation functions
 * @public
 */
export namespace path {
    /**
     * is the path a directory?
     *
     * @param path - path to test
     * @returns true when the path is a directory
     * @public
     */
    export function isDirectory(path: string): boolean {
        return fs.lstatSync(path).isDirectory();
    }

    /**
     * is the path a file?
     *
     * @param path - path to test
     * @returns true when the path is a file
     * @public
     */
    export function isFile(path: string): boolean {
        return fs.lstatSync(path).isFile();
    }

    /**
     * does the path exist?
     * @param path - string path
     * @public
     */
    export function exists(path: string): boolean {
        return fs.existsSync(path);
    }
}
