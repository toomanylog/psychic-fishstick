import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AuthDialog from '@/components/auth/auth-dialog';

export default function Hero() {
  return (
    <section className="bg-header min-h-screen pt-32 pb-16 flex flex-col justify-center">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-primary text-glow animate-pulse-slow">
              Alyosha
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Service de messagerie anonyme et sécurisé
            </p>
          </div>
          <div className="max-w-[700px] space-y-4 mx-auto">
            <p className="text-muted-foreground">
              Notre service de transfert d&apos;emails préserve votre confidentialité grâce à un chiffrement de bout en bout.
              Aucune trace, aucun suivi, juste une communication sécurisée et privée.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <AuthDialog buttonText="Créer un compte" className="sm:w-auto w-full" />
              <Link href="#features">
                <Button variant="outline" className="sm:w-auto w-full">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">Anonymat Total</h3>
            <p className="text-muted-foreground">Aucune information personnelle requise pour utiliser notre service.</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">Paiement en Monero</h3>
            <p className="text-muted-foreground">Paiement en Monero exclusivement pour une confidentialité maximale.</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">Chiffrement Avancé</h3>
            <p className="text-muted-foreground">Toutes les communications sont protégées par un chiffrement de bout en bout.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 