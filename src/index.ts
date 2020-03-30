// standard set of functions for doing basic things.

export { path } from "./lib/path";
export { directory } from "./lib/directory";
export { file } from "./lib/file";

// Numbers
export { isNumberInRange } from "./lib/isNumberInRange";
export { isWholeNumber } from "./lib/isWholeNumber";

// Strings
export { trimEndAllLines } from "./lib/trimEndAllLines";
export { indent, IndentOptions } from "./lib/indent";
export { snakeCase } from "./lib/snakeCase";
export { pascalCase } from "./lib/pascalCase";
export { camelCase } from "./lib/camelCase";
export { standardizeNewlines } from "./lib/standardizeNewlines";

export { asciiLowercase } from "./lib/asciiLowercase";
export { asciiUppercase } from "./lib/asciiUppercase";
export { asciiLetters } from "./lib/asciiLetters";
export { digits } from "./lib/digits";
export { punctuation } from "./lib/punctuation";
export { octdigits } from "./lib/octdigits";

// Lists
export { listsEquivalent } from "./lib/listsEquivalent";
export {
    listWithoutDuplicateElements,
} from "./lib/listWithoutDuplicateElements";
export {
    listWithoutWhitespaceElements,
} from "./lib/listWithoutWhitespaceElements";

// Objects
export { mergeWithDefaults } from "./lib/mergeWithDefaults";
