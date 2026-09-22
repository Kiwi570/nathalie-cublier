import { ArrowRight, Clock3, Feather, Frame, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ArtCard } from '@/components/art-card';
import { Counter } from '@/components/motion/counter';
import { InkStroke } from '@/components/motion/ink-stroke';
import { Lines } from '@/components/motion/lines';
import { Reveal } from '@/components/motion/reveal';
import { artworkImage, artworks } from '@/lib/artworks';
import { currentWork } from '@/lib/site';

const featured = ['fleur-eternelle', 'en-mer', 'mandalas'].map((slug) =>
  artworks.find((artwork) => artwork.slug === slug)!,
);

const facts = [
  { icon: Clock3, title: '100 à 200 h', text: 'par œuvre' },
  { icon: Feather, title: 'Trait à l’encre', text: 'sans effacement' },
  { icon: Frame, title: 'Encadrement', text: 'prêt à accrocher' },
];

export default function HomePage() {
  const progress = Math.round((currentWork.hoursDone / currentWork.hoursPlanned) * 100);
  return (
    <main id="main">
      <section className="stroke-bg overflow-clip px-5 py-12 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1480px] items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div className="hero-seq">
            <p className="eyebrow" style={{ animationDelay: '80ms' }}>
              Œuvres originales · Encre de Chine · Côte d’Azur
            </p>
            <h1 className="mt-8 max-w-[10ch] font-serif text-[clamp(3.4rem,8.5vw,9rem)] leading-[.82] tracking-[-.065em]">
              <Lines
                lines={[
                  'Le temps rendu',
                  <InkStroke key="accent" delay={1500}>
                    <em className="text-vermilion">visible.</em>
                  </InkStroke>,
                ]}
              />
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-ink/58" style={{ animationDelay: '520ms' }}>
              Cent à deux cents heures, une plume et un trait après l’autre. Nathalie Cublier transforme les
              motifs répétés en œuvres uniques, parfois objets, toujours singulières.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" style={{ animationDelay: '660ms' }}>
              <Link href="/tableaux" className="button-dark">
                Découvrir les œuvres <ArrowRight className="size-4" />
              </Link>
              <Link href="/commander" className="button-line">
                Imaginer la vôtre
              </Link>
            </div>
            <div
              className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/12 pt-6 text-xs text-ink/52"
              style={{ animationDelay: '820ms' }}
            >
              {facts.map(({ icon: Icon, title, text }) => (
                <p key={title}>
                  <Icon className="mb-2 size-4 text-vermilion" />
                  <b className="block text-ink">{title}</b>
                  {text}
                </p>
              ))}
            </div>
          </div>
          {/* Sous lg, le cadre et la carte passent en flux normal (plus de vide sur mobile) */}
          <div className="relative lg:min-h-[620px]">
            <div className="float mx-auto aspect-square w-[88%] lg:absolute lg:inset-x-[10%] lg:top-0 lg:w-auto">
              <div
                className="anim-scale size-full rotate-2 rounded-[2rem] bg-white p-6 shadow-paper transition-[rotate] duration-1000 ease-out-expo hover:rotate-0"
                style={{ animationDelay: '260ms' }}
              >
                <div className="relative size-full">
                  <Image
                    src={artworkImage(featured[0], 1200)}
                    alt={featured[0].title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 52vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            <div
              className="anim-rise mt-6 max-w-xs rounded-2xl bg-ink p-6 text-white shadow-paper lg:absolute lg:bottom-4 lg:left-0 lg:mt-0"
              style={{ animationDelay: '1000ms' }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-clay">La signature</p>
              <p className="mt-3 font-serif text-2xl">
                Chaque zone reçoit son propre motif. Aucune n’est corrigée, aucune n’est identique.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal stagger={160} className="grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <div>
              <p className="eyebrow">Sélection</p>
              <h2 className="mt-5 max-w-3xl font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[.9] tracking-[-.05em]">
                Trois portes vers l’univers de Nathalie.
              </h2>
            </div>
            <p className="max-w-lg text-base leading-8 text-ink/55">
              Regardez de loin, puis approchez-vous. Les détails font partie de l’œuvre autant que sa
              silhouette.
            </p>
          </Reveal>
          <Reveal stagger={160} y={44} className="mt-14 grid gap-8 md:grid-cols-3">
            {featured.map((artwork, index) => (
              <ArtCard key={artwork.slug} artwork={artwork} priority={index === 0} />
            ))}
          </Reveal>
          <Reveal delay={200}>
            <Link href="/tableaux" className="button-line mt-10">
              Voir les 25 œuvres <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-2">
          <Reveal scale={0.96} y={0} className="relative aspect-[4/3] overflow-clip rounded-[2rem] bg-mist">
            <Image
              src={currentWork.image}
              alt="Toile en cours dans l’atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="parallax object-cover"
            />
          </Reveal>
          <Reveal stagger={130} delay={120}>
            <p className="eyebrow">Sur la table, maintenant</p>
            <h2 className="mt-5 font-serif text-[clamp(3rem,5.5vw,5.5rem)] leading-[.92] tracking-[-.05em]">
              {currentWork.title}
            </h2>
            <p className="mt-6 text-base leading-8 text-ink/58">{currentWork.note}</p>
            <div className="mt-7">
              <div className="h-1.5 overflow-hidden rounded-full bg-mist">
                <span className="bar-fill block h-full bg-vermilion" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-3 flex justify-between text-xs font-bold text-ink/60">
                <span>
                  <Counter to={currentWork.hoursDone} /> heures réalisées
                </span>
                <span>{currentWork.hoursPlanned} prévues</span>
              </div>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                Mis à jour le {currentWork.updatedAt}
              </p>
            </div>
            <div className="mt-8">
              <Link href="/atelier" className="button-dark">
                Entrer dans l’atelier <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-vermilion px-5 py-16 text-white sm:px-8 lg:px-12">
        <Reveal
          stagger={140}
          y={20}
          className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-white/55">
              Une pièce qui n’existe pas encore
            </p>
            <h2 className="mt-3 font-serif text-5xl sm:text-6xl">Votre thème, son trait.</h2>
          </div>
          <Link href="/commander" className="button-light">
            <Sparkles className="size-4" /> Commencer une commande
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
