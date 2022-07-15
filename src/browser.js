const puppeteer = require("puppeteer")


async function startBrowser() {
    let browser;
    try {
        console.log("Browsing commencment commenced");
        browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
            "ignoreHTTPSErrors": true
        });
    } catch (err) {
        console.log("An error occurred: ", err)
    }
    return browser;
}

module.exports = {
    startBrowser
};
