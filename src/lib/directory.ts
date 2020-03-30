// directory manipulation

import * as fs from "fs";
import * as nodePath from "path";
import * as standard from "../index";
import { listsEquivalent } from "./listsEquivalent";

export namespace directory {
    /**
     * get subdirectory names that exist in the provided directory path
     * @param path path of the directory to get the sub directories of
     * @returns directory names
     */
    export function directoryNames(path: string): string[] {
        const all = fs.readdirSync(path);
        const directories = all.filter((sub: string) =>
            standard.path.isDirectory(nodePath.join(path, sub))
        );
        // paths sorted to enforce determinism
        return directories.sort();
    }

    export function directories(path: string): string[] {
        const names = directoryNames(path);
        const paths = names.map((name: string) => nodePath.join(path, name));
        return paths;
    }

    /**
     * retrieves the file names present in the directory
     * @param path path of the directory to get the files in
     * @returns list of file names in the directory
     */
    export function fileNames(path: string): string[] {
        const all = fs.readdirSync(path);
        const files = all.filter((file: string) =>
            standard.path.isFile(nodePath.join(path, file))
        );
        // paths are sorted because determinism is convenient for testing and reproduction of issues.
        return files.sort();
    }

    /**
     * get all paths to files present in the directory
     * @param path path of directory
     * @returns list of all paths to files in the directory
     */
    export function files(path: string): string[] {
        const names = fileNames(path);
        const paths = names.map((name: string) => nodePath.join(path, name));
        return paths;
    }

    /**
     * does a file exist at the path?
     * note: returns false if a directory exists at the path
     * @param path
     * @returns true when the path is a directory
     */
    export function exists(path: string): boolean {
        return fs.existsSync(path) && standard.path.isDirectory(path);
    }

    /**
     * ensure that the path directory is created
     * @param path
     * @throws if the path is not a directory or was not created
     */
    export function create(path: string): void {
        if (standard.directory.exists(path)) {
            // is a directory
            return;
        }

        if (standard.path.exists(path)) {
            throw "path exists and is not a directory";
        }

        fs.mkdirSync(path, { recursive: true });

        if (!standard.directory.exists(path)) {
            throw "directory could not be created";
        }
    }

    /**
     * ensures that a directory only filled with files and directories is removed
     * recursively removes all files and subdirectories as well as the root directory
     * @param path
     */
    export function remove(path: string): void {
        if (!exists(path)) {
            // nothing needs to be done the path has already been removed
            return;
        }
        // need to recursively delete items in the directory

        // can only delete an empty directory

        const options: RecurseOptions = {
            onFile: (path: string) => {
                standard.file.remove(path);
            },
            onAfterDirectories: (path: string) => {
                fs.rmdirSync(path);
            },
        };

        recurse(path, options);
    }

    /**
     * delete the directory and recreate it to ensure it is free of items
     * note: can only handle directories that only contain files and directories
     * @param path
     */
    export function clear(path: string): void {
        standard.directory.remove(path);
        standard.directory.create(path);
    }

    export interface RecurseOptions {
        /**
         * callback for each file in the directory
         */
        onFile?: (path: string) => void;

        /**
         * callback for each directory in the directory
         */
        onDirectory?: (path: string) => void;

        /**
         * callback after all files and all sub directories are read, takes the path of the fully read directory
         */
        onAfterDirectories?: (path: string) => void;

        /**
         * if the recursion should exit early
         */
        //stop?: (path: string) => boolean;
    }

    /**
     * calls functions over files and directories
     * calls the onDirectory function for the directory, then it's files, then all subdirectories and so on
     * goes through files then directories in alphabetical order
     * @param path directory to start in
     * @param options
     */
    export function recurse(path: string, options: RecurseOptions): void {
        if (!standard.directory.exists(path)) {
            throw `invalid directory: ${path}`;
        }

        const onDirectory = options.onDirectory;
        if (onDirectory !== undefined) {
            onDirectory(path);
        }

        const onFile = options.onFile;
        if (onFile !== undefined) {
            // go through all files
            standard.directory
                .files(path)
                .forEach((filePath) => onFile(filePath));
        }

        // recurse through all directories
        standard.directory
            .directories(path)
            .forEach((directory) => recurse(directory, options));

        const onAfterDirectories = options.onAfterDirectories;
        if (onAfterDirectories !== undefined) {
            onAfterDirectories(path);
        }
    }

    /**
     * gets subdirectory paths relative to the root
     * @param rootPath
     * @returns all relative sub directory names
     */
    function getAllSubDirectoriesRecursive(rootPath: string): string[] {
        const directories: string[] = [];

        const options: RecurseOptions = {
            onDirectory: (directory: string) => {
                directories.push(directory.slice(rootPath.length));
            },
        };

        recurse(rootPath, options);

        return directories;
    }

    /**
     * Checks recursively that the contents of folderA are exactly equivalent to folderB
     *
     * Checks that all the same files exist and the file contents are the same.
     *
     * @param pathA folder to compare
     * @param pathB folder to compare
     * @returns true if folders contain the exact same subfolders and files and the files contents are the same.
     */
    export function equivalent(pathA: string, pathB: string): boolean {
        if (!fs.existsSync(pathA)) {
            throw `Comparison folder does not exist: ${pathA}`;
        }

        if (!fs.existsSync(pathB)) {
            throw `Comparison folder does not exist: ${pathB}`;
        }

        const subdirectoriesA = getAllSubDirectoriesRecursive(pathA);
        const subdirectoriesB = getAllSubDirectoriesRecursive(pathB);

        if (!listsEquivalent(subdirectoriesA, subdirectoriesB)) {
            // Different subdirectories are present

            console.log("Different subdirectories are present");
            // console.log(subdirectoriesA);
            // console.log(subdirectoriesB);
            return false;
        }

        // Check that root folders have equivalent files
        if (!directoryFilesEqual(pathA, pathB)) {
            console.log("root directory files not equal");
            return false;
        }

        // Check that all the subfolders have equivalent files
        for (let i = 0; i < subdirectoriesA.length; i++) {
            const subA = subdirectoriesA[i];
            const subB = subdirectoriesB[i];

            const directoryA = nodePath.join(pathA, subA);
            const directoryB = nodePath.join(pathB, subB);

            if (!directoryFilesEqual(directoryA, directoryB)) {
                return false;
            }
        }

        return true;
    }

    function directoryFilesEqual(folderA: string, folderB: string): boolean {
        const fileNamesA = fileNames(folderA);
        const fileNamesB = fileNames(folderB);

        if (!listsEquivalent(fileNamesA, fileNamesB)) {
            // console.log("Different files are present");
            // console.log(a);
            // console.log(b);
            return false;
        }

        // check that file contents are equivalent
        const filesA = files(folderA);
        const filesB = files(folderB);

        if (!fileListsEqual(filesA, filesB)) {
            console.log("File lists not equal");
            console.log(folderA);
            console.log(folderB);
            return false;
        }

        return true;
    }

    function fileListsEqual(a: string[], b: string[]): boolean {
        // Check that the files are actually equal
        for (let i = 0; i < a.length; i++) {
            const fileA = a[i];
            const fileB = b[i];

            if (!standard.file.equivalent(fileA, fileB)) {
                // console.log("Files are not equal");
                // console.log(fileA);
                // console.log(fileB);
                return false;
            }
        }

        return true;
    }
}
