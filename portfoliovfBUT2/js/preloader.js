// Preloader GSAP Liquid Glass Animation
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const loaderContent = document.querySelector('.loader-content');

    // Fallback if GSAP is not loaded
    if (typeof gsap === 'undefined') {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);
        }, 2000);
        return;
    }

    const tl = gsap.timeline();

    // Initial wait to let the loader show
    tl.to({}, { duration: 1.5 })
        // 1. Animate out the content plate gracefully
        .to(loaderContent, {
            y: -40,
            opacity: 0,
            scale: 0.95,
            duration: 0.7,
            ease: "power3.inOut"
        })
        // 2. Liquid Glass effect on the background: fade blur and color
        .to(preloader, {
            autoAlpha: 0,
            backdropFilter: "blur(0px)",
            webkitBackdropFilter: "blur(0px)",
            duration: 1.0,
            ease: "power2.inOut"
        }, "-=0.3")
        // 3. Stagger in the main page elements for a modern Apple-like entry
        .fromTo(".hero h1", {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.5)"
        }, "-=0.6")
        .fromTo(".hero p", {
            y: 20,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6")
        .fromTo(".filter-container", {
            y: 20,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.6")
        .add(() => {
            preloader.style.display = 'none';
        });
});
