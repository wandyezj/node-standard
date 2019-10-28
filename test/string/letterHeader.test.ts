import * as standard from "../index";
import {Case, runCases, runCase} from "./framework";

const cases: Case<number, string>[]  = [
    {name: "zero", input: 0 , expected: "A"},
    {name: "one", input: 1, expected: "B"},
    {name: "twenty five", input: 25, expected: "Z"},
    {name: "twenty six", input: 26, expected: "BA"},
    {name: "twenty seven", input: 27, expected: "BB"},
    {name: "936", input: 936, expected: "BKA"},
    {name: "676", input: 676, expected: "BAA"},
    {name: "677", input: 677, expected: "BAB"},
    
];

const run: runCase<number, string> = (input: number, expected: string) => {
    const actual = standard.string.letterHeader(input);
    expect(actual).toBe(expected);
}

runCases("letterHeader", cases, run);
