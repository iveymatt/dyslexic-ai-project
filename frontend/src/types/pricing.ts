export interface PricingTier {
  id: 'free' | 'pro' | 'team';
  name: string;
  price: number;
  annualPrice: number;
  description: string;
  features: string[];
  highlighted: boolean;
  ctaText: string;
  stripePriceId?: string;
  stripeAnnualPriceId?: string;
}
