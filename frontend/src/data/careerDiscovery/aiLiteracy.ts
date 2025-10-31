import type { AILiteracyModule } from '../../types/career';

export const aiLiteracyModules: AILiteracyModule[] = [
  {
    id: 'what-is-ai',
    title: 'What is AI?',
    moduleNumber: 1,
    duration: 5,
    content: `AI (Artificial Intelligence) is software that can learn patterns and generate responses. Think of it like a very sophisticated autocomplete.

**What AI is:**
- A tool trained on massive amounts of text
- Good at finding patterns and generating text
- Helpful for writing, learning, research, coding

**What AI is NOT:**
- Not actually "thinking" or "conscious"
- Not always accurate (it can confidently make stuff up)
- Not a replacement for YOUR judgment

**Large Language Models (LLMs):**
These are AI tools like ChatGPT, Claude, Gemini. They're trained to predict what word comes next, based on patterns in text.

**Why this matters for neurodivergent people:**
AI can be a brain extension. It can help with executive function, idea generation, learning, and more—IF you know how to use it.`,
    exercise: 'In your own words, explain what AI is to someone who\'s never heard of it.',
    samplePrompt: 'Explain [topic] to someone who\'s never heard of it before, using simple language and an analogy.',
  },

  {
    id: 'how-to-talk-to-ai',
    title: 'How to Talk to AI (Writing Prompts)',
    moduleNumber: 2,
    duration: 10,
    content: `Talking to AI is different from talking to people. AI needs CONTEXT and CLARITY.

**Anatomy of a good prompt:**
1. **Role:** "You are a [career counselor/tutor/writing coach]"
2. **Context:** "I have ADHD and need help with..."
3. **Task:** "Please [explain/write/help me with]..."
4. **Format:** "Give me a list / step-by-step / simple explanation"
5. **Constraints:** "Keep it under 100 words / Use simple language"

**Example BAD prompt:**
"Help me with my resume"

**Example GOOD prompt:**
"You are a career counselor. I'm a 22-year-old with ADHD looking for my first tech job. I have skills in testing and customer service. Can you help me write a resume summary that highlights these strengths in 3-4 sentences?"

**The difference:** Specific, clear, gives AI what it needs to help you.`,
    exercise: 'Write a prompt asking AI to explain something you\'re learning about. Include role, context, and task.',
    samplePrompt: 'You are a [role]. I am [context about you]. Please help me [specific task]. Format it as [list/steps/explanation].',
  },

  {
    id: 'ai-for-job-search',
    title: 'Using AI for Job Search & Career Prep',
    moduleNumber: 3,
    duration: 10,
    content: `AI can help you research jobs, write resumes, and practice interviews.

**Job research prompts:**
- "What does a [job title] actually do day-to-day?"
- "What skills do I need to become a [job]?"
- "Is [job] a good fit for someone with [ADHD/autism/dyslexia]?"

**Resume & cover letter prompts:**
- "Help me write a resume summary for [job]. My experience: [list]. My strengths: [list]."
- "Turn these bullet points into professional resume language: [paste your notes]"
- "Write a cover letter for [job]. I have [skills]. Keep it under 300 words."

**Interview prep prompts:**
- "I have an interview for [job]. What questions might they ask?"
- "Help me answer: 'Tell me about yourself' for a [job] interview. My background: [details]."
- "I'm autistic and struggle with small talk. Give me 5 safe small talk scripts for interviews."

**Pro tip:** AI can't apply for jobs FOR you, but it can make prep way easier.`,
    exercise: 'Use AI to research one job you\'re curious about. Ask: "What does a [job] do day-to-day?"',
    samplePrompt: 'I have an interview for [job title]. What are 10 common questions they might ask, and how should I prepare?',
  },

  {
    id: 'ai-for-learning',
    title: 'AI as Your Personal Tutor',
    moduleNumber: 4,
    duration: 10,
    content: `AI can explain things in ways that make sense to YOUR brain. This is huge for neurodivergent learners.

**Learning prompts:**
- "Explain [concept] like I'm 10 years old"
- "I have dyslexia. Explain [topic] using simple words and an analogy"
- "Break down [topic] into 5 key points I need to know"
- "I don't understand [specific part]. Can you explain it differently?"

**Study help prompts:**
- "Turn these notes into a study guide: [paste notes]"
- "Quiz me on [topic]. Ask me 5 questions."
- "I learn best with visuals. Describe [concept] using a metaphor or diagram description."

**Neurodivergent-friendly learning:**
- "I have ADHD and get distracted easily. Break [task] into 5-minute chunks."
- "Explain [concept] step-by-step, one step at a time."

**The power:** AI won't judge you for asking "stupid questions." Ask as many times as you need.`,
    exercise: 'Pick something you\'re trying to learn. Ask AI to explain it in simple words. Then ask follow-up questions.',
    samplePrompt: 'Explain [concept] to someone with [dyslexia/ADHD/processing challenges]. Use simple words, short sentences, and an analogy.',
  },

  {
    id: 'ai-for-adulting',
    title: 'AI for Everyday Life (Adulting)',
    moduleNumber: 5,
    duration: 10,
    content: `Executive function = hard. AI = executive function support. Use it for daily life tasks.

**Scheduling & planning:**
- "I have [list of tasks]. Help me prioritize them."
- "I need to plan my week. I have [commitments]. Create a schedule that includes breaks."
- "Break down [big project] into daily to-do items."

**Budgeting & money:**
- "I make $X per month. Help me create a simple budget."
- "Explain [financial term] in simple language."

**Email & communication:**
- "Help me write a professional email asking for [X]."
- "Is this email tone okay? [paste draft]"
- "Rewrite this text to sound more professional: [paste]"

**Decision-making:**
- "I'm trying to decide between [A] and [B]. Help me list pros and cons."
- "I'm overwhelmed by [situation]. Break it into manageable steps."

**These tasks drain executive function. AI can carry some of that load.**`,
    exercise: 'Use AI to help with ONE adulting task this week (email, schedule, budget, decision).',
    samplePrompt: 'I need to [task], but I\'m overwhelmed. Can you break this into small, manageable steps?',
  },

  {
    id: 'creative-prompting',
    title: 'Creative Uses of AI (Brainstorming & Projects)',
    moduleNumber: 6,
    duration: 15,
    content: `AI is AMAZING for idea generation, especially if you\'re a creative thinker.

**Brainstorming prompts:**
- "I want to [do something] but I'm not sure how. Give me 10 ideas."
- "I'm interested in [topic]. What are 5 directions I could explore?"
- "Help me brainstorm names for [project/business/idea]"

**Project help:**
- "I want to build [thing]. What steps do I need to take?"
- "Give me a creative prompt for [art/writing/design project]"
- "I'm stuck on [creative block]. Give me 3 ways to approach this differently."

**Special interest deep-dives:**
- "I'm hyperfixated on [topic]. Give me 10 rabbit holes to explore."
- "Connect [Interest A] with [Interest B]. How are they related?"

**The neurodivergent advantage:** Your creative, non-linear thinking + AI's pattern recognition = powerful combo.

**Try it:** Have a conversation with AI like you're brainstorming with a friend.`,
    exercise: 'Pick a creative project or idea. Brainstorm with AI for 10 minutes. See where it takes you.',
    samplePrompt: 'I want to create [project] related to [interest]. Give me 10 creative ideas or directions I could take this.',
  },

  {
    id: 'ai-ethics-safety',
    title: 'AI Ethics & Safety (What AI Gets Wrong)',
    moduleNumber: 7,
    duration: 10,
    content: `AI is powerful, but it's not perfect. You need to know its limits.

**What AI is BAD at:**
- **Facts:** AI makes up information confidently (called "hallucinations")
- **Math:** It can get calculations wrong
- **Current events:** Most AI training data is outdated
- **Nuance:** It misses sarcasm, cultural context, subtext
- **Personal advice:** It doesn't know YOU specifically

**How to use AI safely:**
- **Verify facts:** Double-check important information
- **Don't share private info:** AI companies may store your data
- **Use critical thinking:** Does this answer make sense?
- **Human final check:** Especially for important decisions

**Bias warning:** AI is trained on human text, which has biases (racism, sexism, ableism). Be aware.

**Privacy:** Don't put sensitive personal info (SSN, passwords, private medical details) into AI chats.

**Bottom line:** AI is a tool. YOU are the human with judgment.**`,
    exercise: 'Ask AI a factual question. Then verify the answer with Google. Did AI get it right?',
    samplePrompt: 'What are the limitations of AI? What should I be careful about when using it?',
  },

  {
    id: 'hands-on-practice',
    title: 'Hands-On Practice (Real Scenarios)',
    moduleNumber: 8,
    duration: 20,
    content: `Time to actually USE AI for real tasks.

**Practice Scenario 1: Plan your week**
Use AI to create a weekly schedule. Include:
- Work/school commitments
- Self-care time
- Breaks
- Social time (if you want it)
Tell AI: "I have ADHD and need visual schedules with breaks."

**Practice Scenario 2: Learn something new**
Pick a skill you want to learn. Ask AI:
- "How do I learn [skill] as a beginner?"
- "Break [skill] into 5 levels from beginner to advanced"
- "Give me a 30-day learning plan for [skill]"

**Practice Scenario 3: Solve a real problem**
Think of something you're struggling with. Ask AI:
- "I'm struggling with [problem]. I have [context]. What are my options?"
Then have a back-and-forth conversation.

**This is where it clicks:** Using AI for YOUR actual life.`,
    exercise: 'Complete all 3 practice scenarios. Actually do them—don\'t just read.',
    samplePrompt: 'I need to [real task you have]. I have [your context/challenges]. Can you help me create a plan?',
  },

  {
    id: 'ai-for-your-career',
    title: 'AI for Job-Specific Tasks',
    moduleNumber: 9,
    duration: 15,
    content: `Every career can use AI differently. Learn how to use it for YOUR field.

**For Writers:**
- "Help me brainstorm article ideas about [topic]"
- "Improve this paragraph for clarity: [paste]"
- "Give me 10 headline options for [article topic]"

**For Designers:**
- "Describe visual concepts for [project]"
- "What color palette works for [mood/brand]?"
- "Give me design inspiration for [type of project]"

**For Developers:**
- "Explain this code: [paste code]"
- "Help me debug this error: [paste error]"
- "Write a function that does [X]" (then review it yourself!)

**For Customer Service:**
- "Help me respond to this customer email: [paste]"
- "Give me 5 ways to say 'no' professionally"

**For ANY job:**
- "Summarize this long document: [paste]"
- "Turn my notes into a professional email"
- "Help me prepare for [meeting/presentation]"

**Find the AI use cases for YOUR job.**`,
    exercise: 'Pick your current or future job. Find 3 ways AI could help with daily tasks.',
    samplePrompt: 'I work as a [job title]. What are 10 ways I can use AI to help with my daily tasks?',
  },

  {
    id: 'your-ai-toolkit',
    title: 'Your Personal AI Toolkit',
    moduleNumber: 10,
    duration: 10,
    content: `You've learned the skills. Now build YOUR toolkit.

**Step 1: Save your best prompts**
Create a document with prompts you use regularly:
- Resume help
- Interview prep
- Learning/studying
- Email writing
- Decision-making
- Brainstorming

**Step 2: Choose your AI tools**
- **ChatGPT:** General use, free tier available
- **Claude:** Better for long conversations, nuanced responses
- **Gemini:** Google integration
- **Perplexity:** Research-focused
- **Cognitive Partner:** Built for neurodivergent thinkers (you're here!)

**Step 3: Set boundaries**
- How much will you rely on AI?
- What will you NOT use AI for?
- How will you verify information?

**Step 4: Keep learning**
AI is evolving fast. Stay curious.

**Congrats! You\'re now AI literate.**
You understand what AI is, how to use it, its limits, and how to apply it to your life.`,
    exercise: 'Create your personal prompt library. Save 5-10 prompts you\'ll actually use.',
    samplePrompt: 'Help me create a personal prompt library for [your needs: work, school, life management]. Give me 10 prompts I can save and reuse.',
  },
];
