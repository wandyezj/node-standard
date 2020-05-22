import { listWithoutDuplicateElements } from "..";
import { writeFileList } from "./writeFileList";

/**
 * Removes all duplicates from the list before writing it.
 *
 * @param path - path to write the list file to
 * @param data - list of paths to write
 * @public
 */
export function writeFileListUnique(
    path: string,
    list: readonly string[]
): void {
    const unique: string[] = listWithoutDuplicateElements(list);
    writeFileList(path, unique);
}
