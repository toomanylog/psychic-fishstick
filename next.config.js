/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  // Ajout de la configuration pour netlify
  trailingSlash: true, 
  output: 'standalone',
};

module.exports = nextConfig; 