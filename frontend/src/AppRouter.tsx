import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { LandingPage } from './components/LandingPage';
import { ChatInterface } from './components/ChatInterface';
import { CognitivePartnerAssessment } from './components/CognitivePartnerAssessment';
import { CognitiveProfileViewer } from './components/CognitiveProfileViewer';
import { Leaderboard } from './pages/Leaderboard';
import { PromptLibrary } from './pages/PromptLibrary';
import { PromptDetail } from './pages/PromptDetail';
import { AIAgentsWorkflows } from './pages/careerDiscovery/AIAgentsWorkflows';
import { CareerDiscovery } from './pages/careerDiscovery/CareerDiscovery';
import { ProfileBuilder } from './pages/careerDiscovery/ProfileBuilder';
import QuickStartProfile from './pages/careerDiscovery/QuickStartProfile';
import { JobSearch } from './pages/careerDiscovery/JobSearch';
import { JobDetail } from './pages/careerDiscovery/JobDetail';
import { LifeSkillsCoach } from './pages/careerDiscovery/LifeSkillsCoach';
import { AILiteracy } from './pages/careerDiscovery/AILiteracy';
import { DreamzillaCurriculum } from './components/DreamzillaCurriculum';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page - no layout */}
        <Route path="/landing" element={<LandingPage />} />

        {/* Assessment - no layout */}
        <Route path="/assessment" element={<CognitivePartnerAssessment />} />

        {/* Profile viewer - no layout */}
        <Route path="/profile" element={<CognitiveProfileViewer />} />

        {/* Main app routes with layout */}
        <Route element={<MainLayout />}>
          {/* Redirect root to chat */}
          <Route path="/" element={<Navigate to="/chat" replace />} />

          {/* Main features */}
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
        </Route>

        {/* Catch all - redirect to chat */}
        <Route path="*" element={<Navigate to="/chat" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
