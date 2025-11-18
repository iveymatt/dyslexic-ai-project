export type ThinkingMode = 'socratic' | 'strategic' | 'skeptic';

export type SubAgent =
  | 'think-out-loud'
  | 'executive-strategist'
  | 'writing-clarity'
  | 'task-breakdown'
  | 'research-digest'
  | 'reality-check'
  | 'risk-assessor'
  | 'assumption-challenger';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  mode?: ThinkingMode;
  subAgent?: SubAgent;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  mode: ThinkingMode;
  subAgent: SubAgent;
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

export interface SubAgentConfig {
  id: SubAgent;
  name: string;
  description: string;
  systemPrompt: string;
}

export interface ModeConfig {
  id: ThinkingMode;
  name: string;
  description: string;
  tagline: string;
  color: string;
  subAgents: SubAgentConfig[];
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
