
import * as standard from "../index";

test('lineSplit', async () => {
    const expected = ['a','','b'];
    const actual = standard.lineSplit(`a

b`);
    // console.log(expected);
    // console.log(actual);
    expect(actual).toEqual(expected);
});

