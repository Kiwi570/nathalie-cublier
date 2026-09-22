import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, Clock3, Feather, Frame, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArtCard } from '@/components/art-card';
import { artworkBySlug, artworkImage, artworks, statusLabels, themes } from '@/lib/artworks';

export function generateStaticParams() {
  return artworks.map((artwork) => ({ slug: artwork.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const artwork = artworkBySlug(slug);
  if (!artwork) return {};
  return {
    title: artwork.title,
    description: `${artwork.story} ${artwork.format}.`,
    openGraph: { title: artwork.title, description: artwork.story, images: [artworkImage(artwork, 1200)] },
    twitter: { card: 'summary_large_image', images: [artworkImage(artwork, 1200)] },
  };
}

export default async function ArtworkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artwork = artworkBySlug(slug);
  if (!artwork) notFound();
  const related = artworks
    .filter((item) => item.slug !== artwork.slug && item.theme === artwork.theme)
    .slice(0, 3);
  return (
    <main id="main">
      <section className="px-5 py-12 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Link
            href="/tableaux"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-ink/45 hover:text-vermilion"
          >
            <ArrowLeft className="size-4" /> Retour aux œuvres
          </Link>
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
            <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] bg-white p-7 shadow-paper">
              <Image
                src={artworkImage(artwork, 1800)}
                alt={artwork.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-contain p-7"
              />
            </div>
            <div>
              <p className="eyebrow">{themes[artwork.theme]}</p>
              <h1 className="mt-6 font-serif text-[clamp(4rem,7vw,7rem)] leading-[.86] tracking-[-.06em]">
                {artwork.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-ink/58">{artwork.story}</p>
              {artwork.singularity ? (
                <p className="mt-5 rounded-2xl bg-white p-5 text-sm font-semibold leading-7 shadow-paper">
                  {artwork.singularity}
                </p>
              ) : null}
              <dl className="mt-8 grid gap-4 border-y border-ink/12 py-6 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink/45">Format</dt>
                  <dd className="text-right font-bold">{artwork.format}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink/45">Statut</dt>
                  <dd className="font-bold text-vermilion">{statusLabels[artwork.status]}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink/45">Prix</dt>
                  <dd className="font-bold">Sur demande</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                {artwork.status === 'disponible' ? (
                  <Link href={`/commander?selection=${artwork.slug}`} className="button-dark">
                    Demander cette œuvre <ArrowRight className="size-4" />
                  </Link>
                ) : (
                  <Link href="/commander" className="button-dark">
                    Créer autour de ce thème <ArrowRight className="size-4" />
                  </Link>
                )}
                <Link href="/commander" className="button-line">
                  Poser une question
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1200px] gap-4 md:grid-cols-3">
          {[
            [Feather, 'Encre de Chine', 'Dessinée à la plume, motif après motif.'],
            [Clock3, 'Temps long', 'Chaque trait participe à une œuvre qui demande des semaines.'],
            [Frame, 'Prête à accrocher', 'Encadrement professionnel avant le départ de l’atelier.'],
          ].map(([Icon, title, text]) => {
            const I = Icon as typeof Feather;
            return (
              <article key={title as string} className="rounded-2xl bg-paper p-7">
                <I className="size-5 text-vermilion" />
                <h2 className="mt-5 font-serif text-3xl">{title as string}</h2>
                <p className="mt-3 text-sm leading-7 text-ink/52">{text as string}</p>
              </article>
            );
          })}
        </div>
      </section>
      {related.length ? (
        <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <p className="eyebrow">Même univers</p>
            <h2 className="mt-5 font-serif text-5xl sm:text-6xl">Continuez le regard.</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {related.map((item) => (
                <ArtCard key={item.slug} artwork={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="bg-ink px-5 py-14 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <p className="flex items-center gap-3 font-serif text-3xl">
            <ShieldCheck className="size-6 text-clay" /> Disponibilité et conditions confirmées directement
            par l’artiste.
          </p>
          <Link href="/commander" className="button-light">
            Échanger avec Nathalie
          </Link>
        </div>
      </section>
    </main>
  );
}
