import { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NavigationHeader } from '../components/NavigationHeader';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AIModeControlPanel } from '../components/AIModeControlPanel';
import { AccessibilityPanel } from '../components/AccessibilityPanel';

export function MainLayout() {
  const [aiModePanelOpen, setAiModePanelOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  // Scroll to top of the main content area on route change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <NavigationHeader
        onOpenAIModePanel={() => setAiModePanelOpen(!aiModePanelOpen)}
        hasProfile={!!localStorage.getItem('cognitivePartnerProfile')}
      />
      <AIModeControlPanel
        isOpen={aiModePanelOpen}
        onClose={() => setAiModePanelOpen(false)}
      />
      <Breadcrumbs />

      <main ref={mainRef} className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <AccessibilityPanel />
    </div>
  );
}
