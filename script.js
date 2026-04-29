/* ========================================
   SCRIPT.JS - INTERACTIVE FUNCTIONALITY
   ======================================== */

// =========== STICKY HEADER & MOBILE MENU ===========

document.addEventListener('DOMContentLoaded', function () {
    initializeStickyHeader();
    initializeFAQ();
    initializeTestimonialSlider();
    initializeSmoothScroll();
});

function initializeStickyHeader() {
    const headerNav = document.querySelector('.header-nav');
    const body = document.body;

    // Create menu toggle button for mobile
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    window.addEventListener('resize', () => {
        const nav = document.querySelector('.header-nav');
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
        }
    });
}

function createMobileMenu() {
    const header = document.querySelector('.header-container');
    if (document.querySelector('.mobile-menu-btn')) return;

    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '☰';
    menuBtn.setAttribute('aria-label', 'Toggle menu');

    header.appendChild(menuBtn);

    menuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const nav = document.querySelector('.header-nav');
        nav.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.header-nav a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.header-nav').classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('.header-nav');
        if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
}

// =========== FAQ ACCORDION ===========

function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function (e) {
            e.preventDefault();

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// =========== TESTIMONIALS SLIDER ===========

function initializeTestimonialSlider() {
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const slider = document.querySelector('.testimonials-slider');

    if (!slider) return;

    let currentIndex = 0;
    const cards = Array.from(slider.querySelectorAll('.testimonial-card'));
    const visibleCards = getVisibleCardsCount();

    function getVisibleCardsCount() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        return 3;
    }

    function showSlide(index) {
        const cardWidth = 320 + 24; // card width + gap
        slider.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    prevBtn?.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        showSlide(currentIndex);
    });

    nextBtn?.addEventListener('click', () => {
        const maxIndex = Math.max(0, cards.length - visibleCards);
        currentIndex = Math.min(maxIndex, currentIndex + 1);
        showSlide(currentIndex);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        const newVisibleCards = getVisibleCardsCount();
        const maxIndex = Math.max(0, cards.length - newVisibleCards);
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
            showSlide(currentIndex);
        }
    });
}

// =========== SMOOTH SCROLL ===========

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just '#' or doesn't have a target
            if (href === '#') return;

            e.preventDefault();

            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerHeight = 72 + 20; // sticky header height + offset
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =========== BUTTON INTERACTIONS ===========

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function () {
        this.style.transform = 'scale(0.98)';
    });

    button.addEventListener('mouseup', function () {
        this.style.transform = '';
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

// =========== INTERSECTION OBSERVER FOR ANIMATIONS ===========

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards on page load
document.querySelectorAll('.card, .process-step, .testimonial-card, .pricing-card').forEach(el => {
    observer.observe(el);
});

// =========== CTA BUTTON MODAL ===========

const ctaButtons = document.querySelectorAll('[class*="btn-primary"]');
ctaButtons.forEach(btn => {
    const originalText = btn.textContent;
    btn.addEventListener('click', function (e) {
        // Simulate booking flow
        if (this.textContent.includes('Book') || this.textContent.includes('Session')) {
            e.preventDefault();
            showBookingModal();
        }
    });
});

//     // Create simple modal (can be replaced with proper modal library)
//     const modalHTML = `
//         <div style="
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: rgba(0,0,0,0.3);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             z-index: 9999;
//         " class="booking-modal-overlay">
//             <div style="
//                 background: white;
//                 border-radius: 16px;
//                 padding: 48px;
//                 max-width: 500px;
//                 width: 90%;
//                 text-align: center;
//             ">
//                 <h2 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 32px; margin-bottom: 16px;">
//                     Ready to get started?
//                 </h2>
//                 <p style="font-size: 16px; color: #666; margin-bottom: 32px;">
//                     Choose your preferred way to book a session with our therapists.
//                 </p>
//                 <div style="display: flex; gap: 16px; flex-direction: column;">
//                    <button style="
//                         background: linear-gradient(135deg, #333333, #000000);
//                         color: white;
//                         border: none;
//                         padding: 14px 32px;
//                         border-radius: 12px;
//                         font-size: 16px;
//                         font-weight: 600;
//                         cursor: pointer;
//                         transition: all 250ms;
//                     " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''" onclick="window.location.href='http://127.0.0.1:5500/book.html'">
//                         Schedule Online
//                     </button>
//                     <button style="
//                         background: transparent;
//                         color: #000000;
//                         border: 2px solid #000000;
//                         padding: 12px 32px;
//                         border-radius: 12px;
//                         font-size: 16px;
//                         font-weight: 600;
//                         cursor: pointer;
//                         transition: all 250ms;
//                     " onmouseover="this.style.backgroundColor='#E5E5E5'" onmouseout="this.style.backgroundColor='transparent'">
//                         Contact Us
//                     </button>
//                 </div>
//             </div>
//         </div>
//     `;

//     const modal = document.createElement('div');
//     modal.innerHTML = modalHTML;
//     document.body.appendChild(modal);

//     // Close modal on overlay click
//     modal.querySelector('.booking-modal-overlay').addEventListener('click', function (e) {
//         if (e.target === this) {
//             modal.remove();
//         }
//     });
// }

// =========== WHATSAPP BUTTON ===========

// WhatsApp button already has href, just ensure it opens in new tab
document.querySelector('.whatsapp-button')?.addEventListener('click', function (e) {
    // Let the link handle it naturally
});

// =========== FORM SUBMISSION HANDLERS ===========

// Handle any newsletter or contact forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Simulate form submission
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.textContent;

        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'Sent! ✓';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                this.reset();
            }, 2000);
        }, 1000);
    });
});

