import ShapeAbstract from "./ShapeAbstract";
import { LineAttributes } from "./LineAttributes";


export class Line extends ShapeAbstract implements LineAttributes {

    public beginX: number;
    public beginY: number;
    public endX: number;
    public endY: number;

    constructor(attributes: LineAttributes) {
        super("line", attributes);
        this.beginX = attributes.beginX;
        this.beginY = attributes.beginY;
        this.endX = attributes.endX;
        this.endY = attributes.endY;
    }

    public toString(): string {
        super.setAttributes([
            ["x1", this.beginX.toString()],
            ["y1", this.beginY.toString()], 
            ["x2", this.endX.toString()],
            ["y2", this.endY.toString()]
        ]);
        return super.toString();
    }
}