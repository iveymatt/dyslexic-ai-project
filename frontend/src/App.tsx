import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { Leaderboard } from './pages/Leaderboard';
import { PromptLibrary } from './pages/PromptLibrary';
import { PromptDetail } from './pages/PromptDetail';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);

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

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Header */}
      <Header
        onShowLeaderboard={() => setShowLeaderboard(true)}
        onShowPromptLibrary={() => setShowPromptLibrary(true)}
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
