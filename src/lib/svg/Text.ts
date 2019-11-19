import TextAttributes from "./TextAttributes";
import ElementFactory from "./ElementFactory";

export default class Text implements TextAttributes {
    public x: number = 0;
    public y: number = 0;
    public text: string = "";

    constructor(attributes: TextAttributes) {
        this.x = attributes.x;
        this.y = attributes.y;
        this.text = attributes.text;
    }

    toString(): string {
        return ElementFactory.create("text")
            .setContent(this.text)
            .setAttributes([["x", this.x.toString()], ["y", this.y.toString()]])
            .toString();
    }
}
