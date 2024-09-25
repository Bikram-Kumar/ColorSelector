import {ColorSpaceConverter} from "./ColorSpaceConverter.js";



var hueCnvs = document.getElementById('hue');
var gradCnvs = document.getElementById('gradient');
var huePointer = document.getElementById('hue-pointer');
var gradPointer = document.getElementById('grad-pointer');
var hctx = hueCnvs.getContext('2d');
var gctx = gradCnvs.getContext('2d');

var pointerIsOutOfHue = false;
var pointerIsOutOfGrad = false;


var hueColor = {
    r: 255,
    g: 0,
    b: 0,
    a: 255
};
var hueColorData1Line = new ImageData(1536, 1);

var gradColor = {
    r: 255,
    g: 0,
    b: 0,
    a: 255
};

function fillHue(color, inc, dec, ctx, counter) {
    let c = counter;
    hueColorData1Line.data[c] = color.r;
    hueColorData1Line.data[c + 1] = color.g;
    hueColorData1Line.data[c + 2] = color.b;
    hueColorData1Line.data[c + 3] = color.a;

    for (var i = 4; i < 256 * 4; i += 4) {
        color[inc] += dec;
        hueColorData1Line.data[c + i] = color.r;
        hueColorData1Line.data[c + i + 1] = color.g;
        hueColorData1Line.data[c + i + 2] = color.b;
        hueColorData1Line.data[c + i + 3] = color.a;

    }
}

console.log(ColorSpaceConverter.rgbToHex(hueColor));
fillHue(hueColor, 'g', 1, hctx, 0);
console.log(ColorSpaceConverter.rgbToHex(hueColor));
fillHue(hueColor, 'r', (-1), hctx, 255 * 4);
console.log(ColorSpaceConverter.rgbToHex(hueColor));
fillHue(hueColor, 'b', 1, hctx, 511 * 4);
console.log(ColorSpaceConverter.rgbToHex(hueColor));
fillHue(hueColor, 'g', (-1), hctx, 767 * 4);
console.log(ColorSpaceConverter.rgbToHex(hueColor));
fillHue(hueColor, 'r', 1, hctx, 1023 * 4);
console.log(ColorSpaceConverter.rgbToHex(hueColor));
fillHue(hueColor, 'b', (-1), hctx, 1279 * 4);
console.log(ColorSpaceConverter.rgbToHex(hueColor));
console.log(hueColorData1Line);



function displayColorValue(e) {
    e.preventDefault();
    gradPointer.style.left = (e.pageX) + "px";
    gradPointer.style.top = (e.pageY) + "px";
    
    var color = {};
    [color.r, color.g, color.b, color.a] = e.target.getContext("2d").getImageData(e.offsetX, e.offsetY, 1, 1).data;
    document.querySelector('p').style.background = ColorSpaceConverter.rgbToHex(color);
    document.querySelector('p').innerText = ColorSpaceConverter.rgbToHex(color);
}


function fillGradient(e) {
    e.preventDefault();
    huePointer.style.left = (e.pageX) + "px";
    huePointer.style.top = (e.pageY) + "px";
    
    var color = {};
    [color.r,color.g,color.b,color.a] = hctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
    var gradColorData = new ImageData(256,256);
    var g = gradColorData;
    
    var x = 255;
    var y = 255;
    
    for (var i = 0; i < 256*256*4; i+=4) {
        g.data[i] = (y * x / 255) + (255-x) * (y) / 255**2 * color.r;
        g.data[i+1] = (y * x / 255) + (255-x) * (y) / 255**2 * color.g;
        g.data[i+2] = (y * x / 255) + (255-x) * (y) / 255**2 * color.b;
        g.data[i+3] = 255;
        
        x--;
        if (x == -1) {
            x = 255;
            y--;
        }
    }
    
    gctx.putImageData(gradColorData, 0,0);
}





function main() {

    var tempCtx = window.document.createElement("canvas").getContext("2d");
    tempCtx.canvas.width = 1536;
    tempCtx.canvas.height = 1;
    tempCtx.putImageData(hueColorData1Line, 0, 0);
    
    hctx.drawImage(tempCtx.canvas, 0, 0, 256, 40);
    
    hueCnvs.onpointerdown = (e) => {
        pointerIsOutOfHue = false; 
        fillGradient(e);
    };
    
    hueCnvs.onpointermove = (e) => {
        if (pointerIsOutOfHue) return;
        fillGradient(e);
    };
    
    hueCnvs.onpointerleave = () => {
        pointerIsOutOfHue = true;
        console.log(true);
    };
    
    gradCnvs.onpointerdown = (e) => {
        pointerIsOutOfGrad = false; 
        displayColorValue(e);
    };
    
    gradCnvs.onpointermove = (e) => {
        if (pointerIsOutOfGrad) return;
        displayColorValue(e);
    };
    
    gradCnvs.onpointerleave = () => {
        pointerIsOutOfGrad = true;
    };

}
window.onload = main;