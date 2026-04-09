# Accessibilité & Responsive – Noé Lejeune Portfolio

> **Règle d'or** : Toute modification du site doit être validée en desktop ET mobile avant d'être considérée terminée. Je te demanderai toujours ton avis sur les deux versions.

## Breakpoints

| Breakpoint | Cible |
|-----------|-------|
| `max-width: 1200px` | Large desktop → ajustements grille |
| `max-width: 900px` | Tablette/petits laptops → grilles 1 col |
| `max-width: 768px` | Mobile → nav burger, textes réduits |
| `max-width: 480px` | Petit mobile → espacements compressés |

## Navigation mobile (Burger Menu)

- Le menu burger remplace la nav classique sous **768px**
- 3 barres animées → croix (X) à l'ouverture, avec transition CSS
- Menu déroulant plein écran ou overlay avec fond flou
- Les liens doivent être suffisamment grands (min `48px` de hauteur de zone de tap)
- Fermeture du menu au clic sur un lien

## Header

- Toujours `position: fixed` avec `z-index` suffisant
- `backdrop-filter: blur()` pour lisibilité sur tous les fonds
- Hauteur header à prendre en compte dans le `padding-top` des sections : au moins `7rem` ou équivalent

## Grilles & Cards

- `projects-grid` : `repeat(auto-fill, minmax(320px, 1fr))` — s'adapte naturellement
- Sur mobile (`< 600px`) : 1 seule colonne, les cards occupent toute la largeur
- Les images dans les cards doivent toujours avoir `object-fit: cover` et une hauteur fixe

## Typographie responsive

- Utiliser `clamp()` pour les titres impact : `clamp(2rem, 8vw, 6rem)`
- Taille minimum lisible pour le corps : `0.9rem`
- Éviter les lignes trop longues sur desktop : `max-width: 700px` pour les paragraphes

## Modale Mac OS

- Sur mobile (`< 900px`) : grille 1 colonne, hauteur `95vh`
- Padding réduit : `1.5rem`
- Assurer que le scroll fonctionne à l'intérieur de `.mac-content`

## Filtres (page Projets)

- `flex-wrap: wrap` pour les pills → elles passent naturellement à la ligne
- Sur mobile : pills légèrement plus petites (`padding: 8px 16px`)
- Garder le bouton "Tout voir" toujours visible en premier

## Accessibilité générale

- Images : attribut `alt` obligatoire
- Liens de navigation : `aria-label` si l'icône est seule
- Contraste texte/fond : ratio minimum **4.5:1** (WCAG AA)
- Focus visible : ne pas supprimer `outline` sans le remplacer
- Boutons cliquables : zone de tap min `44×44px`

## Checklist avant chaque modification

- [ ] Vérifié sur desktop (≥ 1200px) ?
- [ ] Vérifié sur tablette (900px) ?
- [ ] Vérifié sur mobile (375px) ?
- [ ] Le header est-il lisible sur ce fond ?
- [ ] Les boutons sont-ils accessibles au tap ?
- [ ] Les images ont-elles un alt text ?
