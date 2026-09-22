export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '') || 'https://nathalie-cublier.vercel.app';

/** À CONFIRMER avec Nathalie avant publication : adresse qui reçoit les briefs et demandes. */
export const contact = {
  email: 'contact@nathalie-cublier.fr',
};

export const social = {
  instagram: 'https://www.instagram.com/artetencredechine',
  facebook: 'https://www.facebook.com/profile.php?id=100030190873942',
};

export const nav = [
  { href: '/tableaux', label: 'Les œuvres' },
  { href: '/pieces', label: 'Pièces singulières' },
  { href: '/commander', label: 'Sur mesure' },
  { href: '/atelier', label: 'L’atelier' },
];

export const currentWork = {
  title: 'Le vol des grues',
  theme: 'La mer et les voyages',
  format: '80 × 80 cm',
  hoursDone: 64,
  hoursPlanned: 180,
  image: '/images/toile-en-cours.jpg',
  note: 'Des grues en vol au-dessus d’une mer en écailles. La zone du ciel est finie, les vagues commencent. Réservable avant la fin.',
  updatedAt: '20 septembre 2026',
};
