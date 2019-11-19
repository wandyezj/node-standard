import { StrokeLineJoin } from "./StrokeLineJoin";
import { StyleAttributes } from "./StyleAttributes";
import ToString from "./ToString";

export default class Style implements ToString, StyleAttributes {


    public name: string;
    public fill?: string;
    public stroke?: string;
    public strokeWidth?: number;
    public strokeLineJoin?: StrokeLineJoin;

    constructor(attributes: StyleAttributes) {
        // name must be continuous
        this.name = attributes.name;
        this.fill = attributes.fill;
        this.stroke = attributes.stroke
        this.strokeWidth = attributes.strokeWidth;
        this.strokeLineJoin = attributes.strokeLineJoin;
    }

    private getAttributes(): string{
        const attributes: [string, string | undefined][] = [
            ["fill", this.fill],
            ["stroke", this.stroke],
            ["stroke-width", this.strokeWidth? this.strokeWidth.toString() : undefined],
            ["stroke-linejoin", this.strokeLineJoin]
        ];

        return attributes.map((attribute: [string, string| undefined]) => {
            const name = attribute[0];
            const value = attribute[1];

            return value ? `${name}:${value}`  : undefined;
        }).filter((value) => value).join(";");
    }

    public toString() {
        return `.${this.name}{${this.getAttributes()}}`;
    }
}