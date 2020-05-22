import { equivalentFiles } from "./equivalentFiles";
import { equivalentLists } from "./equivalentLists";
import { directoryFilePaths } from "./directoryFilePaths";
import { directoryFileNames } from "./directoryFileNames";

/**
 * checks that two directories contain equivalent contents
 * @param folderA - directory path
 * @param folderB - directory path
 * @public
 */
export function equivalentDirectoryFiles(
    folderA: string,
    folderB: string
): boolean {
    const fileNamesA = directoryFileNames(folderA);
    const fileNamesB = directoryFileNames(folderB);

    if (!equivalentLists(fileNamesA, fileNamesB)) {
        // console.log("Different files are present");
        // console.log(a);
        // console.log(b);
        return false;
    }

    // check that file contents are equivalent
    const filesA = directoryFilePaths(folderA);
    const filesB = directoryFilePaths(folderB);

    if (!fileListsEqual(filesA, filesB)) {
        console.log("File lists not equal");
        console.log(folderA);
        console.log(folderB);
        return false;
    }

    return true;
}

/**
 * checks that two file lists are equivalent
 * have the same files and the files have the same contents
 * @param a - list of file paths
 * @param b - list of file paths
 * @public
 */
function fileListsEqual(a: string[], b: string[]): boolean {
    // Check that the files are actually equal
    for (let i = 0; i < a.length; i++) {
        const fileA = a[i];
        const fileB = b[i];

        if (!equivalentFiles(fileA, fileB)) {
            // console.log("Files are not equal");
            // console.log(fileA);
            // console.log(fileB);
            return false;
        }
    }

    return true;
}
