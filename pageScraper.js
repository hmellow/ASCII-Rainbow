const scraperObject = {
    url: "http://patorjk.com/software/taag/#p=display&f=Alpha&t=",
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}`);
        await page.goto(this.url)
    }
}