'use client';

import { Heart, SlidersHorizontal, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { artworkImage, artworks, statusLabels, themes } from '@/lib/artworks';

type Filter = 'all' | keyof typeof themes;

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
      <div className="flex flex-col gap-5 rounded-[1.5rem] border border-ink/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
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
      <p className="mt-5 text-xs font-bold uppercase tracking-[.14em] text-ink/38">
        {visible.length} œuvre{visible.length > 1 ? 's' : ''}
      </p>
      <div className="mt-7 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {visible.map((artwork) => (
          <article key={artwork.slug} className="group mb-8 break-inside-avoid">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-white p-5 shadow-paper">
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
                  className="object-contain transition duration-700 group-hover:scale-[1.025]"
                />
              </Link>
              <button
                type="button"
                onClick={() => toggle(artwork.slug)}
                aria-pressed={shortlist.includes(artwork.slug)}
                aria-label={`${shortlist.includes(artwork.slug) ? 'Retirer' : 'Ajouter'} ${artwork.title} de la sélection`}
                className={`absolute right-7 top-7 grid size-11 place-items-center rounded-full bg-paper shadow-lg ${shortlist.includes(artwork.slug) ? 'text-vermilion' : 'text-ink/45'}`}
              >
                <Heart className="size-5" fill={shortlist.includes(artwork.slug) ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className="flex justify-between gap-4 px-1 pt-4">
              <div>
                <Link href={`/tableau/${artwork.slug}`} className="font-serif text-2xl hover:text-vermilion">
                  {artwork.title}
                </Link>
                <p className="mt-1 text-xs text-ink/45">{artwork.format}</p>
              </div>
              <span className="mt-1 text-[9px] font-bold uppercase tracking-[.12em] text-vermilion">
                {statusLabels[artwork.status]}
              </span>
            </div>
          </article>
        ))}
      </div>
      {shortlist.length ? (
        <aside className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-3xl rounded-2xl bg-ink p-4 text-white shadow-2xl">
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
                className="grid size-11 place-items-center rounded-full border border-white/20"
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
