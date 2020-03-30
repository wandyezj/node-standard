// standard set of functions for doing basic things.

import {path} from "./lib/path";
import {directory} from "./lib/directory";
import {file} from "./lib/file";

// Numbers
import {isNumberInRange} from "./lib/isNumberInRange";
import {isWholeNumber} from "./lib/isWholeNumber";

// Strings
import {trimEndAllLines} from "./lib/trimEndAllLines";
import {indent, IndentOptions} from "./lib/indent";
import {asciiLowercase} from "./lib/asciiLowercase";
import {asciiUppercase} from "./lib/asciiUppercase";
import {asciiLetters} from "./lib/asciiLetters";
import {digits} from "./lib/digits";

// Objects
import {mergeWithDefaults} from "./lib/mergeWithDefaults"



export {
    path,
    directory,
    file,
    // Numbers
    isNumberInRange,
    isWholeNumber,

    // Strings
    trimEndAllLines,
    indent,
    IndentOptions,
    asciiLetters,
    asciiLowercase,
    asciiUppercase,
    digits,

    // Objects
    mergeWithDefaults,
};


// import * as list from "./lib/list";
// import * as string from "./lib/string";
// import * as object from "./lib/object";
// import * as number from "./lib/isPositiveNumber";
// import * as parameter from "./lib/assertParameter";
// import * as path from "./lib/path";
// import * as file from "./lib/file";
// import * as directory from "./lib/directory";
// import * as math from "./lib/degreesToRadians";

// export { list, string, object, parameter, number, path, file, directory, math };

// import {removeDuplicates, removeEmpty, equivalent} from "./lib/list";

// export {removeDuplicates, removeEmpty, equivalent}
