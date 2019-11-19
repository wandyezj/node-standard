import ToString from "./ToString";
import Style from "./Style";

export default interface Shape extends ToString {
    style?: Style;
    comment?: string;
}