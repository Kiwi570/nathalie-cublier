import type { Metadata } from 'next';
import { Box, Clock3, Gem, ScanLine } from 'lucide-react';
import Link from 'next/link';

import { ArtCard } from '@/components/art-card';
import { artworks } from '@/lib/artworks';

export const metadata: Metadata = {
  title: 'Pièces singulières',
  description:
    'Miroirs, fossiles, reliefs et horloge : des œuvres à l’encre qui deviennent aussi des objets.',
};
const singular = artworks.filter((artwork) => artwork.singularity);

export default function PiecesPage() {
  return (
    <main id="main">
      <section className="stroke-bg px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <p className="eyebrow">Le chapitre à part</p>
          <h1 className="mt-7 max-w-5xl font-serif text-[clamp(4rem,8vw,8rem)] leading-[.84] tracking-[-.06em]">
            Des tableaux qui sont <em className="text-vermilion">aussi des objets.</em>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/55">
            Le dessin rencontre une matière, un reflet, un mouvement. Ces pièces changent avec la lumière et
            avec la personne qui les regarde.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [ScanLine, 'Miroirs véritables'],
              [Gem, 'Fossiles sertis'],
              [Clock3, 'Horloge en mouvement'],
              [Box, 'Reliefs et superpositions'],
            ].map(([Icon, label]) => {
              const I = Icon as typeof ScanLine;
              return (
                <p
                  key={label as string}
                  className="flex items-center gap-3 rounded-2xl bg-white p-5 text-sm font-bold"
                >
                  <I className="size-5 text-vermilion" />
                  {label as string}
                </p>
              );
            })}
          </div>
        </div>
      </section>
      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-2 lg:grid-cols-3">
          {singular.map((artwork) => (
            <ArtCard key={artwork.slug} artwork={artwork} />
          ))}
        </div>
        <div className="mx-auto mt-14 max-w-[1400px]">
          <Link href="/commander" className="button-dark">
            Imaginer une pièce singulière
          </Link>
        </div>
      </section>
    </main>
  );
}
