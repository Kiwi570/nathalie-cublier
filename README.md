# Nathalie Cublier — site

Site statique : HTML, CSS, JS, sans dépendance ni build.

- `index.html` accueil · `tableaux.html` galerie par thème, avec le chapitre des pièces singulières · `tableau/<id>.html` une page par tableau (25, générées depuis `tableau.html`, chacune avec ses métadonnées de partage) · `pieces.html` pièces singulières (lien direct, hors menu) · `commander.html` commande en quatre pas · `atelier.html` l'atelier · `mentions-legales.html`
- `encours.json` : la toile en cours (titre, thème, format, heures faites et prévues, photo, note, date). Modifiable sur GitHub depuis un téléphone, l'accueil et l'atelier suivent.
- Sélection (cœurs) et tiroir « Écrire à Nathalie » sur toutes les pages, gérés par `nc.js`.
- `RIBBON` en tête de `nc.js` : passer à `false` pour retirer le bandeau de maquette.
- `nc.css` et `nc.js` sont partagés par toutes les pages (données des 25 tableaux dans `nc.js`, tableau `WORKS`).
- `vercel.json` active les URLs propres (`/tableaux` sert `tableaux.html`).

## Déploiement
Pousser sur Git, importer sur Vercel, aucun réglage de build : « Other », dossier racine.

## Tester en local
Les chemins sont absolus (`/nc.css`), comme sur Vercel : ouvrir `index.html` par double-clic ne suffit pas. Dans le dossier : `npx serve .` puis http://localhost:3000, ou `vercel dev`.

## À faire avant la mise en ligne définitive
- Photographier les 25 toiles en haute définition (3 000 px et plus, lumière rasante) : la loupe et « Voir le trait » en dépendent.
- Valider avec l'artiste la fourchette de prix (`prix()` dans `nc.js`, 4 à 8 € par heure estimée) et l'estimation d'heures (`hrs()`).
- Remplacer les photos de tableaux (actuellement chargées depuis l'ancien site Wix) par des fichiers locaux dans `/images`, et mettre à jour `src()` dans `nc.js`.
- Les images d'ambiance de `/images` (portrait, atelier, toile en cours, salon, quatre temps) sont générées pour la maquette : à remplacer par de vraies photos de Nathalie quand elles existent, mêmes noms de fichiers. `encours.json` pointe sur `/images/toile-en-cours.jpg`.
- Brancher le formulaire (Formspree, Netlify Forms ou un endpoint) : voir `form.form` dans `nc.js`.
- Décider de l'affichage des tarifs, mettre à jour le domaine dans `robots.txt` et `sitemap.xml`.
