import { CircleAttributes } from "./CircleAttributes";
import { Circle } from "./Circle";
import { Shape } from "./Shape";
import { LineAttributes } from "./LineAttributes";
import { Line } from "./Line";
import { PathAttributes } from "./PathAttributes";
import { Path } from "./Path";
import { PenAttributes, PenPath, Pen } from "./Pen";
import { Style } from ".";


export class Svg {

    private _width: number = 0;
    public get width(): number {
        return this._width;
    }

    public set width(width: number) {
        this._width = width;
    }

    private _height: number = 0;
    public get height(): number {
        return this._height;
    }
    
    public set height(height: number) {
        this._height = height;
    }

    private _title: string = "";
    get title(): string {
        return this._title;
    }
    
    set title(title: string) {
        this._title = title;
    }

    private shapes: Shape[] = [];
    // private styles: Map<string, Style> = new Map();

    constructor(title: string, width: number, height: number) {
        this.title = title;
        this.width = width;
        this.height = height;
    }

    public addShape(shape: Shape) {
        this.shapes.push(shape);
    }

    // Convenience
    public addCircle(circle: CircleAttributes) {
        this.shapes.push(new Circle(circle));
    }

    public addLine(line: LineAttributes) {
        this.shapes.push(new Line(line));
    }

    public addPath(path: PathAttributes) {
        const shape = new Path(path);
        this.shapes.push(shape);
        return shape;
    }

    public addPen(pen: PenAttributes): Pen {
        const shape = new PenPath(pen);
        this.shapes.push(shape);
        return shape;
    }

    public addGrid(dividers: number, style: Style) {
        for (let i = 0; i <= dividers; i++) {
            // horizontal
            const dividerWidth = (this.width / dividers) * i;
            this.addLine({
                comment:`divider horizontal ${i}`, 
                beginX: 0, 
                beginY: dividerWidth, 
                endX: this.width,
                endY: dividerWidth,
                style
                });

            const dividerHeight = (this.height / dividers) * i;
            this.addLine({
                comment:`divider vertical ${i}`, 
                beginX: dividerHeight, 
                beginY: 0, 
                endX: dividerHeight,
                endY: this.height,
                style
                });
        }
    }

    // private getStyles(): Style[] {
    //     this.shapes.forEach()

    //     const style = shape.style;
    //     if (style) {
    //         // find an appropriate name for the
    //         let key = style.name;
    //         while (this.styles.has(key)) {

    //         }
            
    //     }
    // }

    // public addCircle(centerX: number, centerY: number, radius: number) {
    //     this.addShape(new Circle(centerX, centerY, radius));
    // }

    toString(): string {
        const width = this.width;
        const height = this.height;
        const title = this.title;

        // figure out styles and shapes
        const styleMap: Map<string, string> = new Map();

        const shapes: string[] = [];

        this.shapes.forEach((shape: Shape) => {

            const style = shape.style;
            if (style) {
                const key = style.name;
                const value = style.toString();
                if (styleMap.has(key)) {
                    if (styleMap.get(key) !== value) {
                        // TODO: better handling if two styles have the same name
                        // what should happen is the style gets _x added to the name for now throw if styles are not equivalent
                        // this would also need to update the shape with the appropriate style name
                        throw `two differing styles with name [${key}]`;
                    }
                } else {
                    styleMap.set(key, value);

                }
            }

            // get svg element for the shape
            shapes.push(shape.toString());       
        });

        const styles: string[] = [];
        styleMap.forEach((value: string) => {
            styles.push(value);
        });

        const style = styles.join("\n");

        return `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
${title ? `<title>${title}</title>`: ""}
${style ? `<style type="text/css">\n${style}\n</style>` : ""}
${shapes.join("\n")}
</svg>
`.trim();
    }
} 
