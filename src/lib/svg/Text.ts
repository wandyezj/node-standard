import { TextAttributes } from "./TextAttributes";
import Element from "./Element";

export default class Text implements TextAttributes {
    public x: number = 0;    
    public y: number = 0;
    public text: number = 0;

    constructor(attributes: TextAttributes) {
        this.x = attributes.x;
        this.y = attributes.y;
        this.text = attributes.text;
    }

    toString(): string {
        new Element("text")
    }

}