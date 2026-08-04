import { LandingNavbar } from './landing/LandingNavbar';
import { HeroSection } from './landing/HeroSection';
import { SocialProof } from './landing/SocialProof';
import { ToolsShowcase } from './landing/ToolsShowcase';
import { ThinkingModes } from './landing/ThinkingModes';
import { PromptLibraryPreview } from './landing/PromptLibraryPreview';
import { LeaderboardPreviewSection } from './landing/LeaderboardPreview';
import { CareerDiscoveryPreview } from './landing/CareerDiscoveryPreview';
import { AccessibilityShowcase } from './landing/AccessibilityShowcase';
import { PricingSection } from './landing/PricingSection';
import { FinalCTA } from './landing/FinalCTA';
import { LandingFooter } from './landing/LandingFooter';

export function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <LandingNavbar />
      <HeroSection />
      <SocialProof />
      <ToolsShowcase />
      <ThinkingModes />
      <PromptLibraryPreview />
      <LeaderboardPreviewSection />
      <CareerDiscoveryPreview />
      <AccessibilityShowcase />
      <PricingSection />
      <FinalCTA />
      <LandingFooter />
    </div>
  );
}
