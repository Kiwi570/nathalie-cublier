# Nathalie Cublier — Next.js

Refonte multipage en Next.js, React, TypeScript et Tailwind CSS.

## Local

```bash
npm ci
npm run dev
```

## Vérification

```bash
npm run check
```

## Vercel

Importer le dépôt avec le preset **Next.js**. La variable facultative `NEXT_PUBLIC_SITE_URL` définit le domaine utilisé par le sitemap et les métadonnées.

## Avant publication

- confirmer l’adresse e-mail qui reçoit les briefs dans `lib/site.ts` (`contact.email`, valeur provisoire) ;
- remplacer les images de démonstration par les photographies originales haute définition ;
- confirmer disponibilités, dimensions et tarifs avec Nathalie ;
- compléter l’adresse et le SIRET dans les mentions légales ;
- ajouter un canal de contact direct ou un formulaire conforme ;
- actualiser les informations de la toile en cours.

## Motion

Le mouvement du site repose sur un petit kit sans dépendance, dans `components/motion/` et la section « MOTION KIT » de `app/globals.css`. C'est le même kit que sur les autres refontes, réglé ici sur un rythme plus lent.

| Composant | Rôle | Type |
| --- | --- | --- |
| `Lines` | Révélation ligne par ligne d'un titre (masque + montée), CSS pur | serveur |
| `InkStroke` | Anneau ou soulignement d'encre qui se dessine autour du mot accentué | serveur |
| `Reveal` | Apparition au scroll (IntersectionObserver), cascade des enfants avec `stagger` | client |
| `Counter` | Nombre qui monte de 0 à sa valeur en entrant dans le viewport | client |

Classes utilitaires : `.hero-seq` (séquence d'entrée d'un hero, délais posés inline), `.anim-rise` / `.anim-scale` / `.anim-fade` (entrées au chargement), `.stagger-in` (cascade d'une grille), `.paper-card` (feuille qui se soulève au survol), `.float` (feuille qui flotte), `.bar-fill` (barre qui se remplit à l'apparition), `.parallax` (piloté par le scroll, ignoré si non supporté), `.animate-pop` (feedback).

Principes :

- les entrées « au chargement » sont en CSS pur et jouent avant l'hydratation ;
- les entrées « au scroll » ne masquent rien tant que la classe `.js` (posée dans `app/layout.tsx`) n'est pas là ;
- `prefers-reduced-motion` désactive parallax et flottement, dessine les traits immédiatement et affiche tout d'un coup ;
- un grain papier très léger (`body::after`, image SVG statique) unifie les surfaces.
