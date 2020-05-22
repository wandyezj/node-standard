/**
 * check that an expression matches the required parameters
 * @param expression
 * @param message
 */
export function assertParameter(expression: boolean, message: string) {
    if (!expression) {
        throw message;
    }
}
