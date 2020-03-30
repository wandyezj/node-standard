

/**
 * n is in range [minimum, maximum]
 * range is inclusive
 * @param n 
 * @param minimum 
 * @param maximum 
 */
export function isNumberInRange(n: number, minimum: number, maximum: number) {
    return minimum <= n && n <= maximum;
}
