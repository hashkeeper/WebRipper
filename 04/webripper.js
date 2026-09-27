const fs = require('fs');
const puppeteer = require('puppeteer');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const beautify = require('beautify');

const inputCleaner = require('./src/inputcleaner.js');
const setuP = require('./src/setup.js');
const askInput = require('./src/askinput.js');

const userInput = process.argv[2];

let urlArr = null;
let scrArr = [];

async function init() {
    console.log('Pointing towards: ', userInput);
    urlArr = await inputCleaner.usrInpCleaner(userInput);
    console.log(urlArr);

    await setuP.setupDirs(urlArr[6], '_root');
    await setuP.ripAll(urlArr[4], urlArr[7], urlArr[6], '_root');

    return new Promise((resolve) => {
        setTimeout( async () => {
            scrArr = scrArr.concat(await askInput.linksOfLinks(urlArr[7]));
            resolve;
        }, 2000);
    });
}

async function recurS() {
    for(i = 0; i <= scrArr.length; i++ ){
        await setuP.setupDirs(urlArr[6], i);
        await setuP.ripAll(urlArr[4], urlArr[7], urlArr[6], i);
        
        scrArr = scrArr.concat(await askInput.linksOfLinks(urlArr[7]));
    }
}

async function main() {
    if (!userInput) {
        console.error('No user input... ');
        process.exit(1);
    } else {
        await init();
        await recurS();
    }
}

main().catch((err) => {
    console.error(err)
    process.exit(1);
});