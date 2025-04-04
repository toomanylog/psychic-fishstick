import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/navigation/navbar';
import Footer from '@/components/sections/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: "Politique de confidentialité | Alyosha",
  description: "Notre engagement envers la protection de votre vie privée et la confidentialité de vos données.",
};

export default function ConfidentialitePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex flex-col space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Politique de confidentialité
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Notre engagement envers la protection de votre vie privée.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Dernière mise à jour: {new Date().toLocaleDateString()}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-muted-foreground">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Notre engagement</h2>
                  </div>
                  <p>
                    Chez Alyosha, la protection de votre vie privée est notre priorité absolue. Notre service est conçu selon le principe de confidentialité par défaut, ce qui signifie que nous minimisons la collecte de données et utilisons les meilleures pratiques de chiffrement pour protéger vos communications.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Données collectées</h2>
                  </div>
                  <p>
                    Nous ne collectons que le strict minimum nécessaire au fonctionnement de notre service:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Adresse email de récupération (chiffrée et jamais partagée)</li>
                    <li>Informations de paiement en Monero (anonymes par nature)</li>
                    <li>Clés de chiffrement générées pour votre compte</li>
                  </ul>
                  <p>
                    Nous ne collectons pas:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Votre adresse IP</li>
                    <li>Votre localisation</li>
                    <li>Votre identité réelle</li>
                    <li>Vos métadonnées de navigation</li>
                    <li>Le contenu de vos communications</li>
                    <li>L&apos;historique de vos messages</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Protection des données</h2>
                  </div>
                  <p>
                    Toutes les communications transitant par notre service sont protégées par un chiffrement de bout en bout. Cela signifie que même nous ne pouvons pas accéder au contenu de vos messages.
                  </p>
                  <p>
                    Notre infrastructure est conçue selon les principes de sécurité Zero-Knowledge:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Chiffrement de bout en bout pour toutes les communications</li>
                    <li>Aucune journalisation des données sensibles</li>
                    <li>Suppression automatique des messages après traitement</li>
                    <li>Rotation régulière des clés de chiffrement</li>
                    <li>Audits de sécurité indépendants</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Divulgation à des tiers</h2>
                  </div>
                  <p>
                    Nous ne vendons, n&apos;échangeons ni ne louons vos informations personnelles à des tiers. Nous ne divulguerons vos informations que si nous y sommes légalement contraints, et uniquement dans la mesure où nous disposons techniquement de ces informations.
                  </p>
                  <p>
                    Notre politique est simple: nous ne pouvons pas divulguer ce que nous ne stockons pas. Notre infrastructure est conçue pour minimiser les données que nous détenons, afin de garantir la confidentialité de vos communications.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-foreground">Paiements en Monero</h2>
                  <p>
                    Nous acceptons exclusivement les paiements en Monero (XMR) car cette cryptomonnaie offre un niveau d&apos;anonymat que les autres méthodes de paiement ne peuvent garantir. Les transactions Monero sont privées par défaut, protégeant ainsi votre identité financière.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-foreground">Modifications de la politique</h2>
                  <p>
                    Nous pouvons occasionnellement mettre à jour notre politique de confidentialité. Nous vous informerons de tout changement significatif et vous inviterons à consulter régulièrement cette page pour rester informé des mesures que nous prenons pour protéger vos données personnelles.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-foreground">Contactez-nous</h2>
                  <p>
                    Si vous avez des questions concernant notre politique de confidentialité, n&apos;hésitez pas à nous contacter via notre page de contact en utilisant notre clé PGP pour une communication sécurisée.
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