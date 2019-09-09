import * as standard from "./index"
import * as path from 'path';
import * as svg from '../src/lib/svg';
// standard

//
// console.log(standard);
// console.log(standard.string);
// console.log();

export function testPath() {

    const out = path.join(__dirname, "out");

    const actual = path.join(out, "actual", "out");
    const expected = path.join(out, "expect", "out");
    
    console.log("ensure actual exists");
    standard.directory.clear(actual);
    
    console.log("ensure actual/sub exists");
    const subdirectory = path.join(actual, "sub");
    standard.directory.create(subdirectory);
    
    console.log("ensure actual/sub/file.txt exists");
    const file = path.join(subdirectory, "file.txt");
    standard.file.write(file, "test");
    
    
    console.log("recurse");
    const options: standard.directory.RecurseOptions = {
        onFile: (file: string) => {console.log(file)},
        onDirectory: (directory: string) => {console.log(directory)}
    };
    
    standard.directory.recurse(out, options);
    
    // const actual = standard.list.removeDuplicates(["a", "a"]);
    // const expected = ["a"];
    // if (actual === expected) {
    //     console.log("woo");
    // }
    // need a way to actually compare
    
    console.log("compare");
    if (!standard.directory.equivalent(actual, expected)) {
        console.log("something wrong");
    }
    
    // make another directory
    
    
    standard.directory.remove(actual);
    
}

function testSvg() {
    const squareSize = 100;
    const s = new svg.Svg("circle", squareSize, squareSize);
    const centerX = s.width / 2;
    const centerY = s.height / 2;
    const circleRadius = squareSize / 2;

    const circleStyleOptions: svg.StyleOptions = {
        fill: "#0000ff"
    };

    const blackStyle = new svg.Style("black", circleStyleOptions);

    const centerCircle = new svg.Circle(centerX, centerY, circleRadius, {comment:"", style: blackStyle});
    s.addShape(centerCircle);

    const image = s.toString();
    console.log(image);

    const outManualDirectory = path.join(__dirname, "out/manual");
    standard.directory.clear(outManualDirectory);

    const testSvgFile = path.join(outManualDirectory, "test.svg");
    standard.file.write(testSvgFile, image);

}

testSvg();




