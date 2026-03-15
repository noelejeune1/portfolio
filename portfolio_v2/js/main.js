// ============================================================================
// MAIN ANIMATIONS & LOGIC
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {

    // Register ScrollTrigger to GSAP
    gsap.registerPlugin(ScrollTrigger);

    if (document.getElementById("projects-grid")) {
        renderProjects();
    }
    initModalLogic();
    initSmoothScroll();
    initTypewriter();

});

/**
 * Typewriter Animation for Hero Section
 */
function initTypewriter() {
    const textElement = document.getElementById("typewriter-text");
    if (!textElement) return;

    const words = ["unique", "moderne", "innovante", "sur mesure", "jeune"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster deleting
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal typing
        }

        // Handle word completion
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1500; // Pause at the end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    };

    // Start with a small delay
    setTimeout(type, 1000);
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });

    // Handle initial hash in URL (if coming from another page)
    if (window.location.hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }, 1000); // Wait for entrance animation
    }
}

/**
 * Render Project Cards Dynamically
 */
function renderProjects() {
    const container = document.getElementById("projects-container");
    if (!container || !window.projectsData) return;

    container.innerHTML = ""; // Clear existing

    Object.keys(window.projectsData).forEach(key => {
        const project = window.projectsData[key];
        const card = document.createElement("div");
        card.className = "project-card";
        card.setAttribute("data-project", key);

        // Extract a short subtitle from the description if none exists
        const subtitle = project.description ? project.description.split('.')[0] + '.' : project.title;

        // Format tags like "UX/UI • Dev"
        const tags = project.competences ? project.competences.slice(0, 2).join(" • ") : "Design • Dev";

        // Check if image exists, otherwise use placeholder
        const cardImage = project.image
            ? `<img src="${project.image}" alt="${project.title}">`
            : `<div class="placeholder-image" style="width:100%; height:100%; background:#f0f0f0;"></div>`;

        card.innerHTML = `
            <div class="card-media">
                ${cardImage}
                <div class="hover-overlay">
                    <div class="glass-btn">Voir le projet</div>
                </div>
            </div>
            <div class="card-content">
                <h3>${project.title}</h3>
                <p class="card-subtitle">${subtitle}</p>
                <div class="card-tags">${tags}</div>
            </div>
        `;

        container.appendChild(card);
    });
}



/**
 * MacOS Modal Logic
 */
function initModalLogic() {
    const projectCards = document.querySelectorAll(".project-card");
    const modalOverlay = document.getElementById("project-modal");
    const macWindow = document.querySelector(".mac-window");
    const closeBtn = document.getElementById("close-modal");

    // Modal elements
    const titleEl = document.getElementById("modal-project-title");
    const descEl = document.getElementById("modal-project-desc");
    const imgEl = document.getElementById("modal-project-image");
    const missionsListEl = document.getElementById("modal-project-missions");
    const competencesEl = document.getElementById("modal-project-competences");
    const technologiesEl = document.getElementById("modal-project-technologies");
    const linkEl = document.getElementById("modal-project-link");

    let isModalOpen = false;

    // Open Modal
    projectCards.forEach(card => {
        card.addEventListener("click", () => {
            const projectId = card.getAttribute("data-project");
            const data = window.projectsData ? window.projectsData[projectId] : null;

            if (data) {
                // Populate content
                titleEl.textContent = data.title;
                descEl.innerHTML = data.description;

                // Image
                if (data.image) {
                    imgEl.innerHTML = `<img src="${data.image}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover; border-radius:12px;">`;
                    imgEl.classList.remove("placeholder-image");
                } else {
                    imgEl.innerHTML = "";
                    imgEl.classList.add("placeholder-image");
                }

                // Missions
                missionsListEl.innerHTML = data.missions
                    ? data.missions.map(m => `<li>${m}</li>`).join("")
                    : "<li>Aucune mission spécifiée.</li>";

                // Competences
                competencesEl.innerHTML = data.competences
                    ? data.competences.map(c => `<span>${c}</span>`).join("")
                    : "";

                // Technologies
                technologiesEl.innerHTML = data.technologies
                    ? data.technologies.map(t => `<span>${t}</span>`).join("")
                    : "";

                // Link
                if (data.link && data.link !== "#") {
                    linkEl.href = data.link;
                    linkEl.style.display = "inline-block";
                } else {
                    linkEl.style.display = "none";
                }
            }

            // Animate In with GSAP
            gsap.set(modalOverlay, { autoAlpha: 1, pointerEvents: "auto" });
            gsap.fromTo(macWindow,
                { scale: 0.95, y: 20, opacity: 0 },
                { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
            );

            document.body.style.overflow = "hidden";
            isModalOpen = true;
        });
    });

    // Close Modal Function
    const closeModal = () => {
        if (!isModalOpen) return;

        gsap.to(macWindow, {
            scale: 0.95,
            y: 20,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in"
        });

        gsap.to(modalOverlay, {
            autoAlpha: 0,
            pointerEvents: "none",
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                document.body.style.overflow = "auto";
                document.documentElement.style.overflow = "auto";
                isModalOpen = false;
            }
        });
    };

    // Events for closing
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    // Close on overlay click
    modalOverlay.addEventListener("mousedown", (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isModalOpen) {
            closeModal();
        }
    });
}
