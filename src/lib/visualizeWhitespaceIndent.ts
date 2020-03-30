import { lineSplit } from "./lineSplit";
import { mergeWithDefaults } from "./mergeWithDefaults";

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

    const settings: WhitespaceVisualize = mergeWithDefaults(vizualize, defaultWhitespaceVisualize);

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