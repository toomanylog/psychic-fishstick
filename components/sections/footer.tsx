import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-primary text-glow">Alyosha</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Service de transfert d&apos;emails anonyme et sécurisé. Protégez votre vie privée en ligne avec notre technologie de chiffrement de pointe.
            </p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Alyosha. Tous droits réservés.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-foreground">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-muted-foreground hover:text-foreground">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/#security" className="text-muted-foreground hover:text-foreground">
                  Sécurité
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/aide" className="text-muted-foreground hover:text-foreground">
                  Aide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/conditions" className="text-muted-foreground hover:text-foreground">
                  Conditions d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-muted-foreground hover:text-foreground">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/conformite" className="text-muted-foreground hover:text-foreground">
                  Conformité légale
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            Alyosha est dédié à la protection de votre vie privée. Nous ne collectons aucune information personnelle.
          </p>
          <p className="mt-4">
            <Link href="/" className="hover:text-primary">alyosha.xyz</Link>
          </p>
        </div>
      </div>
    </footer>
  );
} 