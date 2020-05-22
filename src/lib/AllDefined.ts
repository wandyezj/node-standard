export type AllDefined<T> = {
    [P in keyof T]: T[P];
};
