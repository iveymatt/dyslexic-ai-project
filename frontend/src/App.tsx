import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { Leaderboard } from './pages/Leaderboard';
import { PromptLibrary } from './pages/PromptLibrary';
import { PromptDetail } from './pages/PromptDetail';
import { CareerDiscovery } from './pages/careerDiscovery/CareerDiscovery';
import { ProfileBuilder } from './pages/careerDiscovery/ProfileBuilder';
import { JobSearch } from './pages/careerDiscovery/JobSearch';
import { JobDetail } from './pages/careerDiscovery/JobDetail';
import { LifeSkillsCoach } from './pages/careerDiscovery/LifeSkillsCoach';
import { AILiteracy } from './pages/careerDiscovery/AILiteracy';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);

  // Career Discovery states
  const [showCareerDiscovery, setShowCareerDiscovery] = useState(false);
  const [showProfileBuilder, setShowProfileBuilder] = useState(false);
  const [showJobSearch, setShowJobSearch] = useState(false);
  const [showLifeSkills, setShowLifeSkills] = useState(false);
  const [showAILiteracy, setShowAILiteracy] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  if (selectedPromptId) {
    return (
      <PromptDetail
        promptId={selectedPromptId}
        onBack={() => {
          setSelectedPromptId(null);
          setShowPromptLibrary(true);
        }}
        onRelatedPromptClick={(promptId) => setSelectedPromptId(promptId)}
        onUseInChat={() => {
          // Pre-fill prompt in chat and return to chat view
          setSelectedPromptId(null);
          setShowPromptLibrary(false);
          // TODO: Add message to chat with prompt text
        }}
      />
    );
  }

  if (showPromptLibrary) {
    return (
      <PromptLibrary
        onBack={() => setShowPromptLibrary(false)}
        onPromptSelect={(promptId) => setSelectedPromptId(promptId)}
      />
    );
  }

  if (showLeaderboard) {
    return <Leaderboard onBack={() => setShowLeaderboard(false)} />;
  }

  // Career Discovery Routes
  if (selectedJobId) {
    return (
      <JobDetail
        jobId={selectedJobId}
        onBack={() => {
          setSelectedJobId(null);
          setShowJobSearch(true);
        }}
      />
    );
  }

  if (showJobSearch) {
    return (
      <JobSearch
        onBack={() => {
          setShowJobSearch(false);
          setShowCareerDiscovery(true);
        }}
        onJobSelect={(jobId) => {
          setShowJobSearch(false);
          setSelectedJobId(jobId);
        }}
      />
    );
  }

  if (showLifeSkills) {
    return (
      <LifeSkillsCoach
        onBack={() => {
          setShowLifeSkills(false);
          setShowCareerDiscovery(true);
        }}
      />
    );
  }

  if (showAILiteracy) {
    return (
      <AILiteracy
        onBack={() => {
          setShowAILiteracy(false);
          setShowCareerDiscovery(true);
        }}
      />
    );
  }

  if (showProfileBuilder) {
    return (
      <ProfileBuilder
        onComplete={() => {
          setShowProfileBuilder(false);
          setShowCareerDiscovery(true);
        }}
        onBack={() => {
          setShowProfileBuilder(false);
          setShowCareerDiscovery(true);
        }}
      />
    );
  }

  if (showCareerDiscovery) {
    return (
      <CareerDiscovery
        onBack={() => setShowCareerDiscovery(false)}
        onStartProfile={() => {
          setShowCareerDiscovery(false);
          setShowProfileBuilder(true);
        }}
        onViewJobs={() => {
          setShowCareerDiscovery(false);
          setShowJobSearch(true);
        }}
        onViewLifeSkills={() => {
          setShowCareerDiscovery(false);
          setShowLifeSkills(true);
        }}
        onViewAILiteracy={() => {
          setShowCareerDiscovery(false);
          setShowAILiteracy(true);
        }}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Header */}
      <Header
        onShowLeaderboard={() => setShowLeaderboard(true)}
        onShowPromptLibrary={() => setShowPromptLibrary(true)}
        onShowCareerDiscovery={() => setShowCareerDiscovery(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Chat History */}
        <Sidebar />

        {/* Center - Chat Area */}
        <ChatArea />

        {/* Right Panel - Accessibility Controls */}
        <AccessibilityPanel />
      </div>
    </div>
  );
}

export default App;
