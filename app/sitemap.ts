import type { MetadataRoute } from 'next';
import { artworks } from '@/lib/artworks';
import { siteUrl } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/tableaux',
    '/pieces',
    '/commander',
    '/atelier',
    '/mentions-legales',
    ...artworks.map((artwork) => `/tableau/${artwork.slug}`),
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === '' ? 'monthly' : 'yearly',
    priority: route === '' ? 1 : route.startsWith('/tableau/') ? 0.7 : 0.8,
  }));
}
