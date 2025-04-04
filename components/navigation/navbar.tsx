"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import AuthDialog from '@/components/auth/auth-dialog';
import { onAuthStateChanged } from 'firebase/auth';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, HelpCircle, Mail } from 'lucide-react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUsername(user.displayName || 'Utilisateur');
      } else {
        setIsLoggedIn(false);
        setUsername('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMenuOpen(false);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 pl-2 md:pl-0">
          <Link href="/" className="flex items-center text-xl font-bold text-primary text-glow">
            Alyosha
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <Link href="/#features" className="text-foreground/70 hover:text-foreground">
            Fonctionnalités
          </Link>
          <Link href="/#pricing" className="text-foreground/70 hover:text-foreground">
            Tarifs
          </Link>
          <Link href="/#security" className="text-foreground/70 hover:text-foreground">
            Sécurité
          </Link>
          <Link href="/#faq" className="text-foreground/70 hover:text-foreground">
            FAQ
          </Link>
          <Link href="/aide" className="text-foreground/70 hover:text-foreground">
            Aide
          </Link>
          <Link href="/contact" className="text-foreground/70 hover:text-foreground">
            Contact
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground"
              >
                <User className="h-4 w-4" />
                <span>{username}</span>
              </Link>
              <Button variant="outline" onClick={handleLogout} size="sm">
                Déconnexion
              </Button>
            </div>
          ) : (
            <AuthDialog />
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 py-4">
                <Link 
                  href="/#features" 
                  className="text-foreground/70 hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  Fonctionnalités
                </Link>
                <Link 
                  href="/#pricing" 
                  className="text-foreground/70 hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  Tarifs
                </Link>
                <Link 
                  href="/#security" 
                  className="text-foreground/70 hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  Sécurité
                </Link>
                <Link 
                  href="/#faq" 
                  className="text-foreground/70 hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link 
                  href="/aide" 
                  className="flex items-center gap-2 text-foreground/70 hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  <HelpCircle className="h-4 w-4" />
                  Aide
                </Link>
                <Link 
                  href="/contact" 
                  className="flex items-center gap-2 text-foreground/70 hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </Link>

                {isLoggedIn ? (
                  <div className="flex flex-col gap-2 pt-4 border-t border-border">
                    <Link 
                      href="/dashboard" 
                      className="flex items-center gap-2 text-foreground/70 hover:text-foreground"
                      onClick={() => setMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Mon compte
                    </Link>
                    <Button variant="outline" onClick={handleLogout}>
                      Déconnexion
                    </Button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-border">
                    <AuthDialog buttonText="Se connecter" className="w-full" />
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
} 