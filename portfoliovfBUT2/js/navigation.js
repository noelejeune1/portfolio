/* ==========================================================================
   2. ZONE TECHNIQUE (NE PAS TOUCHER SAUF SI TU SAIS CE QUE TU FAIS)
   ========================================================================== */

// --- A. GESTION DE LA NAVIGATION ---
function switchPage(pageId) {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Active le bon bouton
    if (pageId === 'home') buttons[0].classList.add('active');
    if (pageId === 'about') buttons[1].classList.add('active');

    const activePage = document.querySelector('.page-section.active');
    if (activePage && activePage.id !== pageId) {
        activePage.classList.remove('fade-in');
        setTimeout(() => {
            activePage.classList.remove('active');
            const newPage = document.getElementById(pageId);
            newPage.classList.add('active');
            setTimeout(() => {
                newPage.classList.add('fade-in');
                // Si on va sur 'about', on peut relancer des animations si besoin
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 50);
        }, 500);
    }
}

// --- B. GESTION DE LA MODALE ---
const modal = document.getElementById('project-modal');
const modalElements = {
    title: document.getElementById('modal-title'),
    desc: document.getElementById('modal-description'),
    missions: document.getElementById('modal-missions'),
    comp: document.getElementById('modal-competences'),
    tech: document.getElementById('modal-tech-stack'),
    img: document.getElementById('modal-image'),
    link: document.getElementById('modal-link'),
    placeholder: document.getElementById('modal-placeholder')
};

const contentToBlur = document.querySelectorAll('#main-header, #main-container');

function openModal(projectId) {
    const project = projectsData[projectId];

    if (!project) {
        console.error("Projet non trouvé : " + projectId);
        return;
    }

    // Remplissage Textes
    modalElements.title.textContent = project.title;
    modalElements.desc.innerHTML = project.description;

    // Remplissage Image
    if (project.image) {
        modalElements.img.src = project.image;
        modalElements.img.style.display = 'block';
        modalElements.placeholder.style.display = 'none';
    } else {
        modalElements.img.style.display = 'none';
        modalElements.placeholder.style.display = 'block';
    }

    // Remplissage Lien
    if (project.link && project.link !== "#") {
        modalElements.link.href = project.link;
        modalElements.link.style.cursor = "pointer";
        modalElements.link.title = "Cliquez pour voir le projet";
    } else {
        modalElements.link.removeAttribute('href');
        modalElements.link.style.cursor = "default";
        modalElements.link.title = "";
    }

    // Listes (Missions)
    modalElements.missions.innerHTML = '';
    if (project.missions) {
        project.missions.forEach(m => {
            const li = document.createElement('li');
            li.textContent = m;
            modalElements.missions.appendChild(li);
        });
    }

    // Tags (Compétences)
    modalElements.comp.innerHTML = '';
    if (project.competences) {
        project.competences.forEach(c => {
            createTag(c, modalElements.comp, 'rgba(232, 62, 62, 0.1)', '#c0392b');
        });
    }

    // Tags (Technos)
    modalElements.tech.innerHTML = '';
    if (project.technologies) {
        project.technologies.forEach(t => {
            createTag(t, modalElements.tech, '#eee', '#333');
        });
    }

    // Affichage
    modal.classList.add('active');
    contentToBlur.forEach(el => el.classList.add('blurred-bg'));
    document.body.style.overflow = 'hidden';
}

// Fonction utilitaire pour créer les tags
function createTag(text, container, bg, color) {
    const tag = document.createElement('span');
    tag.className = 'pill-tag';
    tag.style.background = bg;
    tag.style.color = color;
    tag.textContent = text;
    container.appendChild(tag);
}

function closeModal() {
    modal.classList.remove('active');
    contentToBlur.forEach(el => el.classList.remove('blurred-bg'));
    document.body.style.overflow = '';
    // Reset image delay
    setTimeout(() => { modalElements.img.src = ""; }, 300);
}

// Event Listeners
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
});

