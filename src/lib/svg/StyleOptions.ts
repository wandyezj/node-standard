import { StrokeLineJoin } from "./StrokeLineJoin";

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