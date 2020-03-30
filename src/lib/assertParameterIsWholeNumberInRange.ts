// methods allow standardization of invalid parameter error messages

import { isWholeNumber } from "./isWholeNumber";
import { isNumberInRange } from "./isNumberInRange";
import { assertParameter } from "./assertParameter";

export function assertParameterIsWholeNumberInRange(
    variable: string,
    n: number,
    minimum: number,
    maximum: number
) {
    const valid = isWholeNumber(n) && isNumberInRange(n, minimum, maximum);
    assertParameter(
        valid,
        `${variable} = [${n}] expected <= ${minimum} and >= ${maximum}`
    );
}
