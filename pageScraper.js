const scraperObject = {
    url: "http://patorjk.com/software/taag/#p=display&f=Alpha&t=",
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}`);
        page.goto(this.url);
        
        await page.waitForSelector("#inputText");
        await page.$eval("#inputText", el => el.value = "Testing");

        await page.waitForSelector("#taag_output_text")
        const text = await page.evaluate(() => {
            const anchor = document.querySelector("#taag_output_text");
            return anchor.textContent;
        });
        console.log(text);
        // await browser.close();
    }
}

module.exports = scraperObject;