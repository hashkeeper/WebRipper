const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const beautify = require('beautify');
const { timeout } = require('puppeteer');
const fs = require('fs').promises;

async function ripJS(rooT, urL, sitE, indeX) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urL);

    const jsHandles = await page.evaluate(() => 
        Array.from(document.querySelectorAll('script[src]'), script => script.src)
    );

    console.log(jsHandles);

    jsHandles.forEach(async (resource) => {
        let response = null;
        let data = null;

        try {
            response = await fetch(resource);

            data = await response.text();

        } catch (error) {
            console.log(error);
        }

        const lastSlash = resource.lastIndexOf('/');

        let thisFile = null;

        if(lastSlash !== '/') {
            thisFile = await resource.substring(lastSlash);
            console.log(thisFile);
        } else {
            console.log('There is no resource at this address.')
        }

        await fs.writeFile('./scrapes/' + rooT + '/page' + indeX + '/js' + thisFile, data, (err) => {
            if (err) {
                console.error("didn't get JS file: ", thisFile, err);
            } else {
                console.log("saved JS file: ",  thisFile);
            }
        });
    });
    
    await browser.close();
};

module.exports = {
    ripJS
}