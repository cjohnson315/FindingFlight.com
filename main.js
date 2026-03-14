
// /*Set the height of the testimonials container to be the same height as the
// longest testimonial*/

// let $d = $("div.abouttext")
// let tallestHeight = 0

// $d.each(function(){
//     let $text = $(this)
//     let thisHeight = $text.outerHeight()

//     if(thisHeight > tallestHeight) tallestHeight = thisHeight
// })

// $d.css("height", tallestHeight + "px")

// Load and inject HTML component
async function injectHTML(selector, url) {
    // Get placeholder tag or bust
    const anchorTag = document.querySelector(selector);
    if(!anchorTag) {
        console.warn("Component anchor not found:", selector);
        return};
    try {
        // Load component
        const response = await fetch(url);
        if(!response.ok) throw new Error(`Response status: ${response.status}`);
        // Inject component
        const compHTML = await response.text();
        anchorTag.innerHTML = compHTML;
    } catch (error) {
        console.error(error.message);
    };
};

// Inject components
injectHTML('#navbarWrapper', '/components/navbar.html');
injectHTML('#ctaWrapper', '/components/cta.html');
injectHTML('#footerWrapper', '/components/footer.html');