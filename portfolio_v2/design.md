# Design System – Noé Lejeune Portfolio

## Palette de couleurs

| Nom | Variable CSS | Hex | Usage |
|-----|-------------|-----|-------|
| Bordeaux (accent principal) | `--color-bordeaux` | `#A6051A` | CTA, liens actifs, accents forts |
| Gold (accent secondaire) | `--color-gold` | `#FFEB00` | Hover states, titres de section dans modales |
| Blanc | `--color-white` | `#FFFFFF` | Fond principal, cards |
| Dark | `--color-dark` | `#202020` | Textes, footer, section about |
| Texte atténué | `--text-muted` | `#555555` | Sous-titres, paragraphes |

## Typographie

| Famille | Usage | Weights |
|---------|-------|---------|
| **Anton** | Titres impact (`.impact-title`) | 400 |
| **Montserrat** | Corps de texte, nav, boutons | 300, 400, 500, 600, 700 |
| **Dancing Script** | Signature décorative | 700 |

Titre hero : `clamp(3rem, 10vw, 6rem)` — toujours en `Anton`, uppercase.

## Style des Cards (`.project-card`)

- `border-radius: 24px`
- `box-shadow: 0 10px 40px rgba(0,0,0,0.05)`
- `border: 1px solid rgba(0,0,0,0.05)`
- Fond blanc pur `#FFFFFF`
- Hover : `translateY(-8px)` + shadow bordeaux
- **Card media** : hauteur fixe `260px`, `object-fit: cover`, zoom ×1.08 au hover
- **Hover overlay** : fond `rgba(0,0,0,0.25)` + `backdrop-filter: blur(6px)` + bouton glass
- **Card content** : `padding: 30px`, titre `1.5rem/700`, sous-titre `1rem/400 #666`

## Boutons

| Classe | Style |
|--------|-------|
| `.primary-btn` | Fond bordeaux, texte blanc, uppercase italic, shadow bordeaux |
| `.secondary-btn` | Transparent, bordure blanche (pour fonds sombres) |
| `.filter-pill` | `border-radius: 40px`, fond semi-transparent bordeaux/5% → active : fond bordeaux plein |
| `.glass-btn` | `backdrop-filter: blur(15px)`, bordure blanche 30%, fond blanc 15% |

## Header

- Fixed, `backdrop-filter: blur(20px)`, fond blanc à `0.85` opacité
- Séparateur bas : `1px solid rgba(0,0,0,0.08)`
- Box-shadow subtil : `0 2px 20px rgba(0,0,0,0.06)`
- Logo : avatar rond 44×44px, hover scale ×1.1
- Nav : `font-weight: 500`, hover couleur bordeaux

## Modale Mac OS

- Fenêtre blanche, `border-radius: 12px`, shadow `0 50px 100px rgba(0,0,0,0.3)`
- Barre de titre : fond `rgba(246,246,246,0.8)`, boutons rouge/jaune/vert
- Grille 2 colonnes `1fr 1.2fr` → 1 colonne sous 900px
- Sections avec titres en gold uppercase

## Effets & Animations

- Transitions standard : `0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- Transitions cards : `0.5s cubic-bezier(0.2, 1, 0.3, 1)` (effet ressort)
- Shapes abstraites hero : `blur(80px)`, animation `flow` 20s infinie
- Loader intro : fond bordeaux, animation GSAP
