const fs = require('fs').promises;
const puppeteer = require('puppeteer');
const beautify = require('beautify');
const { console } = require('inspector');

async function setupDirs(sitE, indeX) {
    await fs.mkdir(`./scrapes/${sitE}/page${indeX}/html`, { recursive: true });
    await fs.mkdir(`./scrapes/${sitE}/page${indeX}/css`, { recursive: true });
    await fs.mkdir(`./scrapes/${sitE}/page${indeX}/js`, { recursive: true });

    console.log(`${sitE} HTML, CSS, & JS directories created successfully`);
}

async function ripHTML(rooT, urL, sitE, indeX) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto(urL);

    let content = await page.content();
    content = beautify(content, { format: 'html' });

    try {
        await fs.writeFile(`./scrapes/${sitE}/page${indeX}/html/index.html`, content);
        console.log(urL, "index.html ripped")
    } catch (err){
        console.error("didn't get HTML file.", err);
    }
    
    await browser.close();
}

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

        let thisFile = null;

        if(lastSlash !== '/') {
            thisFile = await resource.substring(lastSlash);
            console.log(thisFile, "ripped");
        } else {
            console.log('There is no resource at this address.')
        }

        try {
            await fs.writeFile(`./scrapes/${sitE}/page${indeX}/css/${thisFile}`, data);
            console.log(thisFile, "ripped");
        } catch (err) {
            console.error("couldn't rip file: ", thisFile, ": ", err)
        }
    });
    
    await browser.close();
}

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
            console.error(error);
        }

        const lastSlash = resource.lastIndexOf('/');

        let thisFile = null;

        if(lastSlash !== '/') {
            thisFile = await resource.substring(lastSlash);
            console.log(thisFile, "ripped" );
        } else {
            console.log('There is no resource at this address.')
        }

        try {
            await fs.writeFile(`./scrapes/${sitE}/page${indeX}/js/${thisFile}`, data);
            console.log(thisFile, "ripped");
        } catch (err) {
            console.error("couldn't rip file: ", thisFile, ": ", err)
        }
    });
    
    await browser.close();
}

async function ripAll(rooT, urL, sitE, indeX) {
    await ripHTML(rooT, urL, sitE, indeX);
    await ripCSS(rooT, urL, sitE, indeX);
    await ripJS(rooT, urL, sitE, indeX);
}

module.exports = {
    setupDirs,
    ripAll
}