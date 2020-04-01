import * as standard from "../index";

test('listWithoutWhitespaceElements', async () => {
    const expected = ['a', 'b'];
    const actual = standard.listWithoutWhitespaceElements(['', '\ta  ', '', '  b\n', '', '   ', '\t']);
    // console.log(expected);
    // console.log(actual);
    expect(actual).toEqual(expected);
});

