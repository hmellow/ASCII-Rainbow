import amalg from "image-amalgamator";

const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Violet"];

export async function imgGen(input) {
    let outputImgs = [];

    const finPath = `./cache/img/${input.toLowerCase()}.png`;
    let inputText = input.toUpperCase();
    inputText = inputText.split("");
    
    // Colorize images
    for(let i = 6; i < inputText.length + 6; i++) {
        // Choose colors and push file paths
        outputImgs.push(`./static/Letters/${colors[i % 6]}/${inputText[i - 6]}.png`);
    }

    // Merge & scale images: https://github.com/PiPinecone/Image-Amalgamator
    await amalg.mergeImages(outputImgs, finPath /*, 500, 273.5*/);

    return finPath;
}
