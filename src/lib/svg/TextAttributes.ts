import Style from "./Style";

export default interface TextAttributes {
    x: number;
    y: number;
    text: string;
    style?: Style;
}