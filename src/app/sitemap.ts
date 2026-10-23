import { MetadataRoute } from 'next';
import { initialServices } from '@/lib/db/initial-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vijaymangal-ayurved.vercel.app';

  const staticRoutes = [
    '',
    '/treatments',
    '/book-appointment',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-10-23'),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const serviceRoutes = initialServices.map((service) => ({
    url: `${baseUrl}/treatments/${service.slug}`,
    lastModified: new Date('2026-10-23'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
