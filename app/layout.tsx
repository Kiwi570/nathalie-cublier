import type { Metadata, Viewport } from 'next';
import { Fraunces } from 'next/font/google';
import localFont from 'next/font/local';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { siteUrl, social } from '@/lib/site';

import './globals.css';

const geist = localFont({ src: './fonts/geist-latin.woff2', variable: '--font-geist', display: 'swap' });
/* Serif de titrage : téléchargée au build par next/font, servie depuis le site (aucune requête externe). */
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Nathalie Cublier — Artiste à l’encre de Chine', template: '%s — Nathalie Cublier' },
  description:
    'Tableaux originaux à l’encre de Chine, pièces uniques et commandes sur mesure créées près de Cannes.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'Nathalie Cublier — Le temps rendu visible',
    description: 'Des œuvres originales, dessinées trait après trait.',
    images: [{ url: '/images/macro-encre.jpg', width: 784, height: 1168 }],
  },
  twitter: { card: 'summary_large_image', images: ['/images/macro-encre.jpg'] },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = { themeColor: '#faf9f5', colorScheme: 'light' };

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nathalie Cublier',
  jobTitle: 'Artiste à l’encre de Chine',
  address: { '@type': 'PostalAddress', addressRegion: 'Alpes-Maritimes', addressCountry: 'FR' },
  sameAs: [social.instagram, social.facebook],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${geist.variable} ${fraunces.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        {/* Pose la classe .js avant le premier rendu : les éléments révélés au scroll
            ne sont masqués que si le JS est bien là (voir globals.css). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
