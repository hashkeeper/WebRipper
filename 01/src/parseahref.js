const cheerio = require('cheerio');
const fs = require('fs');

const indexFile = fs.readFileSync('./index.html');

const $ = cheerio.load(indexFile, {
    xml: {
      xmlMode: false,  // Disable `xmlMode` to parse HTML with htmlparser2.
    },
  }
);

const aList = $('a');
let hrefList = [];

// use cheerio to scan and save all "a" element hrefs
for(var i = 1; i < aList.length; i++) {
  hrefList.push($('a:nth-child(' + i + ')').attr('href'));
};


for(var j = 0; j < hrefList.length; j++) {
  // if (hrefList[j].charAt(0) == null) {
  //   continue 
  // } else {
  let entryAsString = hrefList[j].toString();
  fs.appendFile('rip.txt', entryAsString + '\n', (err) => {
    if (err) throw err;
    console.log(entryAsString + 'appended to rip.txt');
  }
  );
  // };
};

// console.log('###parseahref.js complete###');
// console.log(aList);
// console.log(hrefList);
// console.log(process.cwd());
// console.log('#############################');
return;