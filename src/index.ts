// standard set of functions for doing basic things.

// file

export { readFileText } from "./lib/readFileText";
export { writeFileText } from "./lib/writeFileText";
export { readFileJson } from "./lib/readFileJson";
export { writeFileJson } from "./lib/writeFileJson";
export { readFileLines } from "./lib/readFileLines";
export { writeFileLines } from "./lib/WriteFileLines";
export { readFileList } from "./lib/readFileList";
export { writeFileList } from "./lib/writeFileList";
export { writeFileListUnique } from "./lib/writeFileListUnique";
export { removeFile } from "./lib/removeFile";
export { writeFileCsv } from "./lib/writeFileCsv";
export { readFileCsv } from "./lib/readFileCsv";

// Numbers
export { isNumberInRange } from "./lib/isNumberInRange";
export { isNaturalNumber as isWholeNumber } from "./lib/isNaturalNumber";

// Asserts
export {
    assertParameterIsNaturalNumber,
} from "./lib/assertParameterIsNaturalNumber";
export {
    assertParameterIsNaturalNumberInRange,
} from "./lib/assertParameterIsNaturalNumberInRange";

// Strings
export { trimEndAllLines } from "./lib/trimEndAllLines";
export { indent, IndentOptions } from "./lib/indent";
export { snakeCase } from "./lib/snakeCase";
export { pascalCase } from "./lib/pascalCase";
export { camelCase } from "./lib/camelCase";
export { standardizeNewlines } from "./lib/standardizeNewlines";
export { lineSplit } from "./lib/lineSplit";
export { letterHeader } from "./lib/letterHeader";
export { insertTabs } from "./lib/insertTabs";
export { capitalize } from "./lib/capitalize";
export { decapitalize } from "./lib/decapitalize";
export { isCapitalized } from "./lib/isCapitalized";
export { isLowerCase } from "./lib/isLowerCase";
export { isUpperCase } from "./lib/isUpperCase";

export { asciiLowercase } from "./lib/asciiLowercase";
export { asciiUppercase } from "./lib/asciiUppercase";
export { asciiLetters } from "./lib/asciiLetters";
export { digits } from "./lib/digits";
export { punctuation } from "./lib/punctuation";
export { octdigits } from "./lib/octdigits";

// Lists
export { equivalentLists as listsEquivalent } from "./lib/equivalentLists";
export {
    listWithoutDuplicateElements,
} from "./lib/listWithoutDuplicateElements";
export {
    listWithoutWhitespaceElements,
} from "./lib/listWithoutWhitespaceElements";

// Objects
export { mergeWithDefaults } from "./lib/mergeWithDefaults";
