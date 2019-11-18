import {TagType} from "./TagType";
import createTag from "./createTag";

export function createElement(
    name: string,
    attributes?: Map<string, string>,
    content?: string
) {

    if (content) {
        const start = createTag(TagType.Start, name, attributes);
        const end = createTag(TagType.End, name);
        return `${start}${content}${end}`;
    }

    return createTag(TagType.Empty, name, attributes);
}
