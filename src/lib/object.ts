

export type AllDefined<T> = {
    [P in keyof T]: T[P];
}

// type Partial<T> = {
//     [K in keyof T]?: T[K];
// }
11
