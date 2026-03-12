// ============================================================================
// MAIN ANIMATIONS & LOGIC
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {

    // Register ScrollTrigger to GSAP
    gsap.registerPlugin(ScrollTrigger);

    initEntranceAnimation();
    renderProjects();
    initModalLogic();

});

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
 * Entrance Animation (Liquid Glass)
 */
function initEntranceAnimation() {
    const tl = gsap.timeline({
        onComplete: () => {
            // Restore scrolling once animation is done
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
            // Completely hide the loader from DOM/Events
            const loader = document.getElementById("loader");
            if (loader) {
                loader.style.display = "none";
                loader.style.pointerEvents = "none";
            }
        }
    });

    // Set initial state
    gsap.set(".loader-title", { opacity: 0, y: 50 });
    gsap.set(".loader-subtitle", { opacity: 0, y: 30 });
    gsap.set("#main-wrapper", { opacity: 0, scale: 1.05 });

    // 1. Initial wait & text reveal
    tl.to(".loader-title", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.5
    })
        .to(".loader-subtitle", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "expo.out"
        }, "-=0.8");

    // 2. Liquid Glass Reveal effect
    tl.to(".loader-content", {
        y: -100,
        opacity: 0,
        filter: "blur(20px)",
        duration: 1.2,
        ease: "expo.in"
    }, "+=1")

        // Liquid glass shrinking / moving away
        .to(".glass-overlay", {
            scale: 1.5,
            opacity: 0,
            duration: 2,
            ease: "expo.inOut"
        }, "-=0.8")

        // 3. Reveal Main Wrapper smoothly
        .to("#main-wrapper", {
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: "expo.out"
        }, "-=1.5");

    // Hero elements staggered reveal
    tl.from(".hero-content > *", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out"
    }, "-=1.5");
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
