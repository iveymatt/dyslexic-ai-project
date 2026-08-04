import { Sidebar } from './Sidebar';
import { ChatArea } from './ChatArea';

export function ChatInterface() {
  return (
    <div className="flex h-full overflow-hidden relative">
      {/* Sidebar — desktop: inline, mobile: overlay drawer */}
      <Sidebar />

      {/* Center - Chat Area (always full-width on mobile) */}
      <ChatArea />
    </div>
  );
}
