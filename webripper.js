const scrapeTools = require('./src/scrape_tools.js');
const userInput = require('./src/user_input.js');

const initInput = process.argv[2];

let urlArr = [];
let scrArr = [initInput];

async function init() {
    console.log('Pointing towards: ', initInput);
    
    urlArr = await userInput.usrInpCleaner(initInput);

    await scrapeTools.scrapeAsset(urlArr[7], urlArr[6], urlArr[5], 'html', '_root');
    await scrapeTools.scrapeAsset(urlArr[7], urlArr[6], urlArr[5], 'css', '_root');
    await scrapeTools.scrapeAsset(urlArr[7], urlArr[6], urlArr[5], 'js', '_root');

    return;
}


async function main() {
    if (!userInput) {
        console.error('No user input... ');
        process.exit(1);
    } else {
        await init();

        await userInput.scanForLinks();
    }
}

main()
    .then(() => {
        console.log(urlArr);
        console.log(scrArr);
    })
    .catch((err) => {
        console.error(err)
        process.exit(1);
    });