import * as cheerio from 'cheerio';
import * as axios from 'axios';
import * as fs from 'fs';

const cursite = process.argv[2];
let rawData = '';

console.log(cursite);

console.log(process.cwd());

axios.get(cursite)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    // Use Cheerio to select and extract the data from the website
    const data = $('a').text();
    // Write the data to a file
    fs.writeFileSync('output.txt', data);
  })
  .catch((error) => {
    console.log(error);
  });