// =========== SCROLL PROGRESS INDICATOR ===========

function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #000000, #CCCCCC);
        z-index: 1000;
        transition: width 100ms ease-out;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

initializeScrollProgress();

// =========== ACTIVE LINK HIGHLIGHTING ===========

function initializeActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header-nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.style.color = 'var(--color-primary)';
                link.style.fontWeight = '600';
            }
        });
    });
}

initializeActiveNav();

// =========== UTILITY FUNCTIONS ===========

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// =========== DYNAMIC CTA TRACKING ===========

class CTATracker {
    constructor() {
        this.trackCTAClicks();
    }

    trackCTAClicks() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const ctaText = button.textContent.trim();
                const section = button.closest('section');
                const sectionId = section?.id || 'unknown';

                // Log CTA click data (in production, send to analytics)
                console.log(`CTA Clicked: ${ctaText} from section: ${sectionId}`);
            });
        });
    }
}

new CTATracker();

// =========== ACCESSIBILITY ENHANCEMENTS ===========

// Focus management
document.addEventListener('keydown', (e) => {
    // Close modals with Escape
    if (e.key === 'Escape') {
        const modal = document.querySelector('.booking-modal-overlay')?.parentElement;
        if (modal) modal.remove();
    }
});

// Keyboard navigation for accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
        }
    });
});

// =========== PERFORMANCE MONITORING ===========

if (window.performance && window.performance.navigation.type === 1) {
    // Page was reloaded
    console.log('Page reloaded');
}

// Log Core Web Vitals when available
if ('web-vital' in window) {
    window.addEventListener('web-vital', (e) => {
        console.log(e.detail);
    });
}

// =========== MOBILE MENU STYLING ===========

const style = document.createElement('style');
style.textContent = `
    .mobile-menu-btn {
        display: none;
        background: transparent;
        border: none;
        font-size: 24px;
        color: #111111;
        cursor: pointer;
        padding: 8px;
        transition: all 250ms;
    }
    
    .mobile-menu-btn.active {
        color: #000000;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        .header-nav {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// =========== INITIALIZATION COMPLETE ===========

console.log('HiTherapy website initialization complete');
const awardsSwiper = new Swiper('.awardsSwiper', {
    slidesPerView: 1.15,
    spaceBetween: 20,
    grabCursor: true,
    loop: true,
    pagination: {
        el: '.awards-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.awards-btn-next',
        prevEl: '.awards-btn-prev',
    },
    breakpoints: {
        480: {
            slidesPerView: 1.5,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2.3,
            spaceBetween: 24,
        },
        1024: {
            slidesPerView: 3.2,
            spaceBetween: 24,
        },
        1280: {
            slidesPerView: 3.5,
            spaceBetween: 28,
        },
    },
});

// =========== SERVICES SWIPER ===========
function initializeServicesSwiper() {
    if (document.querySelector('.servicesSwiper')) {
        const servicesSwiper = new Swiper('.servicesSwiper', {
            slidesPerView: 1, // Default for mobile
            spaceBetween: 24, // Gap between cards
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2, // 2 cards on iPads
                },
                1024: {
                    slidesPerView: 3, // 3 cards on Desktops
                }
            }
        });
    }
}

// Call it
initializeServicesSwiper();