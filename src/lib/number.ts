/**
 * {0, 1, 2, ...}
 * @param n 
 */
export function isWhole(n: number) {
    return (n - Math.floor(n)) === 0;
}

/**
 * n is in range [minimum, maximum]
 * range is inclusive
 * @param n 
 * @param minimum 
 * @param maximum 
 */
export function isWholeInRange(n: number, minimum: number, maximum: number) {
    return isWhole(n) && minimum <= n && n <= maximum;
}

export function isPositive(n: number) {
    return Math.sign(n) === 1;
}