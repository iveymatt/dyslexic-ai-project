// ============================================
// Stripe Webhook Handler — Supabase Edge Function
// ============================================
// Handles subscription lifecycle events from Stripe.
// Deploy: supabase functions deploy stripe-webhook
//
// Required Stripe events to listen for:
//   checkout.session.completed
//   customer.subscription.updated
//   customer.subscription.deleted
//   invoice.payment_failed

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Stripe signature verification using Web Crypto API
async function verifyStripeSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const parts = signature.split(',');
  const timestamp = parts.find((p) => p.startsWith('t='))?.split('=')[1];
  const sig = parts.find((p) => p.startsWith('v1='))?.split('=')[1];

  if (!timestamp || !sig) return false;

  // Check timestamp is within 5 minutes
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp)) > 300) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const expectedSig = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(signedPayload)
  );
  const expectedHex = Array.from(new Uint8Array(expectedSig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return expectedHex === sig;
}

// Map Stripe price IDs to plan names
function getPlanFromPriceId(priceId: string): string {
  // These should match your STRIPE_PRICES in the frontend
  // In production, fetch from Stripe or use a lookup table
  const proPrices = [
    Deno.env.get('STRIPE_PRO_MONTHLY_PRICE_ID'),
    Deno.env.get('STRIPE_PRO_ANNUAL_PRICE_ID'),
  ].filter(Boolean);

  const teamPrices = [
    Deno.env.get('STRIPE_TEAM_MONTHLY_PRICE_ID'),
    Deno.env.get('STRIPE_TEAM_ANNUAL_PRICE_ID'),
  ].filter(Boolean);

  if (proPrices.includes(priceId)) return 'pro';
  if (teamPrices.includes(priceId)) return 'team';
  return 'pro'; // default paid plan
}

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return new Response('Missing Stripe signature', { status: 400 });
    }

    // Verify webhook signature
    const isValid = await verifyStripeSignature(body, signature, STRIPE_WEBHOOK_SECRET);
    if (!isValid) {
      console.error('Invalid Stripe webhook signature');
      return new Response('Invalid signature', { status: 400 });
    }

    const event = JSON.parse(body);
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const customerId = session.customer;
        const subscriptionId = session.subscription;
        const customerEmail = session.customer_email || session.customer_details?.email;

        if (!customerEmail) {
          console.error('No customer email in checkout session');
          break;
        }

        // Find the user by email
        const { data: users } = await supabase.auth.admin.listUsers();
        const user = users?.users?.find((u) => u.email === customerEmail);

        if (!user) {
          console.error(`No user found for email: ${customerEmail}`);
          break;
        }

        // Get subscription details to determine plan
        let plan = 'pro';
        if (subscriptionId) {
          // We'll determine plan from line items metadata or price ID
          plan = session.metadata?.plan || 'pro';
        }

        // Update user profile
        await supabase
          .from('user_profiles')
          .update({
            plan,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            subscription_status: 'active',
          })
          .eq('user_id', user.id);

        console.log(`Activated ${plan} plan for ${customerEmail}`);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        const status = subscription.status;
        const priceId = subscription.items?.data?.[0]?.price?.id;

        // Find user by Stripe customer ID
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (!profile) {
          console.error(`No profile found for Stripe customer: ${customerId}`);
          break;
        }

        const plan = status === 'active' ? getPlanFromPriceId(priceId) : 'free';

        await supabase
          .from('user_profiles')
          .update({
            plan,
            subscription_status: status,
          })
          .eq('user_id', profile.user_id);

        console.log(`Updated subscription for customer ${customerId}: ${plan} (${status})`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        // Downgrade to free
        const { error } = await supabase
          .from('user_profiles')
          .update({
            plan: 'free',
            subscription_status: 'cancelled',
          })
          .eq('stripe_customer_id', customerId);

        if (error) {
          console.error('Error downgrading user:', error);
        } else {
          console.log(`Downgraded customer ${customerId} to free plan`);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        // Mark subscription as past_due
        await supabase
          .from('user_profiles')
          .update({ subscription_status: 'past_due' })
          .eq('stripe_customer_id', customerId);

        console.log(`Payment failed for customer ${customerId}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: 'Webhook handler failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
