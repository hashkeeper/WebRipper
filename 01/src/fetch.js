const fs = require('fs');

const cursite = process.argv[2];

fetch(cursite)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    fs.writeFileSync(cursite + '.txt', response.text());
    return response.text();
  })
  .then(data => {
    console.log(data); // Log the response body to the console
  })
  .catch(error => {
    console.error(error); // Log any errors to the console
  });
