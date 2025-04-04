import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, get } from 'firebase/database';
import admin from 'firebase-admin';

// Initialiser firebase-admin si ce n'est pas déjà fait
try {
  admin.app();
} catch (error) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

// Configuration de NowPayments
const NOWPAYMENTS_API_KEY = 'CN0A9E6-QRM466G-G7N03NR-QVYDFRN';
const NOWPAYMENTS_API_URL = 'https://api.nowpayments.io/v1';

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    // Récupérer le document utilisateur
    const userRef = ref(database, `users/${uid}`);
    const userSnapshot = await get(userRef);
    
    if (!userSnapshot.exists()) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const userData = userSnapshot.val();
    
    // Vérifier si l'utilisateur a un paiement en cours
    if (userData.paymentStatus !== 'pending' || !userData.paymentId) {
      return NextResponse.json({ 
        paymentStatus: userData.paymentStatus || 'none',
        plan: userData.plan || 'Aucun'
      });
    }

    // Vérifier le statut du paiement via l'API NowPayments
    const response = await fetch(`${NOWPAYMENTS_API_URL}/payment/${userData.paymentId}`, {
      method: 'GET',
      headers: {
        'x-api-key': NOWPAYMENTS_API_KEY,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ 
        paymentStatus: userData.paymentStatus,
        currentStatus: userData.paymentCurrentStatus || 'unknown',
        plan: userData.paymentPlan || 'Aucun',
        error: 'Erreur lors de la vérification du paiement'
      });
    }

    const paymentData = await response.json();
    
    return NextResponse.json({
      paymentStatus: userData.paymentStatus,
      currentStatus: paymentData.payment_status,
      paymentId: userData.paymentId,
      paymentAddress: userData.paymentAddress,
      paymentAmount: userData.paymentAmount,
      plan: userData.paymentPlan || 'Aucun',
      createdAt: userData.paymentCreatedAt || null
    });
  } catch (error) {
    console.error('Erreur lors de la vérification du paiement:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
} 