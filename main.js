const puppeteer = require("puppeteer")
const browserObject = require("./src/browser.js");
const scraperController = require("./src/pageController.js");

let browserInstance = browserObject.startBrowser();
scraperController(browserInstance);
