// =========================================
// OPTIMIZED LIGHTWEIGHT STARFIELD BACKGROUND
// =========================================

class Starfield {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.numStars = 75; // Réduit de 200 à 75 pour meilleures performances

        this.init();
    }

    init() {
        // Setup canvas
        this.canvas.id = 'starfield-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-2';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.opacity = '0.6'; // Légère transparence

        // Insert before other background elements
        document.body.insertBefore(this.canvas, document.body.firstChild);

        this.resize();
        this.createStars();
        this.animate();

        // Handle resize with debounce for better performance
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.resize(), 150);
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createStars() {
        this.stars = [];
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.5, // Tailles réduites
                opacity: Math.random() * 0.7 + 0.3,
                twinkleSpeed: Math.random() * 0.015 + 0.005, // Scintillement plus lent
            });
        }
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw stars (simplifié, sans glow ni parallax pour performances)
        this.stars.forEach(star => {
            // Twinkle effect
            star.opacity += star.twinkleSpeed;
            if (star.opacity > 1 || star.opacity < 0.3) {
                star.twinkleSpeed = -star.twinkleSpeed;
            }

            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            this.ctx.fill();
        });
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize starfield when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Starfield();
});
