"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { useAuth, getUserName } from "../../lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Shield, 
  User as UserIcon, 
  Settings, 
  CreditCard, 
  AlertCircle,
  Inbox,
  Send,
  Copy,
  RefreshCw,
  WifiOff
} from "lucide-react";
import { ref, get, set, query, orderByChild, equalTo, onValue, off } from "firebase/database";
import { database } from "../../lib/firebase";
import { toast } from "../../components/ui/use-toast";
import { initializeDatabase, checkDatabaseConnection } from "../../lib/initDatabase";

type UserStats = {
  emailsReceived: number;
  emailsSent: number;
  storageUsed: string;
  storageUsedBytes: number;
  plan: string;
  addressCount: number;
  paymentStatus: 'paid' | 'pending' | 'none';
};

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<UserStats>({
    emailsReceived: 0,
    emailsSent: 0,
    storageUsed: "0 MB",
    storageUsedBytes: 0,
    plan: "Aucun",
    addressCount: 0,
    paymentStatus: 'none'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [databaseReady, setDatabaseReady] = useState(false);
  const [paymentAddress, setPaymentAddress] = useState("");
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  // Vérifier la connexion à la Realtime Database
  useEffect(() => {
    async function checkConnection() {
      try {
        // Utiliser la fonction checkDatabaseConnection qui utilise .info/connected
        const isConnected = await checkDatabaseConnection();
        
        if (isConnected) {
          setDatabaseReady(true);
        } else {
          setLoadError("Impossible de se connecter à la base de données. Veuillez réessayer plus tard.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de connexion:", error);
        setLoadError("Impossible de se connecter à la base de données. Veuillez réessayer plus tard.");
        setIsLoading(false);
      }
    }
    
    checkConnection();
  }, []);

  useEffect(() => {
    // Rediriger vers la page d'accueil si l'utilisateur n'est pas connecté
    if (!loading && !user) {
      router.push("/");
    }

    const fetchUserData = async () => {
      if (!user || !databaseReady) return;
      
      try {
        // Initialiser la Database pour cet utilisateur
        if (user.uid) {
          await initializeDatabase(user.uid);
        } else {
          throw new Error("Aucun ID utilisateur trouvé");
        }
        
        // Récupérer les données utilisateur depuis la base de données
        const userRef = ref(database, `users/${user.uid}`);
        const userSnapshot = await get(userRef);
        
        let userData = {};
        
        if (userSnapshot.exists()) {
          userData = userSnapshot.val();
        } else {
          // Créer un document utilisateur s'il n'existe pas
          const newUserData = {
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0] || 'Utilisateur',
            createdAt: new Date().toISOString(),
            storageUsed: 0,
            plan: "Gratuit",
            paymentStatus: 'none' as const
          };
          
          await set(userRef, newUserData);
          userData = newUserData;
        }
        
        // Récupérer les statistiques
        const numEmailsReceived = await fetchReceivedEmails();
        const numEmailsSent = await fetchSentEmails();
        const numAddresses = await fetchAddresses();
        
        // Calculer le stockage utilisé
        const storageUsedBytes = (userData as any).storageUsed || 0;
        const storageUsed = formatStorage(storageUsedBytes);
        
        setStats({
          emailsReceived: numEmailsReceived,
          emailsSent: numEmailsSent,
          storageUsed,
          storageUsedBytes,
          plan: (userData as any).plan || "Gratuit",
          addressCount: numAddresses,
          paymentStatus: (userData as any).paymentStatus || 'none'
        });
        
        setPaymentAddress((userData as any).paymentAddress || "");
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setLoadError("Une erreur est survenue lors du chargement de vos données. Veuillez réessayer.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user && databaseReady) {
      fetchUserData();
    }
  }, [user, loading, router, databaseReady]);

  // Récupération des emails reçus
  const fetchReceivedEmails = async (): Promise<number> => {
    if (!user) return 0;
    
    try {
      const emailsRef = ref(database, `emails/${user.uid}`);
      const emailsSnapshot = await get(emailsRef);
      
      if (emailsSnapshot.exists()) {
        const emails = emailsSnapshot.val();
        // Compter tous les emails sauf la structure d'initialisation
        const count = Object.keys(emails).filter(key => key !== 'createdAt' && key !== 'userId').length;
        return count;
      }
      return 0;
    } catch (error) {
      console.error("Erreur lors de la récupération des emails reçus:", error);
      return 0;
    }
  };

  // Récupération des emails envoyés
  const fetchSentEmails = async (): Promise<number> => {
    if (!user) return 0;
    
    try {
      // En production, nous utilisons un compteur dans le document utilisateur
      // pour éviter de charger tous les emails
      const userRef = ref(database, `users/${user.uid}`);
      const userSnapshot = await get(userRef);
      
      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        // Utiliser le compteur d'emails envoyés s'il existe
        if (userData.sentEmailsCount !== undefined) {
          return userData.sentEmailsCount;
        }
      }
      
      // Sinon, récupérer depuis le nœud emails
      const emailsRef = ref(database, `emails/${user.uid}`);
      const emailsSnapshot = await get(emailsRef);
      
      if (emailsSnapshot.exists()) {
        const emails = emailsSnapshot.val();
        // Compter les emails avec l'attribut sent=true
        const sentEmails = Object.values(emails).filter((email: any) => 
          email.sent === true
        );
        
        return sentEmails.length;
      }
      return 0;
    } catch (error) {
      console.error("Erreur lors de la récupération des emails envoyés:", error);
      return 0;
    }
  };

  // Récupération des adresses
  const fetchAddresses = async (): Promise<number> => {
    if (!user) return 0;
    
    try {
      const addressesRef = ref(database, `addresses/${user.uid}`);
      const addressesSnapshot = await get(addressesRef);
      
      if (addressesSnapshot.exists()) {
        const addresses = addressesSnapshot.val();
        // Compter toutes les adresses sauf la structure d'initialisation
        const count = Object.keys(addresses).filter(key => key !== 'createdAt' && key !== 'userId').length;
        return count;
      }
      return 0;
    } catch (error) {
      console.error("Erreur lors de la récupération des adresses:", error);
      return 0;
    }
  };

  const formatStorage = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(paymentAddress);
    toast({
      title: "Adresse copiée",
      description: "L'adresse de paiement a été copiée dans le presse-papiers."
    });
  };

  const createPaymentRequest = async (plan: string) => {
    try {
      setSelectedPlan(plan);
      setIsLoading(true);
      
      if (!user) {
        throw new Error("Vous devez être connecté pour effectuer cette action");
      }
      
      // Obtenir le token d'authentification
      const token = await user.getIdToken();
      if (!token) {
        throw new Error("Vous devez être connecté pour effectuer cette action");
      }
      
      // Appeler l'API de création de paiement
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ plan })
      });
      
      if (!response.ok) {
        let errorMessage = "Erreur lors de la création du paiement";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          console.error("Erreur de parsing JSON dans la réponse d'erreur:", parseError);
        }
        throw new Error(errorMessage);
      }
      
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Erreur de parsing JSON dans la réponse:", parseError);
        throw new Error("Format de réponse invalide du serveur");
      }
      
      // Mettre à jour les données locales
      setPaymentAddress(data.paymentAddress);
      setStats(prev => ({
        ...prev,
        paymentStatus: 'pending'
      }));
      
      // Mettre à jour l'état de l'utilisateur dans la base de données
      const userRef = ref(database, `users/${user.uid}`);
      const userSnapshot = await get(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        await set(userRef, {
          ...userData,
          paymentStatus: 'pending',
          paymentAddress: data.paymentAddress,
          paymentAmount: data.paymentAmount,
          paymentPlan: plan,
          paymentId: data.paymentId,
          paymentCreatedAt: new Date().toISOString()
        });
      }
      
      toast({
        title: "Paiement créé",
        description: `Veuillez envoyer ${data.paymentAmount} XMR à l'adresse indiquée.`
      });
    } catch (error) {
      console.error("Erreur lors de la création de la demande de paiement:", error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPayment = async () => {
    try {
      setCheckingPayment(true);
      
      if (!user) {
        throw new Error("Vous devez être connecté pour effectuer cette action");
      }
      
      // Obtenir le token d'authentification
      const token = await user.getIdToken();
      if (!token) {
        throw new Error("Vous devez être connecté pour effectuer cette action");
      }
      
      // Appeler l'API de vérification de paiement
      const response = await fetch('/api/payment/verify', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        let errorMessage = "Erreur lors de la vérification du paiement";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          console.error("Erreur de parsing JSON dans la réponse d'erreur:", parseError);
        }
        throw new Error(errorMessage);
      }
      
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Erreur de parsing JSON dans la réponse:", parseError);
        throw new Error("Format de réponse invalide du serveur");
      }
      
      if (data.paymentStatus === 'paid') {
        toast({
          title: "Paiement confirmé",
          description: `Votre abonnement au plan ${data.plan} est actif.`
        });
        
        // Mettre à jour les données locales
        setStats(prev => ({
          ...prev,
          paymentStatus: 'paid',
          plan: data.plan
        }));
        
        // Mettre à jour l'état de l'utilisateur dans la base de données
        try {
          const userRef = ref(database, `users/${user.uid}`);
          const userSnapshot = await get(userRef);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            await set(userRef, {
              ...userData,
              paymentStatus: 'paid',
              plan: data.plan,
              paymentCompletedAt: new Date().toISOString()
            });
          }
        } catch (dbError) {
          console.error("Erreur lors de la mise à jour des données utilisateur:", dbError);
        }
      } else if (data.paymentStatus === 'pending') {
        toast({
          title: "Paiement en attente",
          description: `Statut actuel: ${data.currentStatus}. Veuillez patienter.`
        });
      } else {
        toast({
          title: "Aucun paiement",
          description: "Aucun paiement en cours n'a été trouvé."
        });
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du paiement:", error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue"
      });
    } finally {
      setCheckingPayment(false);
    }
  };

  const refreshDashboard = async () => {
    setIsLoading(true);
    setLoadError(null);
    
    try {
      // Utiliser la fonction checkDatabaseConnection pour vérifier la connexion
      const isConnected = await checkDatabaseConnection();
      
      if (isConnected) {
        setDatabaseReady(true);
        // La réexécution du useEffect se fera automatiquement
      } else {
        setLoadError("Impossible de se connecter à la base de données. Veuillez réessayer plus tard.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de la connexion:", error);
      setLoadError("Impossible de se connecter à la base de données. Veuillez réessayer plus tard.");
      setIsLoading(false);
    }
  };

  if (loading || (isLoading && !loadError)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin w-8 h-8 rounded-full border-4 border-primary border-t-transparent mb-4"></div>
          <div className="text-primary">Chargement de vos données...</div>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center max-w-md text-center">
          <WifiOff className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-xl font-bold mb-2">Erreur de connexion</h2>
          <p className="text-muted-foreground mb-6">{loadError}</p>
          <Button onClick={refreshDashboard}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // La redirection se fera dans useEffect
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Tableau de bord
            </h1>
            <p className="text-muted-foreground">
              Bienvenue, {getUserName(user)}! Gérez vos emails anonymes et vos paramètres de sécurité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Emails reçus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Inbox className="text-primary h-5 w-5" />
                  <div className="text-2xl font-bold">{stats.emailsReceived}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Emails envoyés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Send className="text-primary h-5 w-5" />
                  <div className="text-2xl font-bold">{stats.emailsSent}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Stockage utilisé</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold">{stats.storageUsed}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Plan actuel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Shield className="text-primary h-5 w-5" />
                  <div className="text-2xl font-bold">{stats.plan}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="emails" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-4 md:grid-cols-4">
              <TabsTrigger value="emails">Emails</TabsTrigger>
              <TabsTrigger value="addresses">Adresses</TabsTrigger>
              <TabsTrigger value="account">Compte</TabsTrigger>
              <TabsTrigger value="payment">Paiement</TabsTrigger>
            </TabsList>
            <TabsContent value="emails" className="p-0 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vos emails</CardTitle>
                  <CardDescription>
                    Gérez vos emails entrants et sortants.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {stats.emailsReceived === 0 ? (
                    <div className="text-center py-12">
                      <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Votre boîte de réception est vide</h3>
                      <p className="text-muted-foreground mb-4">
                        Commencez à utiliser votre nouvelle adresse email anonyme pour recevoir des messages.
                      </p>
                      <Button>Configurer une redirection</Button>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p>Liste des emails à implémenter</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="addresses" className="p-0 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vos adresses anonymes</CardTitle>
                  <CardDescription>
                    Gérez vos adresses email anonymes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {stats.addressCount === 0 ? (
                    <div className="text-center py-12">
                      <UserIcon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Aucune adresse configurée</h3>
                      <p className="text-muted-foreground mb-4">
                        Créez votre première adresse email anonyme pour commencer à protéger votre vie privée.
                      </p>
                      <Button>Créer une adresse</Button>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p>Liste des adresses à implémenter</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="account" className="p-0 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres du compte</CardTitle>
                  <CardDescription>
                    Gérez vos paramètres de sécurité et vos préférences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Informations personnelles</h3>
                    <p className="text-muted-foreground text-sm">
                      Ces informations ne sont jamais partagées avec des tiers.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Nom d'utilisateur</p>
                        <p className="text-muted-foreground">{user.displayName || "Non défini"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Email de récupération</p>
                        <p className="text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Sécurité</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <Button variant="outline" className="justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Changer de mot de passe
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Shield className="h-4 w-4 mr-2" />
                        Activer l'authentification à deux facteurs
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payment" className="p-0 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Paiement et facturation</CardTitle>
                  <CardDescription>
                    Gérez vos informations de paiement et votre abonnement.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {stats.paymentStatus === 'paid' ? (
                    <div className="text-center py-12">
                      <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Abonnement actif</h3>
                      <p className="text-muted-foreground mb-4">
                        Vous êtes actuellement abonné au plan {stats.plan}.
                      </p>
                      <Button onClick={() => setStats(prev => ({ ...prev, paymentStatus: 'none' }))}>
                        Mettre à niveau
                      </Button>
                    </div>
                  ) : stats.paymentStatus === 'pending' ? (
                    <div className="text-center py-12">
                      <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Paiement en attente</h3>
                      <p className="text-muted-foreground mb-4">
                        Pour compléter votre abonnement, veuillez envoyer le montant exact de Monero (XMR) à l'adresse suivante:
                      </p>
                      <div className="bg-muted p-4 rounded-md mb-4 max-w-md mx-auto">
                        <p className="text-sm font-mono break-all">
                          {paymentAddress || "Adresse de paiement en cours de génération..."}
                        </p>
                      </div>
                      <div className="flex justify-center space-x-2">
                        <Button onClick={verifyPayment} disabled={checkingPayment}>
                          {checkingPayment ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                              Vérification...
                            </>
                          ) : (
                            "Vérifier le paiement"
                          )}
                        </Button>
                        <Button variant="outline" onClick={handleCopyAddress}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copier l'adresse
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Aucun abonnement actif</h3>
                      <p className="text-muted-foreground mb-4">
                        Pour accéder à toutes les fonctionnalités d'Alyosha, veuillez choisir un plan d'abonnement.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <Button 
                          onClick={() => createPaymentRequest('Standard')} 
                          disabled={isLoading || selectedPlan === 'Standard'}
                        >
                          {isLoading && selectedPlan === 'Standard' ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                              Traitement...
                            </>
                          ) : (
                            "Plan Standard - 0.01 XMR"
                          )}
                        </Button>
                        <Button 
                          onClick={() => createPaymentRequest('Premium')} 
                          disabled={isLoading || selectedPlan === 'Premium'}
                        >
                          {isLoading && selectedPlan === 'Premium' ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                              Traitement...
                            </>
                          ) : (
                            "Plan Premium - 0.05 XMR"
                          )}
                        </Button>
                        <Button 
                          onClick={() => createPaymentRequest('Entreprise')} 
                          disabled={isLoading || selectedPlan === 'Entreprise'}
                        >
                          {isLoading && selectedPlan === 'Entreprise' ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                              Traitement...
                            </>
                          ) : (
                            "Plan Entreprise - 0.1 XMR"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-primary" /> 
                Rappel de sécurité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Pour une sécurité optimale, connectez-vous toujours via Tor Browser et n'utilisez pas votre adresse Alyosha pour des services liés à votre identité réelle.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
} 