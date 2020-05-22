/**
 * Is the number a natural number including zero?
 * @remarks `n ∈ ℕ₀ = n is an element of {0, 1, 2, ...\}`
 * @param n - number to test
 * @public
 */
export function isNaturalNumber(n: number) {
    return n - Math.floor(n) === 0;
}
