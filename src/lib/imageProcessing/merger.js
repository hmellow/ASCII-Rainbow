import amalg from "image-amalgamator";

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

    // Merge & scale image: https://github.com/PiPinecone/Image-Amalgamator
    amalg.mergeImages(outputImgs, './cache/img/out.png', 223.5, 273.5);
    return './out.png';
}