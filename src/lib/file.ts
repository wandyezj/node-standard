// file manipulation
// designed to work exclusively with text based files

import * as fs from "fs";
import { path as standardPath } from "./path";
import { standardizeNewlines } from "./standardizeNewlines";
import { listWithoutDuplicateElements } from "./listWithoutDuplicateElements";
import { lineSplit } from "./lineSplit";

/**
 * contains file manipulation functions
 * @public
 */
export namespace file {
    /**
     * Read utf-8 file and transform to standard new lines.
     * @param path - path of the file to read
     * @public
     */
    export function read(path: string): string {
        let string: string = fs.readFileSync(path, "utf-8");

        // remove the BOM
        // https://en.wikipedia.org/wiki/Byte_order_mark
        // The BOM is generally unexpected in text files and causes JSON.parse to fail.
        // U+FEFF is the Byte Order Mark for UTF-8
        string = string.replace(/^\uFEFF/, "");

        const clean = standardizeNewlines(string);
        return clean;
    }

    /**
     * write data to path with standard newlines.
     * @param path - file path
     * @param data - string data to write
     * @public
     */
    export function write(path: string, string: string): void {
        const clean = standardizeNewlines(string);
        fs.writeFileSync(path, clean);
    }

    /**
     * Read utf-8 file and transform to standard new lines.
     * @param path - file path
     * @public
     */
    export function readLines(path: string): string[] {
        return read(path).split("\n");
    }

    /**
     * Read utf-8 file and transform to standard new lines.
     * @param path - file path
     * @param lines - lines to write
     * @public
     */
    export function writeLines(path: string, lines: string[]) {
        const string: string = lines.join("\n");
        write(path, string);
    }

    /**
     * Read a file that contains JSON and turn it into an object
     *
     * Note: no validation is done on the data.
     * TODO: add validation of JSON to ensure it conforms to schema to type.
     *
     * @param path - path to the JSON file
     * @public
     */
    export function readJson<T>(path: string): T {
        const data: string = read(path);
        const object: T = JSON.parse(data);
        return object;
    }

    /**
     * Transform a data object to a string and write it to the specified path.
     * @param path - path to write the file to
     * @param object - object to transform to JSON and write
     * @public
     */
    export function writeJson(path: string, object: object): void {
        const json: string = JSON.stringify(object, undefined, 2);
        write(path, json);
    }

    /**
     * reads lines from a file and removes the ones that are whitespace.
     * @param path - path to read the file from
     * @public
     */
    export function readList(path: string): string[] {
        const data: string = read(path);
        return listWithoutDuplicateElements(lineSplit(data));
    }

    /**
     * write a list to a file
     * @param path - path to write the file to
     * @param list - string list to write to the file
     * @public
     */
    export function writeList(path: string, list: readonly string[]): void {
        const joined: string = list.join("\n");
        write(path, joined);
    }

    /**
     * Removes all duplicates from the list before writing it.
     *
     * @param path - path to write the list file to
     * @param data - list of paths to write
     * @public
     */
    export function writeListUnique(
        path: string,
        list: readonly string[]
    ): void {
        const unique: string[] = listWithoutDuplicateElements(list);
        writeList(path, unique);
    }

    /**
     * Reads a CSV file (does not handle complex CSVs, only splits on `,`)
     * splits each line on commas
     * @param path - file to read
     * @public
     */
    export function readCsv(path: string): string[][] {
        const lines = readList(path);

        const csvLines = lines.map((line) => {
            return line.split(",");
        });

        return csvLines;
    }

    /**
     * Writes a CSV file
     * Joins all lists on comma and writes the lines.
     * @param path - path to write to
     * @param values - values to write
     * @public
     */
    export function writeCsv(path: string, values: readonly string[][]) {
        const lines = values.map((line) => line.join(","));
        writeList(path, lines);
    }

    /**
     * does a file exist at the path?
     * note: returns false if the path exists but it is not a file
     * @param path - path to check if exists
     * @returns true when the path is a file
     * @public
     */
    export function exists(path: string): boolean {
        return fs.existsSync(path) && standardPath.isFile(path);
    }

    export function remove(path: string): void {
        fs.unlinkSync(path);
    }

    /**
     * checks if two files are equivalent
     * @param pathA - path of a file
     * @param pathB - path of a file
     * @public
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
}
