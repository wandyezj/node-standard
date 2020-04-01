import * as standard from "./index"
import * as path from 'path';
import * as svg from '../src/lib/svg/index';
import * as markdown from "../src/lib/markdown/markdown";
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
    standard.writeFileText(file, "test");
    
    
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




function createSignSvg(options?: {title?: string, plus?: boolean, arrow?:boolean, background?: string}) {
    const squareSize = 100;
    const s = new svg.Svg(options && options.title ? options.title : "test", squareSize, squareSize);

    const strokeWidth = 6;
    const backgroundColor = options && options.background ? options.background : "#ffffff";
    const background = new svg.Style({name:"background", fill:backgroundColor}); //ffe1ff
    const blackOutline = new svg.Style({name:"blackOutline", fill:"none", stroke: "#000000", strokeWidth});
    const blackLine = new svg.Style({name:"blackLine", stroke: "#000000", strokeWidth, strokeLineJoin: svg.StrokeLineJoin.Round});
    // const greenLine = new svg.Style({name:"greenLine", stroke: "#00ff00", strokeWidth, strokeLineJoin: svg.StrokeLineJoin.Round});

    //const redLine = new svg.Style({name:"redLine", stroke: "#ff0000", strokeWidth, strokeLineJoin: svg.StrokeLineJoin.Round});
    //const tealLine = new svg.Style({name:"tealLine", stroke: "#a7faf4", strokeWidth, strokeLineJoin: svg.StrokeLineJoin.Round});
    
    const plusStyle = blackLine;
    const arrowStyle = blackLine;

    const centerX = s.width / 2;
    const centerY = s.height / 2;
    
    const circleRadius = (squareSize / 6);

    s.addCircle({comment:"Circle Background", centerX, centerY, radius: (squareSize / 2), style: background});
    s.addCircle({comment:"Circle Center", centerX, centerY, radius:circleRadius, style: blackOutline});
    
//    // add markers
//    const markLine = new svg.Style({name:"markLine", stroke: "#ff0f00", strokeWidth: 1});
//    s.addGrid(6, markLine);


    const armLength = (circleRadius + strokeWidth) / 2.4;
    const doubleArmLength = armLength * 2;

    if (options && options.plus) {
        
        s.addPen({comment:"Plus", style: plusStyle})
            .to(centerX, centerY + circleRadius + strokeWidth / 2 - 2)
            .down()
            .angle(270)
            .forward(armLength + 2)
            .forward(armLength)
            .back()
            .angle(0)
            .forward(armLength)
            .back()
            .angle(180)
            .forward(armLength)
            .back()
            ;
    }

    // Add Arrow
    const tipLength = armLength * 1.25;
    const stemLength = doubleArmLength;

    if (options && options.arrow) {

        s.addPen({comment:"Arrow", style: arrowStyle})
            .to(centerX, centerY)
            .angle(45)
            .forward(circleRadius + (strokeWidth / 2) - 2)
            .down()
            .forward(stemLength + 2)
            .angle(180)
            .forward(tipLength)
            .back()
            .angle(-90)
            .forward(tipLength)
            .back()
            ;
    }
    // circle + plus
    
    // square + arrow?

    // equilateral triangle + circle?

    return s;
}

function createLetterSvg(letter: string) {
    const squareSize = 100;
    const s = new svg.Svg(letter, squareSize, squareSize);
    
    const backgroundColor = "green";
    const background = new svg.Style({name:"background", fill:backgroundColor});

    const centerX = s.width / 2;
    const centerY = s.height / 2;
    const radius = (squareSize / 2);
    s.addCircle({comment:"Circle Background", centerX, centerY, radius, style: background});

    const textStyle = s.addStyle({
        name: "letterStyle",
        font: "bold 90px serif",
        fill: "black"
    })

    const text = letter;
    const x = centerX;
    const y = centerY;
    s.addText({text, x, y, style: textStyle});

    return s;
}

const outManualDirectory = path.join(__dirname, "out/manual");

function writeSvg(image: svg.Svg) {
    console.log(`

${image.title}

`);
    standard.directory.create(outManualDirectory);
    const file = path.join(outManualDirectory, `${image.title}.svg`);
    const text = image.toString();
    console.log(text);
    standard.writeFileText(file, text);
}

function testSvg() {

    //standard.directory.clear(outManualDirectory);

    const test = createTestSvg();
    writeSvg(test);
    /*
    "#ffffff"
    "#fee6fe"
    "#e6fefe"
    */

    const backgrounds = ["#ffcccc", "#ccffcc", "#ccccff"];
    
    //["#ffe6e6", "#e6ffe6", "#e6e6ff"];



    const venus = createSignSvg({title:"Venus", plus: true, background: backgrounds[0]});
    writeSvg(venus);

    const neutral = createSignSvg({title:"Neutral", background:backgrounds[1]});
    writeSvg(neutral);

    const mars = createSignSvg({title:"Mars", arrow: true, background: backgrounds[2]});
    writeSvg(mars);

    const letterA = createLetterSvg("A");
    writeSvg(letterA);
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




