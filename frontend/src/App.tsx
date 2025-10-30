import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { AccessibilityPanel } from './components/AccessibilityPanel';

function App() {
  const [showLanding, setShowLanding] = useState(true);

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Header */}
      <Header />

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
