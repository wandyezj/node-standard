import { lineSplit } from "./lineSplit";

/**
 * remove whitespace from the end of all lines
 * @param string 
 */
export function trimEndAllLines(string: string) {
    return lineSplit(string).map((line) => line.trimEnd()).join("\n");
}