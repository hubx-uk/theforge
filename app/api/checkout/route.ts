import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

const PLAN_PRICES: Record<string, { priceId: string; mode: 'payment' | 'subscription' }> = {
  spark:   { priceId: process.env.STRIPE_PRICE_SPARK   || 'price_spark',   mode: 'payment' },
  ember:   { priceId: process.env.STRIPE_PRICE_EMBER   || 'price_ember',   mode: 'payment' },
  blaze:   { priceId: process.env.STRIPE_PRICE_BLAZE   || 'price_blaze',   mode: 'payment' },
  inferno: { priceId: process.env.STRIPE_PRICE_INFERNO || 'price_inferno', mode: 'subscription' },
};

export async function POST(req: NextRequest) {
  try {
    const { plan, email } = await req.json();
    const config = PLAN_PRICES[plan];

    if (!config) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: config.mode,
      customer_email: email,
      line_items: [{ price: config.priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      metadata: { plan },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
