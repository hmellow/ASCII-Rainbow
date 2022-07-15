const pageScraper = require("./pageScraper")


async function scrapeAll(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        await pageScraper.scraper(browser);
    } catch(err) {
        console.log("An error occurred with the browser, which is just downright annoying. Well, better get to fixing it :( ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)
