import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, get, set } from 'firebase/database';
import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';

// Initialiser Firebase Admin une seule fois
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
  });
}

// Configuration NowPayments API
const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY || '';
const NOWPAYMENTS_API_URL = 'https://api.nowpayments.io/v1';

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decodedToken = await getAuth().verifyIdToken(token);
    const uid = decodedToken.uid;

    // Récupérer les données de la requête
    const { plan } = await request.json();
    
    if (!plan || !['Standard', 'Premium', 'Entreprise'].includes(plan)) {
      return NextResponse.json({ error: 'Plan invalide' }, { status: 400 });
    }

    // Vérifier si l'utilisateur existe et obtenir ses données
    const userRef = ref(database, `users/${uid}`);
    const userSnapshot = await get(userRef);
    
    if (!userSnapshot.exists()) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    // Déterminer le montant en fonction du plan
    let amount;
    switch (plan) {
      case 'Standard':
        amount = 0.01;
        break;
      case 'Premium':
        amount = 0.05;
        break;
      case 'Entreprise':
        amount = 0.1;
        break;
      default:
        amount = 0.01;
    }

    // Créer une demande de paiement via NowPayments API
    const response = await fetch(`${NOWPAYMENTS_API_URL}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': NOWPAYMENTS_API_KEY
      },
      body: JSON.stringify({
        price_amount: amount,
        price_currency: 'USD',
        pay_currency: 'XMR',
        order_id: `${uid}_${plan}`,
        order_description: `Abonnement ${plan} pour Alyosha`,
        ipn_callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/webhook`,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=cancel`
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur NowPayments:', errorData);
      return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 });
    }

    const paymentData = await response.json();

    // Mettre à jour les données de l'utilisateur
    const userData = userSnapshot.val();
    await set(userRef, {
      ...userData,
      paymentStatus: 'pending',
      paymentId: paymentData.payment_id,
      paymentAddress: paymentData.pay_address,
      paymentAmount: paymentData.pay_amount,
      paymentCurrency: 'XMR',
      paymentPlan: plan,
      paymentCreatedAt: new Date().toISOString()
    });

    // Stocker les informations du paiement dans la base de données
    const paymentRef = ref(database, `payments/${paymentData.payment_id}`);
    await set(paymentRef, {
      userId: uid,
      plan,
      amount: paymentData.price_amount,
      payAmount: paymentData.pay_amount,
      currency: 'XMR',
      status: 'pending',
      createdAt: new Date().toISOString(),
      paymentData
    });

    // Retourner les informations nécessaires pour le client
    return NextResponse.json({
      paymentId: paymentData.payment_id,
      paymentAddress: paymentData.pay_address,
      paymentAmount: paymentData.pay_amount,
      currency: 'XMR',
      plan
    });

  } catch (error) {
    console.error('Erreur lors de la création du paiement:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
} 