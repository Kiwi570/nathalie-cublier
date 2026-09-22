import type { Metadata } from 'next';

import { GalleryExplorer } from '@/components/gallery-explorer';

export const metadata: Metadata = {
  title: 'Les œuvres',
  description: 'Explorez les 25 œuvres de Nathalie Cublier par thème et disponibilité.',
};

export default function ArtworksPage() {
  return (
    <main id="main">
      <section className="px-5 pb-12 pt-16 sm:px-8 sm:pt-24 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <p className="eyebrow">La galerie</p>
          <h1 className="mt-7 max-w-5xl font-serif text-[clamp(4rem,8vw,8.5rem)] leading-[.84] tracking-[-.06em]">
            Vingt-cinq œuvres,
            <br />
            <em className="text-vermilion">cinq chemins.</em>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/55">
            Filtrez par univers, gardez vos coups de cœur puis envoyez votre sélection à Nathalie. Les prix
            sont communiqués directement, après validation des disponibilités.
          </p>
        </div>
      </section>
      <section className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <GalleryExplorer />
        </div>
      </section>
    </main>
  );
}
