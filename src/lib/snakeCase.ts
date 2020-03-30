import { isUpperCase } from "./isUpperCase";

/**
 * snake_case
 * @param string
 */
export function snakeCase(string: string): string {

    let i = 0;
    let startIndex = 0;
    let words = [];
    for (i=0; i < string.length; i++) {
        const c = string[i];
        if (isUpperCase(c)) {
            const word = string.slice(startIndex, i);
            if (word.length > 0) {
                words.push(word)
            }
            
            startIndex = i;
        }
    }
    const word = string.slice(startIndex);
    words.push(word);

    const snake = words.join("_").toLowerCase();
    
    return snake;
}