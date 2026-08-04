import { Plus, MessageSquare, Trash2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Chat } from '../types';

export function Sidebar() {
  const { chats, currentChat, setCurrentChat, createNewChat, deleteChat, sidebarOpen, setSidebarOpen } = useApp();

  const groupChatsByDate = (chats: Chat[]) => {
    const groups: { [key: string]: Chat[] } = {
      Today: [],
      Yesterday: [],
      'This Week': [],
      'Older': [],
    };

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    chats.forEach(chat => {
      const chatDate = new Date(chat.updatedAt);
      if (chatDate >= today) {
        groups.Today.push(chat);
      } else if (chatDate >= yesterday) {
        groups.Yesterday.push(chat);
      } else if (chatDate >= weekAgo) {
        groups['This Week'].push(chat);
      } else {
        groups.Older.push(chat);
      }
    });

    return groups;
  };

  const groupedChats = groupChatsByDate(chats);

  const sidebarContent = (
    <aside
      className="flex flex-col h-full"
      style={{ background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-color)' }}
    >
      {/* Header with close button on mobile */}
      <div className="p-4 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <button
          onClick={() => createNewChat()}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          <span>New Chat</span>
        </button>
        {/* Close button — visible on mobile only */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden btn-icon p-2"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {Object.entries(groupedChats).map(([group, groupChats]) => {
          if (groupChats.length === 0) return null;

          return (
            <div key={group} className="mb-4">
              <h3 className="px-4 py-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                {group}
              </h3>
              <div className="space-y-1 px-2">
                {groupChats.map(chat => (
                  <div
                    key={chat.id}
                    className="group relative flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors"
                    style={currentChat?.id === chat.id
                      ? { background: 'var(--bg-accent)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }
                      : { color: 'var(--text-secondary)' }
                    }
                    onClick={() => {
                      setCurrentChat(chat);
                      // Auto-close sidebar on mobile after selecting a chat
                      if (window.innerWidth < 768) {
                        setSidebarOpen(false);
                      }
                    }}
                  >
                    <MessageSquare size={16} className="flex-shrink-0" />
                    <span className="flex-1 truncate text-sm">{chat.title}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this chat?')) {
                          deleteChat(chat.id);
                        }
                      }}
                      className="opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 p-1 hover:bg-red-600 rounded transition-all"
                      aria-label="Delete chat"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {chats.length === 0 && (
          <div className="p-8 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
            <MessageSquare size={48} className="mx-auto mb-3 opacity-30" />
            <p>No conversations yet.</p>
            <p className="mt-1">Start a new chat to begin!</p>
          </div>
        )}
      </div>
    </aside>
  );

  // Desktop: standard sidebar
  // Mobile: overlay drawer
  return (
    <>
      {/* Desktop sidebar — hidden on mobile */}
      <div className="hidden md:block w-64 h-full flex-shrink-0" style={{ display: sidebarOpen ? undefined : 'none' }}>
        {sidebarContent}
      </div>

      {/* Mobile drawer overlay */}
      {sidebarOpen && (
        <div className="md:hidden">
          {/* Backdrop */}
          <div
            className="sidebar-mobile-overlay"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div className="sidebar-mobile-drawer">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
