import * as document from "../../src/lib/document";
import * as standard from "../index";

test('md', async () => {

    const input =` 
# test
`;

    const expected = `<!DOCTYPE html>
<html>
    <body>

        # test

    </body>
</html>`;

    const actual = document.mdToHtml(input);
    
    console.log(standard.string.visualizeWhitespaceIndent(expected));
    console.log(standard.string.visualizeWhitespaceIndent(actual));
    expect(actual).toEqual(expected);
});
