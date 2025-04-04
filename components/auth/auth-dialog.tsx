"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from './login-form';
import RegisterForm from './register-form';
import ResetPasswordForm from './reset-password-form';

type AuthDialogProps = {
  buttonText?: string;
  className?: string;
};

export default function AuthDialog({ buttonText = "Se connecter", className }: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register" | "reset">("login");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-primary text-glow">
            {activeTab === "login" && "Connexion"}
            {activeTab === "register" && "Créer un compte"}
            {activeTab === "reset" && "Réinitialiser le mot de passe"}
          </DialogTitle>
        </DialogHeader>
        
        {activeTab === "login" || activeTab === "register" ? (
          <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register" | "reset")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm onForgotPassword={() => setActiveTab("reset")} onSuccess={() => setOpen(false)} />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm onSuccess={() => setOpen(false)} />
            </TabsContent>
          </Tabs>
        ) : (
          <ResetPasswordForm 
            onCancel={() => setActiveTab("login")}
            onSuccess={() => {
              setActiveTab("login");
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
} 