import { 
  Shield, 
  Mail, 
  Lock, 
  UserX, 
  Banknote, 
  Clock 
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Cryptage de Bout en Bout",
      description: "Toutes vos communications sont cryptées, garantissant une confidentialité totale et une protection contre les interceptions."
    },
    {
      icon: <Mail className="h-10 w-10 text-primary" />,
      title: "Transfert d'Email Anonyme",
      description: "Recevez et envoyez des emails sans révéler votre véritable adresse, préservant votre anonymat en ligne."
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Aucune Conservation de Données",
      description: "Nous ne conservons aucune donnée personnelle ou métadonnée qui pourrait compromettre votre vie privée."
    },
    {
      icon: <UserX className="h-10 w-10 text-primary" />,
      title: "Aucune Information Personnelle",
      description: "Pas besoin de fournir des informations personnelles pour utiliser notre service, assurant un anonymat complet."
    },
    {
      icon: <Banknote className="h-10 w-10 text-primary" />,
      title: "Paiement Anonyme",
      description: "Nous acceptons uniquement Monero comme méthode de paiement pour garantir une confidentialité financière totale."
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Accès Permanent",
      description: "Une fois inscrit, accédez à votre compte de façon sécurisée depuis n'importe où, à tout moment."
    }
  ];

  return (
    <section id="features" className="section bg-background">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-primary text-glow">
            Fonctionnalités
          </h2>
          <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
            Découvrez pourquoi Alyosha est le choix optimal pour vos communications sécurisées
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-card rounded-lg p-6 border border-border flex flex-col items-center text-center">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 