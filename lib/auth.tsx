"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const getUserName = (user: User | null) => {
  if (!user) return 'Utilisateur';
  return user.displayName || user.email?.split('@')[0] || 'Utilisateur';
};

// Verification si l'utilisateur est authentifie
export const isAuthenticated = (user: User | null) => {
  return !!user;
};

// Verification si l'utilisateur est administrateur 
export const isAdmin = (user: User | null) => {
  // Implementation basique: verifiez si l'email correspond a un pattern
  if (!user) return false;
  return user.email?.endsWith('@alyosha.xyz') || false;
}; 