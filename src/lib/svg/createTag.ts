import { TagType } from "./TagType";
import createAttribute from "./createAttribute";

export default function createTag(type: TagType, name: string, attributes?: Map<string, string> ): string {
    
    let attributeString = "";
    
    if (attributes) {
        attributes.forEach((value: string, key: string) => {
            attributeString += " " + createAttribute(key, value);
        });
    }

    switch(type) {
        case TagType.Empty:
            return `<${name} ${attributeString}/>`
        case TagType.Start:
            return `<${name} ${attributeString}>`;
        case TagType.End:
            if (attributes) {
                throw "attributes may not be present on an end tag"
            }
            return `</${name}>`;
    }
}
