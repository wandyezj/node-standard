/**
 * n is in range [minimum, maximum]
 * range is inclusive
 * @param n - number to test
 * @param minimum - minimum that n can be
 * @param maximum - maximum that n can be
 * @public
 */
export function isNumberInRange(n: number, minimum: number, maximum: number) {
    return minimum <= n && n <= maximum;
}
