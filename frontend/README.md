# Cognitive Partner 🧠

**The first AI chat assistant designed specifically for dyslexic and neurodivergent thinkers.**

Clean interface. Clear typography. Built-in accessibility. Your brain, amplified.

## 🌟 Features

### Core Capabilities
- **AI Chat Interface** - Natural conversations with context memory
- **5 Specialized Agents** - Different AI personas for different thinking tasks
- **Text-to-Speech** - Every message can be read aloud with adjustable speed
- **Voice Input** - Speak your thoughts instead of typing
- **Reading Simplifier** - Instantly rewrite responses in simpler language
- **Mind Map Generator** - Turn text into visual diagrams
- **Task Extraction** - Automatically extract action items from conversations

### Accessibility First
- **Dyslexic-Friendly Fonts** - OpenDyslexic, Comic Sans, Verdana, and more
- **Adjustable Text Size** - 16px to 24px with live preview
- **Line Spacing Control** - 1.5x to 2.0x for comfortable reading
- **High Contrast Mode** - WCAG AAA compliant
- **Dark Mode Default** - Reduces eye strain
- **Generous Spacing** - No cramped text
- **Clear Labels** - Every button has icon + text
- **Reading Guide** - Highlights text as AI reads

## 🤖 AI Agents

### Study Buddy 📚
Learn through Socratic questions, analogies, and bite-sized explanations.

### Writing Helper ✍️
Improve clarity, grammar, and structure without losing your voice.

### Task Master ✅
Break overwhelming projects into small, manageable steps.

### Executive Coach 🎯
Time management, prioritization, and focus strategies for ADHD brains.

### Research Partner 🔍
Summarize articles, extract key points, and organize findings.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app!

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🛠️ Tech Stack

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 3** - Utility-first styling
- **Vite** - Fast build tool
- **Lucide Icons** - Clean, accessible icons
- **React Markdown** - Render formatted responses
- **Web Speech API** - Text-to-speech and voice input

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/         # React components
│   │   ├── Header.tsx      # Top navigation
│   │   ├── Sidebar.tsx     # Chat history
│   │   ├── ChatArea.tsx    # Main chat interface
│   │   ├── MessageBubble.tsx
│   │   ├── InputBar.tsx    # Text + voice input
│   │   ├── AccessibilityPanel.tsx
│   │   ├── QuickActions.tsx
│   │   └── LandingPage.tsx
│   ├── context/
│   │   └── AppContext.tsx  # Global state management
│   ├── config/
│   │   └── agents.ts       # AI agent configurations
│   ├── types/
│   │   └── index.ts        # TypeScript interfaces
│   ├── utils/
│   │   └── mockResponses.ts # Demo AI responses
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css           # Tailwind + custom styles
├── public/
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Customization

### Adding New Agents

Edit `src/config/agents.ts`:

```typescript
'your-agent-id': {
  id: 'your-agent-id',
  name: 'Your Agent Name',
  description: 'Brief description',
  icon: 'Brain',
  color: 'bg-indigo-600',
  systemPrompt: `Your detailed system prompt...`,
  examplePrompts: [
    'Example question 1',
    'Example question 2',
  ],
}
```

### Changing Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* your colors */ },
      accent: { /* your colors */ },
    },
  },
}
```

### Adjusting Accessibility Defaults

Edit `src/context/AppContext.tsx`:

```typescript
const defaultAccessibilitySettings: AccessibilitySettings = {
  fontSize: 18,           // Default text size
  lineSpacing: 1.75,      // Default line spacing
  fontFamily: 'poppins',  // Default font
  // ...
};
```

## 🔌 API Integration

Currently, the app uses mock responses for demonstration. To integrate with real AI APIs:

1. **Install API client**:
```bash
npm install openai  # or @anthropic-ai/sdk, etc.
```

2. **Create API service** (`src/services/ai.ts`):
```typescript
export async function sendMessage(message: string, agentMode: AgentMode) {
  const response = await fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${YOUR_API_KEY}`
    },
    body: JSON.stringify({ message, agentMode }),
  });
  return response.json();
}
```

3. **Replace mock in `ChatArea.tsx`**:
```typescript
// Replace this:
const response = generateMockResponse(content, currentAgentMode);

// With this:
const response = await sendMessage(content, currentAgentMode);
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy!

### Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
# Or connect GitHub repo for continuous deployment
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-p", "3000"]
EXPOSE 3000
```

Build and run:
```bash
docker build -t cognitive-partner .
docker run -p 3000:3000 cognitive-partner
```

## ♿ Accessibility Compliance

- **WCAG AAA** color contrast ratios
- **Keyboard navigation** fully supported
- **Screen reader** compatible
- **Reduced motion** respects user preferences
- **High contrast mode** support
- **Text scaling** without layout breaks
- **Clear focus indicators** on all interactive elements

## 🧪 Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npx tsc --noEmit

# Lint (when configured)
npm run lint
```

## 🤝 Contributing

Contributions welcome! This project aims to be the most accessible AI chat interface available.

### Areas for Contribution
- Additional dyslexic-friendly fonts
- More accessibility features
- UI/UX improvements
- Bug fixes
- Documentation
- Translations
- Testing

### Development Guidelines
1. Follow existing code style
2. Test accessibility features
3. Update documentation
4. Ensure TypeScript types are correct
5. Test on multiple devices/browsers

## 📝 License

MIT License - feel free to use this project for your own purposes!

## 🙏 Acknowledgments

Built with ❤️ for the neurodivergent community.

Special thanks to:
- Typingmind.com for UI inspiration
- Claude.ai for clean design patterns
- LMArena for simplicity principles
- The dyslexic and ADHD communities for feedback

## 💡 Future Features

- [ ] Integration with OpenAI, Anthropic, and other AI APIs
- [ ] User accounts and cloud sync
- [ ] Custom agent creation
- [ ] Export conversations to PDF/Markdown
- [ ] Mobile app (React Native)
- [ ] Browser extension
- [ ] Collaborative features
- [ ] Advanced mind mapping
- [ ] Study session tracking
- [ ] Pomodoro timer integration

## 📬 Support

Questions? Ideas? Feedback?
- Open a GitHub Issue
- Star the project if you find it helpful!
- Share with neurodivergent friends who might benefit

---

**Made by neurodivergent thinkers, for neurodivergent thinkers.** 🧠✨
