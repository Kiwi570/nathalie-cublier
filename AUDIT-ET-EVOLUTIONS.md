# Audit et évolutions — Nathalie Cublier

## Forces conservées

- identité éditoriale forte autour du temps, de la plume et du trait ;
- catalogue riche de vingt-cinq œuvres et cinq thèmes ;
- pièces singulières très différenciantes ;
- commande sur mesure et toile en cours comme portes d’entrée humaines.

## Limites corrigées

- scripts et pages HTML dupliqués remplacés par des données uniques et des routes Next.js ;
- fiches de chaque œuvre avec URL et métadonnées propres ;
- galerie filtrable, sélection locale et parcours de commande plus lisible ;
- suppression des estimations de prix non validées et des faux succès de formulaire ;
- navigation mobile, contrastes, clavier et réduction des mouvements mieux pris en compte ;
- architecture SEO, sitemap et données structurées consolidés.

## Points à raccorder

Les prix, disponibilités, coordonnées complètes et photographies définitives doivent être validés par Nathalie avant publication.

## Mouvement (V2)

La version précédente ne bougeait presque pas. Cette version pose une couche de mouvement lente et précieuse, cohérente avec le geste de l'encre, sans aucune dépendance :

- hero : titre révélé ligne par ligne, puis un anneau d'encre qui se dessine autour du mot accentué ; la feuille encadrée flotte doucement et se redresse au survol ;
- chaque titre de page reçoit son trait (anneau ou soulignement) ;
- les sections apparaissent au scroll, les grilles en cascade ; la barre des heures de la toile en cours se remplit et le compteur monte ;
- cartes : la feuille se soulève avec son ombre, l'image s'approche lentement, la flèche s'active ;
- galerie : filtres qui recomposent la mosaïque en cascade, cœur qui « pop », sélection qui glisse depuis le bas ;
- commande : brief qui se rafraîchit en fondu, confirmation de copie animée, champs avec focus doux ;
- header : compaction au scroll, monogramme qui s'encre au survol, menu mobile animé avec burger qui se transforme ;
- grain papier léger sur l'ensemble du site ;
- images de section en parallax doux (progressif).

Tout respecte `prefers-reduced-motion` et reste lisible sans JavaScript.

## Corrections P1 (V2.1)

- la sélection de la galerie et le bouton « Demander cette œuvre » arrivent maintenant dans la page commande : les œuvres sont listées, retirables, et intégrées au message ;
- « Envoyer à Nathalie » ouvre la messagerie avec le message prêt (copier et Instagram deviennent secondaires) ; l'adresse (`lib/site.ts`) reste à confirmer ;
- hero mobile : cadre et carte « La signature » en flux normal sous 1024 px, titre à 3,4 rem minimum ;
- lisibilité : micro-textes remontés à 60 % d'opacité.

## Corrections P2 (V2.2)

- titrage en Fraunces (serif de caractère, servie par le site via next/font) à la place de Georgia ;
- fiche œuvre : loupe qui suit la souris et vue plein écran avec approche 2× (molette, doigt ou cliquer-glisser) — le détail du trait est enfin visible ;
- toile en cours : date de mise à jour affichée ; e-mail de contact au footer.
