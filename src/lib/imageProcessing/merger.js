import mergeImg from "merge-img";
import Jimp from "jimp";

const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Violet"];

export function imgGen(input) {
    let outputImgs = [];

    let inputText = input.toUpperCase();
    inputText = inputText.split("");
    
    // Make the R A I N B O W
    for(let i = 6; i < inputText.length + 6; i++) {
        // Choose colors and push file paths
        outputImgs.push(`./static/Letters/${colors[i % 6]}/${inputText[i - 6]}.png`);
    }

    // Merge images
    mergeImg(outputImgs).then((img) => {
        // Save image as file
        img.write('./cache/img/out.png', () => console.log('done'));
    });

    // Resize image
    Jimp.read('./cache/img/out.png', (err, outImg) => {
        if (err) throw err;
        outImg
          .scaleToFit(800, 200) // scale for output box
          .write('./cache/img/out.png'); // save
    });
    

    return './out.png';
}