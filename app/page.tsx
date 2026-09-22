import { ArrowRight, Clock3, Feather, Frame, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ArtCard } from '@/components/art-card';
import { artworkImage, artworks } from '@/lib/artworks';
import { currentWork } from '@/lib/site';

const featured = ['fleur-eternelle', 'en-mer', 'mandalas'].map((slug) =>
  artworks.find((artwork) => artwork.slug === slug)!,
);

export default function HomePage() {
  return (
    <main id="main">
      <section className="stroke-bg overflow-hidden px-5 py-12 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1480px] items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Œuvres originales · Encre de Chine · Côte d’Azur</p>
            <h1 className="mt-8 max-w-[10ch] font-serif text-[clamp(4rem,8.5vw,9rem)] leading-[.82] tracking-[-.065em]">
              Le temps rendu <em className="text-vermilion">visible.</em>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-ink/58">
              Cent à deux cents heures, une plume et un trait après l’autre. Nathalie Cublier transforme les
              motifs répétés en œuvres uniques, parfois objets, toujours singulières.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/tableaux" className="button-dark">
                Découvrir les œuvres <ArrowRight className="size-4" />
              </Link>
              <Link href="/commander" className="button-line">
                Imaginer la vôtre
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/12 pt-6 text-xs text-ink/52">
              <p>
                <Clock3 className="mb-2 size-4 text-vermilion" />
                <b className="block text-ink">100 à 200 h</b>par œuvre
              </p>
              <p>
                <Feather className="mb-2 size-4 text-vermilion" />
                <b className="block text-ink">Trait à l’encre</b>sans effacement
              </p>
              <p>
                <Frame className="mb-2 size-4 text-vermilion" />
                <b className="block text-ink">Encadrement</b>prêt à accrocher
              </p>
            </div>
          </div>
          <div className="relative min-h-[620px]">
            <div className="absolute inset-x-[10%] top-0 aspect-square rotate-2 rounded-[2rem] bg-white p-6 shadow-paper">
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
            <div className="absolute bottom-4 left-0 max-w-xs rounded-2xl bg-ink p-6 text-white shadow-paper">
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
          <div className="grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end">
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
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {featured.map((artwork, index) => (
              <ArtCard key={artwork.slug} artwork={artwork} priority={index === 0} />
            ))}
          </div>
          <Link href="/tableaux" className="button-line mt-10">
            Voir les 25 œuvres <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
      <section className="bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-mist">
            <Image
              src={currentWork.image}
              alt="Toile en cours dans l’atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Sur la table, maintenant</p>
            <h2 className="mt-5 font-serif text-[clamp(3rem,5.5vw,5.5rem)] leading-[.92] tracking-[-.05em]">
              {currentWork.title}
            </h2>
            <p className="mt-6 text-base leading-8 text-ink/58">{currentWork.note}</p>
            <div className="mt-7">
              <div className="h-1.5 overflow-hidden rounded-full bg-mist">
                <span
                  className="block h-full bg-vermilion"
                  style={{
                    width: `${Math.round((currentWork.hoursDone / currentWork.hoursPlanned) * 100)}%`,
                  }}
                />
              </div>
              <div className="mt-3 flex justify-between text-xs font-bold text-ink/45">
                <span>{currentWork.hoursDone} heures réalisées</span>
                <span>{currentWork.hoursPlanned} prévues</span>
              </div>
            </div>
            <Link href="/atelier" className="button-dark mt-8">
              Entrer dans l’atelier <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-vermilion px-5 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-white/55">
              Une pièce qui n’existe pas encore
            </p>
            <h2 className="mt-3 font-serif text-5xl sm:text-6xl">Votre thème, son trait.</h2>
          </div>
          <Link href="/commander" className="button-light">
            <Sparkles className="size-4" /> Commencer une commande
          </Link>
        </div>
      </section>
    </main>
  );
}
