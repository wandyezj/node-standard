import { createElement } from "./createElement";
import { string } from "../..";

/**
 * Element Factory
 */
export default class Element {

    private content? : string = undefined;
    private attributes?: Map<string, string> = undefined;

    /**
     * name of the element should be fixed
     * @param name 
     */
    constructor(private name: string) {

    }

    static create(name: string): Element {
        return new Element(name);
    }

    /**
     * set the content to what should be
     * @param content 
     */
    protected setContent(content?: string): Element {
        this.content = content;
        return this;
    }

    protected setAttributes(attributes: [string, string][]): Element {
        this.attributes = new Map(attributes);
        return this;
    }

    /**
     * turn into an xml element
     */
    protected toString() {
        createElement(this.name, this.attributes, this.content)
    }
}