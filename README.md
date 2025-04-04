# Alyosha - Service Email Anonyme

Service d'email anonymisé avec paiement en Monero.

## Corrections effectuées

✅ **Migration vers Realtime Database**
- Correction des imports et des références Firestore → Realtime Database
- Adaptation des requêtes pour utiliser la syntaxe Realtime Database
- Mise à jour des fonctions d'initialisation et de vérification de connexion

✅ **Intégration des paiements**
- Implémentation des API endpoints pour création et vérification de paiement
- Mise à jour du webhook de paiement pour la Realtime Database
- Correction des problèmes de sécurité et de typage

✅ **Interface utilisateur**
- Tableau de bord centré et adaptatif
- Statistiques basées sur les données réelles de l'utilisateur
- Gestion des erreurs améliorée avec messages clairs
- Indicateurs de chargement et d'activité

✅ **Documentation**
- Guide de configuration Firebase mis à jour (FIREBASE_SETUP.md)
- Exemple de fichier .env.local avec commentaires
- Checklist de vérification du fonctionnement

## Comment vérifier le bon fonctionnement

1. **Connexion à la base de données**
   - Vérifiez l'absence d'erreurs Firebase dans la console du navigateur
   - Le tableau de bord doit se charger sans message d'erreur
   - Les statistiques (emails, stockage) doivent s'afficher correctement

2. **Fonctionnalité de paiement**
   - Cliquez sur un abonnement pour vérifier que la demande de paiement est créée
   - Vérifiez l'affichage de l'adresse Monero
   - Testez le bouton "Vérifier le paiement"
   - Testez la copie de l'adresse dans le presse-papier

3. **Structure de la base de données**
   - Dans la console Firebase, vérifiez que les chemins suivants existent:
     - `/users`
     - `/emails`
     - `/addresses`
     - `/payments`
   - Vérifiez que les données des utilisateurs se créent correctement

## Dépannage

Si vous rencontrez des problèmes:

1. Vérifiez le fichier `.env.local` et assurez-vous que l'URL de la Realtime Database est correcte
2. Consultez FIREBASE_SETUP.md pour les instructions détaillées
3. Effacez le cache du navigateur et les cookies du site
4. Redémarrez le serveur de développement:
   ```
   npm run dev
   ```

## API NowPayments

Les paiements utilisent l'API NowPayments avec les informations suivantes:
- API Key: `CN0A9E6-QRM466G-G7N03NR-QVYDFRN`
- IPN Secret: `EdAC6m3EJHBgtMvajfm/nCEXVOmfcWr4`

## Démarrage

1. Installez les dépendances:
   ```
   npm install
   ```

2. Configurez Firebase selon les instructions dans FIREBASE_SETUP.md

3. Démarrez le serveur de développement:
   ```
   npm run dev
   ```
