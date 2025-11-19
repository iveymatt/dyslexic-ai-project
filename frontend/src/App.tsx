import { useState, useEffect } from 'react';
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
import QuickStartProfile from './pages/careerDiscovery/QuickStartProfile';
import { JobSearch } from './pages/careerDiscovery/JobSearch';
import { JobDetail } from './pages/careerDiscovery/JobDetail';
import { LifeSkillsCoach } from './pages/careerDiscovery/LifeSkillsCoach';
import { AILiteracy } from './pages/careerDiscovery/AILiteracy';
import { AIAgentsWorkflows } from './pages/careerDiscovery/AIAgentsWorkflows';
import { DreamzillaCurriculum } from './components/DreamzillaCurriculum';
import { CognitivePartnerAssessment } from './components/CognitivePartnerAssessment';
import { CognitiveProfileViewer } from './components/CognitiveProfileViewer';
import type { CognitivePartnerProfile } from './types/cognitiveProfile';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);

  // Cognitive Partner Profile states
  const [cognitiveProfile, setCognitiveProfile] = useState<CognitivePartnerProfile | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showProfileViewer, setShowProfileViewer] = useState(false);

  // Career Discovery states
  const [showCareerDiscovery, setShowCareerDiscovery] = useState(false);
  const [showProfileBuilder, setShowProfileBuilder] = useState(false);
  const [showQuickStart, setShowQuickStart] = useState(false);
  const [showJobSearch, setShowJobSearch] = useState(false);
  const [showLifeSkills, setShowLifeSkills] = useState(false);
  const [showAILiteracy, setShowAILiteracy] = useState(false);
  const [showAIAgentsWorkflows, setShowAIAgentsWorkflows] = useState(false);
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Load cognitive profile from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cognitivePartnerProfile');
    if (saved) {
      try {
        setCognitiveProfile(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load cognitive profile:', e);
      }
    }
  }, []);

  // Save cognitive profile to localStorage when it changes
  const handleProfileUpdate = (profile: CognitivePartnerProfile) => {
    setCognitiveProfile(profile);
    localStorage.setItem('cognitivePartnerProfile', JSON.stringify(profile));
  };

  // Cognitive Partner Assessment
  if (showAssessment) {
    return (
      <CognitivePartnerAssessment
        onComplete={(profile) => {
          handleProfileUpdate(profile);
          setShowAssessment(false);
          setShowLanding(false);
        }}
        onSkip={() => {
          setShowAssessment(false);
          setShowLanding(false);
        }}
      />
    );
  }

  // Cognitive Profile Viewer
  if (showProfileViewer && cognitiveProfile) {
    return (
      <CognitiveProfileViewer
        profile={cognitiveProfile}
        onUpdate={handleProfileUpdate}
        onClose={() => setShowProfileViewer(false)}
      />
    );
  }

  if (showLanding) {
    return (
      <LandingPage
        onGetStarted={() => setShowLanding(false)}
        onTakeAssessment={() => {
          setShowLanding(false);
          setShowAssessment(true);
        }}
      />
    );
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

  if (showAIAgentsWorkflows) {
    return (
      <AIAgentsWorkflows
        onBack={() => {
          setShowAIAgentsWorkflows(false);
          setShowCareerDiscovery(true);
        }}
      />
    );
  }

  if (showCurriculum) {
    return (
      <div className="h-screen flex flex-col bg-gray-900">
        <div className="p-4 border-b border-gray-700">
          <button
            onClick={() => {
              setShowCurriculum(false);
              setShowCareerDiscovery(true);
            }}
            className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
          >
            ← Back to Career Discovery
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <DreamzillaCurriculum />
        </div>
      </div>
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

  if (showQuickStart) {
    return (
      <QuickStartProfile
        onComplete={(profile) => {
          // Save profile to localStorage
          localStorage.setItem('careerDiscoveryProfile', JSON.stringify(profile));
          setShowQuickStart(false);
          setShowCareerDiscovery(true);
        }}
        onSwitchToFullAssessment={() => {
          setShowQuickStart(false);
          setShowProfileBuilder(true);
        }}
        onBack={() => {
          setShowQuickStart(false);
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
        onQuickStart={() => {
          setShowCareerDiscovery(false);
          setShowQuickStart(true);
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
        onViewAIAgentsWorkflows={() => {
          setShowCareerDiscovery(false);
          setShowAIAgentsWorkflows(true);
        }}
        onViewCurriculum={() => {
          setShowCareerDiscovery(false);
          setShowCurriculum(true);
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
        onShowAIAgentsWorkflows={() => setShowAIAgentsWorkflows(true)}
        onShowProfile={() => {
          if (cognitiveProfile) {
            setShowProfileViewer(true);
          } else {
            setShowAssessment(true);
          }
        }}
        hasProfile={!!cognitiveProfile}
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
