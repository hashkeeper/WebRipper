const puppeteer = require('puppeteer');
const beautify = require('beautify');
const fs = require('fs').promises;

async function scrapeAsset(urL, sitE, patH, resO, indeX) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto(urL);

    if(patH === undefined || patH === null){
        await fs.mkdir(`./scrapes/${sitE}/page${indeX}/${resO}`, { recursive: true });
    } else {
        await fs.mkdir(`./scrapes/${sitE}/page${indeX}${patH}/${resO}`, { recursive: true });
    }

    let selector = null;
    let attribute = null;

    if(resO === "html") {
        selector = 'iframe[src]';
        attribute = 'src';

        let content = await page.content();
        content = beautify(content, { format: 'html' });

        await fs.writeFile(`./scrapes/${sitE}/page${indeX}/html/index.html`, content);

        console.log(urL, " index.html ripped");

    } else if(resO === "css") {
        selector = 'link[href]';
        attribute = 'href';
    } else if(res0 = 'js') {
        selector = 'script[src]';
        attribute = 'src';
    } else {
        selector = '';
        attribute = '';
    }

    const resourceHandles = await page.evaluate((sel, attr) => 
        Array.from(document.querySelectorAll(sel), el => el[attr])
    , selector, attribute);


    resourceHandles.forEach( async (resource) => {
        response = await fetch(resource);
        data = await response.text();

        let fileName = null;

        lastSlash = resource.lastIndexOf('/');
        fileName = await resource.substring(lastSlash);

        try {
            await fs.writeFile(`./scrapes/${sitE}/page${indeX}/${resO}/${fileName}`, data);
            console.log(urL, " ", fileName, " ripped")
        } catch (err){
            console.error("didn't create resource: ", err);
        }
    });
    
    await browser.close();
}

module.exports = {
    scrapeAsset
}