import ToString from "./ToString";


export class Comment implements ToString {
    constructor(public comment: string) {
    }

    public toString() {
        return `<!-- ${this.comment} -->`;
    }
}
