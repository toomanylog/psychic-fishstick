"use client";

import React from 'react';
import Navbar from '@/components/navigation/navbar';
import Footer from '@/components/sections/footer';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return null; // La redirection se fera dans useEffect
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
} 