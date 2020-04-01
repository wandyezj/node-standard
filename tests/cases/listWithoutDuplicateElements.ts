import * as standard from "../index";

test('listWithoutDuplicateElements', async () => {
    const expected = ['a', 'b', 'c'];
    const actual = standard.listWithoutDuplicateElements(['a', 'a', 'b', 'b', 'a', 'c', 'b', 'a']);
    // console.log(expected);
    // console.log(actual);
    expect(actual).toEqual(expected);
});
