import * as standard from "../index";

/**
 * check that an expression matches the required parameters
 * @param expression 
 * @param message 
 */
export function isValid(expression: boolean, message: string) {
    if (!expression) {
        throw message;
    }
}

// methods allow standardization of invalid parameter error messages

export function isWholeInRange(variable: string, n: number, minimum: number, maximum: number) {
    const valid = standard.number.isWholeInRange(n, minimum, maximum);
    isValid(valid, `${variable} = [${n}] expected <= ${minimum} and >= ${maximum}`);
}