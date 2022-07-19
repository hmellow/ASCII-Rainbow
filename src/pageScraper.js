const mergeImg = require("merge-img");
const fs = require('fs');
const {chromium} = require('playwright');


let inputText = "ASCII";
const colorsArr = ["rgb(255, 0, 0)", "rgb(255, 165, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)", "rgb(143,0,255)"];
let outputImgs = [];
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
        headless: true,
        downloadsPath: "./cache/img/",
        // slowMo: 2000
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
    await page.selectOption('[data-index="typeface"]', "monospace")
    // Background color: clear
    await page.fill('[data-index="background-color"]', "rgb(0, 0, 0, 0)");
    // Font size
    await page.fill('[data-index="font-size"]', "12px");
    // Check the box for bold
    await page.dispatchEvent('[data-index="bold"]', 'click');



    // Convert to image and make R A I N B O W
    for(let i = 6; i < artOutput.length + 6; i++) {
        // Set color
        await page.fill('[data-index="text-color"]', colorsArr[i % 6]);
        // Input ASCII
        await page.fill('.data-wrapper textarea', artOutput[i - 6]);
        await page.type('.data-wrapper textarea', " "); // To make sure input is recognized

        // Download image
        const [ download ] = await Promise.all([
            page.waitForEvent('download'),
            page.locator('div.page-content:nth-child(1) div.page.container:nth-child(2) div.content div.all-tools-container:nth-child(4) div.section.sides.tool.tool-primary div.body div.sides-wrapper.clearfix div.side.output:nth-child(2) div.side-box:nth-child(2) div.side-widgets div.side-widgets-wrapper > div.widget:nth-child(3)').click(),
            page.locator('div.page-content:nth-child(1) div.page.container:nth-child(2) div.content div.all-tools-container:nth-child(4) div.section.sides.tool.tool-primary div.body div.sides-wrapper.clearfix div.side.output:nth-child(2) div.side-box:nth-child(2) div.side-widgets.toggled div.side-widgets-toggle div.toggle-wrapper div.widget-toggle.toggle-save-as.toggle-active:nth-child(1) > div.widget.widget-save-as:nth-child(1)').click(),

        ]);
        // Wait for the download process to complete
        const path = await download.path();

        // Add path to output array
        outputImgs.push(`./cache/img/${i-6}.png`);
        // Rename file
        fs.rename(path, outputImgs[i-6], function(err) {
            if (err) console.log(err);
        });
    }
    // Merge images
    mergeImg(outputImgs).then((img) => {
        // Save image as file
        img.write('out.png', () => console.log('done'));

        // Delete temporary files
        for(let i = 0; i < outputImgs.length; i++) {
            fs.unlinkSync(`./cache/img/${i}.png`);
        }
    });


    await browser.close();
  })();