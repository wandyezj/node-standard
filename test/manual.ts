import * as standard from "./index"
import * as path from 'path';
import * as svg from '../src/lib/svg';
import * as markdown from "../src/lib/markdown";
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

function createTestSvg() {
    const squareSize = 100;
    const s = new svg.Svg("circle", squareSize, squareSize);
    const centerX = s.width / 2;
    const centerY = s.height / 2;
    const circleRadius = squareSize / 2;

    const black = new svg.Style({name:"black", fill:"#000000", stroke: "#ff0000", strokeWidth:10});
    const blue = new svg.Style({name:"blue", fill:"#0000ff"});
    const greenLine = new svg.Style({name:"greenLine", stroke:"#00ff00", strokeWidth: 20});

    s.addCircle({comment:"Center Circle", centerX, centerY, radius:circleRadius, style: blue});
    s.addCircle({comment:"Black Circle", centerX: centerX / 2, centerY: centerY / 2, radius:circleRadius, style: black});
    s.addLine({
        comment:"Black Circle",
        beginX: centerX,
        beginY: centerY,
        endX: centerX,
        endY: centerY + 50,
        style: greenLine});


    return s;
}

// function createLetterSvg() {
//     const squareSize = 100;
//     const s = new svg.Svg("circle", squareSize, squareSize);
//     const centerX = s.width / 2;
//     const centerY = s.height / 2;
//     const circleRadius = squareSize / 2;
// }

function createVenusSvg() {
    const squareSize = 100;
    const s = new svg.Svg("Venus", squareSize, squareSize);
    const centerX = s.width / 2;
    const centerY = s.height / 2;
    
    const strokeWidth = 6;
    const circleRadius = (squareSize / 6);
    //- (strokeWidth / 2);


    const background = new svg.Style({name:"background", fill:"#ffe1ff"});
    const blackOutline = new svg.Style({name:"blackOutline", fill:"none", stroke: "#000000", strokeWidth});
    const blackLine = new svg.Style({name:"blackLine", stroke: "#000000", strokeWidth});

    s.addCircle({comment:"Background", centerX, centerY, radius: (squareSize / 2), style: background});
    s.addCircle({comment:"Center Circle", centerX, centerY, radius:circleRadius, style: blackOutline});
    
    const plusSquare = (circleRadius + strokeWidth) / 2.4;
    const plusOffset = circleRadius + strokeWidth + (plusSquare / 2);

    const plusCenterX = centerX;
    const plusCenterY = centerY + plusOffset;
 

    s.addLine({
        comment:"Plus Vertical", 
        beginX: plusCenterX, 
        beginY: (plusCenterY - plusSquare), 
        endX: plusCenterX,
        endY: (plusCenterY + plusSquare),
        style: blackLine}
        );

    s.addLine({
        comment:"Plus Horizontal", 
        beginX: (plusCenterX - plusSquare), 
        beginY: plusCenterY, 
        endX: (plusCenterX + plusSquare),
        endY: plusCenterY,
        style: blackLine}
        );


    // // add markers
    // const markLine = new svg.Style({name:"markLine", stroke: "#ff0f00", strokeWidth: 1});
    // const dividers = 6
    // for (let i = 0; i < dividers; i++) {
    //     // horizontal
    //     const divider = (squareSize / dividers) * i;
    //     s.addLine({
    //         comment:`divider horizontal ${i}`, 
    //         beginX: 0, 
    //         beginY: divider, 
    //         endX: squareSize,
    //         endY: divider,
    //         style: markLine}
    //         );

    //     s.addLine({
    //         comment:`divider vertical ${i}`, 
    //         beginX: divider, 
    //         beginY: 0, 
    //         endX: divider,
    //         endY: squareSize,
    //         style: markLine}
    //         );
        
    // }


    return s;
}

const outManualDirectory = path.join(__dirname, "out/manual");

function writeSvg(image: svg.Svg) {
    console.log(`

${image.title}

`);
    const file = path.join(outManualDirectory, `${image.title}.svg`);
    const text = image.toString();
    console.log(text);
    standard.file.write(file, text);
}

function testSvg() {

    //standard.directory.clear(outManualDirectory);

    const test = createTestSvg();
    writeSvg(test);

    const venus = createVenusSvg();
    writeSvg(venus);
}

testSvg();

function testMarkdown() {

    console.log(`

markdown
`);

    const document = new markdown.Document();

    document.addHeading({title: "heading", level:1});
    document.addParagraph().addText({text:"paragraph test"});

    console.log(document.toString());
}

testMarkdown();




