import type { Metadata } from 'next';
import { ArrowUpRight, Clock3, Feather, Frame } from 'lucide-react';
import Image from 'next/image';

import { Counter } from '@/components/motion/counter';
import { InkStroke } from '@/components/motion/ink-stroke';
import { Lines } from '@/components/motion/lines';
import { Reveal } from '@/components/motion/reveal';
import { currentWork, social } from '@/lib/site';

export const metadata: Metadata = {
  title: 'L’atelier',
  description: 'Découvrez Nathalie Cublier, son geste, son atelier près de Cannes et la toile en cours.',
};

const principles = [
  { icon: Feather, title: 'La plume', text: 'Le motif se construit sans gomme ni repentir.' },
  { icon: Clock3, title: 'Le temps', text: 'Une grande pièce demande plusieurs mois de travail.' },
  { icon: Frame, title: 'Le cadre', text: 'Chaque œuvre est préparée pour arriver prête à vivre sur son mur.' },
];

export default function StudioPage() {
  const progress = Math.round((currentWork.hoursDone / currentWork.hoursPlanned) * 100);
  return (
    <main id="main">
      <section className="overflow-clip px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div className="anim-scale relative aspect-[3/4] max-h-[760px] overflow-clip rounded-[2rem] bg-mist" style={{ animationDelay: '200ms' }}>
            <Image
              src="/images/nathalie-atelier.jpg"
              alt="Nathalie Cublier à sa table de travail"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="parallax object-cover"
            />
          </div>
          <div className="hero-seq">
            <p className="eyebrow" style={{ animationDelay: '80ms' }}>
              L’atelier
            </p>
            <h1 className="mt-7 font-serif text-[clamp(4rem,8vw,8rem)] leading-[.84] tracking-[-.06em]">
              <Lines
                lines={[
                  'Trente ans d’école,',
                  <InkStroke key="accent" delay={1500}>
                    <em className="text-vermilion">puis la plume.</em>
                  </InkStroke>,
                ]}
              />
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/56" style={{ animationDelay: '480ms' }}>
              Après une vie d’enseignante dans le Beaujolais, Nathalie installe sa table près de Cannes. À
              l’encre, le temps n’est plus un programme : il devient visible.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" style={{ animationDelay: '620ms' }}>
              <a href={social.instagram} target="_blank" rel="noreferrer" className="button-dark">
                Suivre sur Instagram <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-2">
          <Reveal stagger={130}>
            <p className="eyebrow">Sur la table</p>
            <h2 className="mt-5 font-serif text-6xl">{currentWork.title}</h2>
            <p className="mt-6 text-base leading-8 text-ink/55">{currentWork.note}</p>
            <div className="mt-8 h-2 overflow-hidden rounded-full bg-mist">
              <span className="bar-fill block h-full bg-vermilion" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-3 flex justify-between text-xs font-bold text-ink/60">
              <span>
                <Counter to={currentWork.hoursDone} /> heures
              </span>
              <span>{currentWork.hoursPlanned} prévues</span>
            </div>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
              Mis à jour le {currentWork.updatedAt}
            </p>
          </Reveal>
          <Reveal scale={0.96} y={0} delay={120} className="relative aspect-[4/3] overflow-clip rounded-[2rem] bg-mist">
            <Image
              src={currentWork.image}
              alt="Toile actuellement en cours"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="parallax object-cover"
            />
          </Reveal>
        </div>
      </section>
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal stagger={150} y={40} className="grid gap-4 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="group rounded-[1.5rem] border border-ink/10 bg-white p-8 transition-[transform,box-shadow,border-color] duration-700 ease-out-expo hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_30px_70px_rgba(23,23,22,0.08)]"
              >
                <Icon className="size-6 text-vermilion transition-transform duration-700 ease-out-expo group-hover:-rotate-12" />
                <h2 className="mt-7 font-serif text-3xl">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-ink/52">{text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
