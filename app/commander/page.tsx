import type { Metadata } from 'next';
import Image from 'next/image';

import { CommissionStudio } from '@/components/commission-studio';
import { InkStroke } from '@/components/motion/ink-stroke';
import { Lines } from '@/components/motion/lines';
import { Reveal } from '@/components/motion/reveal';

export const metadata: Metadata = {
  title: 'Commander une œuvre',
  description: 'Imaginez avec Nathalie Cublier une œuvre unique à l’encre de Chine autour de votre thème.',
};

const steps = [
  ['01', 'Le thème', 'Un lieu, une naissance, un prénom ou une passion.'],
  ['02', 'La structure', 'Nathalie compose les zones qui donneront son rythme à l’ensemble.'],
  ['03', 'Le trait', 'Chaque motif est dessiné à la plume, sans retour en arrière.'],
  ['04', 'L’encadrement', 'La pièce est confiée à un professionnel et arrive prête à accrocher.'],
];

export default async function CommissionPage({
  searchParams,
}: {
  searchParams: Promise<{ selection?: string }>;
}) {
  const { selection } = await searchParams;
  const initialSelection = selection ? selection.split(',').filter(Boolean) : [];
  return (
    <main id="main">
      <section className="overflow-clip px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div className="hero-seq">
            <p className="eyebrow" style={{ animationDelay: '80ms' }}>
              Sur mesure
            </p>
            <h1 className="mt-7 font-serif text-[clamp(4rem,8vw,8rem)] leading-[.84] tracking-[-.06em]">
              <Lines
                lines={[
                  'Un thème,',
                  <InkStroke key="accent" variant="underline" delay={1400} className="text-vermilion">
                    <em>et le trait commence.</em>
                  </InkStroke>,
                ]}
              />
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-ink/56" style={{ animationDelay: '480ms' }}>
              Vous apportez une histoire. Nathalie en imagine la structure, choisit les motifs et construit
              une œuvre qui n’existera qu’une fois.
            </p>
          </div>
          <div className="anim-scale relative aspect-[16/10] overflow-clip rounded-[2rem] bg-mist" style={{ animationDelay: '260ms' }}>
            <Image
              src="/images/le-trait.jpg"
              alt="La plume dessinant un motif à l’encre"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="parallax object-cover"
            />
          </div>
        </div>
      </section>
      <section className="bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal stagger={120}>
            <p className="eyebrow">Le chemin</p>
            <h2 className="mt-5 font-serif text-5xl sm:text-7xl">Quatre temps, aucune précipitation.</h2>
          </Reveal>
          <Reveal stagger={140} y={40} className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([number, title, text]) => (
              <article
                key={number}
                className="group rounded-[1.5rem] bg-paper p-7 transition-[transform,box-shadow] duration-700 ease-out-expo hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(23,23,22,0.08)]"
              >
                <p className="font-serif text-5xl text-vermilion/35 transition-colors duration-700 group-hover:text-vermilion">
                  {number}
                </p>
                <h3 className="mt-8 font-serif text-3xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-ink/52">{text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <Reveal scale={0.98} y={30} className="mx-auto max-w-[1200px]">
          <CommissionStudio initialSelection={initialSelection} />
        </Reveal>
      </section>
    </main>
  );
}
