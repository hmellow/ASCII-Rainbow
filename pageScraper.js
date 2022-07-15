let artOutput = [];
let inputText = "Testing";


const scraperObject = {
    url: "http://patorjk.com/software/taag/#p=display&f=Alpha&t=",
    async scraper(browser) {
        // Split input string into individual characters
        inputText = inputText.split("");

        // Open art generator page
        let page = await browser.newPage();
        console.log("Navigating...");


        for(let i = 0; i < inputText.length; i++) {
            // Open URL with text parameter
            let newURL = this.url + encodeURIComponent(inputText[i]);
            await page.goto(newURL);
            await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });

            // Retrieve the output text
            await page.waitForSelector("#taag_output_text");
            let text = await page.evaluate(() => {
                let anchor = document.querySelector("#taag_output_text");
                return anchor.textContent;
            });
            // Add output to array
            artOutput.push(text);
        } 

        
        console.log(artOutput);
        for(let j = 0; j < artOutput.length; j++) {
            console.log(artOutput[j]);
        }
        
        // await browser.close();
    }
}

module.exports = scraperObject;