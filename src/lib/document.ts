/**
 * Functions to manipulate a document
 * Documents will be represented as a standard set of nodes
 * 
 * focus on conversion from a subset of markdown to html and back, and the manipulation of the model
 * 
 * All elements are composed of pure text, although the formats may be different
 */

import * as standard from "../index";


/**
 * convert markdown test to html
 * @param text 
 */
export function mdToHtml(text: string): string {

    let output = "";

    output += text;

    return createHtmlWithBody(output);
}


function createHtmlWithBody(body: string): string {
    const indentedBody = standard.trimEndAllLines(
        standard.indent(body, {
            level: 2,
        }));

    const formattedBody = `<!DOCTYPE html>
<html>
    <body>
${indentedBody}
    </body>
</html>`;

    return formattedBody;
}


// /**
//  * class to represent a page, pages are composed of a ordered sequence of blocks.
//  */
// interface Page {

//     constructor() {

//     }

//     appendBlock() {

//     }
// }

// interface Block {
//     toString(): string;
// }

// class Section {

// }

// /**
//  * paragraphs are purely composed of text although this text may be formatted.
//  */
// class Paragraph implements Block {

// }