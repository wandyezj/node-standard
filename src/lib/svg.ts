
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

export interface StyleOptions {
    fill?: string;
    stroke?: string;
}

export class Style implements toString {

    constructor(public name: string, public options: StyleOptions) {
        // name must be continuous
    }

    private getAttributes(): string{
        const o = this.options;
        const attributes: [string, string | undefined][] = [["fill", o.fill], ["stroke", o.stroke]];

        return attributes.map((attribute: [string, string| undefined]) => {
            const name = attribute[0];
            const value = attribute[1];

            return value ? `${name}:${value}`  : undefined;
        }).filter((value) => value).join(";");
    }

    public toString() {
        return `.${this.name}{{${this.getAttributes()}}}`;
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

class Shape implements toString {

    public style?: Style = undefined;
    public comment?: string = undefined;
    private attributes: Map<string, string> = new Map();

    constructor(public name: string, options: ShapeOptions = {}) {
        this.comment = options.comment;
        this.style = options.style;
    }

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


export class Circle extends Shape {

    constructor(public centerX: number, public centerY: number, public radius: number, options?: ShapeOptions) {
        super("circle", options);
    }

    public setAttributes() {
        super.setAttributes([["cx", this.centerX.toString()], ["cy", this.centerY.toString()], ["r", this.radius.toString()]]);
    }

    public toString(): string {
        this.setAttributes();
        return super.toString();
    }
}
