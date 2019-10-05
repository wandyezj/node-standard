// string manipulation

import * as standard from "../index";

/**
 * standardize newlines to proper unix line endings
 * @param string to standardize
 */
export function standardizeNewlines(string: string): string {
    return string.replace(/\r/gm, "");
}

/**
 * split a string into a list of lines
 * @param string
 * @returns list of the individual lines in the string
 */
export function lineSplit(string: string): string[] {
    return standardizeNewlines(string).split("\n");
}

/**
 * inserts tabs in front of every line in s
 * @param string the string to insert tabs in front of
 * @param count whole number of tabs to use.
 */
export function insertTabs(string: string, count: number = 1): string {
    const tabs = "\t".repeat(count);
    return `${tabs}${string.replace(/\n/g, `\n${tabs}`)}`;
}



/**
 * describe a single level of indent
 */
export interface Indent {
    /**
     * the value to use for the indent
     * default of four spaces
     */
    value: string;

    /**
     * the number of the value to use for a single level of indent
     * default of 1
     */
    count: number;

    /**
     * the number of times to indent
     * default of 1
     */
    level: number;
}

const defaultIndent: Indent = {
    value: " ",
    count: 4,
    level: 1,
};

/**
 * indent all lines with the specified level of indent.
 * @param string 
 * @param indent 
 */
export function indent(string: string, indent: Partial<Indent> = defaultIndent): string {

    const settings: Indent = standard.object.mergeWithDefaults(indent, defaultIndent);

    const indentString = settings.value.repeat(settings.count).repeat(settings.level);

    // this also indents any empty lines
    return indentString + lineSplit(string).join(`\n${indentString}`);
}

/**
 * remove whitespace from the end of all lines
 * @param string 
 */
export function trimEndAllLines(string: string) {
    return lineSplit(string).map((line) => line.trimEnd()).join("\n");
}

/**
 * uppercases the first character in a string.
 * in the case that the first character in the string can not be upper cased (for example a white space character or an empty string) the string is unmodified.
 * @param string
 * @returns the string with it's first character upper cased.
 */
export function capitalize(string: string): string {
    if (string.length === 0) {
        return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function decapitalize(string: string): string {
    if (string.length === 0) {
        return string;
    }
    return string.charAt(0).toLowerCase() + string.slice(1);
}


export function escapeRegularExpression(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}


export interface WhitespaceVisualize {
    space: string;
    newline: string;
    tab: string;
}

const defaultWhitespaceVisualize: WhitespaceVisualize = {
    space: ".",
    newline: "\n",
    tab:"----"
}

export function visualizeWhitespaceIndent(string: string, vizualize: Partial<WhitespaceVisualize> = defaultWhitespaceVisualize): string {

    const settings: WhitespaceVisualize = standard.object.mergeWithDefaults(vizualize, defaultWhitespaceVisualize);

    const visualized = lineSplit(string).map((line) => {
        const index = line.trimStart().length;
        // starting whitespace
        const whitespace = line.substring(0, index);
        const contents = line.substring(index);

        const updated = whitespace.replace(/[\t]/g, settings.tab).replace(/[ ]/g, settings.space);
        return updated + contents;

    }).join("\n").replace(/\n/g, settings.newline);

    return visualized;
}


function isUpperCase(string: string) {
    return string === string.toUpperCase();
}

/**
 * camelCase
 * @param string 
 */
export function camelCase(string: string): string {
    return decapitalize(string);
}

/**
 * PascalCase
 * @param string 
 */
export function pascalCase(string: string): string {
    return capitalize(string);
}

/**
 * snake_case
 * @param string
 */
export function snakeCase(string: string): string {

    let i = 0;
    let startIndex = 0;
    let words = [];
    for (i=0; i < string.length; i++) {
        const c = string[i];
        if (isUpperCase(c)) {
            const word = string.slice(startIndex, i);
            if (word.length > 0) {
                words.push(word)
            }
            
            startIndex = i;
        }
    }
    const word = string.slice(startIndex);
    words.push(word);

    const snake = words.join("_").toLowerCase();
    
    return snake;
}