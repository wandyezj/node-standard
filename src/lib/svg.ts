
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

interface toString {
    toString(): string;
}

// TODO: check for color
// should stroke and fill be renamed fillColor and strokeColor?

export enum StrokeLineJoin {
    Miter = "miter",
    Round = "round",
    Bevel = "bevel",
    MiterClip = "miter-clip",
    Arcs = "arcs",
}

export interface StyleOptions {
    fill?: string;
    
    /**
     * used for lines 
     */
    stroke?: string;

    /**
     * width of the stroke
     */
    strokeWidth?: number;

    /**
     * How ends of lines should be handled
     * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin
     */
    strokeLineJoin?: StrokeLineJoin;
}



export interface StyleAttributes extends StyleOptions {
    name: string;
}

export class Style implements toString, StyleAttributes {


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

export interface ShapeOptions {
    style?: Style;
    comment?: string;
}

class Comment implements toString {
    constructor(public comment: string) {
    }

    public toString() {
        return `<!-- ${this.comment} -->`;
    }
}

abstract class Shape implements toString {

    public style?: Style = undefined;
    public comment?: string = undefined;

    constructor(public name: string, options: ShapeOptions = {}) {
        this.comment = options.comment;
        this.style = options.style;
    }

    
    private attributes: Map<string, string> = new Map();
    protected setAttributes(attributes: [string, string][]) {
        // set all attributes

        // insert the style attribute
        if (this.style) {
            attributes.unshift(["class", this.style.name]);
        }
        
        this.attributes = new Map(attributes);
    }

    public toString() {
        let shapeAttributes: string = "";
        this.attributes.forEach((value: string, key: string) => {
            shapeAttributes += ` ${key}="${value}"`;
        });

        const comment = this.comment ? new Comment(this.comment).toString() + "\n" : "";
        return `${comment}<${this.name}${shapeAttributes} />`;
    }
}

// Actual Shapes are thin wrappers around the shape class

export interface CircleAttributes extends ShapeOptions{
    centerX: number;
    centerY: number;
    radius: number;
}

export class Circle extends Shape implements CircleAttributes {
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


export interface LineAttributes extends ShapeOptions{
    beginX: number;
    beginY: number;
    endX: number;
    endY: number;
}

export class Line extends Shape {

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