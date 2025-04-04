import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Alyosha - Service de messagerie anonyme et sécurisé',
    short_name: 'Alyosha',
    description: 'Service de transfert d\'emails anonyme et sécurisé. Protégez votre vie privée en ligne avec notre technologie de chiffrement de pointe.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0E0E11',
    theme_color: '#9F7AEA',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
} 