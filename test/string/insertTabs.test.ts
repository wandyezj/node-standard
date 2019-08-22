
import * as standard from "../index";

test('insertTabs', async () => {
    const expected = `\t\t
\t\ta
\t\t
\t\tb`;
    const actual = standard.string.insertTabs(`
a

b`, 2);
    // console.log(expected);
    // console.log(actual);
    expect(actual).toBe(expected);
});
