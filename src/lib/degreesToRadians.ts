export function degreesToRadians(degrees: number): number {
    return 2 * Math.PI * ((degrees % 360) / 360);
}
