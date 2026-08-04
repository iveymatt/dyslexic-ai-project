import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { analytics } from './services/analyticsService';
import { MainLayout } from './layouts/MainLayout';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { PricingPage } from './pages/PricingPage';
import { ChatInterface } from './components/ChatInterface';
import { CognitivePartnerAssessment } from './components/CognitivePartnerAssessment';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';

// Lazy-loaded routes — reduces initial bundle size
const CognitiveProfileViewer = lazy(() => import('./components/CognitiveProfileViewer').then(m => ({ default: m.CognitiveProfileViewer })));
const Leaderboard = lazy(() => import('./pages/Leaderboard').then(m => ({ default: m.Leaderboard })));
const PromptLibrary = lazy(() => import('./pages/PromptLibrary').then(m => ({ default: m.PromptLibrary })));
const PromptDetail = lazy(() => import('./pages/PromptDetail').then(m => ({ default: m.PromptDetail })));
const AIAgentsWorkflows = lazy(() => import('./pages/careerDiscovery/AIAgentsWorkflows').then(m => ({ default: m.AIAgentsWorkflows })));
const CareerDiscovery = lazy(() => import('./pages/careerDiscovery/CareerDiscovery').then(m => ({ default: m.CareerDiscovery })));
const ProfileBuilder = lazy(() => import('./pages/careerDiscovery/ProfileBuilder').then(m => ({ default: m.ProfileBuilder })));
const QuickStartProfile = lazy(() => import('./pages/careerDiscovery/QuickStartProfile'));
const JobSearch = lazy(() => import('./pages/careerDiscovery/JobSearch').then(m => ({ default: m.JobSearch })));
const JobDetail = lazy(() => import('./pages/careerDiscovery/JobDetail').then(m => ({ default: m.JobDetail })));
const LifeSkillsCoach = lazy(() => import('./pages/careerDiscovery/LifeSkillsCoach').then(m => ({ default: m.LifeSkillsCoach })));
const AILiteracy = lazy(() => import('./pages/careerDiscovery/AILiteracy').then(m => ({ default: m.AILiteracy })));
const DreamzillaCurriculum = lazy(() => import('./components/DreamzillaCurriculum').then(m => ({ default: m.DreamzillaCurriculum })));

// Loading fallback for lazy routes
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]" style={{ color: 'var(--text-secondary)' }}>
      <div className="text-center">
        <div className="inline-flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="text-sm mt-3">Loading...</p>
      </div>
    </div>
  );
}

/** Tracks page views on every route change */
function RouteChangeTracker() {
  const { pathname } = useLocation();
  useEffect(() => {
    analytics.pageView(pathname);
  }, [pathname]);
  return null;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <RouteChangeTracker />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes — landing experience */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/pricing" element={<PricingPage />} />

          {/* Guided onboarding for new users */}
          <Route path="/onboarding" element={<OnboardingFlow />} />

          {/* Semi-public — assessment can be done pre or post auth */}
          <Route path="/assessment" element={<CognitivePartnerAssessment />} />

          {/* Protected routes — main app behind auth */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/ai-agents" element={<AIAgentsWorkflows />} />

            {/* Prompt Library */}
            <Route path="/prompts" element={<PromptLibrary />} />
            <Route path="/prompts/:promptId" element={<PromptDetail />} />

            {/* Career Discovery */}
            <Route path="/career-discovery">
              <Route index element={<CareerDiscovery />} />
              <Route path="profile-builder" element={<ProfileBuilder />} />
              <Route path="quick-start" element={<QuickStartProfile />} />
              <Route path="jobs" element={<JobSearch />} />
              <Route path="jobs/:jobId" element={<JobDetail />} />
              <Route path="life-skills" element={<LifeSkillsCoach />} />
              <Route path="ai-literacy" element={<AILiteracy />} />
              <Route path="curriculum" element={<DreamzillaCurriculum />} />
            </Route>

            {/* Profile */}
            <Route path="/profile" element={<CognitiveProfileViewer />} />
          </Route>

          {/* Catch all — redirect to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
