# Cognitive Partner - Frontend

> React + TypeScript frontend for the Cognitive Partner AI platform

This is the frontend application for Cognitive Partner, built with React 18, TypeScript, and Tailwind CSS. It provides an accessible, neurodivergent-friendly interface for AI chat, prompt libraries, career discovery, and more.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Tech Stack

- **React 18** - UI framework with hooks
- **TypeScript** - Type safety and better DX
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **Local Storage** - Client-side data persistence (privacy-focused)

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx       # Navigation header with buttons
│   │   ├── ChatInterface.tsx # Main AI chat interface
│   │   ├── ChatMessage.tsx  # Individual chat message component
│   │   ├── LandingPage.tsx  # Marketing/landing page
│   │   ├── Leaderboard.tsx  # AI tool comparison leaderboard
│   │   └── PromptLibrary.tsx # Prompt library browser
│   │
│   ├── pages/              # Full page components
│   │   └── careerDiscovery/
│   │       ├── CareerDiscovery.tsx      # Career discovery hub
│   │       ├── CareerProfile.tsx        # Career profile builder
│   │       ├── CareerResults.tsx        # Career matching results
│   │       ├── CareerDetail.tsx         # Individual career details
│   │       ├── LifeSkills.tsx           # Life skills lessons
│   │       ├── AILiteracy.tsx           # AI literacy training
│   │       └── AIAgentsWorkflows.tsx    # AI agents & workflows
│   │
│   ├── data/               # Static data and content
│   │   ├── prompts.ts      # Prompt library data
│   │   ├── leaderboard.ts  # AI tool benchmark data
│   │   └── careerDiscovery/
│   │       ├── careers.ts   # Career profiles (30+ careers)
│   │       ├── lifeSkills.ts # Life skills lessons
│   │       ├── aiLiteracy.ts # AI literacy modules
│   │       └── aiAgents.ts   # AI agents and workflows
│   │
│   ├── types/              # TypeScript type definitions
│   │   ├── chat.ts         # Chat-related types
│   │   ├── prompt.ts       # Prompt library types
│   │   └── career.ts       # Career discovery types
│   │
│   ├── utils/              # Utility functions
│   │   ├── speechSynthesis.ts  # Text-to-speech utilities
│   │   └── storage.ts          # Local storage helpers
│   │
│   ├── App.tsx             # Main app component & routing
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles & Tailwind imports
│
├── public/                 # Static assets
│   └── dyslexic-ai-logo.svg
│
├── tailwind.config.js      # Tailwind configuration (brand colors)
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
└── package.json            # Dependencies and scripts
```

## Brand Colors

Our color system is defined in `tailwind.config.js`:

```javascript
primary: {
  500: '#FF66CC',  // Pink - Main brand color
}
accent: {
  500: '#66CCFF',  // Baby Blue - Secondary color
}
highlight: {
  500: '#19EF22',  // Neon Green - Accent/highlights
}
orange: {
  500: '#FF5C00',  // Orange - Career Discovery
}
```

**Usage in components:**
- `bg-primary-500` / `text-primary-500` - Pink
- `bg-accent-500` / `text-accent-500` - Baby Blue
- `bg-highlight-500` / `text-highlight-500` - Neon Green
- `bg-orange-500` / `text-orange-500` - Orange

## Key Features & Implementation

### 1. AI Chat Interface (`ChatInterface.tsx`)

**Two thinking modes:**
- **SOCRATIC** (Baby Blue): Exploratory, question-based, lateral thinking
- **STRATEGIC** (Pink): Direct, actionable, linear thinking

**Accessibility features:**
- Text-to-speech (Speech Synthesis API)
- Voice input (Speech Recognition API)
- Simplify responses (re-prompts AI for simpler language)
- Message regeneration
- Mind map conversion (planned)
- Task extraction (planned)

**State management:**
```typescript
const [messages, setMessages] = useState<Message[]>([]);
const [mode, setMode] = useState<'socratic' | 'strategic'>('socratic');
const [isListening, setIsListening] = useState(false);
```

### 2. Prompt Library (`PromptLibrary.tsx`)

**30+ prompts organized by:**
- Category (student, professional, entrepreneur, teacher, parent, coach)
- Mode compatibility (Socratic/Strategic)
- Tags (searchable)

**Features:**
- Search across prompts
- Filter by category and mode
- Copy prompt to clipboard
- Star/favorite prompts (local storage)
- View examples and use cases

### 3. Career Discovery System

**Multi-step user flow:**

1. **CareerDiscovery.tsx** - Hub/landing page
2. **CareerProfile.tsx** - 7-step questionnaire
   - Neurodivergent identity
   - Strengths assessment
   - Challenges identification
   - Sensory preferences
   - Social preferences
   - Work style preferences
   - Interests & goals
3. **CareerResults.tsx** - Ranked career matches
   - Cognitive fit score (0-100)
   - AI automation risk (low/medium/high)
   - Sensory demands (low/medium/high)
   - Social interaction level (low/medium/high)
4. **CareerDetail.tsx** - Individual career deep-dive
   - Full job description
   - Why it's a good fit
   - Challenges to consider
   - Growth path
   - Resources & next steps

**Data storage:**
```typescript
// Stored in localStorage
interface UserProfile {
  neurodivergentIdentity: string[];
  strengths: string[];
  challenges: string[];
  // ... other profile fields
}
```

### 4. Life Skills System (`LifeSkills.tsx`)

**Organized by 5 core themes:**
- 🧠 Capacity & Executive Function (Purple)
- 📅 Organizing Systems (Blue)
- ❤️ Sensory & Emotional Regulation (Green)
- 🛡️ Masking & Camouflaging (Pink)
- 💬 Communication & Self-Advocacy (Cyan)

**Each lesson includes:**
- Learning objectives
- Step-by-step content
- Real-world examples
- Practice exercises
- Next steps

### 5. AI Agents & Workflows (`AIAgentsWorkflows.tsx`)

**10 pre-built AI agents:**
- Task Breakdown Assistant
- Energy Pattern Analyzer
- Calendar Translator
- Money Management Coach
- Meltdown Early Warning System
- Personal Calm-Down Plan Builder
- Social Script Generator
- Masking Audit Tool
- Accommodation Request Writer
- Interview Prep Coach

**3 multi-step workflows:**
- Complete Job Application Workflow
- First Day of Work Preparation
- Workplace Accommodation Request Process

**Features:**
- Copyable system prompts
- Voice-to-text templates
- Typed templates
- Example inputs/outputs
- Energy level indicators
- Break reminders

## State Management

This app uses **React hooks** for state management (no Redux/external state library).

**App-level state** (`App.tsx`):
```typescript
const [showLandingPage, setShowLandingPage] = useState(true);
const [showChat, setShowChat] = useState(false);
const [showPromptLibrary, setShowPromptLibrary] = useState(false);
const [showLeaderboard, setShowLeaderboard] = useState(false);
const [showCareerDiscovery, setShowCareerDiscovery] = useState(false);
const [showAIAgentsWorkflows, setShowAIAgentsWorkflows] = useState(false);
```

**Local storage for:**
- User profile (career discovery)
- Chat history (optional)
- Accessibility preferences (font, TTS settings)
- Favorited prompts

## Styling Guidelines

We use **Tailwind CSS** with custom configuration.

**Key patterns:**

```tsx
// Card with hover effect
<div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-primary-500 transition-all">

