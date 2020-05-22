import * as standard from "../index";

interface Test {
    valueString?: string;
    valueNumber?: number;
    valueArray?: number[];
}

const testDefault = {
    valueString: "",
    valueNumber: 0,
    valueArray: [],
}


test('mergeWithDefaults', async () => {

    const input: Test = {valueNumber: 1};
    const expected: Test = {
        valueString: "",
        valueNumber: 1,
        valueArray: []
    }
    const actual = standard.mergeWithDefaults<Test>(input, testDefault);

    // console.log(expected);
    // console.log(actual);
    expect(actual).toEqual(expected);
});

