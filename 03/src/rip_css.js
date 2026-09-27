const puppeteer = require('puppeteer');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const beautify = require('beautify');
const fs = require('fs').promises;

async function ripCSS(rooT, urL, sitE, indeX) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urL);

    const cssHandles = await page.evaluate(() => 
        Array.from(document.querySelectorAll('link[href]'), link => link.href)
    );

    console.log(cssHandles);

    cssHandles.forEach(async (resource) => {
        let response = null;
        let data = null;

        try {
            response = await fetch(resource);

            data = await response.text();

        } catch (error) {
            console.log(error);
        }

        const lastSlash = resource.lastIndexOf('/');

        console.log(lastSlash);
        
        // const extensioN = lastSlash.lastIndexOf('.');

        // console.log('XXXXXXXXX ', extensioN);

        // if(extensioN === '.css'){

            let thisFile = null;

            if(lastSlash !== '/') {
                thisFile = await resource.substring(lastSlash);
                console.log(thisFile);
            } else {
                console.log('There is no resource at this address.')
            }

            await fs.writeFile('./scrapes/' + rooT + '/page' + indeX + '/css' + thisFile, data, (err) => {
                if (err) {
                    console.error("didn't get CSS file: ", thisFile, err);
                } else {
                    console.log("saved CSS file: ", thisFile);
                }
            });
        // };
    });
    
    await browser.close();
};

module.exports = {
    ripCSS
}