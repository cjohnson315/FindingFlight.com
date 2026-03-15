// TODO pull reviews from external JSON file instead of hardcoding

// Function to load and inject modular HTML components
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

// Function to inject reviews into a carousel shell
async function buildReviewsCarousel(reviews) {   
    // Get template and injection anchors
    const template = document.getElementById('reviewTemplate');
    const reviewSlides = document.getElementById('ctaCarousel');
    const carouselButtons = document.getElementById('ctaCarouselButtons');

    reviews.forEach((review, index) => {
        // Create slide from template
        const slide = template.content.cloneNode(true);
        // Get template components
        const item = slide.querySelector('.carousel-item');
        const text = slide.querySelector('.ctaReview');
        const author = slide.querySelector('.ctaReviewAuthor');
        // Set value of review and author
        text.textContent = review.text;
        author.textContent = review.author;
        // Make first slide active
        if(index===0) item.classList.add('active');
        // Add to list
        reviewSlides.appendChild(slide)
        // Create indicator buttons
        const slideInd = document.createElement('button');
        slideInd.setAttribute('type', 'button');
        slideInd.setAttribute('data-bs-target', '#ctaReviews');
        slideInd.setAttribute('data-bs-slide-to', index);
        // Make first button active
        if(index===0) slideInd.classList.add('active');
        carouselButtons.appendChild(slideInd);
    });
};

// Function to initialize carousel BS after injecting reviews
function initReviewsCarousel() {
    const revCarousel = document.getElementById('ctaReviews');
    // Make sure carousel has been injected
    if(!revCarousel) return;
    const carousel = new bootstrap.Carousel(revCarousel, {
        interval: 8000,
        pause: 'hover'
    });
};

// Hardcoded reviews JSON
const reviews = [
  { text: `I can't recommend Isaac's course enough. Whether you're chasing adventure or looking \
    to become a more skilled pilot, this is the upgrade you need.`,
    author: 'David Palmer' },
  { text:  `Isaac is the best. Not only is he a great pilot, but he's also a great instructor and mechanic.`, 
    author: 'Buck Rowe' },
  { text: `Isaac is a great instructor. Amazing airplane as well.`, 
    author: 'Michael Barnett' },
  { text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et est egestas, volutpat ex \
    et, hendrerit lectus. Sed aliquam fermentum nunc sed laoreet. Nam et est egestas, volutpat ex \
    et, hendrerit lectus. Sed aliquam fermentum nunc sed laoreet.`, 
    author: 'FF Admin' },
  { text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et est egestas, volutpat ex \
    et, hendrerit lectus. Sed aliquam fermentum nunc sed laoreet.`, 
    author: 'FF Admin' }
];


// Inject navbar and footer components
injectHTML('#navbarWrapper', '/components/navbar.html');
injectHTML('#footerWrapper', '/components/footer.html');
// Inject cta component and review carousel
injectHTML('#ctaWrapper', '/components/cta.html').then(()=> {
    buildReviewsCarousel(reviews);
    initReviewsCarousel();
});

