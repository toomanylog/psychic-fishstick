import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/navigation/navbar';
import Footer from '@/components/sections/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: "Aide et Assistance | Alyosha",
  description: "Centre d'assistance et guides d'utilisation pour le service de messagerie anonyme et sécurisé Alyosha.",
};

export default function HelpPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex flex-col space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Centre d&apos;aide
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tout ce dont vous avez besoin pour utiliser Alyosha efficacement et en toute sécurité.
              </p>
            </div>

            <Tabs defaultValue="faq" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="securite">Sécurité</TabsTrigger>
                <TabsTrigger value="legal">Légal</TabsTrigger>
              </TabsList>
              <TabsContent value="faq" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Questions fréquemment posées</CardTitle>
                    <CardDescription>
                      Les réponses aux questions les plus courantes sur notre service.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Comment fonctionne Alyosha?</AccordionTrigger>
                        <AccordionContent>
                          Alyosha fournit un service de transfert d&apos;emails qui agit comme intermédiaire entre vous et vos correspondants. Quand quelqu&apos;un vous envoie un email, nous le recevons, le chiffrons, et le transférons à votre véritable adresse email sans jamais révéler celle-ci. Tous les messages sont protégés par un chiffrement de bout en bout.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Pourquoi n&apos;acceptez-vous que le Monero?</AccordionTrigger>
                        <AccordionContent>
                          Le Monero (XMR) est la seule cryptomonnaie qui offre un anonymat complet des transactions. Contrairement à Bitcoin et d&apos;autres cryptomonnaies dont les transactions sont publiques, Monero masque l&apos;expéditeur, le destinataire et le montant. C&apos;est le seul moyen de paiement qui garantit véritablement votre anonymat financier.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Conservez-vous des données sur les utilisateurs?</AccordionTrigger>
                        <AccordionContent>
                          Nous ne conservons que le strict minimum nécessaire au fonctionnement du service. Nous n&apos;enregistrons pas d&apos;adresses IP, de métadonnées des emails, ou d&apos;informations personnelles. Les emails sont chiffrés et ne sont stockés que temporairement pendant leur transfert. Nous appliquons une politique stricte de non-conservation des données.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4">
                        <AccordionTrigger>Comment puis-je être sûr que mon anonymat est préservé?</AccordionTrigger>
                        <AccordionContent>
                          Notre service est conçu avec l&apos;anonymat comme priorité absolue. Nous recommandons d&apos;utiliser Tor Browser pour accéder à Alyosha, de payer exclusivement en Monero, et de ne jamais lier votre adresse Alyosha à votre identité réelle. Notre infrastructure est conçue pour que même nous ne puissions pas associer votre véritable identité à votre usage du service.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-5">
                        <AccordionTrigger>Comment vous contacter en cas de problème?</AccordionTrigger>
                        <AccordionContent>
                          Vous pouvez nous contacter en utilisant notre clé PGP pour chiffrer vos messages ou via notre canal Telegram. Pour des communications particulièrement sensibles, nous recommandons d&apos;utiliser PGP. Notre clé publique est disponible dans la section Sécurité de notre site.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="guides" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Guides d&apos;utilisation</CardTitle>
                    <CardDescription>
                      Apprenez à utiliser toutes les fonctionnalités d&apos;Alyosha.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Débuter avec Alyosha</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li className="text-muted-foreground">
                          <Link href="#" className="text-primary hover:underline">
                            Comment créer votre première adresse anonyme
                          </Link>
                        </li>
                        <li className="text-muted-foreground">
                          <Link href="#" className="text-primary hover:underline">
                            Configurer la redirection vers votre email principal
                          </Link>
                        </li>
                        <li className="text-muted-foreground">
                          <Link href="#" className="text-primary hover:underline">
                            Envoyer et recevoir des emails anonymement
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Fonctionnalités avancées</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li className="text-muted-foreground">
                          <Link href="#" className="text-primary hover:underline">
                            Utiliser le chiffrement PGP avec Alyosha
                          </Link>
                        </li>
                        <li className="text-muted-foreground">
                          <Link href="#" className="text-primary hover:underline">
                            Gérer plusieurs adresses anonymes
                          </Link>
                        </li>
                        <li className="text-muted-foreground">
                          <Link href="#" className="text-primary hover:underline">
                            Configurer des filtres anti-spam personnalisés
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Gestion de compte</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li className="text-muted-foreground">
                          <Link href="#" className="text-primary hover:underline">
                            Payer votre abonnement en Monero
                          </Link>
                        </li>
                        <li className="text-muted-foreground">
                          <Link href="#" className="text-primary hover:underline">
                            Changer de plan d&apos;abonnement
                          </Link>
                        </li>
                        <li className="text-muted-foreground">
                          <Link href="#" className="text-primary hover:underline">
                            Paramètres de sécurité recommandés
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="securite" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Guide de sécurité</CardTitle>
                    <CardDescription>
                      Meilleures pratiques pour maintenir votre anonymat et protéger vos communications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Principes de base</h3>
                      <p className="text-muted-foreground">
                        Pour maintenir votre anonymat, suivez ces principes fondamentaux:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li className="text-muted-foreground">Utilisez toujours Tor Browser pour accéder à Alyosha</li>
                        <li className="text-muted-foreground">Ne partagez jamais votre véritable identité ou localisation</li>
                        <li className="text-muted-foreground">N&apos;utilisez pas la même adresse anonyme pour différents contextes</li>
                        <li className="text-muted-foreground">Évitez de mentionner des détails personnels identifiables dans vos emails</li>
                        <li className="text-muted-foreground">Utilisez un mot de passe unique et fort pour votre compte Alyosha</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Notre clé PGP</h3>
                      <p className="text-muted-foreground">
                        Pour une communication sécurisée avec notre équipe, utilisez notre clé PGP publique:
                      </p>
                      <div className="bg-muted p-4 rounded-md overflow-auto">
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
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Ressources supplémentaires</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li className="text-muted-foreground">
                          <Link href="https://www.torproject.org/" target="_blank" className="text-primary hover:underline">
                            Tor Project - Navigateur anonyme
                          </Link>
                        </li>
                        <li className="text-muted-foreground">
                          <Link href="https://www.getmonero.org/" target="_blank" className="text-primary hover:underline">
                            Monero - Cryptomonnaie privée
                          </Link>
                        </li>
                        <li className="text-muted-foreground">
                          <Link href="https://www.openpgp.org/" target="_blank" className="text-primary hover:underline">
                            OpenPGP - Chiffrement des emails
                          </Link>
                        </li>
                        <li className="text-muted-foreground">
                          <Link href="https://www.eff.org/surveillance-self-defense" target="_blank" className="text-primary hover:underline">
                            EFF - Guide d&apos;autodéfense contre la surveillance
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="legal" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Documents légaux</CardTitle>
                    <CardDescription>
                      Documents légaux et informations réglementaires concernant notre service.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div id="conditions" className="space-y-4">
                      <h3 className="text-xl font-semibold">Conditions d&apos;utilisation</h3>
                      <p className="text-muted-foreground">
                        En utilisant Alyosha, vous acceptez les conditions suivantes:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Vous êtes responsable de l&apos;utilisation légale du service</li>
                        <li>Alyosha n&apos;assume aucune responsabilité pour le contenu des communications</li>
                        <li>Le service est fourni "tel quel" sans garantie</li>
                        <li>Nous nous réservons le droit de résilier les comptes utilisés pour des activités illégales</li>
                        <li>Le paiement n&apos;est pas remboursable sauf en cas d&apos;interruption prolongée du service</li>
                      </ul>
                      <p className="text-muted-foreground">
                        Consultez notre document complet des conditions d&apos;utilisation pour plus de détails.
                      </p>
                    </div>
                    
                    <div id="confidentialite" className="space-y-4">
                      <h3 className="text-xl font-semibold">Politique de confidentialité</h3>
                      <p className="text-muted-foreground">
                        Nous sommes dédiés à la protection de votre vie privée:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Aucune donnée personnelle identifiable n&apos;est collectée ou stockée</li>
                        <li>Nous ne surveillons pas le contenu des communications</li>
                        <li>Nous n&apos;enregistrons pas les adresses IP ni les métadonnées de connexion</li>
                        <li>Les paiements en Monero garantissent l&apos;anonymat financier complet</li>
                        <li>Nous n&apos;utilisons pas de cookies de suivi ni d&apos;outils d&apos;analyse</li>
                      </ul>
                      <p className="text-muted-foreground">
                        Consultez notre politique de confidentialité complète pour comprendre comment nous protégeons vos données.
                      </p>
                    </div>
                    
                    <div id="legal" className="space-y-4">
                      <h3 className="text-xl font-semibold">Conformité légale</h3>
                      <p className="text-muted-foreground">
                        Alyosha est conçu pour respecter la vie privée tout en respectant les lois applicables:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Nous interdisons l&apos;utilisation du service pour des activités illégales</li>
                        <li>Nous ne collaborons avec aucune agence gouvernementale pour la surveillance</li>
                        <li>Nous ne pouvons pas fournir ce que nous ne stockons pas</li>
                        <li>Notre infrastructure est conçue pour minimiser les données collectables</li>
                        <li>Nous ne répondons aux injonctions légales que dans le cadre strict de nos possibilités techniques</li>
                      </ul>
                      <p className="text-muted-foreground">
                        Pour toute question juridique, veuillez nous contacter via notre page de contact en utilisant notre clé PGP.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-6">
              <p className="text-muted-foreground">
                Vous ne trouvez pas ce que vous cherchez?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contactez-nous
                </Link>{" "}
                en utilisant notre clé PGP pour une communication sécurisée.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 