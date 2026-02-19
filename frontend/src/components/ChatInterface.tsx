import { Sidebar } from './Sidebar';
import { ChatArea } from './ChatArea';

export function ChatInterface() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Sidebar - Chat History */}
      <Sidebar />

      {/* Center - Chat Area */}
      <ChatArea />
    </div>
  );
}
