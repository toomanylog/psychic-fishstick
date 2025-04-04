import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/navigation/navbar';
import Footer from '@/components/sections/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, FileText, Globe, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: "Conformité légale | Alyosha",
  description: "Informations sur notre conformité légale et notre approche des réglementations.",
};

export default function ConformitePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex flex-col space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Conformité légale
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comment nous concilions confidentialité et respect des lois.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Dernière mise à jour: {new Date().toLocaleDateString()}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-muted-foreground">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Notre philosophie</h2>
                  </div>
                  <p>
                    Chez Alyosha, nous croyons fermement que la confidentialité est un droit fondamental. Notre service est conçu pour protéger ce droit tout en respectant les lois applicables. Nous adoptons une approche équilibrée qui préserve la confidentialité des utilisateurs tout en décourageant les activités illégales.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Activités interdites</h2>
                  </div>
                  <p>
                    Bien que nous soyons dédiés à la protection de la vie privée, nous interdisons formellement l&apos;utilisation de notre service pour:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Toute activité illégale selon les lois internationales</li>
                    <li>Le harcèlement ou les menaces envers autrui</li>
                    <li>La distribution de contenu malveillant ou de malwares</li>
                    <li>L&apos;usurpation d&apos;identité</li>
                    <li>La fraude ou les escroqueries</li>
                    <li>La promotion de la violence ou du terrorisme</li>
                    <li>La distribution de contenu illégal</li>
                  </ul>
                  <p>
                    Nous nous réservons le droit de suspendre ou de résilier les comptes utilisés à ces fins.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Cadre juridique international</h2>
                  </div>
                  <p>
                    Alyosha opère dans un cadre juridique international. Notre approche de la conformité légale est basée sur les principes suivants:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Respect des droits fondamentaux à la vie privée et à la liberté d&apos;expression</li>
                    <li>Architecture technique minimisant la collecte de données</li>
                    <li>Transparence sur nos politiques et pratiques</li>
                    <li>Coopération avec les autorités uniquement dans le cadre strict de nos capacités techniques</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Réponse aux demandes légales</h2>
                  </div>
                  <p>
                    Notre politique concernant les demandes légales est simple et transparente:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Nous évaluons rigoureusement toute demande légale pour garantir sa légitimité</li>
                    <li>Nous ne pouvons fournir que les informations que nous détenons techniquement</li>
                    <li>En raison de notre architecture axée sur la confidentialité, nous ne stockons pas la majorité des données d&apos;utilisation</li>
                    <li>Nous informons nos utilisateurs des demandes les concernant lorsque la loi le permet</li>
                    <li>Nous ne collaborons avec aucune agence pour surveiller proactivement les communications</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-foreground">Transactions financières</h2>
                  <p>
                    Notre utilisation exclusive du Monero (XMR) pour les paiements est conforme à notre politique de confidentialité. Le Monero est une cryptomonnaie légale utilisée dans le monde entier. Nous veillons à respecter les réglementations applicables en matière de lutte contre le blanchiment d&apos;argent tout en préservant la confidentialité financière de nos utilisateurs.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-foreground">Responsabilité des utilisateurs</h2>
                  <p>
                    Les utilisateurs sont responsables de leur conformité aux lois locales. Si l&apos;utilisation d&apos;un service de messagerie anonyme ou de cryptomonnaies est restreinte dans votre juridiction, il vous incombe de respecter ces restrictions.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-foreground">Transparence</h2>
                  <p>
                    Nous nous engageons à maintenir une transparence maximale concernant nos politiques et pratiques légales, dans les limites de ce que la loi nous autorise à divulguer. Nous publierons régulièrement des mises à jour de notre politique de conformité légale pour refléter les évolutions réglementaires et juridiques.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Link href="/" className="text-primary hover:underline">
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 