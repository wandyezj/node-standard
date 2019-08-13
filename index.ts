import * as fs from "fs";
import * as path from "path";

/**
 * Standard set of functions for doing basic things related to:
 * * string manipulation
 * * list manipulation
 * * reading and writing files
 *
 * These function should be generic and not coupled to anything specific in typescript definition language.
 */

// string manipulation

/**
 * standardize newlines to proper unix line endings
 * @param s string to standardize
 */
export function standardizeNewlines(s: string): string {
    return s.replace(/\r/gm, "");
}


export function lineSplit(data: string): string[] {
    return standardizeNewlines(data).split("\n");
}

/**
 * Inserts numTabs number of tabs in front of every line in str.
 * @param str The string to insert tabs in front of.
 * @param numTabs The number of tabs to use.
 */
export function insertTabs(str: string, numTabs: number = 1): string {
    const tabs = "\t".repeat(numTabs);
    return `${tabs}${str.replace(/\n/g, `\n${tabs}`)}`;
}

// list manipulation

/**
 * Remove all strings that are whitespace from the list.
 * @param list list of strings.
 */
export function removeEmpty(list: string[]): string[] {
    return list.map(
        (x) => x.trim()
    ).filter(
        (x) => x !== ""
    );
}

export function removeDuplicates<T>(data: T[]): T[] {

    // only take the first item
    return data.filter(
        (value: T, index: number, array: T[]) => array.indexOf(value) === index
    );
}

// reading and writing files

/**
 * Read utf-8 file and transform to standard new lines.
 * @param path file path
 */
export function readFile(path: string): string {
    return standardizeNewlines(fs.readFileSync(path, "utf-8"));
}

/**
 * write data to path with standard newlined.
 * @param path 
 * @param data 
 */
export function writeFile(path: string, data: string) {
    const cleanData = standardizeNewlines(data);
    fs.writeFileSync(path, cleanData);
}

/**
 * Read utf-8 file and transform to standard new lines.
 * @param path file path
 */
export function readFileLines(path: string): string[] {
    return readFile(path).split("\n");
}

/**
 * Read utf-8 file and transform to standard new lines.
 * @param path file path
 */
export function writeFileLines(path: string, lines: string[]) {
    writeFile(path, lines.join("\n"));
}

/**
 * Read a file that contains json and turn it into an object
 *
 * Note: no validation is done on the data.
 * TODO: add validation of json to ensure it conforms to schema to type.
 *
 * @param path path to the json file
 */
export function readFileJson<T>(path: string): T {
    const data: string = readFile(path);
    const object: T = JSON.parse(data);
    return object;
}

/**
 * Transform a data object to a string and write it to the specified path.
 * @param path 
 * @param data 
 */
export function writeFileJson(path: string, data: {}): void {
    const json: string = JSON.stringify(data, undefined, 2);
    writeFile(path, json);
}

/**
 * reads lines from a file and removes the ones that are whitespace.
 * @param path 
 */
export function readFileList(path: string): string[] {
    const data: string = readFile(path);
    return removeEmpty(lineSplit(data));
}

/**
 * write a list to a file
 * @param path 
 * @param data 
 */
export function writeFileList(path: string, data: string[]): void {
    const joined: string = data.join("\n");
    writeFile(path, joined);
}

/**
 * Removes all duplicates from the list before writing it.
 *
 * @param path path to write the list file to
 * @param data list of paths to weite
 */
export function writeFileListUnique(path: string, data: string[]): void {
    const unique: string[] = removeDuplicates(data);
    writeFileList(path, unique);
}

export function IsDirectory(directory: string): boolean {
    return fs.lstatSync(directory).isDirectory();
}

export function IsFile(file: string): boolean {
    return fs.lstatSync(file).isFile();
}

export function getSubDirectories(directory: string): string[] {
    const all = fs.readdirSync(directory);
    const directories = all.filter((sub) => IsDirectory(path.join(directory, sub)));
    return directories.sort();
}

export function getFilesInDirectory(directory: string): string[] {
    const all = fs.readdirSync(directory);
    const files = all.filter((file) => IsFile(path.join(directory, file)));
    return files.sort();
}