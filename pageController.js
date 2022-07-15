const { browser } = require("discord-rpc/src/constants");
const pageScraper = require("./pageScraper")


async function scrapeAll(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        await pageScraper.scraper(browser);
    } catch(err) {
        console.log("An error occurred with the browser: ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)
