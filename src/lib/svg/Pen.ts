import { PathAttributes } from "./PathAttributes";
import { Path } from "./Path";
import { CoordinateLocation } from "./PathCoordinate";
import * as standard from "../../index";

// import { Path } from "./Path";
// import { Shape, ShapeOptions } from ".";
// import {ToString} from "./ToString"

export interface Pen {
    /**
     * lift up the pen so it moves without drawing
     */
    up(): Pen;

    /**
     * put down the pen so it draws a line as it moves
     */
    down(): Pen;

    /**
     * move pen to absolute coordinates
     * @param length 
     */
    to(x: number, y: number): Pen;

    /**
     * move pen relative to current coordinates
     * @param x 
     * @param y 
     */
    move(x: number, y: number): Pen;

    /**
     * move pen pack to previous location
     */
    back(): Pen;


    /**
     * move the pen forward
     * @param length 
     */
    forward(length: number): Pen;

    // /**
    //  * move the pen forward
    //  * @param length 
    //  */
    // backward(length: number): Pen;

    /**
     * sets the angle the pen is pointing
     * @param degrees 
     */
    angle(degrees: number): Pen;

    /**
     * rotates the pens angle a certain number of degrees
     * @param degrees 
     */
    rotate(degrees: number): Pen;
}

export interface PenAttributes extends PathAttributes {

}

interface Point {
    x: number;
    y: number;
    location: CoordinateLocation;
}

export class PenPath extends Path implements Pen {

    private isDown: boolean = false;

    private previous: Point = {x:0, y:0, location: CoordinateLocation.Absolute};
    private current: Point = {x:0, y:0, location: CoordinateLocation.Absolute};
    
    private angleDegrees: number = 0;

    private get angleRadians(): number {
        return standard.math.degreesToRadians(this.angleDegrees - 90 * 3);
    }

    constructor(attributes: PenAttributes) {
        super(attributes);
        this.current.x = this.beginX;
        this.current.y = this.beginY;
    }

    up(): Pen {
        this.isDown = false;
        return this;
    }

    down(): Pen {
        this.isDown = true;
        return this;
    }

    private toPoint(point: Point) {
        const x = point.x;
        const y = point.y;
        const location = point.location;

        if (this.isDown) {
            super.lineTo({
                x,
                y,
                location,
            });
        } else {
            super.moveTo({
                x,
                y,
                location,
            });
        }

        this.previous = this.current;
        this.current = {x, y, location};

        return this;

    }

    to(x: number, y: number): Pen {
        return this.toPoint({
            x,
            y,
            location: CoordinateLocation.Absolute
        });
    }

    move(x: number, y: number): Pen {
        return this.toPoint({
            x,
            y,
            location: CoordinateLocation.Relative
        });
    }

    back(): Pen {

        if (this.previous.location === CoordinateLocation.Absolute) {
            return this.toPoint(this.previous);
        }

        // relative rewind location
        // go in reverse
        return this.move(0 - this.current.x, 0 - this.current.y);
    }

    forward(length: number): Pen {
        const x = length * Math.sin(this.angleRadians);
        const y = length * Math.cos(this.angleRadians);
        return this.move(x, y);
    }

    angle(degrees: number): Pen {
        this.angleDegrees = degrees
        return this;
    }

    rotate(degrees: number): Pen {
        this.angleDegrees += degrees;
        return this;
    }

}