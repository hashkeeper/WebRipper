const cheerio = require('cheerio');
const fs = require('fs');

const url = process.argv[2];
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
  if(hrefList[j] === '/'){
    continue;
  } else if (hrefList[j].startsWith(url)) {
    let entryAsString = hrefList[j].toString();
    fs.appendFile('rip.txt', entryAsString + '\n', (err) => {
      if (err) throw err;
      console.log('appended ' + entryAsString + ' to rip.txt');
    }
    );
  } else {
    console.log(hrefList[j]); 
    console.log(url); 
    continue;
  }; 
};

// console.log(aList);
// console.log(hrefList);
// console.log(process.cwd());
console.log('parsed hrefs. exiting...');
return;