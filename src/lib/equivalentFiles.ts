import { readFileText } from "./readFileText";
import * as fs from "fs";
/**
 * checks if two files are equivalent
 * @param pathA - path of a file
 * @param pathB - path of a file
 * @public
 */
export function equivalentFiles(pathA: string, pathB: string): boolean {
    if (fs.lstatSync(pathA).size !== fs.lstatSync(pathB).size) {
        return false;
    }

    // compare file contents
    const dataA = readFileText(pathA);
    const dataB = readFileText(pathB);

    // if (dataA !== dataB) {
    //     console.log(dataA);
    //     console.log();
    //     console.log(dataB);
    // }

    return dataA === dataB;
}
