/**
 * Is the number a natural number including zero?
 * @remarks `ℕ ∪ {0\}  = {0, 1, 2, ...\}`
 * @param n - number to test
 * @public
 */
export function isWholeNumber(n: number) {
    return n - Math.floor(n) === 0;
}
