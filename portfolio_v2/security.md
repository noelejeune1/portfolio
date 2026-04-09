# Sécurité du Portfolio — Noé Le Jeune

## Vue d'ensemble

Ce document recense les mesures de sécurité mises en place sur le portfolio statique et les recommandations pour un déploiement en production.

---

## Mesures implémentées

### 1. Content Security Policy (CSP)

Une politique CSP est définie via une balise `<meta>` dans chaque page HTML. Elle restreint les ressources que le navigateur est autorisé à charger :

| Directive | Valeur autorisée | Raison |
|---|---|---|
| `default-src` | `'self'` | Tout le reste depuis le domaine propre uniquement |
| `script-src` | `'self'` + cdnjs.cloudflare.com + cdn.jsdelivr.net | GSAP et EmailJS SDK |
| `style-src` | `'self'` + fonts.googleapis.com | Google Fonts |
| `font-src` | fonts.gstatic.com | Fichiers de polices |
| `connect-src` | api.emailjs.com | Envoi du formulaire |
| `img-src` | `'self'` + `data:` | Images locales et SVG inline |

> **Limite :** Les CSP via `<meta>` ne couvrent pas les frame-ancestors ni certains en-têtes HTTP. Pour une protection complète, les headers doivent être définis côté serveur (voir section déploiement).

---

### 2. Protection anti-spam du formulaire de contact

**Honeypot :** Un champ caché `#honeypot` est présent dans le formulaire. Il est invisible pour les utilisateurs humains (CSS `display: none`) mais les bots le remplissent automatiquement. Si ce champ contient une valeur, l'envoi est silencieusement simulé sans envoyer de vrai email.

**Rate limiting côté client :** Le timestamp du dernier envoi est stocké dans `localStorage`. Un deuxième envoi dans les 60 secondes suivantes est bloqué avec un message d'erreur indiquant le temps restant.

**Sanitisation des entrées :** Toutes les valeurs du formulaire sont passées par `.trim()` avant envoi. La validation HTML5 (`required`, `type="email"`) assure un premier niveau de contrôle.

---

### 3. EmailJS — clé publique

La clé publique EmailJS (`PUBLIC_KEY`) est intentionnellement visible dans le code client : c'est le fonctionnement normal de ce service. Elle ne donne accès qu'à l'envoi d'emails via les templates configurés dans le dashboard EmailJS.

**Pour limiter les abus :**
- Configurer un domaine autorisé dans le dashboard EmailJS (Settings > Allowed origins)
- Activer les limites d'envoi mensuel dans EmailJS
- Le honeypot + rate limit côté client réduisent le risque de spam

---

### 4. Nettoyage du code mort

Les éléments suivants ont été supprimés car ils représentaient du code inutilisé qui augmentait la surface d'attaque ou créait de la confusion :

- Styles CSS du loader (`#loader`, `.glass-overlay`) — aucun HTML correspondant
- Référence à `css/modal.css` dans `projet.html` — fichier inexistant (→ remplacé par `global.css`)
- Dead code JavaScript dans `contact_form.js` (fade-in sur des éléments inexistants)

---

## Recommandations pour la mise en production

### Headers HTTP (à configurer côté serveur/hébergeur)

Si le site est hébergé sur Apache (`.htaccess`) ou Nginx, ajouter ces headers :

```apache
# .htaccess (Apache)
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; connect-src https://api.emailjs.com; img-src 'self' data:;"
```

### HTTPS

Toujours servir le site en HTTPS. Les hébergeurs comme OVH, Ionos, Netlify ou Vercel proposent des certificats SSL gratuits (Let's Encrypt).

### Rotation des credentials EmailJS

Si des abus sont détectés (spam reçu), régénérer la clé publique dans le dashboard EmailJS et mettre à jour `contact_form.js`.

---

## Ce qui n'est PAS nécessaire ici

- **Authentification / sessions** : site vitrine statique, pas de zone admin
- **Base de données** : les données projets sont dans `projet.js`, pas de persistence serveur
- **CSRF token** : EmailJS gère ses propres protections côté serveur

---

*Dernière mise à jour : avril 2026*
