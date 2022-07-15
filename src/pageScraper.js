let artOutput = [];
let inputText = "Testing";
const cache = {};
const colorsArr = ["rgb(255, 0, 0)", "rgb(255, 165, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)", "rgb(143,0,255)"]


// TODO load cache from json

const scraperObject = {
    url: "http://patorjk.com/software/taag/#p=display&f=Alpha&t=",
    async scraper(browser) {
        // Split input string into individual characters
        inputText = inputText.split("");

        // Open art generator page
        let page = await browser.newPage();
        console.log("Navigating...");
        
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

        // Convert ASCII to image
        // New page
        await page.goto("https://onlineasciitools.com/convert-ascii-to-image");
        // Select page settings
        await page.waitForSelector("div.page-content:nth-child(1) div.page.container:nth-child(2) div.content div.all-tools-container:nth-child(4) div.section.sides.tool.tool-primary div.body div.sides-options-wrapper > div.converter-options");
        await page.select('[data-index="typeface"]', "monospace")
        await page.$eval('[data-index="background-color"]', (el, color) => el.value = color, "(255, 255, 255, 0)");
        await page.$eval('[data-index="font-size"]', el => el.value = "12px");
        const boldCheckbox = '[data-index="bold"]';
        await page.evaluate((boldCheckbox) => document.querySelector(boldCheckbox).click(), boldCheckbox);
        
        // Convert to image and make R A I N B O W
        for(let i = 6; i < artOutput.length + 6; i++) {
            // Set color
            await page.$eval('[data-index="text-color"]', (el, color) => el.value = color, colorsArr[i % 6]);

            // Input ASCII
            
        }

        
        // console.log(artOutput);
        for(let j = 0; j < artOutput.length; j++) {
            console.log(artOutput[j]);
        }
        
        await browser.close();
    }
}

module.exports = scraperObject;

// TODO export cache to json