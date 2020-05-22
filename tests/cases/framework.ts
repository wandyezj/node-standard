export interface Case<I, E> {
    name: string;
    input: I;
    expected: E;
}

export type runCase<I,E> = (input: I, expected: E) => void;

export function runCases<I,E>(casesName: string, cases: Case<I,E>[], run: runCase<I,E>) {
    cases.forEach((c: Case<I,E>) => {
        test(`${casesName} ${c.name}`, async () => {
            run(c.input, c.expected);
        });
    });
}

