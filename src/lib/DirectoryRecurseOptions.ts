export interface DirectoryRecurseOptions {
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
