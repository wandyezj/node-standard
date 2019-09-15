
import { Shape, PathCoordinateType } from ".";
import { PathCoordinates } from "./PathCoordinate";
import { PathAttributes } from "./PathAttributes";


function isRelativeCoordinate(coordinates: PathCoordinates): boolean {
    return coordinates.type !== undefined && coordinates.type === PathCoordinateType.Relative;
}

export class Path extends Shape {
    
    private segments: string[] = [];

    private addSegment(segment: string) {
        this.segments.push(segment);
    }

    constructor(attributes: PathAttributes) {
        super("path", attributes);

        this.addSegment(`M ${attributes.beginX} ${attributes.beginY}`);
    }

    /**
     * uses absolute coordinates by default
     * @param coordinates 
     */
    public lineTo(coordinates: PathCoordinates) {
        const command: string = isRelativeCoordinate(coordinates) ? "l" : "L";

        this.addSegment(`${command} ${coordinates.x} ${coordinates.y}`);
        return this;
    }

    /**
     * uses absolute coordinates by default
     * @param coordinates 
     */
    public moveTo(coordinates: PathCoordinates) {
        const command: string = isRelativeCoordinate(coordinates) ? "m" : "M";

        this.addSegment(`${command} ${coordinates.x} ${coordinates.y}`);
        return this;
    }

    public toString(): string {
        super.setAttributes([
            ["d", this.segments.join(" ")],
        ]);
        return super.toString();
    }
}