import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Client } from 'node-appwrite';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const appwriteClient = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

export async function POST(req) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        // Update booking status
        const { databases } = await import('node-appwrite');
        const db = new databases.Databases(appwriteClient);
        
        await db.updateDocument(
          DATABASE_ID,
          'bookings',
          session.metadata.bookingId,
          {
            status: 'PAID',
            stripeCheckoutSessionId: session.id,
            updatedAt: new Date().toISOString()
          }
        );

        // Create payment record
        await db.createDocument(
          DATABASE_ID,
          'payments',
          'unique()',
          {
            bookingId: session.metadata.bookingId,
            stripePaymentIntentId: session.payment_intent,
            amountTotal: session.amount_total / 100,
            currency: session.currency,
            status: 'completed',
            createdAt: new Date().toISOString()
          }
        );

        // Update occurrence seats
        const booking = await db.getDocument(
          DATABASE_ID,
          'bookings',
          session.metadata.bookingId
        );

        for (const date of booking.occurrenceDates) {
          const occurrences = await db.listDocuments(
            DATABASE_ID,
            'listing_occurrences',
            [
              Query.equal('listingId', booking.listingId),
              Query.equal('date', date)
            ]
          );

          if (occurrences.documents.length > 0) {
            const occ = occurrences.documents[0];
            await db.updateDocument(
              DATABASE_ID,
              'listing_occurrences',
              occ.$id,
              {
                seatsRemaining: Math.max(0, occ.seatsRemaining - booking.seatsBooked)
              }
            );
          }
        }

        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object;
        
        // Find and update booking
        const { databases } = await import('node-appwrite');
        const db = new databases.Databases(appwriteClient);
        
        const bookings = await db.listDocuments(
          DATABASE_ID,
          'bookings',
          [Query.equal('stripePaymentIntentId', charge.payment_intent)]
        );

        if (bookings.documents.length > 0) {
          const refundAmount = charge.amount_refunded / 100;
          const totalAmount = charge.amount / 100;
          
          await db.updateDocument(
            DATABASE_ID,
            'bookings',
            bookings.documents[0].$id,
            {
              status: refundAmount === totalAmount ? 'REFUNDED_FULL' : 'REFUNDED_PARTIAL',
              refundAmount,
              updatedAt: new Date().toISOString()
            }
          );
        }

        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
