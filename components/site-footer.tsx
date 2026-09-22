import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { nav, social } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="bg-ink px-5 pb-8 pt-16 text-paper sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 border-b border-white/12 pb-12 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <p className="font-serif text-4xl">Nathalie Cublier</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/52">
              Des œuvres originales à l’encre de Chine, dessinées trait après trait et encadrées près de
              Cannes.
            </p>
          </div>
          <div>
            <p className="footer-title">Explorer</p>
            <div className="mt-5 grid gap-3 text-sm text-white/60">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-title">Suivre le trait</p>
            <div className="mt-5 grid gap-3 text-sm text-white/60">
              <a
                href={social.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-white"
              >
                Instagram <ArrowUpRight className="size-3.5" />
              </a>
              <a
                href={social.facebook}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-white"
              >
                Facebook <ArrowUpRight className="size-3.5" />
              </a>
              <Link href="/mentions-legales" className="hover:text-white">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-7 text-[10px] uppercase tracking-[0.14em] text-white/32 sm:flex-row sm:justify-between">
          <p>© 2026 Nathalie Cublier</p>
          <p>Œuvres uniques · Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
