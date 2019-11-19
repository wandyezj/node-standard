import ShapeAbstract from "./ShapeAbstract";
import { CircleAttributes } from "./CircleAttributes";

export class Circle extends ShapeAbstract implements CircleAttributes {
    public centerX: number;
    public centerY: number;
    public radius: number;

    constructor(attributes: CircleAttributes) {
        super("circle", attributes);
        this.centerX = attributes.centerX;
        this.centerY = attributes.centerY;
        this.radius = attributes.radius;
    }

    public toString(): string {
        super.setAttributes([
            ["cx", this.centerX.toString()],
            ["cy", this.centerY.toString()],
            ["r", this.radius.toString()]
        ]);
        return super.toString();
    }
}
