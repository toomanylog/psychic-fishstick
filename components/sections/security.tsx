import { 
  ShieldCheck, 
  Eye, 
  UserX2, 
  RefreshCcw 
} from 'lucide-react';
import Link from 'next/link';

export default function Security() {
  const securityFeatures = [
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "Chiffrement Militaire",
      description: "Nous utilisons un chiffrement de niveau militaire pour protéger toutes vos communications, rendant impossible toute interception."
    },
    {
      icon: <Eye className="h-10 w-10 text-primary" />,
      title: "Sans Journalisation",
      description: "Aucune journalisation des activités ou des métadonnées. Ce qui n'est pas enregistré ne peut pas être compromis."
    },
    {
      icon: <UserX2 className="h-10 w-10 text-primary" />,
      title: "Anonymat Total",
      description: "Aucune information personnelle requise, utilisez notre service en restant complètement anonyme."
    },
    {
      icon: <RefreshCcw className="h-10 w-10 text-primary" />,
      title: "Rotation des Clés",
      description: "Rotation régulière des clés de chiffrement pour assurer une sécurité maximale."
    }
  ];

  return (
    <section id="security" className="section bg-background">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-primary text-glow">
            Sécurité Inégalée
          </h2>
          <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
            La confidentialité n&apos;est pas une option, c&apos;est notre priorité absolue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 bg-card rounded-lg border border-border max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Notre Engagement PGP</h3>
              <p className="text-muted-foreground mb-4">
                Pour assurer un niveau de sécurité maximal, nous utilisons le chiffrement PGP (Pretty Good Privacy) pour toutes les communications.
              </p>
              <p className="text-muted-foreground">
                Contactez-nous en utilisant notre clé PGP publique pour des communications sécurisées:
              </p>
            </div>
            <div className="bg-muted/50 p-4 rounded-md overflow-auto">
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
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pour discuter de tout sujet sensible, contactez-nous via Telegram: <Link href="/contact" className="text-primary hover:underline">@AlyoshaService</Link> 
          </p>
        </div>
      </div>
    </section>
  );
} 