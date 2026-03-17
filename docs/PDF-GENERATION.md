# PDF Generation — How It Works

> **🇫🇷 [Français](#-génération-du-pdf--fonctionnement)** | **🇬🇧 [English](#-pdf-generation--how-it-works-1)**

---

# 🇫🇷 Génération du PDF — Fonctionnement

## Vue d'ensemble

Le PDF est généré via **Puppeteer** (Chrome headless). Il rend la même application React que les visiteurs voient dans leur navigateur, ce qui garantit que le PDF et la version interactive sont identiques pixel pour pixel.

Il remplace l'ancienne approche qui consistait à placer un fichier PDF statique dans `public/cv/` et à le servir tel quel.

---

## Générer les PDFs

```bash
# Construire l'app puis générer (par défaut)
npm run generate-pdf

# Forcer le thème clair
npm run generate-pdf -- --theme=light

# Forcer le thème sombre
npm run generate-pdf -- --theme=dark

# Régénérer sans rebuilder (itération rapide)
npm run generate-pdf -- --no-build
```

Les fichiers sont enregistrés dans :

```
public/cv/fr/resume_CHIKHI.pdf
public/cv/en/resume_CHIKHI.pdf
```

Après génération, relancez `npm run build` pour inclure les nouveaux PDFs dans le déploiement.

---

## Ce que fait le script (`scripts/generate-pdf.js`)

1. **Build** — Lance `npm run build` avec `VITE_BASE_PATH=/` (sauf si `--no-build`).
2. **Serveur preview** — Démarre `vite preview` sur le port 4173.
3. **Détection du thème** — Ouvre une page headless, lit `document.documentElement.classList.contains('dark')` directement depuis l'application. Aucune logique n'est dupliquée ; le script suit exactement le mode (basé sur l'heure, `defaultMode`, etc.) configuré dans `resume-config.ts`.
4. **Rendu par langue** — Pour chaque langue dans `available`, ouvre une page à `/?lang=<lang>`, injecte le thème dans `localStorage`, attend que les animations d'entrée se terminent.
5. **CSS injecté** — Avant la capture, du CSS est injecté pour :
   - Masquer les contrôles interactifs (`data-pdf-hide` : barre d'outils, paragraphe d'indice)
   - Afficher des éléments PDF uniquement (`data-pdf-only` : lien vers le CV interactif)
   - Supprimer les marges du conteneur pour que la carte remplisse toute la largeur A4
   - Étirer la carte pour remplir toute la hauteur de la page (sans arrondis ni ombre)
   - Corriger l'effet flip 3D de la photo (Puppeteer aplatit `preserve-3d`)
   - Agrandir légèrement la photo de profil (128px → 160px avant mise à l'échelle)
6. **Mise à l'échelle** — La largeur du viewport (1024px) est divisée par la largeur A4 (793,7px) pour calculer l'échelle (~0,775). La hauteur du viewport est dérivée pour que le contenu remplisse exactement une page A4 : `⌈1122,52 / 0,775⌉ = 1449px`.
7. **Export PDF** — `page.pdf({ format: 'A4', scale, margin: 0 })` produit un PDF sans marges.

---

## Attributs spéciaux dans les composants React

| Attribut             | Comportement dans le PDF                                                            |
| -------------------- | ----------------------------------------------------------------------------------- |
| `data-pdf-hide`      | `display: none` — masque l'élément (contrôles de la barre d'outils, texte d'indice) |
| `data-pdf-only`      | `display: flex` — affiche l'élément (lien vers le CV interactif)                    |
| `data-pdf-container` | Cible le wrapper externe pour supprimer les marges/paddings                         |

Ces attributs sont définis dans les composants React et n'affectent pas le rendu normal dans le navigateur.

---

## Lien vers le CV interactif (PDF uniquement)

Un lien vers la version interactive est automatiquement ajouté dans la section contacts du PDF. Il est invisible dans le navigateur et visible uniquement dans le PDF.

Configurez l'URL et le libellé dans `src/data/resume-config.ts` :

```ts
pdf: {
  interactiveUrl: "https://votre-username.github.io/interactive-resume/",
  interactiveLabel: { en: "Interactive Resume", fr: "CV Interactif" },
}
```

---

## Téléchargement depuis l'interface

Le bouton de téléchargement dans l'interface (`PdfDownload.tsx`) sert simplement le fichier statique déjà généré depuis `public/cv/<lang>/`. Il ne déclenche pas Puppeteer à la volée.

Le flux complet est donc :

```
npm run generate-pdf  →  public/cv/<lang>/resume_CHIKHI.pdf
npm run build         →  dist/ inclut les PDFs
déploiement           →  le bouton sert le fichier statique
```

---

---

# 🇬🇧 PDF Generation — How It Works

## Overview

PDFs are generated with **Puppeteer** (headless Chrome). It renders the exact same React app that visitors see in their browser, ensuring the PDF and the interactive version are pixel-perfect identical.

This replaces the old approach of placing a hand-crafted static PDF in `public/cv/` and serving it as-is.

---

## Generating PDFs

```bash
# Build the app then generate (default)
npm run generate-pdf

# Force light theme
npm run generate-pdf -- --theme=light

# Force dark theme
npm run generate-pdf -- --theme=dark

# Regenerate without rebuilding (faster iteration)
npm run generate-pdf -- --no-build
```

Output files:

```
public/cv/fr/resume_CHIKHI.pdf
public/cv/en/resume_CHIKHI.pdf
```

After generating, run `npm run build` again to include the new PDFs in your deployment bundle.

---

## What the script does (`scripts/generate-pdf.js`)

1. **Build** — Runs `npm run build` with `VITE_BASE_PATH=/` (skipped with `--no-build`).
2. **Preview server** — Starts `vite preview` on port 4173.
3. **Theme detection** — Opens a headless page and reads `document.documentElement.classList.contains('dark')` directly from the app. No logic is duplicated; the script follows the exact same mode (time-based, `defaultMode`, etc.) configured in `resume-config.ts`.
4. **Per-language rendering** — For each language in `available`, opens a page at `/?lang=<lang>`, injects the theme into `localStorage`, waits for entrance animations to finish.
5. **CSS injection** — Before capturing, a CSS block is injected to:
   - Hide interactive controls (`data-pdf-hide`: toolbar, hint paragraph)
   - Show PDF-only elements (`data-pdf-only`: interactive resume link)
   - Strip container margins so the card fills the full A4 width
   - Stretch the card to fill the full page height (no border-radius or box-shadow)
   - Fix the 3D flip effect on the profile photo (Puppeteer flattens `preserve-3d`)
   - Slightly enlarge the profile photo (128px → 160px before scaling)
6. **Scale calculation** — Viewport width (1024px) divided by A4 width (793.7px) gives the scale (~0.775). Viewport height is derived so content fills exactly one A4 page: `⌈1122.52 / 0.775⌉ = 1449px`.
7. **PDF export** — `page.pdf({ format: 'A4', scale, margin: 0 })` produces a zero-margin PDF.

---

## Special attributes in React components

| Attribute            | Behaviour in PDF                                                  |
| -------------------- | ----------------------------------------------------------------- |
| `data-pdf-hide`      | `display: none` — hides the element (toolbar controls, hint text) |
| `data-pdf-only`      | `display: flex` — reveals the element (interactive resume link)   |
| `data-pdf-container` | Targets the outer wrapper to strip margins/padding                |

These attributes are placed on React elements and have no effect on the normal browser render.

---

## Interactive resume link (PDF only)

A link to the interactive version is automatically added inside the contacts section of the PDF. It is invisible in the browser and only visible in the PDF output.

Configure the URL and label in `src/data/resume-config.ts`:

```ts
pdf: {
  interactiveUrl: "https://your-username.github.io/interactive-resume/",
  interactiveLabel: { en: "Interactive Resume", fr: "CV Interactif" },
}
```

---

## Download button in the UI

The download button in the UI (`PdfDownload.tsx`) simply serves the already-generated static file from `public/cv/<lang>/`. It does not trigger Puppeteer on the fly.

The full pipeline is:

```
npm run generate-pdf  →  public/cv/<lang>/resume_CHIKHI.pdf
npm run build         →  dist/ includes the PDFs
deploy                →  button serves the static file
```
