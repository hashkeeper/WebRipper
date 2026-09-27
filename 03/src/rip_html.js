const puppeteer = require('puppeteer');
const beautify = require('beautify');
const fs = require('fs').promises;

async function ripHTML(rooT, urL, sitE, indeX) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urL);

    let content = await page.content();
    content = beautify(content, { format: 'html' });

    await fs.writeFile('./scrapes/' + rooT + '/page' + indeX + '/html/index.html', content, (err) => {
        if (err) {
            console.error("didn't get HTML file.", err);
        } else {
            console.log("saved HTML file.");
        }
    });

    await browser.close();
};

module.exports = {
    ripHTML
}