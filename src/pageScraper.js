const base64ToImage = require('base64-to-image');
const fs = require('fs');
const { base64ImageToBlob } = require('./b64toimg');

let inputText = "Testing";
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

const scraperObject = {
    url: "http://patorjk.com/software/taag/#p=display&f=Alpha&t=",
    async scraper(browser) {

        // Open art generator page
        let page = await browser.newPage();
        console.log("Navigating...");

        let artOutput = [];

        // Split input string into individual characters
        inputText = inputText.split("");
        let text;
    
        for(let i = 0; i < inputText.length; i++) {
            let char = inputText[i].toUpperCase();
            
            if (char in cache) {
                text = cache[char];
            } else {
                // Open URL with text parameter
                let newURL = this.url + encodeURIComponent(char);
                await page.goto(newURL);
                await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
    
                // Retrieve the output text
                await page.waitForSelector("#taag_output_text");
                text = await page.evaluate(() => {
                    let anchor = document.querySelector("#taag_output_text");
                    return anchor.textContent;
                });
            }
    
            // Add output to array
            artOutput.push(text);
    
            cache[char] = text;
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
        // Select page settings
        await page.waitForSelector("div.page-content:nth-child(1) div.page.container:nth-child(2) div.content div.all-tools-container:nth-child(4) div.section.sides.tool.tool-primary div.body div.sides-options-wrapper > div.converter-options");
        await page.select('[data-index="typeface"]', "monospace")
        await page.$eval('[data-index="background-color"]', (el, color) => el.value = color, "(255, 255, 255, 0)");
        await page.$eval('[data-index="font-size"]', el => el.value = "12px");
        const boldCheckbox = '[data-index="bold"]';
        await page.evaluate((boldCheckbox) => document.querySelector(boldCheckbox).click(), boldCheckbox);
        

        // Generate base64 image URL
        const dataUri = '[data-url="convert-image-to-data-uri"]';
        const elements = await page.$x("//div[@class='widget widget-chain']");
        await elements[0].click();
        await page.waitForSelector(dataUri);
        page.$eval(dataUri, elem => elem.click());

        // Convert to image and make R A I N B O W
        for(let i = 6; i < artOutput.length + 6; i++) {
            // Set color
            await page.$eval('[data-index="text-color"]', (el, color) => el.value = color, colorsArr[i % 6]);

            // Input ASCII
            await page.$eval('.data-wrapper textarea', (el, input) => el.value = input, artOutput[i - 6]);
            await page.type('.data-wrapper textarea', " "); // To make sure input is recognized

            // RM'd: b64

            // Unique selector for the right copy button. Don't ask questions, just leave it alone. Please.
            await page.waitForSelector("div.tool-chained>div:nth-child(4)>div:nth-child(1)>div:nth-child(2)>div>div:nth-child(2)>div:nth-child(1)>div:nth-child(4)");



            const waiter = {
                set base64_url(cont) {
                  setTimeout((() => {console.log(cont.length)}), 1000)}
            };

            waiter.base64_url = await page.evaluate(_ => {
                // Press the copy button, which selects the text
                let copy = document.getElementsByClassName("widget-copy")[3];
                copy.click();
      
                // Get and return the selected text (the base64 URL)
                let selection = window.getSelection().toString();
                return selection;
            });
            // console.log(base64_url.length);

            // let blobb;
            // try {
            //     blobb = base64ImageToBlob(base64_url);
            // } catch (err) {
            //     throw err;
            // }
            // console.log(blobb.size);
        }
        await browser.close();

    }   
}

module.exports = scraperObject;