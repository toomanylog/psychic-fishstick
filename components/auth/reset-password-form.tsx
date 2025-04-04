"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

type ResetPasswordFormProps = {
  onCancel: () => void;
  onSuccess: () => void;
};

export default function ResetPasswordForm({ onCancel, onSuccess }: ResetPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);
    
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="reset-email">Email</Label>
        <Input 
          id="reset-email" 
          type="email" 
          placeholder="votre@email.com" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      
      {error && (
        <div className="text-sm text-destructive">{error}</div>
      )}
      
      {success && (
        <div className="text-sm text-green-500">
          Un email de réinitialisation a été envoyé. Veuillez vérifier votre boîte de réception.
        </div>
      )}
      
      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline"
          className="flex-1"
          onClick={onCancel}
        >
          Retour
        </Button>
        <Button 
          type="submit" 
          className="flex-1"
          disabled={loading || success}
        >
          {loading ? 'Envoi...' : 'Réinitialiser'}
        </Button>
      </div>
    </form>
  );
} 