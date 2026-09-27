const fs = require('fs').promises;
const readline = require('readline');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

const rip_HTML = require('./rip_html.js');
const rip_CSS = require('./rip_css.js');
const rip_JS = require('./rip_js.js');
const { exit } = require('process');

let curSite = process.argv[2];
let curUrl = process.argv[3];

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

function urlArrToSite(urlArr) {
    const regex = /^(https?:\/\/)?(www\.)?([^\/\?]+)(\/?)/i;

    let cleaned = [];

    for(y = 0; y < urlArr.length; y++ ){
        cleaned =  cleaned.concat(urlArr.match(regex));

    }
    return cleaned;
}

async function rip(url, site, index) { 
    try {
        await fs.mkdir(`./scrapes/${curSite}/page${index}/html`, { recursive: true });
        await fs.mkdir(`./scrapes/${curSite}/page${index}/css`, { recursive: true });
        await fs.mkdir(`./scrapes/${curSite}/page${index}/js`, { recursive: true });

        console.log(`${url} HTML, CSS, & JS directories created successfully`);
    } catch (err) {
        console.error('Error creating directories: ', err)
    } finally {
        await rip_HTML.ripHTML(curSite, url, site, index);
        await rip_CSS.ripCSS(curSite, url, site, index);
        await rip_JS.ripJS(curSite, url, site, index);
    }
}

async function siteMap(targDom, targSite) {
    let linkS = [targDom];
    let siteS = [targSite];

    for(i = 0; i < linkS.length; i++) {

        console.log('pointing towards: ', linkS[i]);

        if (linkS[i] == curUrl && i === 0) {
            let ans1 = null;

            async function delayQ() {
                await rip(targDom, targSite, i);
                await new Promise((resolve) => {setTimeout(resolve, 1000)});
                ans1 = await askQuestion('Do you also want to scrape the links found on this page? (Y/n)');
            };

            await delayQ();

            if( ans1.toLowerCase() == 'y' || ans1.toLowerCase() == 'yes' ) {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();

                try {
                    await page.goto(linkS[i]);

                    linkS = linkS.concat(await page.evaluate(() => { return Array.from(document.querySelectorAll('a[href]'), a => a.href )}));
                    siteS = siteS.concat(urlArrToSite(linkS[i]));

                    console.log('Added to links:', linkS);
                } catch (err) {
                    console.error('Error scraping links, ', err);
                } finally {
                    await browser.close();
                }
            } else {
                console.log('Okay, only scraping root.');
                break;
            };
        } else if(linkS[i] == curUrl && i >= 1){
            console.log('Link to homepage, no need for a directory.');
        } else {
            let ans2 = await askQuestion('Do you want to scrape this link? (Y/n) ');

            if( ans2.toLowerCase() == 'y' || ans2.toLowerCase() == 'yes' ) {

                siteS = siteS.concat(linkS[i]);

                await rip(linkS[i], siteS[i], i);

                let ans3 = await askQuestion('Do you also want to scrape the links of this page? (Y/n)');
    
                if( ans3.toLowerCase() == 'y' || ans3.toLowerCase() == 'yes' ) {
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
    
                    try {
                        await page.goto(linkS[i]);
    
                        linkS = linkS.concat(await page.evaluate(() => { return Array.from(document.querySelectorAll('a[href]'), a => a.href )}));
                        siteS = siteS.concat(urlArrToSite(linkS));
    
                        console.log('Added to links:', linkS);
                    } catch {
                        console.error('Error scraping links ',err);
                    } finally {
                        await browser.close();
                    }

                };

            } else if ( ans2.toLowerCase() == 'n' || ans2.toLowerCase() == 'no' ) {
                console.log('Okay, skipping...');
            } else {
                console.log('skipping...');
            };
        };
    };
    console.log('Links that were scraped: \n', siteS);
    process.exit(0);
};

siteMap(curUrl, curSite);
