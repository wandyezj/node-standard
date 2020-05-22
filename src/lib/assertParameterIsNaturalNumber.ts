import { isNaturalNumber } from "./isNaturalNumber";
import { assertParameter } from "./assertParameter";

/**
 * throws if the parameter is not a natural number
 * @param variable - variable name
 * @param n - value of the variable
 * @public
 */
export function assertParameterIsNaturalNumber(variable: string, n: number) {
    const valid = isNaturalNumber(n);
    assertParameter(valid, `${variable} = [${n}] expected natural number`);
}
