import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Chat, Message, AccessibilitySettings, ThinkingMode, SubAgent } from '../types';
import { defaultMode, defaultSubAgent } from '../config/modes';

interface AppContextType {
  // Chat state
  chats: Chat[];
  currentChat: Chat | null;
  setCurrentChat: (chat: Chat | null) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  createNewChat: (mode?: ThinkingMode, subAgent?: SubAgent) => void;
  deleteChat: (chatId: string) => void;

  // Accessibility state
  accessibilitySettings: AccessibilitySettings;
  updateAccessibilitySettings: (settings: Partial<AccessibilitySettings>) => void;

  // UI state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  accessibilityPanelOpen: boolean;
  setAccessibilityPanelOpen: (open: boolean) => void;

  // Mode and sub-agent
  currentMode: ThinkingMode;
  setCurrentMode: (mode: ThinkingMode) => void;
  currentSubAgent: SubAgent;
  setCurrentSubAgent: (subAgent: SubAgent) => void;

  // TTS state
  isSpeaking: boolean;
  setIsSpeaking: (speaking: boolean) => void;

  // Pending prompt (from prompt library "Use in Chat")
  pendingPrompt: string | null;
  setPendingPrompt: (prompt: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultAccessibilitySettings: AccessibilitySettings = {
  fontSize: 16,
  lineSpacing: 1.5,
  fontFamily: 'default',
  colorScheme: 'light',
  ttsSpeed: 1.0,
  ttsVoice: 'default',
  readingGuideEnabled: false,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>(
    defaultAccessibilitySettings
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [accessibilityPanelOpen, setAccessibilityPanelOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState<ThinkingMode>(defaultMode);
  const [currentSubAgent, setCurrentSubAgent] = useState<SubAgent>(defaultSubAgent);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedChats = localStorage.getItem('cognitive-partner-chats');
    const savedSettings = localStorage.getItem('cognitive-partner-settings');

    if (savedChats) {
      try {
        const parsed = JSON.parse(savedChats);
        // Convert date strings back to Date objects
        const chatsWithDates = parsed.map((chat: any) => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          updatedAt: new Date(chat.updatedAt),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }));
        setChats(chatsWithDates);
      } catch (e) {
        console.error('Failed to parse saved chats', e);
      }
    }

    if (savedSettings) {
      try {
        setAccessibilitySettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Failed to parse saved settings', e);
      }
    }
  }, []);

  // Save to localStorage when chats change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('cognitive-partner-chats', JSON.stringify(chats));
    }
  }, [chats]);

  // Save accessibility settings
  useEffect(() => {
    localStorage.setItem('cognitive-partner-settings', JSON.stringify(accessibilitySettings));

    // Apply settings to document
    document.documentElement.style.fontSize = `${accessibilitySettings.fontSize}px`;
    document.documentElement.style.lineHeight = `${accessibilitySettings.lineSpacing}`;

    // Apply font family via body classes
    document.body.classList.remove('dyslexic-mode', 'jetbrains-mode');
    const fontMap: Record<string, string> = {
      default: '',
      opendyslexic: 'dyslexic-mode',
      jetbrains: 'jetbrains-mode',
      verdana: '',
      'comic-sans': '',
    };
    const fontClass = fontMap[accessibilitySettings.fontFamily];
    if (fontClass) {
      document.body.classList.add(fontClass);
    }
    // For fonts that don't have a body class, apply directly
    const directFontMap: Record<string, string> = {
      default: "'Futura', 'Avenir Next', 'Century Gothic', -apple-system, sans-serif",
      verdana: 'Verdana, sans-serif',
      'comic-sans': "'Comic Sans MS', cursive",
    };
    if (directFontMap[accessibilitySettings.fontFamily]) {
      document.body.style.fontFamily = directFontMap[accessibilitySettings.fontFamily];
    } else {
      document.body.style.fontFamily = '';
    }

    // Apply color scheme via data-theme attribute
    if (accessibilitySettings.colorScheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (accessibilitySettings.colorScheme === 'high-contrast') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('high-contrast');
    }
  }, [accessibilitySettings]);

  const createNewChat = (mode: ThinkingMode = defaultMode, subAgent: SubAgent = defaultSubAgent) => {
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      mode,
      subAgent,
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChat(newChat);
    setCurrentMode(mode);
    setCurrentSubAgent(subAgent);
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date(),
    };

    setCurrentChat(prev => {
      if (!prev) {
        // Create a new chat WITH this message included
        const newChat: Chat = {
          id: `chat-${Date.now()}`,
          title: message.role === 'user'
            ? message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '')
            : 'New Conversation',
          messages: [newMessage],
          createdAt: new Date(),
          updatedAt: new Date(),
          mode: currentMode,
          subAgent: currentSubAgent,
        };
        setChats(prevChats => [newChat, ...prevChats]);
        return newChat;
      }

      const updatedChat: Chat = {
        ...prev,
        messages: [...prev.messages, newMessage],
        updatedAt: new Date(),
        // Update title from first user message
        title: prev.messages.length === 0 && message.role === 'user'
          ? message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '')
          : prev.title,
      };

      setChats(prevChats => prevChats.map(chat => chat.id === updatedChat.id ? updatedChat : chat));
      return updatedChat;
    });
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChat?.id === chatId) {
      setCurrentChat(null);
    }
  };

  const updateAccessibilitySettings = (settings: Partial<AccessibilitySettings>) => {
    setAccessibilitySettings(prev => ({ ...prev, ...settings }));
  };

  return (
    <AppContext.Provider
      value={{
        chats,
        currentChat,
        setCurrentChat,
        addMessage,
        createNewChat,
        deleteChat,
        accessibilitySettings,
        updateAccessibilitySettings,
        sidebarOpen,
        setSidebarOpen,
        accessibilityPanelOpen,
        setAccessibilityPanelOpen,
        currentMode,
        setCurrentMode,
        currentSubAgent,
        setCurrentSubAgent,
        isSpeaking,
        setIsSpeaking,
        pendingPrompt,
        setPendingPrompt,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
