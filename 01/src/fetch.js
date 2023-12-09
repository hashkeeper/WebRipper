const fs = require('fs');

const indexURL = process.argv[2];

fetch(indexURL)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // fs.writeFileSync(cursite + '.txt', response.text());
    return response.text();
  })
  .then(data => {
    fs.writeFileSync('index.html', data); // place data dump into
  })
  .catch(error => {
    console.error(error); // Log any errors to the console
  });

