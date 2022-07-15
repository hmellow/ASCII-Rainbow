let artOutput = [];
let inputText = "Testing";


const scraperObject = {
    url: "http://patorjk.com/software/taag/#p=display&f=Alpha&t=",
    async scraper(browser) {
        // Split input string into individual characters
        inputText = inputText.split("");

        // Open art generator page
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}`);
        page.goto(this.url);
        

        await page.waitForSelector("#inputText");
        // await page.$eval("#inputText", el => el.value = "T");


        for(let i = 0; i < inputText.length; i++) {
            // Input each character into the text field
            let char = String(inputText[i])
            await page.$eval("#inputText", (el, char) => el.value = `${char}`)
            // Retrieve the output text
            await page.waitForSelector("#taag_output_text");
            const text = await page.evaluate(() => {
                const anchor = document.querySelector("#taag_output_text");
                return anchor.textContent;
            });
            // Add output to array
            artOutput.push(text);
        } 

        for(let j = 0; j < artOutput.length; j++) {
            console.log(artOutput[j]);
        }
        // await browser.close();
    }
}

module.exports = scraperObject;