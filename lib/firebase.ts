import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator, Database, ref, DataSnapshot, onValue, off } from 'firebase/database';

// Configuration Firebase avec validation des variables d'environnement
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Vérifier que l'URL de la Realtime Database est définie
if (!firebaseConfig.databaseURL) {
  console.error("ERREUR: L'URL de la Realtime Database n'est pas définie dans les variables d'environnement.");
  console.error("Assurez-vous que NEXT_PUBLIC_FIREBASE_DATABASE_URL est correctement configuré dans .env.local");
}

// Initialiser l'application Firebase une seule fois
let app: FirebaseApp;
let auth: Auth;
let database: Database;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    database = getDatabase(app);
    
    // Log de confirmation
    console.log("Firebase initialisé avec succès");
    console.log("Connexion à la Realtime Database:", firebaseConfig.databaseURL);
    
    // Connecter à l'émulateur si en environnement de développement
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
      connectDatabaseEmulator(database, 'localhost', 9000);
      console.log("Connecté à l'émulateur de Realtime Database");
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation de Firebase:", error);
    throw error;
  }
} else {
  app = getApps()[0];
  auth = getAuth(app);
  database = getDatabase(app);
}

export { app, auth, database };

// Fonction utilitaire pour vérifier la connexion à la base de données
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    const testRef = ref(database, '.info/connected');
    return new Promise<boolean>((resolve) => {
      const handleValue = (snapshot: DataSnapshot) => {
        off(testRef);
        resolve(snapshot.val() === true);
      };
      
      onValue(testRef, handleValue);
      
      // Définir un timeout au cas où la connexion ne s'établit pas
      setTimeout(() => {
        off(testRef);
        resolve(false);
      }, 10000); // 10 secondes de timeout
    });
  } catch (error) {
    console.error("Erreur lors de la vérification de la connexion:", error);
    return false;
  }
}; 