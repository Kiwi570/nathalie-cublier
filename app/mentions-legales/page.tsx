import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Mentions légales', robots: { index: false, follow: true } };

export default function LegalPage() {
  return (
    <main id="main">
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <article className="mx-auto max-w-3xl">
          <p className="eyebrow">Informations</p>
          <h1 className="mt-6 font-serif text-6xl sm:text-8xl">Mentions légales.</h1>
          <div className="mt-12 grid gap-9 text-sm leading-7 text-ink/60">
            <section>
              <h2 className="font-serif text-3xl text-ink">Éditeur</h2>
              <p className="mt-3">
                Nathalie Cublier, artiste. Adresse postale et numéro SIRET à compléter avant publication
                définitive.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-3xl text-ink">Hébergement</h2>
              <p className="mt-3">Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
            </section>
            <section>
              <h2 className="font-serif text-3xl text-ink">Propriété intellectuelle</h2>
              <p className="mt-3">
                Les œuvres, photographies et textes sont la propriété de Nathalie Cublier. Toute reproduction
                est interdite sans accord écrit.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-3xl text-ink">Données personnelles</h2>
              <p className="mt-3">
                Cette maquette n’enregistre et ne transmet aucune donnée personnelle. Les modalités devront
                être complétées lors du raccordement d’un formulaire ou d’un outil de mesure d’audience.
              </p>
            </section>
          </div>
        </article>
      </section>
    </main>
  );
}
