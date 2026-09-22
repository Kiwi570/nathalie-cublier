import type { Metadata } from 'next';
import { ArrowUpRight, Clock3, Feather, Frame } from 'lucide-react';
import Image from 'next/image';

import { currentWork, social } from '@/lib/site';

export const metadata: Metadata = {
  title: 'L’atelier',
  description: 'Découvrez Nathalie Cublier, son geste, son atelier près de Cannes et la toile en cours.',
};

export default function StudioPage() {
  return (
    <main id="main">
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative aspect-[3/4] max-h-[760px] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/nathalie-atelier.jpg"
              alt="Nathalie Cublier à sa table de travail"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">L’atelier</p>
            <h1 className="mt-7 font-serif text-[clamp(4rem,8vw,8rem)] leading-[.84] tracking-[-.06em]">
              Trente ans d’école,
              <br />
              <em className="text-vermilion">puis la plume.</em>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/56">
              Après une vie d’enseignante dans le Beaujolais, Nathalie installe sa table près de Cannes. À
              l’encre, le temps n’est plus un programme : il devient visible.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={social.instagram} target="_blank" rel="noreferrer" className="button-dark">
                Suivre sur Instagram <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Sur la table</p>
            <h2 className="mt-5 font-serif text-6xl">{currentWork.title}</h2>
            <p className="mt-6 text-base leading-8 text-ink/55">{currentWork.note}</p>
            <div className="mt-8 h-2 overflow-hidden rounded-full bg-mist">
              <span
                className="block h-full bg-vermilion"
                style={{ width: `${Math.round((currentWork.hoursDone / currentWork.hoursPlanned) * 100)}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between text-xs font-bold text-ink/42">
              <span>{currentWork.hoursDone} heures</span>
              <span>{currentWork.hoursPlanned} prévues</span>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image
              src={currentWork.image}
              alt="Toile actuellement en cours"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [Feather, 'La plume', 'Le motif se construit sans gomme ni repentir.'],
              [Clock3, 'Le temps', 'Une grande pièce demande plusieurs mois de travail.'],
              [Frame, 'Le cadre', 'Chaque œuvre est préparée pour arriver prête à vivre sur son mur.'],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Feather;
              return (
                <article key={title as string} className="rounded-[1.5rem] border border-ink/10 bg-white p-8">
                  <I className="size-6 text-vermilion" />
                  <h2 className="mt-7 font-serif text-3xl">{title as string}</h2>
                  <p className="mt-4 text-sm leading-7 text-ink/52">{text as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
