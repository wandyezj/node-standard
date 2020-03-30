/**
 * Is the number a natural number including zero?
 * {0, 1, 2, ...}
 * ℕ ∪ {0}
 * @param n 
 */
export function isWholeNumber(n: number) {
    return (n - Math.floor(n)) === 0;
}