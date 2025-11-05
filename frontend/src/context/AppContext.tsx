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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultAccessibilitySettings: AccessibilitySettings = {
  fontSize: 16,
  lineSpacing: 1.5,
  fontFamily: 'inter',
  colorScheme: 'dark',
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

    // Apply font family
    const fontMap = {
      inter: 'Inter, system-ui, sans-serif',
      poppins: 'Poppins, system-ui, sans-serif',
      opendyslexic: 'OpenDyslexic, sans-serif',
      verdana: 'Verdana, sans-serif',
      'comic-sans': 'Comic Sans MS, cursive',
    };
    document.body.style.fontFamily = fontMap[accessibilitySettings.fontFamily];

    // Apply color scheme
    if (accessibilitySettings.colorScheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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
    setChats([newChat, ...chats]);
    setCurrentChat(newChat);
    setCurrentMode(mode);
    setCurrentSubAgent(subAgent);
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    if (!currentChat) {
      createNewChat();
      return;
    }

    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date(),
    };

    const updatedChat: Chat = {
      ...currentChat,
      messages: [...currentChat.messages, newMessage],
      updatedAt: new Date(),
      // Update title from first user message
      title: currentChat.messages.length === 0 && message.role === 'user'
        ? message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '')
        : currentChat.title,
    };

    setCurrentChat(updatedChat);
    setChats(chats.map(chat => chat.id === updatedChat.id ? updatedChat : chat));
  };

  const deleteChat = (chatId: string) => {
    setChats(chats.filter(chat => chat.id !== chatId));
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
