// methods allow standardization of invalid parameter error messages

import { isNaturalNumber } from "./isNaturalNumber";
import { isNumberInRange } from "./isNumberInRange";
import { assertParameter } from "./assertParameter";

/**
 * throws if the variable is not a natural number in the expected range
 * @param variable - variable name
 * @param n - variable value
 * @param minimum - maximum variable value
 * @param maximum - minimum variable value
 * @public
 */
export function assertParameterIsNaturalNumberInRange(
    variable: string,
    n: number,
    minimum: number,
    maximum: number
) {
    const valid = isNaturalNumber(n) && isNumberInRange(n, minimum, maximum);
    assertParameter(
        valid,
        `${variable} = [${n}] expected n ∈ ℕ₀ and n <= ${minimum} and n >= ${maximum}`
    );
}
