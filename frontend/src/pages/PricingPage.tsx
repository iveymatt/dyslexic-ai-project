import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { LandingFooter } from '../components/landing/LandingFooter';
import { PricingCard } from '../components/pricing/PricingCard';
import { pricingTiers } from '../data/pricing';
import { useAuth } from '../context/AuthContext';

const faqs = [
  {
    q: 'Is there a free trial?',
    a: 'Yes! The Free plan is free forever with core features. Pro plan comes with a 14-day free trial — no credit card required.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Absolutely. Cancel anytime from your account settings. No cancellation fees, no hassle.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and Apple Pay through our secure Stripe checkout.',
  },
  {
    q: 'Do you offer student discounts?',
    a: 'Yes! Students get 50% off Pro plans. Contact us with a valid student email to get your discount code.',
  },
  {
    q: 'Is my data private?',
    a: 'Yes. We are privacy-first. We do not sell your data, track you across the web, or share your information. Your conversations are yours.',
  },
];

const comparisonFeatures = [
  { name: 'AI Chat', free: true, pro: true, team: true },
  { name: 'Accessibility features', free: true, pro: true, team: true },
  { name: 'AI Leaderboard (view)', free: true, pro: true, team: true },
  { name: 'Prompts per day', free: '10', pro: 'Unlimited', team: 'Unlimited' },
  { name: 'Thinking modes', free: 'Basic', pro: 'All 3', team: 'All 3' },
  { name: 'Career Discovery', free: false, pro: true, team: true },
  { name: 'AI Agents & Workflows', free: false, pro: true, team: true },
  { name: 'Cognitive Assessment', free: false, pro: true, team: true },
  { name: 'Life Skills Coach', free: false, pro: true, team: true },
  { name: 'AI Literacy Course', free: false, pro: true, team: true },
  { name: 'Priority support', free: false, pro: true, team: true },
  { name: 'Team dashboards', free: false, pro: false, team: true },
  { name: 'Admin controls', free: false, pro: false, team: true },
  { name: 'Custom AI agents', free: false, pro: false, team: true },
  { name: 'SSO / SAML', free: false, pro: false, team: true },
];

export function PricingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [isAnnual, setIsAnnual] = useState(true);

  const handleSelect = (tierId: string) => {
    if (isAuthenticated) {
      if (user?.plan === tierId) return;
      alert('Plan upgrade coming soon! Stripe integration will be connected here.');
    } else {
      navigate(tierId === 'free' ? '/signup' : `/signup?plan=${tierId}`);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <LandingNavbar />

      {/* Header */}
      <section className="container mx-auto px-6 pt-20 pb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-lg text-earth-500 max-w-2xl mx-auto mb-8">
          Start free. Upgrade when you're ready. No surprises, no hidden fees.
        </p>

        {/* Toggle */}
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
            Annual <span className="ml-1 text-xs opacity-80">Save 25%</span>
          </button>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingTiers.map(tier => (
            <PricingCard
              key={tier.id}
              tier={tier}
              isAnnual={isAnnual}
              onSelect={handleSelect}
              isCurrentPlan={isAuthenticated && user?.plan === tier.id}
            />
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="container mx-auto px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Compare Plans</h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: 'var(--bg-secondary)' }}>
                  <th className="text-left py-4 px-6 font-semibold text-sm">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-sm">Free</th>
                  <th className="text-center py-4 px-4 font-semibold text-sm text-cyan-500">Pro</th>
                  <th className="text-center py-4 px-4 font-semibold text-sm">Team</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <tr
                    key={feature.name}
                    className={i % 2 === 0 ? '' : ''}
                    style={i % 2 === 0 ? { background: 'var(--bg-secondary)', opacity: 0.7 } : {}}
                  >
                    <td className="py-3 px-6 text-sm">{feature.name}</td>
                    {(['free', 'pro', 'team'] as const).map(plan => {
                      const val = feature[plan];
                      return (
                        <td key={plan} className="text-center py-3 px-4">
                          {val === true ? (
                            <Check size={18} className="inline text-cyan-500" />
                          ) : val === false ? (
                            <X size={18} className="inline text-earth-300" />
                          ) : (
                            <span className="text-sm font-medium">{val}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(faq => (
              <div
                key={faq.q}
                className="rounded-xl border p-6"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
