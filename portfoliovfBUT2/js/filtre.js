// --- GESTION DES FILTRES PROJETS ---
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. Gestion de la classe "active" sur les boutons
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 2. Récupération de la catégorie cliquée
        const filterValue = btn.getAttribute('data-filter');

        // 3. Filtrage des cartes
        projectCards.forEach(card => {
            // On récupère les catégories de la carte (ex: "ux_ui dev_web")
            const cardCategories = card.getAttribute('data-categories');

            if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                // Si "tout" ou si la catégorie est présente, on affiche
                card.classList.remove('hidden');
                card.classList.add('show');
            } else {
                // Sinon on cache
                card.classList.add('hidden');
                card.classList.remove('show');
            }
        });
    });
});