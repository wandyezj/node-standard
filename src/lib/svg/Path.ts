import ShapeAbstract from "./ShapeAbstract";
import { PathAttributes } from "./PathAttributes";
import { PathCoordinate, CoordinateLocation } from "./PathCoordinate";

function isRelativeCoordinate(coordinates: PathCoordinate): boolean {
    return (
        coordinates.location !== undefined &&
        coordinates.location === CoordinateLocation.Relative
    );
}

export class Path extends ShapeAbstract {
    private segments: string[] = [];

    private addSegment(segment: string) {
        this.segments.push(segment);
    }

    protected beginX: number;
    protected beginY: number;

    constructor(attributes: PathAttributes) {
        super("path", attributes);
        this.beginX = attributes.beginX ? attributes.beginX : 0;
        this.beginY = attributes.beginY ? attributes.beginY : 0;

        this.addSegment(`M ${this.beginX} ${this.beginY}`);
    }

    /**
     * uses absolute coordinates by default
     * @param coordinates
     */
    public lineTo(coordinates: PathCoordinate) {
        const command: string = isRelativeCoordinate(coordinates) ? "l" : "L";

        this.addSegment(`${command} ${coordinates.x} ${coordinates.y}`);
        return this;
    }

    /**
     * uses absolute coordinates by default
     * @param coordinate
     */
    public moveTo(coordinate: PathCoordinate) {
        const command: string = isRelativeCoordinate(coordinate) ? "m" : "M";

        this.addSegment(`${command} ${coordinate.x} ${coordinate.y}`);
        return this;
    }

    public toString(): string {
        super.setAttributes([["d", this.segments.join(" ")]]);
        return super.toString();
    }
}
