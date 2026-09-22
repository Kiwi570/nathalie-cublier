'use client';

import { PenLine } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { nav } from '@/lib/site';

const mobileItems = [...nav, { href: '/commander', label: 'Imaginer une œuvre' }];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-700 ${
        scrolled
          ? 'border-ink/12 bg-paper/85 shadow-[0_18px_50px_rgba(23,23,22,0.07)]'
          : 'border-ink/10 bg-paper/90'
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1480px] items-center justify-between gap-5 px-5 transition-[height] duration-700 ease-out-expo sm:px-8 lg:px-12 ${
          scrolled ? 'h-16' : 'h-20'
        }`}
      >
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-10 place-items-center rounded-full border border-ink/15 font-serif text-lg italic transition-[background-color,color,border-color,transform] duration-700 ease-out-expo group-hover:-rotate-6 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
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
          className={`grid size-11 place-items-center rounded-full border border-ink/15 transition-colors duration-300 hover:border-ink lg:hidden ${
            open ? 'is-open' : ''
          }`}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="burger" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>
      <div
        id="mobile-navigation"
        className={`mobile-nav lg:hidden ${open ? 'is-open' : ''}`}
        {...(open ? {} : { inert: true })}
      >
        <nav className="bg-paper" aria-label="Navigation mobile">
          <div className="grid gap-1 px-5 py-5">
            {mobileItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-xl px-4 py-3 font-serif text-2xl hover:bg-white ${
                  index === nav.length ? 'text-vermilion' : ''
                }`}
                style={{ transitionDelay: open ? `${100 + index * 55}ms` : '0ms' }}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
