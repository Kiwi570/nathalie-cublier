'use client';

import { Menu, PenLine, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { nav } from '@/lib/site';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-10 place-items-center rounded-full border border-ink/15 font-serif text-lg italic">
            NC
          </span>
          <span>
            <b className="block font-serif text-lg font-normal leading-none">Nathalie Cublier</b>
            <small className="mt-1 block text-[9px] font-bold uppercase tracking-[0.18em] text-ink/48">
              Encre de Chine · près de Cannes
            </small>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname.startsWith(item.href) ? 'is-active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/commander" className="button-dark hidden sm:inline-flex">
          <PenLine className="size-4" /> Imaginer une œuvre
        </Link>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-ink/15 lg:hidden"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <nav
          className="grid gap-1 border-t border-ink/10 bg-paper px-5 py-5 lg:hidden"
          aria-label="Navigation mobile"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-4 py-3 text-lg font-semibold hover:bg-white"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
