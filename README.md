# Nathalie Cublier — site

Site statique : HTML, CSS, JS, sans dépendance ni build.

- `index.html` accueil · `tableaux.html` galerie par thème · `tableau.html?id=…` fiche d'un tableau · `pieces.html` pièces singulières · `commander.html` commande et contact · `atelier.html` l'atelier
- `nc.css` et `nc.js` sont partagés par toutes les pages (données des 25 tableaux dans `nc.js`, tableau `WORKS`).
- `vercel.json` active les URLs propres (`/tableaux` sert `tableaux.html`).

## Déploiement
Pousser sur Git, importer sur Vercel, aucun réglage de build : « Other », dossier racine.

## À faire avant la mise en ligne définitive
- Remplacer les photos de tableaux (actuellement chargées depuis l'ancien site Wix) par des fichiers locaux dans `/images`, et mettre à jour `src()` dans `nc.js`.
- Ajouter le portrait et les photos d'atelier (emplacements marqués dans `atelier.html`).
- Brancher le formulaire (Formspree, Netlify Forms ou un endpoint) : voir `form.form` dans `nc.js`.
- Décider de l'affichage des tarifs, mettre à jour le domaine dans `robots.txt` et `sitemap.xml`.
