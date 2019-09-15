import { ShapeOptions } from "./ShapeOptions";

export interface LineAttributes extends ShapeOptions{
    beginX: number;
    beginY: number;
    endX: number;
    endY: number;
}