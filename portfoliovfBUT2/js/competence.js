// --- CAROUSEL AUTO-SCROLLING INITIALIZATION ---
function initSkillsCarousel() {
    const carousel = document.getElementById('skills-carousel');
    if (!carousel) return;

    // Clone all cards to create infinite loop effect
    const cards = Array.from(carousel.children);
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        carousel.appendChild(clone);
    });

    // Add click listeners to all cards (including clones)
    addFlipCardListeners();
}

// --- 3D FLIP CARD FUNCTIONALITY ---
function addFlipCardListeners() {
    const allCards = document.querySelectorAll('.tech-card');

    allCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFlipCard(card);
        });
    });

    // Click outside to unflip all
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.tech-card')) {
            document.querySelectorAll('.tech-card.flipped').forEach(c => {
                c.classList.remove('flipped');
            });
        }
    });
}

function toggleFlipCard(clickedCard) {
    const wasFlipped = clickedCard.classList.contains('flipped');

    // Unflip all other cards
    document.querySelectorAll('.tech-card.flipped').forEach(card => {
        if (card !== clickedCard) {
            card.classList.remove('flipped');
        }
    });

    // Toggle the clicked card
    if (!wasFlipped) {
        clickedCard.classList.add('flipped');
    } else {
        clickedCard.classList.remove('flipped');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initSkillsCarousel);