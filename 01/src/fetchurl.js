const fs = require('fs');
const indexURL = process.argv[2];

fetch(indexURL)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // fs.writeFileSync(cursite + '.txt', response.text());
    url = response.url;
    console.log(url);
    return response.url;
  })
  .then(data => {
    return; 
  })
  .catch(error => {
    console.error(error); // Log any errors to the console
  });

