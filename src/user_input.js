const readline = require('readline');

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

function usrInpCleaner(inpuT, urlArr) {
    const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)(\.[a-zA-Z]{2,})+(\/[^\s]*)?$/;

    urlArr = inpuT.match(regex);

    try {
        urlArr = urlArr.concat(urlArr[3] + urlArr[4]);

        if(urlArr[1] === undefined){
            urlArr = urlArr.concat('http://' + urlArr[6] + '/');
        } else {
            urlArr = urlArr.concat(urlArr[1] + urlArr[6] + '/');
        }

        return urlArr;
    } catch(err) {
        console.error("Check user input, syntax error");
        process.exit(1);
    }
}

async function scanForLinks(){
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

module.exports = {
    usrInpCleaner,
    scanForLinks
}