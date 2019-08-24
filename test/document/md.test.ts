import * as document from "../../src/lib/document";

test('md', async () => {

    const input =` 
# test
`;

    const expected = `
`;

    const actual = document.mdToHtml(input);
    
    console.log(expected);
    console.log(actual);
    expect(actual).toEqual(expected);
});
