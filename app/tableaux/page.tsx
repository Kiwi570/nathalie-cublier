import type { Metadata } from 'next';

import { GalleryExplorer } from '@/components/gallery-explorer';
import { InkStroke } from '@/components/motion/ink-stroke';
import { Lines } from '@/components/motion/lines';

export const metadata: Metadata = {
  title: 'Les œuvres',
  description: 'Explorez les 25 œuvres de Nathalie Cublier par thème et disponibilité.',
};

export default function ArtworksPage() {
  return (
    <main id="main">
      <section className="px-5 pb-12 pt-16 sm:px-8 sm:pt-24 lg:px-12">
        <div className="hero-seq mx-auto max-w-[1400px]">
          <p className="eyebrow" style={{ animationDelay: '80ms' }}>
            La galerie
          </p>
          <h1 className="mt-7 max-w-5xl font-serif text-[clamp(4rem,8vw,8.5rem)] leading-[.84] tracking-[-.06em]">
            <Lines
              lines={[
                'Vingt-cinq œuvres,',
                <InkStroke key="accent" variant="underline" delay={1400} className="text-vermilion">
                  <em>cinq chemins.</em>
                </InkStroke>,
              ]}
            />
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/55" style={{ animationDelay: '480ms' }}>
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
