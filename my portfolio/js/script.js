// Custom Cursor
const cursor = document.createElement('div');
const cursorFollow = document.createElement('div');
cursor.className = 'cursor';
cursorFollow.className = 'cursor-follow';
document.body.appendChild(cursor);
document.body.appendChild(cursorFollow);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
        cursorFollow.style.left = e.clientX + 'px';
        cursorFollow.style.top = e.clientY + 'px';
    }, 100);
});

// Parallax Effect for Hero Section
document.addEventListener('mousemove', (e) => {
    const parallaxElements = document.querySelectorAll('.parallax-element');

    parallaxElements.forEach(element => {
        const speed = element.dataset.speed;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;

        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// Smooth Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Add scroll reveal to elements
document.querySelectorAll('.timeline-item, .cert-card, .stat').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(30px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
});

// Button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollow.style.transform = 'scale(1.2)';
    });

    btn.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollow.style.transform = 'scale(1)';
    });
});

// Page transition effect (simple fade)
document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.href !== window.location.href) {
            e.preventDefault();
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = link.href;
            }, 300);
        }
    });
});

// Initial page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.querySelectorAll('.hero-content > *').forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('fade-in-up');
        }, index * 200);
    });
});

// Performance optimization: Throttle mousemove events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

const throttledParallax = throttle((e) => {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}, 16); // ~60fps

document.addEventListener('mousemove', throttledParallax);

// Photo Carousel Functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current slide
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    // Move carousel inner
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
}

// Auto-play carousel
setInterval(nextSlide, 5000);

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlideIndex);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Smooth scroll for hero button
    const exploreButton = document.querySelector('a[href="#highlights"]');
    if (exploreButton) {
        exploreButton.addEventListener('click', (e) => {
            e.preventDefault();
            const highlightsSection = document.getElementById('highlights');
            if (highlightsSection) {
                highlightsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburgerMenu.contains(e.target) && !navMenu.contains(e.target)) {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Karate Gallery Carousel Functionality
let currentGallerySlideIndex = 0;
const gallerySlides = document.querySelectorAll('.gallery-item');
const galleryIndicators = document.querySelectorAll('.gallery-indicator');

function showGallerySlide(index) {
    // Hide all slides
    gallerySlides.forEach(slide => slide.classList.remove('active'));
    galleryIndicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current slide
    gallerySlides[index].classList.add('active');
    galleryIndicators[index].classList.add('active');
    
    // Move gallery inner
    const galleryInner = document.querySelector('.gallery-inner');
    galleryInner.style.transform = `translateX(-${index * 100}%)`;
}

function nextGallerySlide() {
    currentGallerySlideIndex = (currentGallerySlideIndex + 1) % gallerySlides.length;
    showGallerySlide(currentGallerySlideIndex);
}

function prevGallerySlide() {
    currentGallerySlideIndex = (currentGallerySlideIndex - 1 + gallerySlides.length) % gallerySlides.length;
    showGallerySlide(currentGallerySlideIndex);
}

function currentGallerySlide(index) {
    currentGallerySlideIndex = index;
    showGallerySlide(currentGallerySlideIndex);
}

// Auto-play gallery carousel
setInterval(nextGallerySlide, 4000);

// Initialize gallery carousel
document.addEventListener('DOMContentLoaded', () => {
    if (gallerySlides.length > 0) {
        showGallerySlide(currentGallerySlideIndex);
    }
});