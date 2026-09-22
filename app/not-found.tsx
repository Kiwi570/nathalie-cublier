import Link from 'next/link';

import { Lines } from '@/components/motion/lines';

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div className="hero-seq">
        <p className="eyebrow justify-center" style={{ animationDelay: '80ms' }}>
          Page introuvable
        </p>
        <h1 className="mt-6 font-serif text-7xl">
          <Lines lines={['Ce trait n’existe pas.']} />
        </h1>
        <p className="mt-5 text-ink/52" style={{ animationDelay: '360ms' }}>
          La page demandée n’est pas là. Les œuvres, elles, vous attendent.
        </p>
        <div className="mt-8" style={{ animationDelay: '480ms' }}>
          <Link href="/tableaux" className="button-dark">
            Voir les œuvres
          </Link>
        </div>
      </div>
    </main>
  );
}
