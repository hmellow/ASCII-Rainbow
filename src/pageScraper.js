const base64ToImage = require('base64-to-image');
const fs = require('fs');
const {chromium} = require('playwright');


let inputText = "bcd";
const colorsArr = ["rgb(255, 0, 0)", "rgb(255, 165, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)", "rgb(143,0,255)"];
let outputB64 = [];
let font = "Alpha";
let cache = {};

// read JSON object from file
fs.readFile(`cache/json/${font}.json`, 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }

    // parse JSON object
    cache = JSON.parse(data.toString());
    cache["font"] = font;

    console.log("JSON data loaded")
});

(async () => {
    const browser = await chromium.launch({
        headless: true
    });
    const page = await browser.newPage();


    // URL for site that generates ASCII art from text
    const genURL = "http://patorjk.com/software/taag/#p=display&f=Alpha&t=";

    let artOutput = [];
    inputText = inputText.split("");
    let textOut;

    for(let i = 0; i < inputText.length; i++) {
        let char = inputText[i].toUpperCase();
        
        if (char in cache) {
            textOut = cache[char];
        } else {
            // Open URL with text parameter
            let newURL = genURL + encodeURIComponent(char);
            await page.goto(newURL);
            await page.reload();

            // Retrieve the output text
            textOut = await (page.locator("#taag_output_text")).textContent();
        }

        // Add output to array
        artOutput.push(textOut);

        cache[char] = textOut;
    } 

    // convert JSON object to string
    const data = JSON.stringify(cache);

    // write JSON string to a file
    fs.writeFile(`./cache/json/${font}.json`, data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });


    // New page
    await page.goto("https://onlineasciitools.com/convert-ascii-to-image");
    // Page settings
    // Font choice
    await page.selectOption("#option-typeface-dc1e0e21", "monospace")
    // Background color: clear
    await page.fill("#option-background-color-dc1e0e21", "(255, 255, 255, 0)");
    // Font size
    await page.fill("#option-font-size-dc1e0e21", "12px");
    // Check the box for bold
    await page.check("#option-bold-dc1e0e21");

    await browser.close();
  })();