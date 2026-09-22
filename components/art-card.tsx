import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { type Artwork, artworkImage, statusLabels, themes } from '@/lib/artworks';

export function ArtCard({ artwork, priority = false }: { artwork: Artwork; priority?: boolean }) {
  return (
    <article className="group">
      <Link
        href={`/tableau/${artwork.slug}`}
        className="relative block overflow-hidden rounded-[1.5rem] bg-white p-5 shadow-paper"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-mist">
          <Image
            src={artworkImage(artwork, 900)}
            alt={artwork.title}
            fill
            priority={priority}
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
            className="object-contain transition duration-700 group-hover:scale-[1.025]"
          />
        </div>
        <span
          className={`absolute right-7 top-7 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${artwork.status === 'disponible' ? 'bg-vermilion text-white' : 'bg-paper/90 text-ink'}`}
        >
          {statusLabels[artwork.status]}
        </span>
      </Link>
      <div className="flex items-start justify-between gap-4 px-1 pt-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/42">
            {themes[artwork.theme]}
          </p>
          <h3 className="mt-1 font-serif text-2xl">{artwork.title}</h3>
          <p className="mt-1 text-xs text-ink/48">{artwork.format}</p>
        </div>
        <ArrowUpRight className="mt-1 size-5 text-ink/28 transition group-hover:text-vermilion" />
      </div>
    </article>
  );
}
