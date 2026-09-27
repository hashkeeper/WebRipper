const pageOpt = document.querySelectorAll('#pageOptions > *');

// Apply eventlisteners to style option buttons at the bottom of the homepage.
pageOpt.forEach((page, index) => {
    page.addEventListener('click', function loadNewContent() {
        // Fetch HTML file and place the text inside that file between a selected HTML
        // element's opening and closing tags
        fetch('./pagepicker/page'+ index + '/index.html?cacheBuster=' + new Date().getTime())
            .then(response => response.text())
            .then(html => {
                document.getElementById('conT').innerHTML = html;
            })
            .catch(error => console.error('Error fetching new content:', error));

        // Fetch CSS file and place the text inside that file between a selected HTML
        // element's opening and closing tags
        fetch('./pagepicker/page' + index + '/style.css?cacheBuster=' + new Date().getTime())
            .then(response => response.text())
            .then(css => {
                document.getElementById('selStyle').textContent = css;
            })
            .catch(error => console.error('Error fetching new content:', error));

        // Fetch the JS script and apply it to the DOM
        fetch('./pagepicker/page'+ index + '/script.js?cacheBuster=' + new Date().getTime())
            .then(response => response.text())
            .then(js => {
                let oldScript = document.getElementById('selJs');
                if(oldScript) {
                    oldScript.parentNode.removeChild(oldScript);
                }

                let newScript = document.createElement('script');
                newScript.id = 'selJs';
                newScript.defer = true;
                newScript.innerText = js;
                document.head.appendChild(newScript);
            })
            .catch(error => console.error('Error fetching JS:', error));
    });
});

// Initialize default homepage style
pageOpt[0].click();
console.log(pageOpt);

