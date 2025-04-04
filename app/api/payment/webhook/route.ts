import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';
import { database } from '@/lib/firebase';
import { ref, get, set } from 'firebase/database';
import admin from 'firebase-admin';

// Initialiser Firebase Admin une seule fois
let adminApp: admin.app.App;
if (!admin.apps.length) {
  adminApp = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
  });
} else {
  adminApp = admin.app();
}

// Clé secrète pour vérifier les notifications de paiement
const IPN_SECRET = process.env.NOWPAYMENTS_IPN_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    // Vérifier la signature de la notification
    const payload = await request.text();
    const signature = request.headers.get('x-nowpayments-sig');
    
    if (!signature) {
      console.error('Webhook error: Signature missing');
      return NextResponse.json({ error: 'Signature missing' }, { status: 400 });
    }
    
    // Vérifier la signature avec HMAC
    const hmac = crypto.createHmac('sha512', IPN_SECRET);
    hmac.update(payload);
    const calculatedSignature = hmac.digest('hex');
    
    if (calculatedSignature !== signature) {
      console.error('Webhook error: Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    
    // Analyser les données de paiement
    const paymentData = JSON.parse(payload);
    console.log('Received payment notification:', paymentData);
    
    // Vérifier les données essentielles
    if (!paymentData.payment_id || !paymentData.order_id) {
      console.error('Webhook error: Missing payment or order ID');
      return NextResponse.json({ error: 'Invalid payment data' }, { status: 400 });
    }
    
    // L'order_id contient le userId et le plan (format: userId_plan)
    const [userId, plan] = paymentData.order_id.split('_');
    
    if (!userId || !plan) {
      console.error('Webhook error: Invalid order ID format');
      return NextResponse.json({ error: 'Invalid order ID format' }, { status: 400 });
    }
    
    // Vérifier que l'utilisateur existe
    const userRef = ref(database, `users/${userId}`);
    const userSnapshot = await get(userRef);
    
    if (!userSnapshot.exists()) {
      console.error(`Webhook error: User ${userId} not found`);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Traiter le statut du paiement
    const paymentStatus = paymentData.payment_status;
    const userData = userSnapshot.val();
    
    // Enregistrer le paiement dans la base de données
    const paymentRef = ref(database, `payments/${paymentData.payment_id}`);
    await set(paymentRef, {
      userId,
      plan,
      amount: paymentData.price_amount,
      currency: paymentData.price_currency,
      status: paymentStatus,
      createdAt: new Date().toISOString(),
      paymentData
    });
    
    // Mettre à jour le statut de l'utilisateur en fonction du statut du paiement
    if (paymentStatus === 'finished' || paymentStatus === 'confirmed') {
      // Paiement réussi
      console.log(`Payment successful for user ${userId}, activating ${plan} subscription`);
      
      await set(userRef, {
        ...userData,
        plan,
        paymentStatus: 'paid',
        paymentCompletedAt: new Date().toISOString(),
        subscription: {
          plan,
          startDate: new Date().toISOString(),
          status: 'active'
        }
      });
      
    } else if (paymentStatus === 'failed' || paymentStatus === 'expired') {
      // Paiement échoué
      console.log(`Payment failed for user ${userId}`);
      
      await set(userRef, {
        ...userData,
        paymentStatus: 'failed',
        paymentFailedAt: new Date().toISOString()
      });
      
    } else {
      // Statut en cours ou autre
      console.log(`Payment status updated for user ${userId}: ${paymentStatus}`);
      
      await set(userRef, {
        ...userData,
        paymentStatus: 'pending',
        paymentUpdatedAt: new Date().toISOString()
      });
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 