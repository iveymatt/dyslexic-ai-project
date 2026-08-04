import { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NavigationHeader } from '../components/NavigationHeader';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AIModeControlPanel } from '../components/AIModeControlPanel';
import { AccessibilityPanel } from '../components/AccessibilityPanel';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

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
      {/* Skip navigation link — WCAG 2.4.1 */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-cyan-500 focus:text-white focus:font-semibold focus:outline-none"
      >
        Skip to main content
      </a>

      <NavigationHeader
        onOpenAIModePanel={() => setAiModePanelOpen(!aiModePanelOpen)}
        hasProfile={!!localStorage.getItem('cognitivePartnerProfile')}
      />
      <AIModeControlPanel
        isOpen={aiModePanelOpen}
        onClose={() => setAiModePanelOpen(false)}
      />
      <nav aria-label="Breadcrumb navigation">
        <Breadcrumbs />
      </nav>

      <main
        id="main-content"
        ref={mainRef}
        className="flex-1 overflow-y-auto"
        role="main"
        aria-label="Main content"
      >
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      <AccessibilityPanel />
    </div>
  );
}
