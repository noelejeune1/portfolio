// =========================================
// TIMELINE FORMATIONS - RANGE SLIDER
// =========================================

const timelineRange = document.getElementById('timeline-range');
const timelineSlider = document.querySelector('.timeline-slider');
const timelineYearGroups = document.querySelectorAll('.timeline-year-group');
const sliderProgress = document.querySelector('.slider-progress');

const years = ['2023', '2024', '2027']; // 3 années seulement
let currentIndex = 1; // Start at 2024 (index 1)

// Function to navigate to a specific year by index
function navigateToYear(index) {
    if (index < 0 || index >= years.length) return;

    currentIndex = index;
    const year = years[index];

    // Update range input
    timelineRange.value = index;

    // Update progress bar (0% to 100%)
    const progressPercent = (index / (years.length - 1)) * 100;
    sliderProgress.style.width = `${progressPercent}%`;

    // Remove active class from all groups
    timelineYearGroups.forEach(group => group.classList.remove('active'));

    // Add active class to current year (centered display)
    const activeGroup = document.querySelector(`.timeline-year-group[data-year="${year}"]`);
    if (activeGroup) activeGroup.classList.add('active');
}

// Range input change event
timelineRange.addEventListener('input', (e) => {
    const index = parseInt(e.target.value);
    navigateToYear(index);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const formationsSection = document.querySelector('.formations-section');
    if (!formationsSection) return;

    const rect = formationsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
        if (e.key === 'ArrowLeft') {
            navigateToYear(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            navigateToYear(currentIndex + 1);
        }
    }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (timelineSlider) {
    timelineSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    timelineSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
            // Swipe left - go to next year (higher index)
            navigateToYear(currentIndex + 1);
        } else {
            // Swipe right - go to previous year (lower index)
            navigateToYear(currentIndex - 1);
        }
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    navigateToYear(currentIndex);
});
