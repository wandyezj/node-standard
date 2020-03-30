// standard set of functions for doing basic things.

export { path } from "./lib/path";
export { directory } from "./lib/directory";
export { file } from "./lib/file";

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
