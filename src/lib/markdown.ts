import * as standard from "../index";

export class Document {

    private elements: Element[] = []; 

    constructor() {

    }

    addHeading(properties: HeadingProperties) {
        this.elements.push(new Heading(properties));
    }

    addParagraph(): Paragraph {
        const paragraph = new Paragraph();
        this.elements.push(paragraph);
        return paragraph;
    }

    toString() {
        return this.elements.map((element: Element) => element.toString()).join("");
    }
}

interface Element {
    toString(): string;   
}

interface HeadingProperties {
    /**
     * level from 1 to 6
     */
    level: number;
    
    /**
     * title any string less than 80 characters. 
     */
    title: string;
}

/**
 * Markdown heading with 6 level of indent
 */
class Heading implements Element, HeadingProperties {
    
    private _level: number = 0;

    public get level() {
        return this._level;
    }

    public set level(value: number) {
        standard.parameter.isWholeInRange("level", value, 1, 6);
        this._level = value;
    }

    public title: string = "";

    constructor(properties: HeadingProperties) {
        this.level = properties.level;
        this.title = properties.title;
    }

    toString(): string {
        return `${'#'.repeat(this.level)} ${this.title}`;
    }
}

interface AddText {
    addText(properties:TextProperties): Text;
}

interface TextProperties {
    text: string;
}

class Text implements Element, TextProperties {

    public text: string;

    constructor(properties: TextProperties) {
        this.text = properties.text;
    }

    public toString() {
        return this.text;
    }
}

class Paragraph implements Element, AddText {

    private elements: Element[] = [];

    constructor() {

    }

    addText(properties: TextProperties) {
        const text = new Text(properties);
        this.elements.push(text);
        return text;
    }

    toString(): string {
        const contents = this.elements.map((element: Element) => element.toString())
            .join("");
        return `\n${contents}`;
    }
}

