import mergeImg from "merge-img";
import fs from "fs";

const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Violet"];

export function imgGen(input) {
    let outputImgs = [];

    let inputText = input.toUpperCase();
    inputText = inputText.split("");
    
    // Make the R A I N B O W
    for(let i = 6; i < inputText.length + 6; i++) {
        // Choose colors and push file paths
        outputImgs.push(`./Letters/${colors[i % 6]}/${inputText[i - 6]}.png`);
    }

    // Merge images
    mergeImg(outputImgs).then((img) => {
        // Save image as file
        img.write('./out.png', () => console.log('done'));
    });

    return './out.png';
}