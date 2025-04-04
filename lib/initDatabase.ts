import { database } from "./firebase";
import { ref, set, get, onValue } from "firebase/database";

/**
 * Vérifie la connexion à la base de données Firebase
 * 
 * @returns Promise<boolean> - true si la connexion fonctionne, false sinon
 */
export const checkDatabaseConnection = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Utiliser un flag pour éviter les résolutions multiples
    let resolved = false;
    
    // Définir un timeout pour éviter d'attendre indéfiniment
    const timeoutId = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        console.error('Timeout lors de la vérification de connexion Firebase');
        resolve(false);
      }
    }, 5000);
    
    try {
      // Accéder à .info/connected
      const connectedRef = ref(database, '.info/connected');
      
      // Utiliser un listener qui ne se désabonne pas immédiatement
      const unsubscribe = onValue(connectedRef, (snapshot) => {
        // Vérifier que nous n'avons pas déjà résolu la promesse
        if (!resolved) {
          resolved = true;
          
          // Nettoyer le timeout
          clearTimeout(timeoutId);
          
          // Récupérer la valeur de connexion
          const connected = snapshot.val() === true;
          
          if (connected) {
            console.log('Connexion Firebase établie');
          } else {
            console.error('Impossible de se connecter à Firebase');
          }
          
          // Se désabonner APRÈS avoir résolu
          setTimeout(() => {
            try {
              unsubscribe();
            } catch (e) {
              // Ignorer les erreurs de désabonnement
            }
          }, 0);
          
          resolve(connected);
        }
      }, (error) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeoutId);
          console.error('Erreur lors de la vérification de connexion:', error);
          resolve(false);
        }
      });
    } catch (error) {
      if (!resolved) {
        resolved = true;
        clearTimeout(timeoutId);
        console.error('Erreur lors de l\'initialisation de la vérification:', error);
        resolve(false);
      }
    }
  });
};

/**
 * Initialise la base de données pour un utilisateur
 * @param {string} userId - L'ID de l'utilisateur 
 * @returns {Promise<boolean>} True si l'initialisation est réussie
 */
export const initializeDatabase = async (userId: string): Promise<boolean> => {
  if (!userId) {
    console.error('ID utilisateur requis pour initialiser la base de données');
    return false;
  }

  try {
    console.log('Initialisation de la base de données...');

    // Vérifier d'abord que la connexion fonctionne
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      throw new Error("Impossible de se connecter à la base de données");
    }

    // Vérifier si l'utilisateur existe déjà
    const userRef = ref(database, `users/${userId}`);
    const userSnapshot = await get(userRef);

    if (!userSnapshot.exists()) {
      // Créer un document utilisateur si non existant
      console.log('Création d\'un nouveau profil utilisateur...');
      await set(userRef, {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        storageUsed: 0,
        plan: "Gratuit",
        paymentStatus: 'none'
      });
      console.log('Profil utilisateur créé');
    } else {
      // Mettre à jour la date de dernière connexion
      const userData = userSnapshot.val();
      await set(userRef, {
        ...userData,
        lastLoginAt: new Date().toISOString()
      });
    }

    // Initialiser les chemins de l'utilisateur s'ils n'existent pas
    const paths = [
      `emails/${userId}`,
      `addresses/${userId}`,
      `payments/${userId}`
    ];

    const pathInitPromises = paths.map(async (path) => {
      try {
        const pathRef = ref(database, path);
        const pathSnapshot = await get(pathRef);

        if (!pathSnapshot.exists()) {
          console.log(`Initialisation du chemin ${path}...`);
          await set(pathRef, {
            createdAt: new Date().toISOString(),
            userId: userId
          });
          console.log(`Chemin ${path} initialisé`);
        }
        return true;
      } catch (error) {
        console.error(`Erreur lors de l'initialisation du chemin ${path}:`, error);
        return false;
      }
    });

    // Attendre que toutes les initialisations soient terminées
    await Promise.all(pathInitPromises);

    console.log('Initialisation de la base de données terminée');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    return false;
  }
}; 