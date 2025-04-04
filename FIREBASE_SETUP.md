# Guide de configuration de Firebase pour Alyosha

Ce guide vous aidera à configurer correctement Firebase pour le projet Alyosha et à résoudre les erreurs de connexion que vous rencontrez.

## 1. Configuration de Firebase

### Créer un projet Firebase

1. Rendez-vous sur [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Cliquez sur "Ajouter un projet"
3. Nommez votre projet (par exemple "alyosha-email")
4. Suivez les étapes pour créer le projet

### Ajouter une application web

1. Dans la console Firebase, cliquez sur l'icône "Web" (</>) pour ajouter une application web
2. Donnez un nom à votre application (par exemple "alyosha-web")
3. Enregistrez l'application
4. Notez les informations de configuration Firebase affichées

### Activer la Realtime Database

1. Dans le menu de gauche, cliquez sur "Realtime Database"
2. Cliquez sur "Créer une base de données"
3. Choisissez le mode "Production" ou "Test"
4. Sélectionnez l'emplacement de la base de données le plus proche de vos utilisateurs
5. Attendez que la base de données soit initialisée

### Activer l'authentification

1. Dans le menu de gauche, cliquez sur "Authentication"
2. Cliquez sur "Commencer"
3. Activez au moins la méthode "Email/Mot de passe"
4. (Optionnel) Activez d'autres méthodes d'authentification selon vos besoins

## 2. Configuration du projet Alyosha

### Mettre à jour le fichier .env.local

1. Ouvrez le fichier `.env.local` dans votre projet
2. Copiez les valeurs depuis la configuration Firebase que vous avez notée précédemment:

```
NEXT_PUBLIC_FIREBASE_API_KEY=votre_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=votre_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=votre_app_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://votre_project_id-default-rtdb.firebaseio.com/
```

**IMPORTANT:** Assurez-vous que `NEXT_PUBLIC_FIREBASE_DATABASE_URL` pointe vers l'URL de votre Realtime Database.

### Générer une clé privée pour Firebase Admin

Pour les fonctionnalités de webhook et de paiement, vous avez besoin d'une clé privée Firebase Admin:

1. Dans la console Firebase, allez dans "Paramètres du projet" (icône d'engrenage)
2. Cliquez sur l'onglet "Comptes de service"
3. Sous "Firebase Admin SDK", cliquez sur "Générer une nouvelle clé privée"
4. Un fichier JSON sera téléchargé
5. Ouvrez ce fichier et complétez les variables d'environnement suivantes:

```
FIREBASE_CLIENT_EMAIL=valeur_du_champ_client_email_du_json
FIREBASE_PRIVATE_KEY=valeur_du_champ_private_key_du_json
```

## 3. Résolution des erreurs de connexion

Si vous rencontrez toujours des erreurs comme:
```
@firebase/database: FIREBASE WARNING: Database error: Permission denied
```

Voici les étapes pour les résoudre:

### Vérifiez les règles de la Realtime Database

1. Dans la console Firebase, accédez à "Realtime Database"
2. Cliquez sur l'onglet "Règles"
3. Assurez-vous que vos règles autorisent l'accès en lecture/écriture:

```
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

### Créez manuellement les chemins nécessaires

Créez les chemins suivants dans votre Realtime Database:
- `/users`
- `/emails`
- `/addresses`
- `/payments`

Pour créer un chemin:
1. Dans la Realtime Database, cliquez sur "+"
2. Entrez le nom du chemin (par exemple "users")
3. Ajoutez une valeur temporaire comme `{ "temp": true }`
4. Vous pourrez la supprimer plus tard

### Redémarrez l'application

1. Arrêtez le serveur de développement (`Ctrl+C`)
2. Supprimez les fichiers `.next` (cache):
   ```
   rm -rf .next
   ```
3. Redémarrez le serveur:
   ```
   npm run dev
   ```

## 4. Configuration du système de paiement

Le système de paiement utilise l'API NowPayments pour accepter les paiements en Monero (XMR). Les informations d'API sont déjà configurées:

```
NOWPAYMENTS_API_KEY=CN0A9E6-QRM466G-G7N03NR-QVYDFRN
NOWPAYMENTS_IPN_SECRET=EdAC6m3EJHBgtMvajfm/nCEXVOmfcWr4
```

Si vous souhaitez utiliser votre propre compte NowPayments:
1. Créez un compte sur [https://nowpayments.io/](https://nowpayments.io/)
2. Obtenez votre clé API et configurez un secret IPN
3. Mettez à jour les variables d'environnement

## Support

Si vous rencontrez encore des problèmes, consultez la documentation officielle de Firebase:
- [Documentation Firebase](https://firebase.google.com/docs)
- [Realtime Database](https://firebase.google.com/docs/database)
- [Authentication](https://firebase.google.com/docs/auth) 