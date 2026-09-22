'use client';

import { Maximize2, Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { type PointerEvent as ReactPointerEvent, useRef, useState } from 'react';

import { type Artwork, artworkImage } from '@/lib/artworks';

const LENS = 220;
const ZOOM = 2.6;

/**
 * L'œuvre en grand : une loupe suit la souris sur la fiche (souris uniquement),
 * et « Voir en grand » ouvre une vue plein écran où l'on peut passer en 2× et se déplacer
 * (molette, doigt, ou cliquer-glisser). Les détails du trait sont l'argument n° 1 de Nathalie.
 */
export function ArtworkViewer({ artwork }: { artwork: Artwork }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const [lens, setLens] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const large = artworkImage(artwork, 2400);
  const ratio = artwork.width / artwork.height;

  function moveLens(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    setLens({ x: event.clientX - rect.left, y: event.clientY - rect.top, width: rect.width, height: rect.height });
  }

  function open() {
    setZoomed(false);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  function toggleZoom() {
    const next = !zoomed;
    setZoomed(next);
    requestAnimationFrame(() => {
      const element = scrollRef.current;
      if (!element) return;
      element.scrollTo({
        left: next ? (element.scrollWidth - element.clientWidth) / 2 : 0,
        top: next ? (element.scrollHeight - element.clientHeight) / 2 : 0,
      });
    });
  }

  function startDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const element = scrollRef.current;
    if (!element || !zoomed || event.pointerType !== 'mouse') return;
    drag.current = { x: event.clientX, y: event.clientY, left: element.scrollLeft, top: element.scrollTop };
    element.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const element = scrollRef.current;
    if (!element || !drag.current) return;
    element.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
    element.scrollTop = drag.current.top - (event.clientY - drag.current.y);
  }

  function endDrag() {
    drag.current = null;
  }

  return (
    <>
      <div
        className="anim-scale relative overflow-hidden rounded-[2rem] bg-white p-7 shadow-paper sm:p-10"
        style={{ animationDelay: '100ms' }}
      >
        {/* La boîte a exactement le ratio de l'œuvre : la loupe reste calée sur l'image */}
        <div
          className="relative mx-auto cursor-zoom-in bg-mist"
          style={{ aspectRatio: `${artwork.width} / ${artwork.height}`, maxWidth: `calc(78vh * ${ratio})` }}
          onPointerMove={moveLens}
          onPointerLeave={() => setLens(null)}
          onClick={open}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              open();
            }
          }}
          aria-label={`Voir ${artwork.title} en grand`}
        >
          <Image
            src={artworkImage(artwork, 1800)}
            alt={artwork.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-contain"
          />
          {lens ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute rounded-full border-2 border-white shadow-[0_20px_60px_rgba(23,23,22,0.35)]"
              style={{
                width: LENS,
                height: LENS,
                left: lens.x - LENS / 2,
                top: lens.y - LENS / 2,
                backgroundImage: `url("${large}")`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'white',
                backgroundSize: `${lens.width * ZOOM}px ${lens.height * ZOOM}px`,
                backgroundPosition: `${-(lens.x * ZOOM - LENS / 2)}px ${-(lens.y * ZOOM - LENS / 2)}px`,
              }}
            />
          ) : null}
        </div>
        <button
          type="button"
          onClick={open}
          className="button-line absolute bottom-5 right-5 bg-paper/90 backdrop-blur"
        >
          <Maximize2 className="size-4" /> Voir en grand
        </button>
      </div>

      <dialog
        ref={dialogRef}
        className="artwork-dialog m-auto h-[100svh] w-full max-h-none max-w-none bg-ink/95 p-0 text-white"
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        aria-label={`${artwork.title}, vue en grand`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-clay">{artwork.format}</p>
              <p className="truncate font-serif text-2xl">{artwork.title}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" onClick={toggleZoom} className="button-ghost" aria-pressed={zoomed}>
                {zoomed ? <Minus className="size-4" /> : <Plus className="size-4" />}
                {zoomed ? 'Vue entière' : 'Approcher (2×)'}
              </button>
              <button
                type="button"
                onClick={close}
                className="grid size-12 place-items-center rounded-full border border-white/20 transition-[border-color,transform] duration-300 hover:border-clay active:scale-90"
                aria-label="Fermer"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>
          <div
            ref={scrollRef}
            className={`min-h-0 flex-1 overflow-auto ${zoomed ? 'cursor-grab active:cursor-grabbing' : ''}`}
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div
              className="mx-auto"
              style={
                zoomed
                  ? { width: `min(200%, calc((100svh - 9rem) * ${ratio} * 2))`, maxWidth: 'none' }
                  : { maxWidth: `min(100%, calc((100svh - 9rem) * ${ratio}))` }
              }
            >
              <Image
                src={large}
                alt={artwork.title}
                width={2400}
                height={Math.round(2400 / ratio)}
                sizes="100vw"
                className="h-auto w-full select-none"
                draggable={false}
              />
            </div>
          </div>
          <p className="px-5 pb-4 text-center text-xs text-white/60 sm:px-8">
            {zoomed
              ? 'Cliquez-glissez ou faites défiler pour parcourir le trait.'
              : 'Approchez-vous : chaque zone reçoit son propre motif.'}
          </p>
        </div>
      </dialog>
    </>
  );
}
