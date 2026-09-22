import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div>
        <p className="eyebrow justify-center">Page introuvable</p>
        <h1 className="mt-6 font-serif text-7xl">Ce trait n’existe pas.</h1>
        <p className="mt-5 text-ink/52">La page demandée n’est pas là. Les œuvres, elles, vous attendent.</p>
        <Link href="/tableaux" className="button-dark mt-8">
          Voir les œuvres
        </Link>
      </div>
    </main>
  );
}
