import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Reveal } from '@/components/motion/reveal';
import { contact, nav, social } from '@/lib/site';

const arrow =
  'size-3.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5';

export function SiteFooter() {
  return (
    <footer className="bg-ink px-5 pb-8 pt-16 text-paper sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Reveal stagger={130} y={20} className="grid gap-12 border-b border-white/12 pb-12 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
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
                <Link key={item.href} href={item.href} className="footer-link">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-title">Écrire, suivre</p>
            <div className="mt-5 grid gap-3 text-sm text-white/60">
              <a href={`mailto:${contact.email}`} className="footer-link">
                {contact.email}
              </a>
              <a
                href={social.instagram}
                target="_blank"
                rel="noreferrer"
                className="footer-link group inline-flex items-center gap-2"
              >
                Instagram <ArrowUpRight className={arrow} />
              </a>
              <a
                href={social.facebook}
                target="_blank"
                rel="noreferrer"
                className="footer-link group inline-flex items-center gap-2"
              >
                Facebook <ArrowUpRight className={arrow} />
              </a>
              <Link href="/mentions-legales" className="footer-link">
                Mentions légales
              </Link>
            </div>
          </div>
        </Reveal>
        <div className="flex flex-col gap-2 pt-7 text-[10px] uppercase tracking-[0.14em] text-white/60 sm:flex-row sm:justify-between">
          <p>© 2026 Nathalie Cublier</p>
          <p>Œuvres uniques · Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
