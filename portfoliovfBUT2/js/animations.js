// =========================================
// MODERN PORTFOLIO ANIMATIONS & INTERACTIONS
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initNavPillSlider();
    initScrollReveal();
    initCardTilt();
    initSmoothHover();
});

// =========================================
// 1. HEADER SCROLL EFFECT
// =========================================
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// =========================================
// 2. NAV PILL SLIDER
// =========================================
function initNavPillSlider() {
    const navPill = document.querySelector('.nav-pill');
    const navBtns = document.querySelectorAll('.nav-btn');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isAbout = btn.textContent.includes('propos');
            if (isAbout) {
                navPill.classList.add('about-active');
            } else {
                navPill.classList.remove('about-active');
            }
        });
    });
}

// =========================================
// 3. SCROLL REVEAL ANIMATIONS
// =========================================
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealOnScroll = () => {
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// =========================================
// 4. 3D CARD TILT EFFECT
// =========================================
function initCardTilt() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// =========================================
// 5. SMOOTH HOVER STATES
// =========================================
function initSmoothHover() {
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .filter-btn, .tech-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}





// =========================================
// 10. STAGGER ANIMATION ON FILTER
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Re-trigger stagger animation
            cards.forEach((card, index) => {
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = `cardReveal 0.6s ease forwards ${index * 0.1}s`;
            });
        });
    });
});



// =========================================
// 7. INTERSECTION OBSERVER FOR ANIMATIONS
// =========================================
function initIntersectionAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .tech-card, .mood-item').forEach(el => {
        observer.observe(el);
    });
}

// Initialize intersection animations
document.addEventListener('DOMContentLoaded', initIntersectionAnimations);


