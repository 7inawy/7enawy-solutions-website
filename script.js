/**
 * 7enawy Solutions - Website JavaScript
 * Comprehensive interactivity for the entire website
 */

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Check if element exists before manipulating
 * @param {string} selector - CSS selector
 * @returns {Element|null}
 */
function getElement(selector) {
    return document.querySelector(selector);
}

/**
 * Get all elements matching selector
 * @param {string} selector - CSS selector
 * @returns {NodeList}
 */
function getAllElements(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Add event listener with element existence check
 * @param {string} selector - CSS selector
 * @param {string} event - Event type
 * @param {Function} callback - Event callback
 */
function addEventListenerSafe(selector, event, callback) {
    const element = getElement(selector);
    if (element) {
        element.addEventListener(event, callback);
    }
}

// =============================================================================
// NAVBAR SCROLL EFFECT
// =============================================================================

function initNavbarScrollEffect() {
    const navbar = getElement('.main-nav');
    if (!navbar) return;

    let lastScrollY = window.scrollY;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class when user scrolls down more than 100px
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// =============================================================================
// SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
// =============================================================================

function initScrollAnimations() {
    const fadeElements = getAllElements('.fade-in-element, .service-card, .project-card, .team-card, .value-card, .counter-item, .timeline-item');
    
    if (fadeElements.length === 0) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation if it's a counter element
                if (entry.target.classList.contains('counter-item')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Add fade-in-element class to elements that don't have it
    fadeElements.forEach(element => {
        if (!element.classList.contains('fade-in-element')) {
            element.classList.add('fade-in-element');
        }
        observer.observe(element);
    });
}

// =============================================================================
// PARTICLES.JS INITIALIZATION
// =============================================================================

function initParticles() {
    const particlesContainer = getElement('#particles-js');
    if (!particlesContainer || typeof particlesJS === 'undefined') return;
    
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#64ffda"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#64ffda",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}

// =============================================================================
// ANIMATED COUNTERS
// =============================================================================

function animateCounter(counterElement) {
    const numberElement = counterElement.querySelector('.counter-number');
    if (!numberElement) return;
    
    const target = parseInt(numberElement.getAttribute('data-target')) || parseInt(numberElement.textContent);
    const duration = 2000; // 2 seconds
    const start = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
        
        // Format number with commas for large numbers
        numberElement.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            numberElement.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// =============================================================================
// CYCLING TEXT ANIMATION (HERO SECTION)
// =============================================================================

function initCyclingText() {
    const cyclingItems = getAllElements('.cycle-item');
    if (cyclingItems.length === 0) return;
    
    let currentIndex = 0;
    
    function cycleText() {
        // Remove active class from all items
        cyclingItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to current item
        cyclingItems[currentIndex].classList.add('active');
        
        // Move to next item
        currentIndex = (currentIndex + 1) % cyclingItems.length;
    }
    
    // Start cycling after hero animations
    setTimeout(() => {
        cycleText();
        setInterval(cycleText, 3000); // Change every 3 seconds
    }, 2000);
}

// =============================================================================
// SWIPER.JS CAROUSELS
// =============================================================================

function initSwiperCarousels() {
    // Projects Swiper
    const projectsSwiper = getElement('.projects-swiper');
    if (projectsSwiper && typeof Swiper !== 'undefined') {
        new Swiper('.projects-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            }
        });
    }
    
    // Testimonials Swiper
    const testimonialsSwiper = getElement('.testimonials-swiper');
    if (testimonialsSwiper && typeof Swiper !== 'undefined') {
        new Swiper('.testimonials-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            },
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            }
        });
    }
}

// =============================================================================
// FAQ ACCORDION
// =============================================================================

function initFAQAccordion() {
    const faqItems = getAllElements('.faq-item');
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// =============================================================================
// PROJECT FILTERING
// =============================================================================

function initProjectFiltering() {
    const filterButtons = getAllElements('.filter-btn');
    const projectCards = getAllElements('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// =============================================================================
// CONTACT FORM HANDLING
// =============================================================================

function initContactForm() {
    const contactForm = getElement('#contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you within 24 hours.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}

// =============================================================================
// MOBILE MENU TOGGLE
// =============================================================================

function initMobileMenu() {
    const mobileToggle = getElement('.mobile-menu-toggle');
    const navLinks = getElement('.nav-links');
    
    if (!mobileToggle || !navLinks) return;
    
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        mobileToggle.classList.toggle('active');
        
        // Toggle hamburger icon
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinksItems = getAllElements('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            mobileToggle.classList.remove('active');
            
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// =============================================================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// =============================================================================

function initSmoothScrolling() {
    const anchorLinks = getAllElements('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = getElement(href);
            if (!target) return;
            
            e.preventDefault();
            
            const navHeight = getElement('.main-nav')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// =============================================================================
// LOADING ANIMATION
// =============================================================================

function initLoadingAnimation() {
    // Add loaded class to body when page is fully loaded
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
}

// =============================================================================
// GSAP ANIMATIONS (if GSAP is available)
// =============================================================================

function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;
    
    // Hero title animation
    const heroTitle = getElement('.hero-title');
    if (heroTitle) {
        gsap.from(heroTitle, {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 0.5,
            ease: "power3.out"
        });
    }
    
    // Service cards stagger animation
    const serviceCards = getAllElements('.service-card');
    if (serviceCards.length > 0) {
        gsap.from(serviceCards, {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%'
            }
        });
    }
}

// =============================================================================
// PERFORMANCE OPTIMIZATIONS
// =============================================================================

function initPerformanceOptimizations() {
    // Lazy load images
    const images = getAllElements('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Preload critical resources
    const criticalResources = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// =============================================================================
// MAIN INITIALIZATION
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('7enawy Solutions - Initializing website interactivity...');
    
    // Initialize all components
    initLoadingAnimation();
    initNavbarScrollEffect();
    initScrollAnimations();
    initParticles();
    initCyclingText();
    initSwiperCarousels();
    initFAQAccordion();
    initProjectFiltering();
    initContactForm();
    initMobileMenu();
    initSmoothScrolling();
    initGSAPAnimations();
    initPerformanceOptimizations();
    
    console.log('7enawy Solutions - All components initialized successfully!');
});

// =============================================================================
// ADDITIONAL CSS CLASSES FOR ENHANCED INTERACTIVITY
// =============================================================================

// Add dynamic CSS for mobile menu (if not in CSS file)
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 2rem;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-links.mobile-active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .mobile-menu-toggle.active {
            transform: rotate(90deg);
        }
    }
    
    .scrolled {
        background: rgba(10, 25, 47, 0.95) !important;
        box-shadow: 0 2px 20px rgba(100, 255, 218, 0.1);
    }
    
    .loaded .fade-in-element {
        transform: translateY(0);
        opacity: 1;
    }
`;

// Inject styles if they don't exist
if (!getElement('#dynamic-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'dynamic-styles';
    styleSheet.textContent = mobileMenuStyles;
    document.head.appendChild(styleSheet);
}

// =============================================================================
// ERROR HANDLING AND FALLBACKS
// =============================================================================

window.addEventListener('error', (e) => {
    console.warn('7enawy Solutions - Script error:', e.error);
});

// Fallback for older browsers
if (!window.IntersectionObserver) {
    // Fallback: Add visible class to all fade elements immediately
    const fallbackElements = getAllElements('.fade-in-element');
    fallbackElements.forEach(el => el.classList.add('visible'));
}

// Export functions for potential external use
window.SevenawySolutions = {
    initParticles,
    animateCounter,
    initSwiperCarousels,
    initFAQAccordion,
    initProjectFiltering
}; 