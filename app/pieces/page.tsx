import type { Metadata } from 'next';
import { Box, Clock3, Gem, ScanLine } from 'lucide-react';
import Link from 'next/link';

import { ArtCard } from '@/components/art-card';
import { InkStroke } from '@/components/motion/ink-stroke';
import { Lines } from '@/components/motion/lines';
import { Reveal } from '@/components/motion/reveal';
import { artworks } from '@/lib/artworks';

export const metadata: Metadata = {
  title: 'Pièces singulières',
  description:
    'Miroirs, fossiles, reliefs et horloge : des œuvres à l’encre qui deviennent aussi des objets.',
};
const singular = artworks.filter((artwork) => artwork.singularity);

const traits = [
  { icon: ScanLine, label: 'Miroirs véritables' },
  { icon: Gem, label: 'Fossiles sertis' },
  { icon: Clock3, label: 'Horloge en mouvement' },
  { icon: Box, label: 'Reliefs et superpositions' },
];

export default function PiecesPage() {
  return (
    <main id="main">
      <section className="stroke-bg px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="hero-seq mx-auto max-w-[1400px]">
          <p className="eyebrow" style={{ animationDelay: '80ms' }}>
            Le chapitre à part
          </p>
          <h1 className="mt-7 max-w-5xl font-serif text-[clamp(4rem,8vw,8rem)] leading-[.84] tracking-[-.06em]">
            <Lines
              lines={[
                'Des tableaux qui sont',
                <InkStroke key="accent" variant="underline" delay={1400} className="text-vermilion">
                  <em>aussi des objets.</em>
                </InkStroke>,
              ]}
            />
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/55" style={{ animationDelay: '480ms' }}>
            Le dessin rencontre une matière, un reflet, un mouvement. Ces pièces changent avec la lumière et
            avec la personne qui les regarde.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" style={{ animationDelay: '640ms' }}>
            {traits.map(({ icon: Icon, label }) => (
              <p
                key={label}
                className="flex items-center gap-3 rounded-2xl bg-white p-5 text-sm font-bold transition-[transform,box-shadow] duration-700 ease-out-expo hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(23,23,22,0.08)]"
              >
                <Icon className="size-5 text-vermilion" />
                {label}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <Reveal stagger={140} y={44} className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-2 lg:grid-cols-3">
          {singular.map((artwork) => (
            <ArtCard key={artwork.slug} artwork={artwork} />
          ))}
        </Reveal>
        <Reveal className="mx-auto mt-14 max-w-[1400px]">
          <Link href="/commander" className="button-dark">
            Imaginer une pièce singulière
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
