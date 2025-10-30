export type AgentMode = 'study-buddy' | 'writing-helper' | 'task-master' | 'executive-coach' | 'research-partner';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  agentMode?: AgentMode;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  agentMode: AgentMode;
}

export interface AccessibilitySettings {
  fontSize: number; // 16-24px
  lineSpacing: number; // 1.5-2.0
  fontFamily: 'inter' | 'poppins' | 'opendyslexic' | 'verdana' | 'comic-sans';
  colorScheme: 'dark' | 'light' | 'high-contrast';
  ttsSpeed: number; // 0.5-2.0
  ttsVoice: string;
  readingGuideEnabled: boolean;
}

export interface AgentConfig {
  id: AgentMode;
  name: string;
  description: string;
  icon: string;
  systemPrompt: string;
  color: string;
  examplePrompts: string[];
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

export interface MindMapNode {
  id: string;
  label: string;
  children?: MindMapNode[];
  color?: string;
}
