export const siteConfig = {
  name: "Alyosha",
  description: "Service de transfert d'emails anonyme et sécurisé. Protégez votre vie privée en ligne avec notre technologie de chiffrement de pointe.",
  url: "https://alyosha.xyz",
  ogImage: "https://alyosha.xyz/opengraph-image.png",
  links: {
    twitter: "https://twitter.com/AlyoshaMail",
    github: "https://github.com/toomanylog/psychic-fishstick"
  },
  keywords: [
    "email anonyme", 
    "sécurité email", 
    "confidentialité", 
    "chiffrement", 
    "anonymat", 
    "Monero", 
    "PGP", 
    "vie privée"
  ]
};

export const defaultMetadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Service de messagerie anonyme et sécurisé`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "Alyosha Team" }],
  creator: "Alyosha Team",
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true
  }
}; 