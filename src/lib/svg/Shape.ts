import { Style } from "./Style";
import { ShapeOptions } from "./ShapeOptions";
import { ToString } from "./ToString";
import {Comment} from "./Comment";



export abstract class Shape implements ToString {

    public style?: Style = undefined;
    public comment?: string = undefined;

    private isContainer: boolean = false;

    constructor(public name: string, options: ShapeOptions = {}, isContainer: boolean = false) {
        this.comment = options.comment;
        this.style = options.style;
        this.isContainer = isContainer;
    }

    
    private attributes: Map<string, string> = new Map();
    protected setAttributes(attributes: [string, string][]) {
        // set all attributes

        // insert the style attribute
        if (this.style) {
            attributes.unshift(["class", this.style.name]);
        }
        
        this.attributes = new Map(attributes);
    }

    public toString() {
        let shapeAttributes: string = "";
        this.attributes.forEach((value: string, key: string) => {
            shapeAttributes += ` ${key}="${value}"`;
        });

        const comment = this.comment ? new Comment(this.comment).toString() + "\n" : "";
        return `${comment}<${this.name}${shapeAttributes} ${this.isContainer ? "" : "/"}>`;
    }
}