import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AuthDialog from '@/components/auth/auth-dialog';
import Link from 'next/link';

export default function Pricing() {
  const plans = [
    {
      name: "Débutant",
      price: "0.1 XMR",
      description: "Pour les utilisateurs occasionnels",
      features: [
        "1 adresse email anonyme",
        "100 emails par mois",
        "Cryptage de bout en bout",
        "Support basique",
        "Stockage de 1 Go"
      ],
      popular: false
    },
    {
      name: "Standard",
      price: "0.3 XMR",
      description: "Pour une utilisation régulière",
      features: [
        "3 adresses email anonymes",
        "Emails illimités",
        "Cryptage de bout en bout",
        "Support prioritaire",
        "Stockage de 5 Go",
        "Filtres anti-spam avancés"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "0.5 XMR",
      description: "Pour les professionnels de la confidentialité",
      features: [
        "10 adresses email anonymes",
        "Emails illimités",
        "Cryptage de niveau militaire",
        "Support 24/7",
        "Stockage de 20 Go",
        "Filtres anti-spam avancés",
        "Domaines personnalisés"
      ],
      popular: false
    }
  ];
  
  return (
    <section id="pricing" className="section bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-primary text-glow">
            Choisissez votre plan
          </h2>
          <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
            Des options flexibles pour tous les besoins avec paiement exclusivement en Monero
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg shadow-primary/20 relative' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                    Le plus populaire
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="mt-4 mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/ mois</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <AuthDialog 
                  buttonText={`Choisir ce plan`}
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90 text-white' : ''}`}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tous les plans incluent la sécurité fondamentale d&apos;Alyosha : anonymat total, aucune conservation des données et cryptage de bout en bout.
          </p>
        </div>
      </div>
    </section>
  );
} 