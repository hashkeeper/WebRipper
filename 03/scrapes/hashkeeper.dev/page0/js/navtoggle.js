const primaryNav = document.querySelector('nav');
const navToggle = document.querySelector('#logo');

function toggleNav() {
    const visibility = navToggle.getAttribute('aria-expanded');

    if (visibility === "false") {
        primaryNav.setAttribute("data-visible", true);
        navToggle.setAttribute('aria-expanded', true);
    } else if (visibility === "true") {
        primaryNav.setAttribute("data-visible", false);
        navToggle.setAttribute('aria-expanded', false);
    }
}


navToggle.addEventListener('click', toggleNav);