// Button with brand color
<button className="bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-4 py-2 transition-colors">

// Gradient backgrounds
<div className="bg-gradient-to-br from-primary-500 to-accent-500">

// Responsive grid
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
```

**Accessibility classes:**
- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- Include `aria-label` for icon-only buttons
- Maintain color contrast ratios (WCAG AA minimum)
- Support `dyslexic` font class for OpenDyslexic font

## Accessibility Implementation

### Text-to-Speech

```typescript
// utils/speechSynthesis.ts
export function speakText(text: string, rate: number = 1.0) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
}
```

### Voice Input

```typescript
// Speech Recognition API
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.interimResults = false;

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  setInput(transcript);
};
```

### Dyslexic Fonts

```css
/* index.css */
@font-face {
  font-family: 'OpenDyslexic';
  src: url('/fonts/OpenDyslexic-Regular.woff2') format('woff2');
}

.font-dyslexic {
  font-family: 'OpenDyslexic', 'Comic Sans MS', 'Verdana', sans-serif;
}
```

## Development Guidelines

### Component Structure

```tsx
// Good component structure
interface ComponentProps {
  onAction: () => void;
  data: DataType;
}

export function Component({ onAction, data }: ComponentProps) {
  const [localState, setLocalState] = useState<StateType>();

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  const handleEvent = () => {
    // Event handlers
  };

  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

### TypeScript Best Practices

- Define interfaces in `src/types/`
- Use type inference where possible
- Avoid `any` type
- Export reusable types

```typescript
// types/career.ts
export interface Career {
  id: string;
  title: string;
  category: CareerCategory;
  // ... more fields
}

export type CareerCategory =
  | 'creative-arts'
  | 'technology'
  | 'science-research'
  // ... more categories
```

### Adding New Features

1. **Create types** in `src/types/`
2. **Add data** in `src/data/` (if static)
3. **Build component** in appropriate directory
4. **Add routing** in `App.tsx`
5. **Update navigation** in `Header.tsx` or `LandingPage.tsx`
6. **Test accessibility** (TTS, keyboard nav, screen readers)

## Building for Production

```bash
# Build optimized production bundle
npm run build

# Output: dist/ folder
# - index.html
# - assets/index-[hash].js
# - assets/index-[hash].css
```

**Build optimizations:**
- Code splitting (Vite automatic)
- Tree shaking (removes unused code)
- CSS purging (Tailwind removes unused styles)
- Asset minification

**Deployment:**
- Deploy `dist/` folder to static hosting
- Works with: Vercel, Netlify, GitHub Pages, S3, etc.
- No server-side rendering needed (SPA)

## Environment Variables

Currently, the app doesn't use environment variables (no API keys needed). If you add external APIs:

```bash
# .env.local
VITE_API_KEY=your_key_here
VITE_API_URL=https://api.example.com
```

Access in code:
```typescript
const apiKey = import.meta.env.VITE_API_KEY;
```

## Troubleshooting

### Issue: Vite dev server won't start

**Solution:**
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue: TypeScript errors after adding new types

**Solution:**
```bash
npm run build  # Forces TypeScript check
# Fix errors shown in output
```

### Issue: Tailwind classes not working

**Solution:**
1. Check `tailwind.config.js` has correct content paths
2. Restart dev server
3. Check class name spelling (e.g., `bg-primary-500` not `bg-primary`)

### Issue: Text-to-speech not working

**Solution:**
- Text-to-speech uses browser API (not all browsers support it)
- Test in Chrome/Edge (best support)
- Check browser console for errors
- Ensure HTTPS (some browsers require secure context)

## Performance

**Current bundle size:**
- JS: ~854 KB (241 KB gzipped)
- CSS: ~54 KB (8.6 KB gzipped)

**Optimization opportunities:**
- Code split by route (React.lazy)
- Lazy load career data
- Virtual scrolling for long lists
- Image optimization (if adding images)

## Browser Support

- Chrome/Edge 90+ ✅
- Firefox 90+ ✅
- Safari 14+ ✅
- Mobile browsers (iOS Safari, Chrome Android) ✅

**Note:** Text-to-speech and voice input require modern browser APIs.

## Contributing to Frontend

**Before submitting PR:**

1. Run linter: `npm run lint`
2. Test build: `npm run build`
3. Test accessibility:
   - Keyboard navigation
   - Screen reader (NVDA, VoiceOver)
   - Color contrast
4. Test on mobile viewport
5. Check TypeScript types

**Code style:**
- Use functional components with hooks
- Prefer `const` over `let`
- Use descriptive variable names
- Add comments for complex logic
- Keep components under 300 lines (split if larger)

## License

See main project LICENSE file.

---

**Need help?** Check the main README or open an issue on GitHub.

**Built with ❤️ for neurodivergent developers and users**
