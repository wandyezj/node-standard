import { lineSplit } from "./lineSplit";

/**
 * remove whitespace from the end of all lines
 * @param string - string to trim all end lines from
 * @public
 */
export function trimEndAllLines(string: string) {
    return lineSplit(string)
        .map((line) => line.trimEnd())
        .join("\n");
}
