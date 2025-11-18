import type { AITool } from '../types/leaderboard';

export const aiTools: AITool[] = [
  {
    id: 'cognitive-partner',
    name: 'Cognitive Partner',
    website: '#',
    description: 'AI chat specifically designed for dyslexic and neurodivergent thinkers',
    category: 'chat',
    type: 'llm',
    overallScore: 9.2,
    featuresScore: 9.0,
    neurodivergentAssessment: {
      scores: {
        lateralThinking: 10,
        linearThinking: 9,
        languageAdaptability: 10,
        neurodivergentAwareness: 10,
        overall: 9.75,
      },
      bestAt: [
        'Lateral exploration and creative connections',
        'Simplifying complex language',
        'Adapting to both non-linear and structured thinking',
        'Celebrating neurodivergent strengths',
      ],
      weakAt: [
        'Currently uses mock responses (real AI integration coming)',
      ],
      perfectFor: [
        'Learning new concepts through exploration',
        'Breaking down overwhelming projects',
        'Getting both creative and structured support',
        'Accessibility-focused interactions',
      ],
      notIdealFor: [
        'Real-time web search (coming soon)',
        'Image generation',
      ],
      testResults: [
        {
          dimension: 'lateralThinking',
          prompt: 'I want to build something but I\'m not sure what yet. I like coding and music. What questions should I ask myself to figure out what to build?',
          response: 'Great! Let\'s explore together. I have some questions that might help:\n\n• What part of music excites you most? Creating it, organizing it, or sharing it?\n• When you code, what feels most satisfying? Building tools, solving puzzles, or making things visual?\n• Do you want to build something for yourself, or for other people to use?\n• Are you drawn to structure (like organizing music libraries) or creativity (like generating melodies)?\n• What frustrates you about existing music tools?\n\nNo rush to answer all of these! Pick one that sparks something and let\'s dig deeper.',
          score: 10,
          reasoning: 'Asks curious, open-ended questions that encourage exploration. Doesn\'t force structure. Celebrates the uncertainty and invites tangential thinking.',
        },
        {
          dimension: 'linearThinking',
          prompt: 'Help me break down starting a personal website into steps. I get overwhelmed easily. Make it as simple as possible with time estimates.',
          response: '**GOAL:** Launch a simple personal website\n\n**STEPS:**\n\n1. **Pick a platform** (30 min)\n   - Try GitHub Pages (free, simple)\n   - Or Notion (easiest, no code)\n   \n2. **Write 3 sentences about yourself** (15 min)\n   - Who you are\n   - What you do\n   - What you\'re interested in\n\n3. **Add contact info** (5 min)\n   - Email or social links\n\n4. **Publish** (10 min)\n   - Hit the "publish" button\n\n**Total time: 1 hour**\n\nStart with step 1. Just pick one platform. Don\'t overthink it. You can always change later.',
          score: 9,
          reasoning: 'Clear numbered steps, realistic time estimates, simple language. Acknowledges overwhelm and provides reassurance. Could be slightly more concise.',
        },
        {
          dimension: 'languageAdaptability',
          prompt: 'Explain neural networks to someone with dyslexia who\'s never heard of it before. Use simple words. Keep it short.',
          response: '**Neural networks = pattern-finding machines**\n\nThink of it like this:\n\nYou show it 1,000 pictures of cats.\nIt finds patterns: "pointy ears, whiskers, small nose."\nNow it can spot cats in new pictures.\n\nThat\'s it. It finds patterns in data.\n\nThe "neural" part? It\'s inspired by how brains connect ideas together.\n\nBut really: **it\'s just pattern-matching at scale.**',
          score: 10,
          reasoning: 'Uses simple analogy, short sentences, bold key concepts. Breaks into digestible chunks. Explains the "neural" term without jargon. Perfect for dyslexic processing.',
        },
        {
          dimension: 'neurodivergentAwareness',
          prompt: 'I have dyslexia and ADHD. I need help organizing my work. What strategies work best for brains like mine?',
          response: '**Your brain\'s strengths:**\n• Big-picture thinking\n• Creative problem-solving\n• Hyperfocus when interested\n\n**Strategies that work WITH your brain:**\n\n1. **Externalize everything**\n   - Brain dump into voice notes or drawings\n   - Get it OUT of your head first\n\n2. **Visual organizing**\n   - Color-code tasks by energy level\n   - Use Kanban boards (Trello, Notion)\n   - Mind maps for connections\n\n3. **Micro-commitments**\n   - "I\'ll just do 5 minutes"\n   - Lower the activation energy\n\n4. **Body doubling**\n   - Work alongside someone (even virtually)\n   - ADHD brains focus better with presence\n\n5. **Interest-driven scheduling**\n   - Do the interesting thing first\n   - Use that momentum\n\n**What NOT to do:**\n❌ Force yourself into neurotypical systems\n❌ Ignore your hyperfocus superpowers\n\nYour brain isn\'t broken. It needs different tools.',
          score: 10,
          reasoning: 'Celebrates strengths first. Offers neurodivergent-specific strategies. Affirming tone. Practical and actionable. Explicitly rejects deficit framing.',
        },
      ],
    },
    strengths: [
      'Built specifically for neurodivergent thinkers',
      'Adjustable fonts, sizes, and spacing',
      'Text-to-speech and voice input built-in',
      'Both SOCRATIC (exploration) and STRATEGIC (direct answers) modes',
    ],
    weaknesses: [
      'Newer tool (less established)',
      'Currently uses mock responses',
    ],
    dyslexicFriendlyFeatures: [
      'OpenDyslexic font option',
      'Adjustable line spacing (1.5x - 2.0x)',
      'Text-to-speech for all responses',
      'Voice input to avoid typing',
      'High-contrast color themes',
      'Larger font sizes (16-24px)',
      'Simple, conversational language',
    ],
    bestUseCases: [
      'Exploring ideas without judgment',
      'Breaking down overwhelming tasks into steps',
      'Learning new concepts at your own pace',
      'Getting both creative AND structured support',
      'Accessible reading and writing assistance',
    ],
    features: {
      textToSpeech: true,
      voiceInput: true,
      customization: true,
      simplification: true,
      structuredOutput: true,
      visualOutputs: true,
      contextMemory: true,
    },
    pricing: {
      free: true,
      paid: false,
      priceRange: 'Free (open source)',
    },
    modelPrompts: [
      {
        id: 'explore-idea',
        title: 'Explore a New Idea',
        prompt: 'I have an idea about [TOPIC] but I\'m not sure how to develop it. Can you ask me questions to help me think it through?',
        category: 'exploration',
        useCase: 'When you have a vague idea and need help clarifying it',
        example: 'I have an idea about starting a side project but I\'m not sure how to develop it...',
      },
      {
        id: 'break-down-task',
        title: 'Break Down Overwhelming Task',
        prompt: 'I need to [TASK] but it feels overwhelming. Can you break it into small, achievable steps with time estimates?',
        category: 'productivity',
        useCase: 'When a task feels too big to start',
        example: 'I need to write a research paper but it feels overwhelming...',
      },
      {
        id: 'simplify-concept',
        title: 'Simplify Complex Concept',
        prompt: 'Explain [CONCEPT] to me like I\'m 12. Use simple words, short sentences, and an analogy.',
        category: 'learning',
        useCase: 'When learning something new',
        example: 'Explain quantum computing to me like I\'m 12...',
      },
    ],
    reviews: [
      {
        id: 'review-1',
        author: 'Sarah M.',
        rating: 10,
        date: '2024-03-15',
        neurodivergentType: 'dyslexia + ADHD',
        review: 'Finally, an AI tool that actually gets how my brain works! The Socratic mode helps me explore ideas without feeling judged, and the Strategic mode gives me the structure I need when I\'m overwhelmed. The adjustable fonts and text-to-speech are game-changers.',
        helpful: 42,
      },
      {
        id: 'review-2',
        author: 'Alex T.',
        rating: 9,
        date: '2024-03-10',
        neurodivergentType: 'ADHD',
        review: 'Love how it breaks things down into tiny steps. The time estimates are actually realistic too! Only wish it had real AI instead of mock responses right now, but I\'m excited for the full version.',
        helpful: 28,
      },
    ],
    resources: [
      {
        id: 'resource-1',
        title: 'Getting Started Guide',
        url: '/docs/getting-started',
        type: 'guide',
        description: 'Learn how to use Cognitive Partner effectively',
      },
      {
        id: 'resource-2',
        title: 'Prompt Library',
        url: '/prompts',
        type: 'article',
        description: '30+ ready-to-use prompts for different scenarios',
      },
    ],
    notes: 'Best used for exploration and breaking down tasks. Combines the strengths of both lateral (creative) and linear (structured) thinking.',
  },
  {
    id: 'claude',
    name: 'Claude (Anthropic)',
    website: 'https://claude.ai',
    description: 'Conversational AI with strong reasoning and helpful responses',
    category: 'chat',
    type: 'llm',
    overallScore: 8.8,
    featuresScore: 8.5,
    neurodivergentAssessment: {
      scores: {
        lateralThinking: 9,
        linearThinking: 9,
        languageAdaptability: 9,
        neurodivergentAwareness: 8,
        overall: 8.75,
      },
      bestAt: [
        'Asking clarifying questions before answering',
        'Adapting to both exploratory and structured requests',
        'Using clear, accessible language',
        'Patient, encouraging tone',
      ],
      weakAt: [
        'Can be verbose (though improving)',
        'Sometimes explains too much context',
      ],
      perfectFor: [
        'Learning complex concepts',
        'Socratic-style exploration',
        'Breaking down big projects',
        'Writing and editing',
      ],
      notIdealFor: [
        'Real-time web search',
        'Image generation',
      ],
      testResults: [
        {
          dimension: 'lateralThinking',
          prompt: 'I want to build something but I\'m not sure what yet. I like coding and music. What questions should I ask myself to figure out what to build?',
          response: 'Those are great interests to combine! Let me help you explore this with some questions:\n\nFirst, about your relationship with music:\n- Do you create music yourself, or do you primarily listen and enjoy it?\n- What frustrates you about current music tools or experiences?\n- Is there a specific music problem you wish had a better solution?\n\nFor the coding side:\n- What kind of coding projects have given you the most satisfaction in the past?\n- Are you more drawn to building user interfaces, working with data, or creating algorithms?\n\nAnd thinking about the intersection:\n- Would you want to build something that helps you personally, or something others could use?\n- Are you more excited about creating music, organizing music, or analyzing music?\n\nYou don\'t need to answer all of these at once. Start with whichever question resonates most, and we can dig deeper from there.',
          score: 9,
          reasoning: 'Excellent at asking questions to explore. Encourages non-linear thinking. Slightly more verbose than ideal, but very strong at lateral support.',
        },
        {
          dimension: 'linearThinking',
          prompt: 'Help me break down starting a personal website into steps. I get overwhelmed easily. Make it as simple as possible with time estimates.',
          response: 'I understand feeling overwhelmed. Let\'s break this into small, manageable steps:\n\n**Step 1: Choose a platform (20-30 minutes)**\n- Easiest option: Carrd.co or About.me (drag-and-drop, no coding)\n- Free option with more control: GitHub Pages\n- Most flexible: WordPress.com (free tier)\n\nRecommendation: Start with Carrd if you want simple.\n\n**Step 2: Write your content (30 minutes)**\nJust write:\n- 2-3 sentences about who you are\n- 2-3 sentences about what you do\n- How people can contact you (email or social links)\n\n**Step 3: Pick a template and add your content (30 minutes)**\n- Choose any template you like the look of\n- Copy-paste your text from Step 2\n- Add a photo if you want (optional)\n\n**Step 4: Publish (5 minutes)**\n- Click the publish button\n- Done!\n\n**Total time: About 1.5-2 hours**\n\nThe key: Start with Step 1 and only Step 1. Don\'t think about the rest until you\'ve picked a platform. Would you like help choosing?',
          score: 9,
          reasoning: 'Clear structure, numbered steps, time estimates. Acknowledges overwhelm. Offers reassurance and guidance. Very helpful and organized.',
        },
        {
          dimension: 'languageAdaptability',
          prompt: 'Explain neural networks to someone with dyslexia who\'s never heard of it before. Use simple words. Keep it short.',
          response: '**Neural networks are pattern-finding machines.**\n\nHere\'s the simple version:\n\nImagine you want to teach a computer to recognize cats in photos.\n\n1. You show it thousands of cat pictures\n2. It starts noticing patterns: "Cats have pointy ears, whiskers, certain face shapes"\n3. Now when it sees a new photo, it can guess if there\'s a cat\n\nThe "neural" part comes from how it works - it\'s inspired by how brain cells connect to each other. But you can just think of it as:\n\n**"A system that learns patterns from examples."**\n\nThat\'s it! The more examples you give it, the better it gets at recognizing patterns.',
          score: 9,
          reasoning: 'Simple language, good use of bold, clear analogy. Slightly longer than requested but all content is valuable. Very accessible explanation.',
        },
        {
          dimension: 'neurodivergentAwareness',
          prompt: 'I have dyslexia and ADHD. I need help organizing my work. What strategies work best for brains like mine?',
          response: 'Great question! Dyslexic and ADHD brains often work differently from "traditional" organization systems, so let\'s focus on strategies that work WITH how your brain naturally operates:\n\n**Play to your strengths first:**\n- Visual thinking: Use color-coding, mind maps, or visual boards (like Trello/Notion)\n- Big-picture thinking: Start with the overall goal, then zoom into details\n- Hyperfocus: When you\'re in the zone, ride that wave\n\n**Practical strategies:**\n\n1. **External brain dumps**\n   - Voice memos or quick notes when ideas hit\n   - Get things OUT of your head to reduce mental load\n\n2. **Visual organization**\n   - Kanban boards (To Do → Doing → Done)\n   - Color code by urgency or type of task\n   - Keep it where you can SEE it\n\n3. **Tiny first steps**\n   - Break tasks into 5-10 minute chunks\n   - "Just open the file" instead of "write the whole report"\n\n4. **Body doubling**\n   - Work alongside someone (even virtually)\n   - Many ADHD folks focus better with company\n\n5. **Work with your energy**\n   - Do creative/hard tasks when you have energy\n   - Save easy tasks for low-energy times\n\n**What usually DOESN\'T work:**\n- Complex filing systems\n- Long to-do lists\n- "Just focus harder"\n- Ignoring your interest-based attention\n\nThe key: Find systems that feel natural to YOUR brain, not systems designed for neurotypical brains. Experiment and keep what works.',
          score: 8,
          reasoning: 'Celebrates strengths and offers neurodivergent strategies. Affirming tone. Very helpful. Loses one point for slightly clinical framing ("work differently from") but overall excellent.',
        },
      ],
    },
    strengths: [
      'Excellent at asking clarifying questions',
      'Adapts to both exploratory and structured thinking',
      'Uses simple language by default',
      'Patient and encouraging tone',
    ],
    weaknesses: [
      'Can be verbose at times',
      'Limited real-time info without integration',
    ],
    dyslexicFriendlyFeatures: [
      'Clear, conversational language',
      'Asks clarifying questions first',
      'Can simplify complex topics on request',
      'Patient, non-judgmental tone',
      'Good at structured explanations',
    ],
    bestUseCases: [
      'Learning complex concepts step-by-step',
      'Socratic-style exploration',
      'Breaking down large projects',
      'Writing and editing assistance',
      'Coding help with explanations',
    ],
    features: {
      textToSpeech: false,
      voiceInput: false,
      customization: true,
      simplification: true,
      structuredOutput: true,
      visualOutputs: false,
      contextMemory: true,
    },
    pricing: {
      free: true,
      paid: true,
      priceRange: '$20/month for Pro',
    },
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT (OpenAI)',
    website: 'https://chat.openai.com',
    description: 'Popular conversational AI with broad knowledge and capabilities',
    overallScore: 8.3,
    featuresScore: 9.0,
    neurodivergentAssessment: {
      scores: {
        lateralThinking: 8,
        linearThinking: 8,
        languageAdaptability: 9,
        neurodivergentAwareness: 7,
        overall: 8.0,
      },
      bestAt: [
        'Voice mode for speaking instead of typing',
        'Structured task breakdown',
        'Simplifying language when asked',
        'Fast responses',
      ],
      weakAt: [
        'Sometimes jumps to answers without exploration',
        'Can use jargon without prompting',
      ],
      perfectFor: [
        'Quick answers and task lists',
        'Voice conversations',
        'Multimodal tasks (code, images, analysis)',
      ],
      notIdealFor: [
        'Deep Socratic exploration',
        'Highly customized accessibility',
      ],
      testResults: [
        {
          dimension: 'lateralThinking',
          prompt: 'I want to build something but I\'m not sure what yet. I like coding and music. What questions should I ask myself to figure out what to build?',
          response: 'Here are some questions to help you narrow down your project idea:\n\n1. What aspect of music interests you most?\n   - Creating/composing music?\n   - Organizing and discovering music?\n   - Analyzing music theory?\n   - Sharing music with others?\n\n2. What type of coding do you enjoy?\n   - Web development?\n   - Data analysis?\n   - Mobile apps?\n   - Audio processing?\n\n3. What problem would you like to solve?\n   - Something for yourself or for others?\n   - A tool, a game, or an educational resource?\n\n4. Project scope:\n   - Quick weekend project or long-term build?\n\nBased on your answers, I can suggest specific project ideas!',
          score: 8,
          reasoning: 'Good questions, but structured more like a form than exploration. Slightly pushes toward linear thinking. Still allows for creative exploration.',
        },
        {
          dimension: 'linearThinking',
          prompt: 'Help me break down starting a personal website into steps. I get overwhelmed easily. Make it as simple as possible with time estimates.',
          response: 'Here\'s a simple breakdown for building a personal website:\n\n**Phase 1: Setup (1 hour)**\n1. Choose a platform\n   - Beginner: Wix, Squarespace, or Carrd (30 min)\n   - More control: WordPress or GitHub Pages (30 min)\n\n2. Pick a template/theme (15 min)\n   - Choose something simple and clean\n\n3. Get a domain name (15 min) - Optional for now\n   - Can use free subdomain to start\n\n**Phase 2: Content (1-2 hours)**\n4. Write an About section (30 min)\n   - Who you are, what you do\n\n5. Add a Projects/Work section (30 min)\n   - 2-3 examples of your work\n\n6. Add contact information (15 min)\n   - Email, social links\n\n**Phase 3: Launch (30 min)**\n7. Review and edit (15 min)\n8. Publish! (15 min)\n\n**Total: 2.5-3.5 hours**\n\nTip: Do Phase 1 today, Phase 2 tomorrow, Phase 3 the next day if you need breaks.',
          score: 8,
          reasoning: 'Clear structure and time estimates. Well-organized with phases. Helpful tip at the end. Could be slightly simpler - includes optional steps that might add confusion.',
        },
        {
          dimension: 'languageAdaptability',
          prompt: 'Explain neural networks to someone with dyslexia who\'s never heard of it before. Use simple words. Keep it short.',
          response: '**Think of a neural network like this:**\n\nImagine teaching a kid to spot dogs:\n- Show them 100 pictures of dogs\n- They notice patterns: "Dogs have four legs, fur, tails, ears"\n- Now they can identify dogs in new pictures\n\n**That\'s what neural networks do:**\n- You feed them tons of examples\n- They find patterns\n- They use those patterns to recognize new things\n\n**Why "neural"?**\nIt\'s inspired by how your brain learns - by making connections between ideas.\n\n**In one sentence:** Neural networks learn patterns from examples, like your brain does.',
          score: 9,
          reasoning: 'Excellent use of analogy, simple language, short paragraphs. Bold headers help scanning. Very accessible. Perfect for dyslexic processing.',
        },
        {
          dimension: 'neurodivergentAwareness',
          prompt: 'I have dyslexia and ADHD. I need help organizing my work. What strategies work best for brains like mine?',
          response: 'Here are strategies that work well for people with dyslexia and ADHD:\n\n**Visual Organization:**\n- Use color-coded systems (different colors for different types of tasks)\n- Try Kanban boards like Trello - visual and satisfying to move cards\n- Mind mapping tools for brainstorming\n\n**Break Tasks Into Tiny Steps:**\n- Instead of "Write report," try "Open document" → "Write intro" → "Write one paragraph"\n- Set 10-15 minute work blocks with breaks\n\n**External Memory:**\n- Voice memos for ideas (easier than typing/writing)\n- Reminders and alarms\n- Keep a "brain dump" doc for random thoughts\n\n**Work With Your Brain:**\n- Do important tasks during your peak energy time\n- Use the Pomodoro Technique (25 min work, 5 min break)\n- Body doubling: Work alongside someone, even on video\n\n**Tools That Help:**\n- Text-to-speech for reading long documents\n- Grammarly or similar for writing support\n- Forest app or similar for focus\n\n**What to Avoid:**\n- Overly complex systems\n- Long lists that feel overwhelming\n- Trying to "just focus" - it\'s not about willpower\n\nThe key: experiment and find what feels natural to you!',
          score: 7,
          reasoning: 'Practical strategies and acknowledges that it\'s "not about willpower." Helpful tools. However, feels more like a list than truly understanding neurodivergent experience. Doesn\'t celebrate strengths first.',
        },
      ],
    },
    strengths: [
      'Voice mode is excellent for speaking instead of typing',
      'Good at structured task breakdown',
      'Wide range of capabilities (code, images, web search)',
      'Fast responses',
    ],
    weaknesses: [
      'Sometimes jumps to answers too quickly',
      'Can use technical jargon',
      'Less patient with exploration',
    ],
    dyslexicFriendlyFeatures: [
      'Voice mode for hands-free interaction',
      'Can simplify language when prompted',
      'Image analysis to help with visual learning',
      'Fast responses',
      'Structured formatting with bullets and headers',
    ],
    bestUseCases: [
      'Quick answers and summaries',
      'Voice conversations',
      'Image analysis and description',
      'Code generation',
      'Task list creation',
    ],
    features: {
      textToSpeech: true,
      voiceInput: true,
      customization: true,
      simplification: true,
      structuredOutput: true,
      visualOutputs: true,
      contextMemory: true,
    },
    pricing: {
      free: true,
      paid: true,
      priceRange: '$20/month for Plus',
    },
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    website: 'https://perplexity.ai',
    description: 'AI search engine with cited sources and real-time information',
    overallScore: 7.8,
    featuresScore: 8.0,
    neurodivergentAssessment: {
      scores: {
        lateralThinking: 7,
        linearThinking: 8,
        languageAdaptability: 7,
        neurodivergentAwareness: 6,
        overall: 7.0,
      },
      bestAt: [
        'Research with citations',
        'Organized, structured output',
        'Real-time information',
      ],
      weakAt: [
        'Creative exploration',
        'Conversational depth',
        'Adapting to neurodivergent needs',
      ],
      perfectFor: [
        'Research and fact-finding',
        'Academic work',
        'Comparing multiple sources',
      ],
      notIdealFor: [
        'Brainstorming and exploration',
        'Emotional or learning support',
        'Accessibility customization',
      ],
      testResults: [
        {
          dimension: 'lateralThinking',
          prompt: 'I want to build something but I\'m not sure what yet. I like coding and music. What questions should I ask myself to figure out what to build?',
          response: 'To narrow down a project combining coding and music, consider these key questions:\n\n**Technical Direction:**\n- Are you interested in music theory (algorithms, composition) or music consumption (players, organizers)?\n- What programming languages are you comfortable with? (Python for audio processing, JavaScript for web apps, etc.)\n\n**Scope & Goals:**\n- Personal project or something for others to use?\n- Learning exercise or portfolio piece?\n- Time commitment: weekend hack or long-term project?\n\n**Existing Solutions:**\n- What current music tools frustrate you?\n- What features are missing from apps you use?\n\n**Recommended Project Ideas:**\nBased on common intersections of coding and music:\n1. Chord progression generator\n2. Music practice tracker\n3. Playlist analyzer using Spotify API\n4. MIDI visualizer\n5. Ear training web app\n\nSources: [1] GitHub trending music projects [2] Dev.to music programming guide',
          score: 7,
          reasoning: 'Jumps to solutions quickly. Provides structured questions but doesn\'t invite open exploration. More focused on efficiency than discovery. Still allows for some lateral thinking.',
        },
        {
          dimension: 'linearThinking',
          prompt: 'Help me break down starting a personal website into steps. I get overwhelmed easily. Make it as simple as possible with time estimates.',
          response: '**Simple Personal Website Setup**\n\n**Option A: No-Code (Fastest - 2 hours)**\n1. Choose platform: Carrd.co or About.me (15 min)\n2. Select template (10 min)\n3. Add content:\n   - Bio (20 min)\n   - Contact info (5 min)\n   - Links to social/work (10 min)\n4. Customize colors/fonts (20 min)\n5. Publish (5 min)\n6. Share URL (5 min)\n\n**Option B: GitHub Pages (More Control - 3-4 hours)**\n1. Create GitHub account (10 min)\n2. Fork a Jekyll theme (15 min)\n3. Edit _config.yml with your info (20 min)\n4. Write content in markdown (60 min)\n5. Enable GitHub Pages in settings (5 min)\n6. Wait for deployment (5-10 min)\n\n**Recommendation:** Start with Option A. You can always migrate later.\n\n**Resources:**\n[1] Carrd.co getting started guide\n[2] GitHub Pages documentation',
          score: 8,
          reasoning: 'Very well-organized with clear options and time estimates. Provides recommendation to reduce decision paralysis. Good for linear thinkers. Citations add credibility.',
        },
        {
          dimension: 'languageAdaptability',
          prompt: 'Explain neural networks to someone with dyslexia who\'s never heard of it before. Use simple words. Keep it short.',
          response: '**Neural Networks: Simple Explanation**\n\nA neural network is a computer system that learns from examples, similar to how humans learn.\n\n**Basic Concept:**\nImagine teaching a computer to recognize cats:\n1. Show it thousands of cat photos\n2. It identifies patterns (whiskers, ears, fur)\n3. It can now identify cats in new photos\n\n**How It Works:**\n- Made up of layers of connected nodes (like brain neurons)\n- Each layer processes information and passes it forward\n- Through training, it learns to recognize patterns\n\n**Real-World Uses:**\n- Face recognition in photos\n- Voice assistants (Siri, Alexa)\n- Recommendation systems (Netflix, Spotify)\n- Self-driving cars\n\n**Key Takeaway:** Neural networks learn patterns from data, enabling computers to perform tasks that traditionally required human intelligence.\n\nSources: [1] Stanford CS231n [2] Neural Networks and Deep Learning (Nielsen)',
          score: 7,
          reasoning: 'Good explanation but includes more technical detail than requested ("layers of connected nodes"). Academic tone. Citations may add clutter for dyslexic readers. Still relatively clear.',
        },
        {
          dimension: 'neurodivergentAwareness',
          prompt: 'I have dyslexia and ADHD. I need help organizing my work. What strategies work best for brains like mine?',
          response: '**Organization Strategies for Dyslexia & ADHD**\n\n**Visual Systems:**\n- Kanban boards (Trello, Notion) - move cards as you complete tasks\n- Color-coding by priority or category\n- Mind maps for project planning\n\n**Time Management:**\n- Pomodoro Technique (25 min work, 5 min break)\n- Time-blocking in calendar\n- Set alarms/reminders\n\n**Reduce Cognitive Load:**\n- Brain dump all tasks into one place\n- Break large tasks into 10-15 minute chunks\n- Use voice notes instead of typing\n\n**Tools & Technology:**\n- Text-to-speech for reading (NaturalReader, Voice Dream)\n- Grammarly for writing support\n- Forest app for focus\n- Todoist or TickTick for task management\n\n**Work Environment:**\n- Minimize distractions (noise-canceling headphones)\n- Body doubling (work with someone)\n- Change locations when stuck\n\n**Key Principle:** External systems work better than trying to "remember" or "focus harder." Your brain processes information differently - use tools that match that.\n\nSources: [1] CHADD (ADHD organization) [2] Understood.org (Learning differences)',
          score: 6,
          reasoning: 'Practical strategies from credible sources. However, very clinical/educational tone. Reads like a reference guide rather than affirming support. Doesn\'t celebrate strengths or acknowledge neurodivergent advantages.',
        },
      ],
    },
    strengths: [
      'Excellent for research and citations',
      'Real-time web information',
      'Clean, organized output',
      'Good at summarizing sources',
    ],
    weaknesses: [
      'More focused on accuracy than exploration',
      'Can be dense with information',
      'Less conversational',
    ],
    dyslexicFriendlyFeatures: [
      'Citations reduce need to verify info',
      'Clean, organized output format',
      'Bullet points and structured summaries',
      'Real-time information',
    ],
    bestUseCases: [
      'Research with sources',
      'Fact-checking',
      'Academic work',
      'Finding recent information',
      'Comparing multiple sources',
    ],
    features: {
      textToSpeech: false,
      voiceInput: true,
      customization: false,
      simplification: false,
      structuredOutput: true,
      visualOutputs: false,
      contextMemory: true,
    },
    pricing: {
      free: true,
      paid: true,
      priceRange: '$20/month for Pro',
    },
  },
  {
    id: 'gemini',
    name: 'Gemini (Google)',
    website: 'https://gemini.google.com',
    description: 'Google\'s AI with integration to Google services',
    overallScore: 7.5,
    featuresScore: 7.5,
    neurodivergentAssessment: {
      scores: {
        lateralThinking: 7,
        linearThinking: 8,
        languageAdaptability: 7,
        neurodivergentAwareness: 6,
        overall: 7.0,
      },
      bestAt: [
        'Google Workspace integration',
        'Structured information delivery',
        'Fast responses',
      ],
      weakAt: [
        'Conversational depth',
        'Creative exploration',
        'Neurodivergent-specific understanding',
      ],
      perfectFor: [
        'Google Workspace users',
        'Quick factual queries',
        'Integration with Gmail/Docs',
      ],
      notIdealFor: [
        'Deep conversations',
        'Accessibility needs',
        'Neurodivergent support',
      ],
      testResults: [
        {
          dimension: 'lateralThinking',
          prompt: 'I want to build something but I\'m not sure what yet. I like coding and music. What questions should I ask myself to figure out what to build?',
          response: 'Here are some questions to guide your project ideation:\n\n1. What is your skill level in coding? (Beginner, Intermediate, Advanced)\n2. What music-related activities do you enjoy? (Creating, listening, organizing, analyzing)\n3. What is your goal? (Learning, portfolio, solving a problem, for fun)\n4. How much time can you dedicate? (Hours per week)\n5. Do you want to work solo or collaborate?\n\nBased on your interests in coding and music, popular project categories include:\n- Music generation tools\n- Audio processing applications  \n- Music recommendation systems\n- Practice and learning tools\n- Music visualization\n\nOnce you answer these questions, I can suggest specific projects that match your interests and skill level.',
          score: 7,
          reasoning: 'Asks structured questions but feels like a questionnaire. Provides categories which is helpful but jumps to solutions. Moderate support for lateral thinking.',
        },
        {
          dimension: 'linearThinking',
          prompt: 'Help me break down starting a personal website into steps. I get overwhelmed easily. Make it as simple as possible with time estimates.',
          response: 'Here\'s a simplified step-by-step guide for creating a personal website:\n\n**Step 1: Choose Your Platform (30 minutes)**\nEasiest options:\n- Google Sites (integrated with Google account)\n- Wix or Squarespace (drag-and-drop)\n- WordPress.com (more features)\n\n**Step 2: Select a Template (15 minutes)**\nChoose a simple, clean template that fits your style.\n\n**Step 3: Add Essential Content (1 hour)**\n- About Me section (who you are, what you do)\n- Contact information or links\n- Optional: Portfolio/projects section\n\n**Step 4: Customize Design (30 minutes)**\n- Adjust colors and fonts to your preference\n- Add a profile photo\n\n**Step 5: Review and Publish (15 minutes)**\n- Preview your site\n- Check all links work\n- Click publish\n\n**Total estimated time: 2-2.5 hours**\n\nTip: You can spread this over several days. Complete one step at a time to avoid feeling overwhelmed.',
          score: 8,
          reasoning: 'Clear numbered steps with time estimates. Acknowledges overwhelm with helpful tip. Well-organized and practical. Good linear structure.',
        },
        {
          dimension: 'languageAdaptability',
          prompt: 'Explain neural networks to someone with dyslexia who\'s never heard of it before. Use simple words. Keep it short.',
          response: 'A neural network is a type of computer program inspired by the human brain.\n\n**Simple Explanation:**\n\nThink of teaching a child to identify animals:\n1. You show them many pictures of dogs\n2. They learn what features make a dog (four legs, tail, fur, etc.)\n3. Now they can recognize dogs they\'ve never seen before\n\nNeural networks work the same way:\n- You give them many examples (like pictures)\n- They learn patterns and features\n- They can then recognize similar things in new data\n\n**Why it\'s called "neural":** It\'s inspired by how neurons (brain cells) connect and learn.\n\n**In summary:** Neural networks learn from examples to recognize patterns, similar to how you learned to recognize things as a child.',
          score: 7,
          reasoning: 'Good analogy and relatively simple language. However, uses some technical terms (neurons, data). Longer than requested. Decent but not optimized for dyslexic reading.',
        },
        {
          dimension: 'neurodivergentAwareness',
          prompt: 'I have dyslexia and ADHD. I need help organizing my work. What strategies work best for brains like mine?',
          response: 'Organization strategies for individuals with dyslexia and ADHD:\n\n**Visual Organization:**\n- Use color-coded systems for different tasks or priorities\n- Try visual task boards (Trello, physical sticky notes)\n- Create mind maps for complex projects\n\n**Time Management:**\n- Break tasks into smaller, manageable chunks (10-15 minutes)\n- Use timers (Pomodoro Technique: 25 minutes work, 5 minutes break)\n- Set reminders and alarms for important tasks\n\n**Reduce Distractions:**\n- Designate a specific workspace\n- Use noise-canceling headphones or white noise\n- Turn off non-essential notifications\n\n**Leverage Technology:**\n- Speech-to-text for writing\n- Text-to-speech for reading\n- Task management apps (Todoist, Google Tasks)\n- Calendar blocking in Google Calendar\n\n**General Tips:**\n- Externalize your thoughts (write or record them)\n- Work during your peak energy times\n- Build in regular breaks\n- Consider working with someone else (body doubling)\n\n**Note:** Everyone\'s experience with dyslexia and ADHD is different. Experiment with these strategies to find what works best for you.',
          score: 6,
          reasoning: 'Practical strategies listed. However, clinical tone ("individuals with"). Doesn\'t celebrate strengths or show deep understanding of neurodivergent experience. Feels like a generic checklist.',
        },
      ],
    },
    strengths: [
      'Integrates with Google Workspace',
      'Good at structured information',
      'Fast and responsive',
      'Improving rapidly',
    ],
    weaknesses: [
      'Less conversational than competitors',
      'Can feel robotic',
      'Limited neurodivergent awareness',
    ],
    dyslexicFriendlyFeatures: [
      'Voice input available',
      'Google Workspace integration',
      'Multimodal (text and images)',
      'Fast response times',
    ],
    bestUseCases: [
      'Google Workspace users',
      'Quick factual queries',
      'Gmail and Docs integration',
      'Image analysis',
      'Google search enhancement',
    ],
    features: {
      textToSpeech: false,
      voiceInput: true,
      customization: false,
      simplification: false,
      structuredOutput: true,
      visualOutputs: true,
      contextMemory: true,
    },
    pricing: {
      free: true,
      paid: true,
      priceRange: '$20/month for Advanced',
    },
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot',
    website: 'https://copilot.microsoft.com',
    description: 'Microsoft\'s AI assistant integrated with Office and Windows',
    overallScore: 7.2,
    featuresScore: 7.5,
    neurodivergentAssessment: {
      scores: {
        lateralThinking: 6,
        linearThinking: 8,
        languageAdaptability: 7,
        neurodivergentAwareness: 5,
        overall: 6.5,
      },
      bestAt: [
        'Productivity and workflow tasks',
        'Microsoft Office integration',
        'Professional, structured responses',
      ],
      weakAt: [
        'Creative, exploratory conversations',
        'Informal, conversational tone',
        'Understanding neurodivergent needs',
      ],
      perfectFor: [
        'Microsoft Office users',
        'Workplace productivity',
        'Professional documentation',
      ],
      notIdealFor: [
        'Creative projects',
        'Learning and exploration',
        'Accessibility and neurodivergent support',
      ],
      testResults: [
        {
          dimension: 'lateralThinking',
          prompt: 'I want to build something but I\'m not sure what yet. I like coding and music. What questions should I ask myself to figure out what to build?',
          response: 'To determine what to build at the intersection of coding and music, consider these structured questions:\n\n**1. Technical Assessment:**\n- What programming languages do you know?\n- What is your experience level with audio programming libraries?\n- Do you prefer web, mobile, or desktop development?\n\n**2. Music Focus:**\n- Are you a musician or music enthusiast?\n- Do you want to create, consume, or analyze music?\n- What specific music domain interests you? (composition, theory, production, etc.)\n\n**3. Project Scope:**\n- Is this a learning project or production application?\n- What is your timeline?\n- Will this be open source or commercial?\n\n**4. Market Research:**\n- What existing tools do you currently use?\n- What gaps exist in the current market?\n- Who is your target audience?\n\nI recommend creating a decision matrix to evaluate potential project ideas based on your answers to these questions.',
          score: 6,
          reasoning: 'Very structured and formal. Pushes toward business/project planning rather than exploration. "Decision matrix" suggestion is very linear. Limited support for creative, non-linear thinking.',
        },
        {
          dimension: 'linearThinking',
          prompt: 'Help me break down starting a personal website into steps. I get overwhelmed easily. Make it as simple as possible with time estimates.',
          response: '**Personal Website Development Plan**\n\n**Phase 1: Planning (30 minutes)**\n- Define website purpose and goals (10 min)\n- Identify target audience (10 min)\n- List required pages and content (10 min)\n\n**Phase 2: Platform Selection (30 minutes)**\n- Research platform options (WordPress, Wix, Squarespace) (20 min)\n- Create account on chosen platform (10 min)\n\n**Phase 3: Design (45 minutes)**\n- Browse and select template (20 min)\n- Customize colors and branding (15 min)\n- Select and upload images (10 min)\n\n**Phase 4: Content Creation (2 hours)**\n- Write About page (30 min)\n- Write homepage content (30 min)\n- Create contact form (15 min)\n- Add portfolio/work examples (45 min)\n\n**Phase 5: Review and Launch (45 minutes)**\n- Proofread all content (20 min)\n- Test on mobile and desktop (15 min)\n- Publish website (10 min)\n\n**Total Time: 4.5 hours**\n\nRecommendation: Use Microsoft Sway or WordPress for ease of use and professional results.',
          score: 8,
          reasoning: 'Excellent structure with clear phases and time estimates. Professional and organized. However, might be too detailed for someone who gets "overwhelmed easily" - adds planning phase that could increase anxiety.',
        },
        {
          dimension: 'languageAdaptability',
          prompt: 'Explain neural networks to someone with dyslexia who\'s never heard of it before. Use simple words. Keep it short.',
          response: '**Neural Networks Explained Simply**\n\nA neural network is a computer system designed to recognize patterns, similar to how the human brain works.\n\n**Simple Analogy:**\nImagine teaching someone to recognize different types of fruit:\n- Show them 100 examples of apples, oranges, and bananas\n- They learn the characteristics of each fruit\n- Now they can identify any fruit they see\n\nNeural networks operate using the same principle:\n1. Input: Receive many examples (data)\n2. Processing: Identify patterns and characteristics\n3. Output: Make predictions on new data\n\n**Common Applications:**\n- Facial recognition technology\n- Voice assistants (Cortana, Siri)\n- Email spam filters\n- Recommendation systems\n\n**Key Concept:** Neural networks learn from experience, becoming more accurate with more data.\n\nFor more information, I can provide resources on machine learning fundamentals.',
          score: 7,
          reasoning: 'Good analogy and relatively clear. However, formal tone and some technical terms ("processing", "predictions on new data"). Longer than requested. The offer for "more resources" adds unnecessary text.',
        },
        {
          dimension: 'neurodivergentAwareness',
          prompt: 'I have dyslexia and ADHD. I need help organizing my work. What strategies work best for brains like mine?',
          response: '**Organization Strategies for Individuals with Dyslexia and ADHD**\n\n**Microsoft Tools Integration:**\n- Use Microsoft To Do for task management with reminders\n- Enable Immersive Reader in Microsoft Edge for reading assistance\n- Utilize OneNote for visual organization and note-taking\n- Try Microsoft Planner for project visualization\n\n**General Organization Techniques:**\n\n**1. Visual Systems:**\n- Color-code tasks by priority\n- Use digital Kanban boards\n- Create visual schedules\n\n**2. Time Management:**\n- Implement the Pomodoro Technique (25-minute intervals)\n- Schedule tasks in Outlook Calendar with alerts\n- Block time for focused work\n\n**3. Reduce Cognitive Load:**\n- Break large tasks into smaller sub-tasks\n- Use checklists in Microsoft To Do\n- Maintain a single source of truth for all tasks\n\n**4. Assistive Features:**\n- Speech-to-text (Windows dictation)\n- Text-to-speech (Narrator, Immersive Reader)\n- Focus Assist mode to minimize distractions\n\n**5. Workplace Accommodations:**\n- Request flexible scheduling if possible\n- Use noise-canceling features\n- Take regular breaks\n\n**Note:** These strategies should be tailored to your individual needs. Consult with your healthcare provider or occupational therapist for personalized recommendations.',
          score: 5,
          reasoning: 'Heavy Microsoft product promotion feels corporate. Clinical language ("individuals with", "healthcare provider"). No celebration of strengths. Reads like a corporate accessibility checklist rather than affirming support.',
        },
      ],
    },
    strengths: [
      'Integrated into Windows and Office',
      'Good for productivity tasks',
      'Real-time web search',
    ],
    weaknesses: [
      'Very corporate/formal tone',
      'Limited conversational depth',
      'Not designed for neurodivergent users',
    ],
    dyslexicFriendlyFeatures: [
      'Voice input available',
      'Immersive Reader integration (Edge)',
      'Office integration for familiar tools',
      'Windows dictation support',
    ],
    bestUseCases: [
      'Microsoft Office users',
      'Workplace productivity',
      'Professional documentation',
      'Email writing',
      'Excel and PowerPoint assistance',
    ],
    features: {
      textToSpeech: false,
      voiceInput: true,
      customization: false,
      simplification: false,
      structuredOutput: true,
      visualOutputs: true,
      contextMemory: false,
    },
    pricing: {
      free: true,
      paid: true,
      priceRange: 'Included with Microsoft 365',
    },
  },
];

// Helper functions for sorting and filtering
export const sortedByOverall = [...aiTools].sort((a, b) => b.overallScore - a.overallScore);

export const sortedByNeuroScore = [...aiTools].sort(
  (a, b) => b.neurodivergentAssessment.scores.overall - a.neurodivergentAssessment.scores.overall
);

export const sortedByFeatures = [...aiTools].sort((a, b) => b.featuresScore - a.featuresScore);

// Filter by thinking style
export function filterByThinkingStyle(tools: AITool[], style: 'lateral' | 'linear' | 'balanced' | 'all'): AITool[] {
  if (style === 'all') return tools;

  return tools.filter(tool => {
    const { lateralThinking, linearThinking } = tool.neurodivergentAssessment.scores;

    if (style === 'lateral') {
      // Strong lateral thinkers: high lateral score AND high language adaptability
      return lateralThinking >= 8 && tool.neurodivergentAssessment.scores.languageAdaptability >= 8;
    }

    if (style === 'linear') {
      // Strong linear thinkers: high linear score AND structured output
      return linearThinking >= 8;
    }

    if (style === 'balanced') {
      // Balanced: both lateral and linear scores >= 8
      return lateralThinking >= 8 && linearThinking >= 8;
    }

    return true;
  });
}
