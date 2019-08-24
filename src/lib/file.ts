// file manipulation
// designed to work exclusively with text based files

import * as fs from "fs";
import * as standardString from "./string";
import * as standardList from "./list";
import * as standardPath from "./path";

/**
 * Read utf-8 file and transform to standard new lines.
 * @param path
 */
export function read(path: string): string {
    const string: string = fs.readFileSync(path, "utf-8");
    const clean = standardString.standardizeNewlines(string);
    return clean;
}

/**
 * write data to path with standard newlines.
 * @param path file path
 * @param data
 */
export function write(path: string, string: string): void {
    const clean = standardString.standardizeNewlines(string);
    fs.writeFileSync(path, clean);
}

/**
 * Read utf-8 file and transform to standard new lines.
 * @param path file path
 */
export function readLines(path: string): string[] {
    return read(path).split("\n");
}

/**
 * Read utf-8 file and transform to standard new lines.
 * @param path file path
 * @param lines
 */
export function writeLines(path: string, lines: string[]) {
    const string: string = lines.join("\n");
    write(path, string);
}

/**
 * Read a file that contains json and turn it into an object
 *
 * Note: no validation is done on the data.
 * TODO: add validation of json to ensure it conforms to schema to type.
 *
 * @param path path to the json file
 */
export function readJson<T>(path: string): T {
    const data: string = read(path);
    const object: T = JSON.parse(data);
    return object;
}

/**
 * Transform a data object to a string and write it to the specified path.
 * @param path
 * @param object
 */
export function writeJson(path: string, object: object): void {
    const json: string = JSON.stringify(object, undefined, 2);
    write(path, json);
}

/**
 * reads lines from a file and removes the ones that are whitespace.
 * @param path
 */
export function readList(path: string): string[] {
    const data: string = read(path);
    return standardList.removeEmpty(standardString.lineSplit(data));
}

/**
 * write a list to a file
 * @param path
 * @param data
 */
export function writeList(path: string, list: readonly string[]): void {
    const joined: string = list.join("\n");
    write(path, joined);
}

/**
 * Removes all duplicates from the list before writing it.
 *
 * @param path path to write the list file to
 * @param data list of paths to write
 */
export function writeListUnique(path: string, list: readonly string[]): void {
    const unique: string[] = standardList.removeDuplicates(list);
    writeList(path, unique);
}

/**
 * does a file exist at the path?
 * note: returns false if the path exists but it is not a file
 * @param path
 * @returns true when the path is a file
 */
export function exists(path: string): boolean {
    return fs.existsSync(path) && standardPath.isFile(path);
}

export function remove(path: string): void {
    fs.unlinkSync(path);
}

/**
 *
 * @param pathA
 * @param pathB
 */
export function equivalent(pathA: string, pathB: string): boolean {
    if (fs.lstatSync(pathA).size !== fs.lstatSync(pathB).size) {
        return false;
    }

    // compare file contents
    const dataA = read(pathA);
    const dataB = read(pathB);

    // if (dataA !== dataB) {
    //     console.log(dataA);
    //     console.log();
    //     console.log(dataB);
    // }

    return dataA === dataB;
}
