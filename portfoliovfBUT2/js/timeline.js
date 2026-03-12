// =========================================
// TIMELINE FORMATIONS - SMOOTH RANGE SLIDER
// =========================================

const timelineRange = document.getElementById('timeline-range');
const timelineSlider = document.querySelector('.timeline-slider');
const timelineYearGroups = document.querySelectorAll('.timeline-year-group');
const sliderProgress = document.querySelector('.slider-progress');

const years = ['2023', '2024', '2027'];
const yearPositions = [0, 50, 100]; // Positions en pourcentage sur le slider

// Function to find the closest year based on slider value
function getClosestYear(value) {
    let closestIndex = 0;
    let minDistance = Math.abs(value - yearPositions[0]);

    for (let i = 1; i < yearPositions.length; i++) {
        const distance = Math.abs(value - yearPositions[i]);
        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
        }
    }

    return closestIndex;
}

// Function to update the timeline display
function updateTimeline(value) {
    // Update progress bar
    sliderProgress.style.width = `${value}%`;

    // Find the closest year
    const closestIndex = getClosestYear(value);
    const closestYear = years[closestIndex];

    // Calculate opacity for each year group based on distance
    timelineYearGroups.forEach((group, index) => {
        const yearValue = yearPositions[index];
        const distance = Math.abs(value - yearValue);

        // Distance threshold for full opacity vs fade
        const fadeRange = 30; // Distance where fade starts

        if (distance <= fadeRange) {
            // Within fade range - calculate opacity
            const opacity = 1 - (distance / fadeRange);
            group.style.opacity = opacity;
            group.style.transform = `scale(${0.9 + opacity * 0.1})`;

            // Only set active for the closest one
            if (index === closestIndex) {
                group.classList.add('active');
            } else {
                group.classList.remove('active');
            }
        } else {
            // Too far - fade out completely
            group.classList.remove('active');
            group.style.opacity = '0';
            group.style.transform = 'scale(0.9)';
        }
    });
}

// Range input change event - now with smooth sliding
timelineRange.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    updateTimeline(value);
});

// Snap to nearest year when releasing the slider
timelineRange.addEventListener('change', (e) => {
    const value = parseFloat(e.target.value);
    const closestIndex = getClosestYear(value);
    const snapValue = yearPositions[closestIndex];

    // Smooth transition to the closest year
    timelineRange.value = snapValue;
    updateTimeline(snapValue);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const formationsSection = document.querySelector('.formations-section');
    if (!formationsSection) return;

    const rect = formationsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
        const currentValue = parseFloat(timelineRange.value);
        const currentIndex = getClosestYear(currentValue);

        if (e.key === 'ArrowLeft') {
            if (currentIndex > 0) {
                const newValue = yearPositions[currentIndex - 1];
                timelineRange.value = newValue;
                updateTimeline(newValue);
            }
        } else if (e.key === 'ArrowRight') {
            if (currentIndex < years.length - 1) {
                const newValue = yearPositions[currentIndex + 1];
                timelineRange.value = newValue;
                updateTimeline(newValue);
            }
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
        const currentValue = parseFloat(timelineRange.value);
        const currentIndex = getClosestYear(currentValue);

        if (difference > 0) {
            // Swipe left - go to next year
            if (currentIndex < years.length - 1) {
                const newValue = yearPositions[currentIndex + 1];
                timelineRange.value = newValue;
                updateTimeline(newValue);
            }
        } else {
            // Swipe right - go to previous year
            if (currentIndex > 0) {
                const newValue = yearPositions[currentIndex - 1];
                timelineRange.value = newValue;
                updateTimeline(newValue);
            }
        }
    }
}

// Initialize on load (default to middle year - 2024)
document.addEventListener('DOMContentLoaded', () => {
    const initialValue = yearPositions[1]; // 50 (2024)
    timelineRange.value = initialValue;
    updateTimeline(initialValue);
});
