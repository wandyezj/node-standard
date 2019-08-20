import * as standard from "../src/index";
import * as path from 'path';
// standard

//
// console.log(standard);
// console.log(standard.string);
// console.log();

console.log("ensure temp exists");
const temp = path.join(__dirname, "temp");
standard.directory.create(temp);

console.log("ensure temp/sub exists");
const subdirectory = path.join(temp, "sub");
standard.directory.create(subdirectory);

console.log("ensure temp/sub/file.txt exists");
const file = path.join(subdirectory, "file.txt");
standard.file.write(file, "test");


const options: standard.directory.RecurseOptions = {
    onFile: (file: string) => {console.log(file)},
    onDirectory: (directory: string) => {console.log(directory)}
};

standard.directory.recurse(temp, options);
// const actual = standard.list.removeDuplicates(["a", "a"]);
// const expected = ["a"];
// if (actual === expected) {
//     console.log("woo");
// }

standard.directory.remove(temp);
