import { lineSplit } from "./lineSplit";

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
