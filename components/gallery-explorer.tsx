'use client';

import { Heart, SlidersHorizontal, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { artworkImage, artworks, statusLabels, themes } from '@/lib/artworks';

type Filter = 'all' | keyof typeof themes;

const delay = (index: number) => ({ animationDelay: `${Math.min(index * 70, 700)}ms` });

export function GalleryExplorer() {
  const [filter, setFilter] = useState<Filter>('all');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const visible = useMemo(
    () =>
      artworks.filter(
        (artwork) =>
          (filter === 'all' || artwork.theme === filter) &&
          (!availableOnly || artwork.status === 'disponible'),
      ),
    [filter, availableOnly],
  );
  const selected = shortlist.map((slug) => artworks.find((artwork) => artwork.slug === slug)).filter(Boolean);

  function toggle(slug: string) {
    setShortlist((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  }

  return (
    <div>
      <div
        className="anim-rise flex flex-col gap-5 rounded-[1.5rem] border border-ink/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
        style={{ animationDelay: '480ms' }}
      >
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            aria-pressed={filter === 'all'}
            className={`choice ${filter === 'all' ? 'is-on' : ''}`}
          >
            Tout
          </button>
          {Object.entries(themes).map(([key, label]) => (
            <button
              type="button"
              key={key}
              onClick={() => setFilter(key as Filter)}
              aria-pressed={filter === key}
              className={`choice ${filter === key ? 'is-on' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-pressed={availableOnly}
          onClick={() => setAvailableOnly((value) => !value)}
          className={`button-line shrink-0 ${availableOnly ? 'bg-ink text-white' : ''}`}
        >
          <SlidersHorizontal className="size-4" /> Disponibles uniquement
        </button>
      </div>
      <p className="mt-5 text-xs font-bold uppercase tracking-[.14em] text-ink/60" aria-live="polite">
        <span key={visible.length} className="anim-fade inline-block">
          {visible.length} œuvre{visible.length > 1 ? 's' : ''}
        </span>
      </p>
      <div key={`${filter}-${availableOnly}`} className="stagger-in mt-7 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {visible.map((artwork, index) => {
          const kept = shortlist.includes(artwork.slug);
          return (
            <article key={artwork.slug} className="group mb-8 break-inside-avoid" style={delay(index)}>
              <div className="paper-card relative overflow-hidden rounded-[1.5rem] bg-white p-5">
                <Link
                  href={`/tableau/${artwork.slug}`}
                  className="relative block overflow-hidden bg-mist"
                  style={{ aspectRatio: `${artwork.width}/${artwork.height}` }}
                >
                  <Image
                    src={artworkImage(artwork, 1000)}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className="object-contain transition-transform duration-1000 ease-out-expo group-hover:scale-[1.03]"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => toggle(artwork.slug)}
                  aria-pressed={kept}
                  aria-label={`${kept ? 'Retirer' : 'Ajouter'} ${artwork.title} de la sélection`}
                  className={`absolute right-7 top-7 grid size-11 place-items-center rounded-full bg-paper shadow-lg transition-[transform,color] duration-300 hover:scale-110 active:scale-90 ${
                    kept ? 'text-vermilion' : 'text-ink/60'
                  }`}
                >
                  <Heart
                    key={kept ? 'on' : 'off'}
                    className={`size-5 ${kept ? 'animate-pop' : ''}`}
                    fill={kept ? 'currentColor' : 'none'}
                  />
                </button>
              </div>
              <div className="flex justify-between gap-4 px-1 pt-4">
                <div>
                  <Link
                    href={`/tableau/${artwork.slug}`}
                    className="font-serif text-2xl transition-colors duration-500 hover:text-vermilion"
                  >
                    {artwork.title}
                  </Link>
                  <p className="mt-1 text-xs text-ink/60">{artwork.format}</p>
                </div>
                <span className="mt-1 text-[9px] font-bold uppercase tracking-[.12em] text-vermilion">
                  {statusLabels[artwork.status]}
                </span>
              </div>
            </article>
          );
        })}
      </div>
      {shortlist.length ? (
        <aside className="anim-rise fixed inset-x-4 bottom-4 z-40 mx-auto max-w-3xl rounded-2xl bg-ink p-4 text-white shadow-2xl">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-bold">Votre sélection · {shortlist.length}</p>
              <p className="truncate text-xs text-white/50">
                {selected.map((item) => item?.title).join(' · ')}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link href={`/commander?selection=${shortlist.join(',')}`} className="button-light">
                Écrire à Nathalie
              </Link>
              <button
                type="button"
                onClick={() => setShortlist([])}
                className="grid size-11 place-items-center rounded-full border border-white/20 transition-[border-color,transform] duration-300 hover:border-white active:scale-90"
                aria-label="Vider la sélection"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
