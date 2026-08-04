import { Check } from 'lucide-react';
import type { PricingTier } from '../../types/pricing';

interface PricingCardProps {
  tier: PricingTier;
  isAnnual: boolean;
  onSelect: (tierId: string) => void;
  isCurrentPlan?: boolean;
}

export function PricingCard({ tier, isAnnual, onSelect, isCurrentPlan = false }: PricingCardProps) {
  const price = isAnnual ? tier.annualPrice : tier.price;

  return (
    <div
      className={`relative rounded-2xl p-8 border transition-all hover:scale-[1.02] hover:-translate-y-1 ${
        tier.highlighted
          ? 'border-cyan-500 shadow-lg shadow-cyan-500/10'
          : ''
      }`}
      style={{
        borderColor: tier.highlighted ? undefined : 'var(--border-color)',
        background: 'var(--bg-primary)',
      }}
    >
      {/* Most Popular badge */}
      {tier.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-magenta-500 text-white text-xs font-bold">
          Most Popular
        </div>
      )}

      <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
        {tier.description}
      </p>

      {/* Price */}
      <div className="mb-6">
        <span className="text-4xl font-bold">
          {price === 0 ? 'Free' : `$${price}`}
        </span>
        {price > 0 && (
          <span className="text-sm ml-1" style={{ color: 'var(--text-secondary)' }}>
            /mo {isAnnual && '(billed annually)'}
          </span>
        )}
        {price === 0 && (
          <span className="text-sm ml-2" style={{ color: 'var(--text-secondary)' }}>
            forever
          </span>
        )}
      </div>

      {/* CTA Button */}
      <button
        onClick={() => onSelect(tier.id)}
        disabled={isCurrentPlan}
        className={`w-full py-3 px-6 rounded-xl font-semibold mb-8 transition-all ${
          tier.highlighted ? 'btn-primary' : 'btn-secondary'
        } ${isCurrentPlan ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isCurrentPlan ? 'Current Plan' : tier.ctaText}
      </button>

      {/* Features */}
      <ul className="space-y-3">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <Check size={16} className="text-cyan-500 flex-shrink-0 mt-0.5" />
            <span style={{ color: 'var(--text-secondary)' }}>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
