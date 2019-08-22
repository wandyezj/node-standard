import * as standard from "../index";

interface Case {
    name: string;
    input: string;
    expected: string;
}

const cases: Case[]  = [
    {name: "single", input: "a", expected: "A"},
    {name: "empty", input: "", expected: ""},
    {name: "capital", input: "A", expected: "A"},
    {name: "multiple", input: "multiple", expected: "Multiple"},
    {name: "MULTIPLE", input: "MULTIPLE", expected: "MULTIPLE"},
];

// run all cases
cases.forEach((c: Case) => {
    test(`capitalize ${c.name}`, async () => {
        run(c.input, c.expected);
    });
});

function run(input: string, expected: string) {
    const actual = standard.string.capitalize(input);

    // console.log(expected);
    // console.log(actual);

    expect(actual).toBe(expected);
}