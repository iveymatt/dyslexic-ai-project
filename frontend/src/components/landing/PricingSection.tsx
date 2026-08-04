import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { pricingTiers } from '../../data/pricing';
import { useAuth } from '../../context/AuthContext';

export function PricingSection() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [isAnnual, setIsAnnual] = useState(true);

  const handleSelect = (tierId: string) => {
    if (isAuthenticated) {
      if (user?.plan === tierId) return; // Already on this plan
      // Placeholder for future Stripe checkout
      alert('Plan upgrade coming soon! Stripe integration will be connected here.');
    } else {
      navigate(tierId === 'free' ? '/signup' : `/signup?plan=${tierId}`);
    }
  };

  return (
    <section id="pricing" className="container mx-auto px-6 py-20 md:py-24 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-earth-500 max-w-2xl mx-auto mb-8">
            Start free. Upgrade when you're ready. No surprises.
          </p>

          {/* Annual / Monthly toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-full border" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !isAnnual ? 'bg-gradient-to-r from-cyan-500 to-magenta-500 text-white shadow-sm' : ''
              }`}
              style={!isAnnual ? {} : { color: 'var(--text-secondary)' }}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isAnnual ? 'bg-gradient-to-r from-cyan-500 to-magenta-500 text-white shadow-sm' : ''
              }`}
              style={isAnnual ? {} : { color: 'var(--text-secondary)' }}
            >
              Annual
              <span className="ml-1 text-xs opacity-80">Save 25%</span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {pricingTiers.map(tier => {
            const price = isAnnual ? tier.annualPrice : tier.price;
            const isCurrentPlan = isAuthenticated && user?.plan === tier.id;

            return (
              <div
                key={tier.id}
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
                      /mo {isAnnual && tier.id !== 'free' && '(billed annually)'}
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
                  onClick={() => handleSelect(tier.id)}
                  disabled={isCurrentPlan}
                  className={`w-full py-3 px-6 rounded-xl font-semibold mb-8 transition-all ${
                    tier.highlighted
                      ? 'btn-primary'
                      : 'btn-secondary'
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
          })}
        </div>
      </div>
    </section>
  );
}
