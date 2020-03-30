import { ShapeOptions } from ".";
import ShapeAbstract from "./ShapeAbstract";

export interface GridAttributes extends ShapeOptions {
    dividers: number;
    beginX: number;
    beginY: number;
    endX: number;
    endY: number;
}

export class Grid extends ShapeAbstract implements GridAttributes {
    public dividers: number = 0;
    public beginX: number = 0;
    public beginY: number = 0;
    public endX: number = 0;
    public endY: number = 0;

    constructor(attributes: GridAttributes) {
        super("g", attributes, true);
        this.dividers = attributes.dividers;
        this.beginX = attributes.beginX;
        this.beginY = attributes.beginY;
        this.endX = attributes.endX;
        this.endY = attributes.endY;
    }

    toString() {
        super.setAttributes([]);

        return `${super.toString()}
</g>`;
    }
}
