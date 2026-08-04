// ============================================
// Stripe Client — Payment Integration
// ============================================

import { loadStripe, type Stripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePublishableKey) {
    console.warn(
      '⚠️ Stripe key not found. Running in demo mode.\n' +
      'Add VITE_STRIPE_PUBLISHABLE_KEY to your .env file.'
    );
    return Promise.resolve(null);
  }

  if (!stripePromise) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise;
}

export const isStripeConfigured = !!stripePublishableKey;

// Stripe Price IDs — set these after creating products in Stripe Dashboard
export const STRIPE_PRICES = {
  pro_monthly: import.meta.env.VITE_STRIPE_PRO_MONTHLY_PRICE_ID || '',
  pro_annual: import.meta.env.VITE_STRIPE_PRO_ANNUAL_PRICE_ID || '',
  team_monthly: import.meta.env.VITE_STRIPE_TEAM_MONTHLY_PRICE_ID || '',
  team_annual: import.meta.env.VITE_STRIPE_TEAM_ANNUAL_PRICE_ID || '',
};

/**
 * Redirect user to Stripe Checkout for subscription.
 * In production, this would call your backend to create a checkout session.
 * For now, we use Supabase Edge Functions or a simple API endpoint.
 */
export async function redirectToCheckout(priceId: string, userEmail: string) {
  const checkoutUrl = import.meta.env.VITE_STRIPE_CHECKOUT_URL;

  if (!checkoutUrl) {
    // Fallback: show instructions
    alert(
      'Stripe checkout not configured yet.\n\n' +
      'To enable payments:\n' +
      '1. Create a Stripe account at stripe.com\n' +
      '2. Set up your products and prices\n' +
      '3. Deploy the checkout API endpoint\n' +
      '4. Add VITE_STRIPE_CHECKOUT_URL to .env'
    );
    return;
  }

  try {
    const response = await fetch(checkoutUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId,
        customerEmail: userEmail,
        successUrl: `${window.location.origin}/chat?subscription=success`,
        cancelUrl: `${window.location.origin}/pricing?subscription=cancelled`,
      }),
    });

    const { url } = await response.json();
    if (url) {
      window.location.href = url;
    }
  } catch (error) {
    console.error('Checkout error:', error);
    alert('Something went wrong starting checkout. Please try again.');
  }
}

/**
 * Open Stripe Customer Portal (manage subscription, cancel, update payment).
 */
export async function openCustomerPortal(customerId: string) {
  const portalUrl = import.meta.env.VITE_STRIPE_PORTAL_URL;

  if (!portalUrl) {
    alert('Customer portal not configured yet.');
    return;
  }

  try {
    const response = await fetch(portalUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerId,
        returnUrl: `${window.location.origin}/profile`,
      }),
    });

    const { url } = await response.json();
    if (url) {
      window.location.href = url;
    }
  } catch (error) {
    console.error('Portal error:', error);
  }
}
