import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alyosha | Service de messagerie anonyme et sécurisé",
  description: "Service de transfert d'emails anonyme et sécurisé. Protégez votre vie privée en ligne avec notre technologie de chiffrement de pointe.",
  keywords: "email anonyme, sécurité email, confidentialité, chiffrement, anonymat, Monero, PGP, vie privée",
  authors: [{ name: "Alyosha Team" }],
  creator: "Alyosha Team",
  publisher: "Alyosha",
  applicationName: "Alyosha",
  openGraph: {
    title: "Alyosha | Service de messagerie anonyme et sécurisé",
    description: "Service de transfert d'emails anonyme et sécurisé. Protégez votre vie privée en ligne avec notre technologie de chiffrement de pointe.",
    url: "https://alyosha.xyz",
    siteName: "Alyosha",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://alyosha.xyz/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Alyosha - Service de messagerie anonyme et sécurisé",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alyosha | Service de messagerie anonyme et sécurisé",
    description: "Service de transfert d'emails anonyme et sécurisé. Protégez votre vie privée en ligne avec notre technologie de chiffrement de pointe.",
    images: [
      {
        url: "https://alyosha.xyz/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Alyosha - Service de messagerie anonyme et sécurisé",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon-192.png" },
    ],
  },
  manifest: "/manifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#9F7AEA" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
