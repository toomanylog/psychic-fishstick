import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/navigation/navbar';
import Footer from '@/components/sections/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: "Conditions d'utilisation | Alyosha",
  description: "Conditions générales d'utilisation du service de messagerie anonyme et sécurisé Alyosha.",
};

export default function ConditionsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex flex-col space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Conditions d&apos;utilisation
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ces conditions régissent votre utilisation du service Alyosha.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Dernière mise à jour: {new Date().toLocaleDateString()}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-muted-foreground">
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-foreground">1. Acceptation des conditions</h2>
                  <p>
                    En utilisant le service Alyosha, vous acceptez d&apos;être lié par ces conditions d&apos;utilisation. Si vous n&apos;acceptez pas ces conditions, vous ne devez pas utiliser notre service.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-foreground">2. Description du service</h2>
                  <p>
                    Alyosha est un service de messagerie anonyme qui fournit une interface pour envoyer et recevoir des emails de manière sécurisée et privée. Notre service utilise un chiffrement de bout en bout et ne stocke aucune information personnelle identifiable.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-foreground">3. Utilisation responsable</h2>
                  <p>
                    Vous êtes responsable de votre utilisation du service Alyosha. Vous acceptez de ne pas utiliser notre service pour:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Violer des lois ou réglementations locales, nationales ou internationales</li>
                    <li>Distribuer des malwares ou autres contenus malveillants</li>
                    <li>Harceler, intimider ou menacer d&apos;autres personnes</li>
                    <li>Usurper l&apos;identité d&apos;une personne ou d&apos;une entité</li>
                    <li>Interférer avec le fonctionnement normal du service</li>
                    <li>Collecter des données personnelles sur d&apos;autres utilisateurs</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-foreground">4. Comptes et paiements</h2>
                  <p>
                    Pour utiliser certaines fonctionnalités d&apos;Alyosha, vous devrez créer un compte et souscrire à un plan payant. Le paiement s&apos;effectue exclusivement en Monero (XMR) pour des raisons de confidentialité. Les paiements ne sont pas remboursables sauf en cas d&apos;interruption prolongée de notre service.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-foreground">5. Limitation de responsabilité</h2>
                  <p>
                    Alyosha n&apos;assume aucune responsabilité quant au contenu des communications transmises via notre service. Notre service est fourni "tel quel" sans garantie d&apos;aucune sorte, explicite ou implicite.
                  </p>
                  <p>
                    En aucun cas, Alyosha, ses administrateurs, employés ou agents ne seront responsables de tout dommage direct, indirect, accidentel, spécial ou consécutif résultant de l&apos;utilisation ou de l&apos;incapacité d&apos;utiliser notre service.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-foreground">6. Résiliation</h2>
                  <p>
                    Nous nous réservons le droit de suspendre ou de résilier votre compte et votre accès à notre service, avec ou sans préavis et pour quelque raison que ce soit, y compris si nous suspectons une violation de ces conditions d&apos;utilisation.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-foreground">7. Modifications des conditions</h2>
                  <p>
                    Nous pouvons modifier ces conditions d&apos;utilisation à tout moment. Il est de votre responsabilité de consulter régulièrement ces conditions. Votre utilisation continue du service après la publication de modifications constitue votre acceptation de ces modifications.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-foreground">8. Loi applicable</h2>
                  <p>
                    Ces conditions sont régies et interprétées conformément aux lois internationales, sans égard aux principes de conflit de lois.
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