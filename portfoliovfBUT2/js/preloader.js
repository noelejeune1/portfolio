// Preloader Animation
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');

    // Minimum display time (2 seconds)
    setTimeout(function () {
        preloader.classList.add('fade-out');

        // Remove from DOM after fade out
        setTimeout(function () {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);
});
