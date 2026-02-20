import { mockListings } from '@/lib/mockData';

export default async function sitemap() {
  const baseUrl = 'https://carpal.gr';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/listings/create`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/safety`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2026-02-19'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2026-02-19'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  // Dynamic listing pages (in production, fetch from database)
  const listingPages = mockListings.map((listing) => ({
    url: `${baseUrl}/listings/${listing.id}`,
    lastModified: new Date(listing.createdAt || Date.now()),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // Popular routes pages
  const popularRoutes = [
    { from: 'Θεσσαλονίκη', to: 'Αθήνα' },
    { from: 'Θεσσαλονίκη', to: 'Βόλος' },
    { from: 'Θεσσαλονίκη', to: 'Ιωάννινα' },
    { from: 'Θεσσαλονίκη', to: 'Καβάλα' },
    { from: 'Θεσσαλονίκη', to: 'Λάρισα' },
    { from: 'Θεσσαλονίκη', to: 'Ξάνθη' },
  ].map((route) => ({
    url: `${baseUrl}/search?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}`,
    lastModified: new Date(),
    changeFrequency: 'hourly',
    priority: 0.7,
  }));

  return [...staticPages, ...listingPages, ...popularRoutes];
}
