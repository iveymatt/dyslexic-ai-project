// ============================================
// Stripe Checkout Session — Supabase Edge Function
// ============================================
// Creates a Stripe Checkout Session for subscription purchases.
// Deploy: supabase functions deploy create-checkout

import { corsHeaders } from '../_shared/cors.ts';

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY')!;

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { priceId, customerEmail, successUrl, cancelUrl } = await req.json();

    if (!priceId || !customerEmail) {
      return new Response(
        JSON.stringify({ error: 'priceId and customerEmail are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Stripe Checkout Session via API
    const params = new URLSearchParams();
    params.append('mode', 'subscription');
    params.append('customer_email', customerEmail);
    params.append('line_items[0][price]', priceId);
    params.append('line_items[0][quantity]', '1');
    params.append('success_url', successUrl || `${req.headers.get('origin')}/chat?subscription=success`);
    params.append('cancel_url', cancelUrl || `${req.headers.get('origin')}/pricing?subscription=cancelled`);
    params.append('allow_promotion_codes', 'true');
    params.append('billing_address_collection', 'required');
    params.append('subscription_data[trial_period_days]', '7');

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!stripeResponse.ok) {
      const err = await stripeResponse.json();
      console.error('Stripe error:', err);
      return new Response(
        JSON.stringify({ error: err.error?.message || 'Failed to create checkout session' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const session = await stripeResponse.json();

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
