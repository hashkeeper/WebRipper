const readline = require('readline');
const puppeteer = require('puppeteer');

const inter1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => {
        inter1.question(query, answer => {
            resolve(answer);
        });
    });
};

async function linksOfLinks (urL) {
    let anS = await askQuestion('Do you also want to scrape the links found on this page? (Y/n)');

    if( anS.toLowerCase() == 'y' || anS.toLowerCase() == 'yes' ) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        try {
            await page.goto(urL);
            
            return await page.evaluate(() => { return Array.from(document.querySelectorAll('a[href]'), a => a.href )});
        } catch (err) {
            console.error('Error scraping links, ', err);
        } finally {
            await browser.close();
        }
    } else {
        console.log('Okay, only scraping root.');
        process.exit(0);
    };
}

async function specificLink () {
    let anS = await askQuestion('Do you want to scrape this specific link? (Y/n)');

    if( anS.toLowerCase() == 'y' || anS.toLowerCase() == 'yes' ) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        try {
            await page.goto(linkS[i]);
            
            return await page.evaluate(() => { return Array.from(document.querySelectorAll('a[href]'), a => a.href )});
        } catch (err) {
            console.error('Error scraping links, ', err);
        } finally {
            await browser.close();
        }
    } else {
        console.log('Okay, only scraping root.');
        return;
    };
}

module.exports = {
    linksOfLinks,
    specificLink
}