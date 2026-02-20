import { loadStripe } from '@stripe/stripe-js';

export const getStripe = () => {
  let stripePromise;
  
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  
  return stripePromise;
};

export const PLATFORM_FEE_PERCENT = parseInt(process.env.NEXT_PUBLIC_PLATFORM_FEE_PERCENT || '10');
export const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY || 'eur';

export const calculatePriceBreakdown = (pricePerSeat, seatsBooked, occurrenceCount = 1) => {
  const subtotal = pricePerSeat * seatsBooked * occurrenceCount;
  const platformFee = Math.round(subtotal * (PLATFORM_FEE_PERCENT / 100) * 100) / 100;
  const total = subtotal + platformFee;
  
  return {
    subtotal,
    platformFee,
    total,
    currency: CURRENCY
  };
};
