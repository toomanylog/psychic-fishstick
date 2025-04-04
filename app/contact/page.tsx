import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/navigation/navbar';
import Footer from '@/components/sections/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, ExternalLink, MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: "Contact | Alyosha",
  description: "Contactez l'équipe Alyosha de manière sécurisée en utilisant notre clé PGP ou via Telegram.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex flex-col space-y-8 max-w-3xl mx-auto">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Nous contacter
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Pour préserver votre sécurité et votre confidentialité, nous proposons uniquement des méthodes de contact chiffrées.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquareText className="h-5 w-5 mr-2 text-primary" />
                    Email PGP
                  </CardTitle>
                  <CardDescription>
                    Communication chiffrée de bout en bout
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Pour une sécurité maximale, utilisez notre clé PGP pour chiffrer vos messages avant de nous les envoyer.
                  </p>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-medium text-sm">Email de contact:</p>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-sm">contact@alyosha.xyz</code>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-sm">Notre clé PGP publique:</p>
                    <div className="bg-muted p-4 rounded-md overflow-auto relative">
                      <pre className="text-xs text-foreground/80">
                        {`-----BEGIN PGP PUBLIC KEY BLOCK-----
mQINBGUzn4wBEADJQo5Vy/Au7sE9YYRyCs/I7gvzidQPyVZU2V4xj8K4KytTXA+Y
EQRZwcQCqbOw0PBQEhwqLGDLLkLnkC6LDVhO1tF0v8mD7Kz9XK8HDCX2EKHMQtQd
5ZXUSx0HtRfÆKsØPHr5TU3UaGrwMxVIaÆeA7p6i0ByOLRD5njmfRg7VjvUS2
x13L8sA0aqZ98JGXP2f1y1XJHF58B5LL3L87JHBGFUtDhLHWl5zGM1/HxTHoEMi0
hgJ2S3LØUcXf7tRUvJG9eLz0JMmyJHJpg==
=jW0z
-----END PGP PUBLIC KEY BLOCK-----`}
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 bg-background/50"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Guides PGP:</p>
                    <ul className="space-y-1">
                      <li>
                        <Link
                          href="https://www.openpgp.org/software/"
                          target="_blank"
                          className="text-primary text-sm flex items-center hover:underline"
                        >
                          Logiciels PGP recommandés
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-primary text-sm flex items-center hover:underline"
                        >
                          Comment chiffrer un message avec PGP
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        fill="currentColor"
                        fillOpacity="0.2"
                      />
                      <path
                        d="M4.5 18L8 16M19.5 18L16 16M12 12V15.5M12 12L16 16M12 12L8 16M8 16L7.5 11.5L9.5 7.5L12 6.5L14.5 7.5L16.5 11.5L16 16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Telegram
                  </CardTitle>
                  <CardDescription>
                    Messagerie instantanée chiffrée
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Pour des questions rapides ou une assistance immédiate, contactez-nous via Telegram.
                  </p>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-medium text-sm">Notre canal Telegram:</p>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-sm">@AlyoshaService</code>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ouvrir Telegram
                  </Button>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Conseils de sécurité:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-xs text-muted-foreground">
                      <li>Activer les messages éphémères pour les conversations sensibles</li>
                      <li>Utiliser Telegram via Tor pour un anonymat renforcé</li>
                      <li>Ne pas partager d&apos;informations personnelles identifiables</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Pourquoi pas de formulaire de contact?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Chez Alyosha, nous privilégions votre confidentialité et votre sécurité avant tout. Les formulaires de contact traditionnels peuvent exposer vos métadonnées et ne garantissent pas un chiffrement de bout en bout. C&apos;est pourquoi nous préférons des méthodes de communication qui préservent votre anonymat et protègent le contenu de vos messages.
                </p>
              </CardContent>
            </Card>

            <div className="text-center mt-6">
              <p className="text-muted-foreground text-sm">
                Temps de réponse typique: 24-48 heures. Pour les questions urgentes, privilégiez Telegram.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 