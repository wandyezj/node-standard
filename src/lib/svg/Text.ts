import TextAttributes from "./TextAttributes";
import ElementFactory from "./ElementFactory";
import Style from "./Style";

export default class Text implements TextAttributes {
    public x: number = 0;
    public y: number = 0;
    public text: string = "";
    public style?: Style = undefined;

    constructor(attributes: TextAttributes) {
        this.x = attributes.x;
        this.y = attributes.y;
        this.text = attributes.text;
        this.style = attributes.style;
    }

    toString(): string {
        const attributes: [string, string | undefined][] = [
            ["x", this.x.toString()],
            ["y", this.y.toString()],
            ["class", this.style ? this.style.name : undefined],
        ];

        return ElementFactory.create("text")
            .setContent(this.text)
            .setAttributes(attributes)
            .toString();
    }
}
