import * as standard from "../index";

interface Case {
    name: string;
    input: string;
    expected: string;
}

const cases: Case[]  = [
    {name: "single", input: "a", expected: "a"},
    {name: "empty", input: "", expected: ""},
    {name: "capital", input: "A", expected: "a"},
    {name: "multiple", input: "multiple", expected: "multiple"},
    {name: "MULTIPLE", input: "MULTIPLE", expected: "m_u_l_t_i_p_l_e"},
    {name: "CamelCase", input: "CamelCase", expected: "camel_case"},
    {name: "aSingleLetter", input: "aSingleLetter", expected: "a_single_letter"},
];

// run all cases
cases.forEach((c: Case) => {
    test(`snakeCase ${c.name}`, async () => {
        run(c.input, c.expected);
    });
});

function run(input: string, expected: string) {
    const actual = standard.string.snakeCase(input);

    // console.log(expected);
    // console.log(actual);

    expect(actual).toBe(expected);
}