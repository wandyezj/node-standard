import { createElement } from "./createElement";

export default class ElementFactory {

    private content? : string = undefined;
    private attributes?: Map<string, string> = undefined;

    /**
     * name of the element should be fixed
     * @param name 
     */
    private constructor(private name: string) {

    }
    
    static create(name: string): ElementFactory {
        return new ElementFactory(name);
    }

    /**
     * set the content to what should be
     * @param content 
     */
    public setContent(content?: string): ElementFactory {
        this.content = content;
        return this;
    }

    public setAttributes(attributes: [string, string][]): ElementFactory {
        this.attributes = new Map(attributes);
        return this;
    }

    /**
     * turn into an xml element
     */
    public toString(): string {
        return createElement(this.name, this.attributes, this.content)
    }
}