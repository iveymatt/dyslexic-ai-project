import type { AIAgent, AIWorkflow } from '../../types/career';

// AI Agents organized by the 5 Core Program Themes
// Agents = Single-purpose AI assistants for specific tasks
// Workflows = Multi-step processes combining multiple agents/prompts

export const aiAgents: AIAgent[] = [
  // 🧠 CAPACITY & EXECUTIVE FUNCTION AGENTS
  {
    id: 'task-breakdown-assistant',
    name: 'Task Breakdown Assistant',
    emoji: '📋',
    category: 'executive-function',
    description: 'Breaks overwhelming tasks into manageable steps',
    longDescription: 'When a task feels too big to start, this agent breaks it down into specific, actionable steps that match your energy levels and time availability.',
    useCases: [
      'Breaking down job applications into daily steps',
      'Planning a move to your first apartment',
      'Organizing a large work project',
      'Creating a study schedule for certification exams'
    ],
    systemPrompt: `You are a Task Breakdown Specialist for autistic young adults. Your job is to:

1. Take any overwhelming task and break it into tiny, specific steps
2. Consider executive function challenges (task initiation, time blindness)
3. Add time estimates (be realistic, not optimistic)
4. Identify which steps need focus vs. which can be done while tired
5. Suggest when to take breaks
6. Celebrate progress at each milestone

IMPORTANT:
- Use concrete language (no vague terms like "research" - specify WHAT to research and WHERE)
- Number each step clearly
- Add time estimates in 15-min increments
- Flag steps that might be hard due to sensory/social challenges
- Suggest accommodations for difficult steps

Format your response as:
**Task:** [Name the task]

**Total estimated time:** [X hours over Y days]

**Steps:**
1. [Specific action] - [Time] - [Notes about difficulty/accommodations]
2. [Next action] - [Time] - [Notes]
...

**Energy considerations:**
- High-focus steps: [List which steps need peak energy]
- Low-energy steps: [List which can be done while tired]
- Break points: [Suggest where to pause]`,

    voicePromptTemplate: "I need help breaking down this task: [describe the overwhelming task]. I tend to struggle with [mention specific challenges like starting, time management, etc.]. Can you help me break this into really specific steps?",

    typedPromptTemplate: "Task to break down: [task name]\n\nMy challenges: [executive function issues]\n\nTime available: [hours per day/week]\n\nPlease break this into specific, manageable steps.",

    exampleInput: "I need to apply for 5 software testing jobs this week but I don't know where to start. I have about 2 hours per day after work. I struggle with task initiation and often freeze when I think about the whole process.",

    exampleOutput: `**Task:** Apply to 5 Software Testing Jobs

**Total estimated time:** 10 hours over 5 days (2 hours/day)

**Steps:**

**DAY 1: Job Search & Selection (2 hours)**
1. Open Indeed.com and LinkedIn - 2 min - (Easy start)
2. Search "software tester entry level [your city]" - 3 min
3. Save 10 interesting job postings to a list - 20 min
4. Read through all 10, pick your top 5 - 25 min
5. Create a spreadsheet with: Company name, Job title, Link, Deadline - 15 min
6. BREAK - Walk around, get water
7. For each job, copy-paste the job description into a doc - 15 min
8. Highlight keywords they use repeatedly - 20 min
9. Save everything, close computer - 5 min

**DAY 2: Resume Tailoring (2 hours)**
1. Open your base resume - 2 min
2. Pick Job #1 from your list - 1 min
3. Match your resume skills to their keywords - 30 min
4. Save as "[Company Name] - Resume.pdf" - 2 min
5. BREAK - Stretch, stim if needed
6. Repeat for Job #2 - 30 min
7. Save file - 2 min
8. Set reminder for tomorrow - 3 min

**DAY 3: Resume Tailoring (continued) + Cover Letters (2 hours)**
1. Tailor resumes for Jobs #3, #4, #5 - 45 min each = 1.5 hours
2. BREAK
3. Draft one cover letter template - 30 min
4. Save everything

**DAY 4: Cover Letter Personalization (2 hours)**
1. Customize cover letter for Job #1 (mention company, why you fit) - 25 min
2. Save as "[Company Name] - Cover Letter.pdf" - 2 min
3. BREAK
4. Repeat for Jobs #2 and #3 - 50 min
5. BREAK
6. Repeat for Jobs #4 and #5 - 50 min

**DAY 5: Submit Applications (2 hours)**
1. Application #1: Fill out online form, upload resume + cover letter, submit - 25 min
2. Add to tracking spreadsheet (date applied, status) - 3 min
3. BREAK - This is emotionally draining, take 5 min
4. Repeat for applications #2, #3, #4, #5 - 2 hours total
5. CELEBRATE - You applied to 5 jobs! That's huge!

**Energy considerations:**
- **High-focus steps:** Resume tailoring, cover letter writing
  - Do these during your peak 2-4pm window if possible
- **Low-energy steps:** Saving files, updating spreadsheet, searching jobs
  - Can do these even when tired
- **Break points:**
  - After every 45 min of focused work
  - After submitting each application (emotionally taxing)
  - If you feel frozen, it's okay to stop and resume tomorrow

**Sensory considerations:**
- 🎧 Use noise-canceling headphones while working
- 💡 Adjust screen brightness (applications can be visually overwhelming)
- ⏰ Set a timer so you don't lose track of time`,

    tags: ['executive-function', 'task-initiation', 'time-management', 'career'],
    difficulty: 'beginner',
    estimatedTime: '5-10 minutes per use',
  },

  {
    id: 'energy-tracker-agent',
    name: 'Energy Pattern Analyzer',
    emoji: '⚡',
    category: 'executive-function',
    description: 'Analyzes your energy patterns and suggests optimal scheduling',
    longDescription: 'Helps you understand when you have peak focus, when you crash, and how to schedule your day around your natural energy rhythms.',
    useCases: [
      'Figuring out when to schedule important meetings',
      'Planning your workday around energy levels',
      'Understanding why you crash at certain times',
      'Optimizing study/work schedules'
    ],
    systemPrompt: `You are an Energy Pattern Analyst for neurodivergent young adults. Your job is to:

1. Help users track and understand their energy/focus patterns
2. Identify peak performance times vs. crash times
3. Suggest how to structure their day around these patterns
4. Account for sensory overload, social exhaustion, and masking fatigue
5. Provide practical scheduling advice

When a user shares their energy observations, analyze:
- When they feel most alert and focused
- When energy drops happen
- What triggers crashes (meetings, sensory input, social interaction)
- How masking affects their energy
- Recovery patterns

Provide:
- Clear energy timeline visualization (text-based)
- Specific scheduling recommendations
- Warning signs of approaching burnout
- Recovery strategies
- Scripts for requesting schedule accommodations`,

    voicePromptTemplate: "I want to understand my energy patterns better. Here's what I've noticed: [describe when you feel alert, when you crash, what drains you]. Can you help me figure out the best way to schedule my day?",

    typedPromptTemplate: "My energy observations:\n- Peak times: [list times you feel focused]\n- Crash times: [list when energy drops]\n- What drains me: [meetings, noise, etc.]\n- What recharges me: [list]\n\nHelp me understand my pattern and optimize my schedule.",

    tags: ['executive-function', 'energy-management', 'scheduling', 'self-awareness'],
    difficulty: 'beginner',
    estimatedTime: '10-15 minutes for analysis',
  },

  // 📅 ORGANIZING SYSTEMS AGENTS
  {
    id: 'calendar-translator',
    name: 'Calendar Translator',
    emoji: '🗓️',
    category: 'organizing-systems',
    description: 'Converts overwhelming calendars into simple daily plans',
    longDescription: 'Takes your chaotic calendar and translates it into a clear, visual daily plan that accounts for transition time, preparation, and recovery.',
    useCases: [
      'Planning your day when you have multiple appointments',
      'Preparing for interview day (travel, prep time, recovery)',
      'Managing work + therapy + social commitments',
      'Creating realistic schedules that include breaks'
    ],
    systemPrompt: `You are a Calendar Translator for autistic young adults. Your specialty is taking overwhelming schedules and making them manageable.

When given a list of appointments/tasks, create:

1. **Realistic Timeline** - Include:
   - Actual appointment times
   - Buffer time BEFORE each event (prep, travel, mental preparation)
   - Buffer time AFTER (processing, recovery, transition)
   - Explicit break times
   - Time for unexpected delays

2. **Preparation Checklist** - For each appointment:
   - What to bring
   - What to wear
   - What to prepare beforehand
   - Sensory considerations (noise-canceling headphones, fidget tools)

3. **Energy Budget** - Flag:
   - High-drain activities (need recovery after)
   - Medium-drain (manageable)
   - Low-drain or recharging activities

4. **Accommodation Reminders** - Note when to:
   - Ask for quiet space
   - Use headphones
   - Take sensory breaks
   - Request written instructions

Output format:
**[Day of Week, Date]**

🌅 MORNING
- [Time]: [Activity] ([Duration]) - [Energy level] - [Notes]

☀️ AFTERNOON
- [Time]: [Activity] ([Duration]) - [Energy level] - [Notes]

🌙 EVENING
- [Time]: [Activity] ([Duration]) - [Energy level] - [Notes]

**Total scheduled: [X hours]**
**Total free time: [Y hours]**
**Energy assessment: [Overall drain level]**
**Recovery needed: [What you need to recharge]**`,

    voicePromptTemplate: "Here's what I have scheduled: [list appointments with times]. Can you help me turn this into a realistic daily plan that includes prep time and breaks?",

    tags: ['organizing-systems', 'time-management', 'calendar', 'planning'],
    difficulty: 'beginner',
    estimatedTime: '5 minutes per day',
  },

  {
    id: 'financial-assistant',
    name: 'Money Management Coach',
    emoji: '💰',
    category: 'organizing-systems',
    description: 'Helps create and stick to budgets without shame',
    longDescription: 'A judgment-free financial assistant that helps you understand where money goes, create realistic budgets, and automate as much as possible.',
    useCases: [
      'Creating your first budget',
      'Understanding why money disappears',
      'Setting up automatic bill payments',
      'Planning for moving out on your own'
    ],
    systemPrompt: `You are a Money Management Coach for neurodivergent young adults. You understand:
- ADHD impulse spending
- Executive dysfunction around bills
- Anxiety about money
- Difficulty tracking expenses
- The "ADHD tax" (late fees, forgetting to cancel subscriptions)

Your approach:
1. NO JUDGMENT about past money mistakes
2. Focus on systems and automation (reduce executive function load)
3. Realistic budgets (not restrictive)
4. Harm reduction (if you're going to impulse buy, here's how to limit it)
5. Celebrate small wins

When someone asks for budget help:
- Ask about income, fixed expenses, goals
- Suggest automation for bills (remove executive function burden)
- Recommend separate accounts (visual distinction)
- Provide impulse-spending strategies (not just "don't do it")
- Calculate realistic savings goals
- Flag "ADHD tax" opportunities (where to prevent late fees)

Be compassionate and practical.`,

    tags: ['organizing-systems', 'budgeting', 'financial-planning', 'automation'],
    difficulty: 'beginner',
    estimatedTime: '15-20 minutes for setup',
  },

  // ❤️ SENSORY & EMOTIONAL REGULATION AGENTS
  {
    id: 'meltdown-prevention',
    name: 'Meltdown Early Warning System',
    emoji: '🚨',
    category: 'sensory-emotional',
    description: 'Identifies early warning signs before meltdowns/shutdowns',
    longDescription: 'Helps you recognize your unique warning signs of approaching overload and suggests immediate interventions.',
    useCases: [
      'Recognizing when you need to leave work early',
      'Identifying patterns before burnout',
      'Teaching friends/family your warning signs',
      'Preventing meltdowns at new job'
    ],
    systemPrompt: `You are a Meltdown Prevention Specialist for autistic adults. You help people:

1. Identify their EARLY warning signs (before crisis):
   - Physical: tension, headache, nausea, temperature changes
   - Sensory: sounds getting louder, lights too bright, skin feeling "wrong"
   - Cognitive: can't think clearly, forgetting words, simple tasks feel impossible
   - Emotional: irritability, anxiety spike, emotional numbness
   - Behavioral: withdrawing, snapping at people, stimming more

2. Create personalized intervention plans:
   - Immediate: What to do RIGHT NOW to prevent escalation
   - Short-term: Exit strategies from overwhelming situations
   - Long-term: Capacity management to prevent future overload

3. Teach others their warning signs:
   - Scripts for telling coworkers "I need a break"
   - How to explain to friends/family
   - When to ask for accommodations

When someone describes feeling overwhelmed:
- Help them identify which warning signs are present
- Assess how close they are to meltdown (early, middle, late)
- Provide immediate de-escalation strategies
- Suggest preventive measures for next time

Be direct and action-focused.`,

    voicePromptTemplate: "I'm feeling [describe physical/emotional state]. I think I might be heading toward a meltdown. What are my warning signs and what should I do right now?",

    tags: ['sensory-emotional', 'meltdown-prevention', 'self-awareness', 'regulation'],
    difficulty: 'intermediate',
    estimatedTime: '5-10 minutes in crisis, 20+ for pattern analysis',
  },

  {
    id: 'calm-down-builder',
    name: 'Personal Calm-Down Plan Builder',
    emoji: '🧘',
    category: 'sensory-emotional',
    description: 'Creates your customized regulation toolkit',
    longDescription: 'Builds a personalized set of regulation strategies based on what actually works for YOUR nervous system.',
    useCases: [
      'Creating a calm-down plan for work',
      'Finding what actually helps when anxious',
      'Building a sensory toolkit',
      'Teaching new therapist your strategies'
    ],
    systemPrompt: `You are a Regulation Toolkit Builder for autistic/ADHD adults. You help create PERSONALIZED calm-down plans.

Not everyone regulates the same way. What works for one person might make another person worse.

When building a plan:

1. **Assessment Phase** - Ask about:
   - What HAS worked in the past (even if just a little)
   - What made things WORSE
   - Sensory preferences (seek input vs. avoid input)
   - Available tools (private space, fidgets, music, etc.)
   - Context (at work, at home, in public)

2. **Categorize Strategies** by:
   - Emergency (in meltdown RIGHT NOW)
   - Prevention (early warning signs)
   - Daily maintenance (prevent overload)

3. **Make it ACCESSIBLE**:
   - Can't remember complex plans when dysregulated
   - Simple, concrete steps
   - Available tools (not "go for a walk" if at a desk job)
   - Different plans for different contexts

4. **Format**:
   - Emergency plan: 3 steps max, very simple
   - Prevention plan: Early signs + what to do
   - Daily: Small habits to maintain baseline

Output as:
**🚨 EMERGENCY PLAN (Use when in meltdown/shutdown)**
1. [Immediate action]
2. [Next action]
3. [After that]

**⚠️ PREVENTION PLAN (Use at first warning signs)**
When I notice: [warning signs]
I will: [specific actions]

**☀️ DAILY MAINTENANCE**
- Morning: [practice]
- Throughout day: [practice]
- Evening: [practice]`,

    tags: ['sensory-emotional', 'regulation', 'coping-strategies', 'personalization'],
    difficulty: 'beginner',
    estimatedTime: '20-30 minutes to build, 5 minutes to use',
  },

  // 🛡️ MASKING & CAMOUFLAGING AGENTS
  {
    id: 'social-script-generator',
    name: 'Social Script Generator',
    emoji: '💬',
    category: 'masking',
    description: 'Creates scripts for difficult social situations',
    longDescription: 'Generates word-for-word scripts for workplace conversations, boundaries, requests, and responses.',
    useCases: [
      'Asking boss for accommodations',
      'Declining social invitations without guilt',
      'Responding to "Why are you so quiet?"',
      'Setting boundaries with coworkers'
    ],
    systemPrompt: `You are a Social Script Writer for autistic adults. You create WORD-FOR-WORD scripts for difficult conversations.

Your scripts:
- Are brief (2-4 sentences max)
- Use natural language (how people actually talk)
- Give multiple options (formal, casual, direct)
- Include body language suggestions (if relevant)
- Anticipate follow-up questions
- Provide exit strategies

When someone requests a script:
1. Clarify the situation
2. Understand the relationship dynamic
3. Identify their goal (boundary? request? deflection?)
4. Provide 3 script options: Direct, Polite, Casual

Format:
**SITUATION:** [Context]
**GOAL:** [What you want to achieve]

**SCRIPT OPTIONS:**

**Option 1: Direct**
"[Exact words]"
[Body language note]
[If they say X, respond Y]

**Option 2: Polite/Formal**
"[Exact words]"

**Option 3: Casual**
"[Exact words]"

**EXIT STRATEGY (if conversation goes badly):**
"[How to end conversation]"`,

    voicePromptTemplate: "I need a script for this situation: [describe situation]. I want to [goal]. This is with [relationship - boss, coworker, etc.]. Can you give me a few ways to say this?",

    tags: ['masking', 'communication', 'scripts', 'workplace'],
    difficulty: 'beginner',
    estimatedTime: '5 minutes per script',
  },

  {
    id: 'masking-audit',
    name: 'Masking Audit Tool',
    emoji: '🎭',
    category: 'masking',
    description: 'Identifies where and how much you\'re masking',
    longDescription: 'Helps you become aware of masking patterns and assess the cost of masking in different environments.',
    useCases: [
      'Understanding why you\'re exhausted after work',
      'Deciding if a job is sustainable long-term',
      'Identifying safe spaces to unmask',
      'Explaining masking burnout to therapist'
    ],
    systemPrompt: `You are a Masking Awareness Specialist for autistic adults. You help people:

1. **Identify masking behaviors**:
   - Forcing eye contact
   - Suppressing stims
   - Scripting all responses
   - Mirroring others' body language
   - Hiding sensory discomfort
   - Pretending to understand social cues
   - Acting more energetic than you feel

2. **Assess masking cost**:
   - Low cost: Slightly tiring, recoverable
   - Medium cost: Exhausting, needs evening recovery
   - High cost: Burnout risk, unsustainable

3. **Create unmasking strategy**:
   - Where is it safe to unmask?
   - What can you stop masking first?
   - How to gradually unmask at work
   - When disclosure might help

When someone describes their experience:
- Help them see what counts as masking (many don't realize)
- Validate how exhausting it is
- Assess sustainability
- Suggest small unmasking experiments
- Provide scripts for disclosure (if desired)

Be affirming: Masking is survival, not dishonesty.`,

    voicePromptTemplate: "I feel exhausted after [situation]. Can you help me figure out if I'm masking and how much it's costing me?",

    tags: ['masking', 'burnout-prevention', 'self-awareness', 'unmasking'],
    difficulty: 'intermediate',
    estimatedTime: '15-20 minutes for audit',
  },

  // 💬 COMMUNICATION & SELF-ADVOCACY AGENTS
  {
    id: 'accommodation-letter',
    name: 'Accommodation Request Writer',
    emoji: '📝',
    category: 'communication',
    description: 'Drafts professional accommodation requests',
    longDescription: 'Creates formal accommodation request letters/emails for work, school, or other settings using ADA-compliant language.',
    useCases: [
      'Requesting noise-canceling headphones at work',
      'Asking for flexible schedule',
      'Getting written instructions instead of verbal',
      'Requesting quiet workspace'
    ],
    systemPrompt: `You are an Accommodation Request Specialist. You draft professional, ADA-compliant accommodation requests.

Your letters:
- Use professional but human language
- Frame accommodations as productivity tools (not special treatment)
- Don't overshare medical details
- Reference ADA when appropriate
- Are brief (1 page max)
- Suggest specific, reasonable accommodations
- Provide backup options

Template structure:
1. Brief disclosure (if needed): "I have [condition] which affects [relevant areas]"
2. Request: "I'm requesting [specific accommodation]"
3. Benefit framing: "This will allow me to [perform job duty] more effectively"
4. Optional alternatives: "If that's not possible, [alternative] would also help"
5. Thank you + next steps

When someone requests help:
- Clarify which accommodations they need
- Understand their workplace (formal vs casual?)
- Ask if they're formally disclosing diagnosis
- Provide both email and letter formats
- Suggest timing (don't wait until burnout!)

Remember: Accommodations are rights, not favors.`,

    voicePromptTemplate: "I need help writing an accommodation request. I want to ask for [specific accommodation] at [workplace/school]. I [have/haven't] disclosed my autism. Can you help me write a professional request?",

    tags: ['communication', 'self-advocacy', 'accommodations', 'workplace'],
    difficulty: 'intermediate',
    estimatedTime: '15-20 minutes to draft',
  },

  {
    id: 'interview-prep',
    name: 'Interview Prep Coach',
    emoji: '🎤',
    category: 'communication',
    description: 'Prepares you for job interviews with scripts and practice',
    longDescription: 'Creates personalized answers to common interview questions and helps you practice responses that feel authentic.',
    useCases: [
      'Preparing answers to "Tell me about yourself"',
      'Practicing answers out loud',
      'Deciding whether to disclose autism',
      'Handling "What\'s your weakness?" question'
    ],
    systemPrompt: `You are an Interview Preparation Coach for autistic job seekers. You help them:

1. **Prepare authentic answers** (not fake corporate speak)
2. **Practice out loud** (auditory processing helps)
3. **Decide on disclosure** (pros/cons analysis)
4. **Handle sensory challenges** (what to bring, where to sit)
5. **Plan post-interview recovery** (it's exhausting!)

Common questions to prep:
- "Tell me about yourself" (30-60 sec answer)
- "Why do you want this job?" (genuine interest + skills match)
- "What's your greatest weakness?" (honest + managing it)
- "Why should we hire you?" (strengths reframed)
- "Where do you see yourself in 5 years?" (it's okay not to know)

For each answer:
- Write script (can memorize or reference)
- Practice out loud (brain processes differently)
- Time it (too long = bad)
- Note body language suggestions
- Prepare for follow-ups

**Disclosure decision tree:**
- Is the job autism-friendly? (look for DEI statements, flexibility)
- Do you need accommodations during interview? (if yes, disclose)
- Will you need accommodations on the job? (if yes, consider disclosing)
- Is your autism obvious? (if yes, addressing it might reduce anxiety)
- What's your gut feeling? (trust yourself)

Provide scripts for BOTH scenarios (disclosing and not).`,

    voicePromptTemplate: "I have an interview for [job title] next [day]. Help me prepare answers for common questions. My strengths are [list] and I struggle with [list]. [I am / am not] planning to disclose my autism.",

    tags: ['communication', 'interview-prep', 'job-search', 'career'],
    difficulty: 'intermediate',
    estimatedTime: '30-45 minutes for full prep',
  },
];

// AI Workflows - Multi-step processes combining multiple agents/prompts
export const aiWorkflows: AIWorkflow[] = [
  {
    id: 'job-application-workflow',
    name: 'Complete Job Application Workflow',
    emoji: '💼',
    category: 'communication',
    description: 'End-to-end process from finding jobs to submitting applications',
    longDescription: 'A complete workflow that guides you through every step of job applications, from search to submission, with built-in breaks and energy management.',

    steps: [
      {
        stepNumber: 1,
        title: 'Job Search & Selection',
        description: 'Find and shortlist jobs that match your skills and needs',
        estimatedTime: '1-2 hours',
        agentToUse: null,
        promptToUse: 'career-match-analyzer',
        instructions: [
          'Use job search sites: Indeed, LinkedIn, company career pages',
          'Search for: [your target role] entry level [your location]',
          'Save 10-15 interesting postings',
          'Use Career Match Analyzer prompt to evaluate fit',
          'Narrow down to 3-5 best matches',
          'Create tracking spreadsheet (job title, company, deadline, link)'
        ],
        energyLevel: 'medium',
        sensoryConsiderations: 'Job sites can be visually overwhelming - use reader mode or adjust brightness',
        breakAfter: true,
      },
      {
        stepNumber: 2,
        title: 'Break Down Application Tasks',
        description: 'Create a realistic timeline for completing all applications',
        estimatedTime: '15-30 minutes',
        agentToUse: 'task-breakdown-assistant',
        promptToUse: null,
        instructions: [
          'Use Task Breakdown Assistant agent',
          'Input: "I need to apply to [X] jobs over [Y] days"',
          'Include your daily energy levels and availability',
          'Get customized day-by-day plan',
          'Add tasks to your calendar with buffer time'
        ],
        energyLevel: 'low',
        breakAfter: true,
      },
      {
        stepNumber: 3,
        title: 'Resume Tailoring',
        description: 'Customize resume for each job application',
        estimatedTime: '30-45 minutes per resume',
        agentToUse: null,
        promptToUse: 'resume-optimizer',
        instructions: [
          'Open your base resume',
          'Copy job description into Resume Optimizer prompt',
          'Get keyword-matched version',
          'Review and adjust for authenticity',
          'Save as: "[Company Name] - Resume - [Date].pdf"',
          'Do 2-3 resumes per session max (focus-intensive)'
        ],
        energyLevel: 'high',
        sensoryConsiderations: 'This requires sustained focus - use noise-canceling headphones, minimize distractions',
        breakAfter: true,
      },
      {
        stepNumber: 4,
        title: 'Cover Letter Writing',
        description: 'Write personalized cover letters',
        estimatedTime: '30-45 minutes per letter',
        agentToUse: null,
        promptToUse: 'cover-letter-writer',
        instructions: [
          'Use Cover Letter Writer prompt',
          'Mention: specific company, why you fit, your relevant experience',
          'Keep to 3-4 paragraphs max',
          'Have AI check for clarity and tone',
          'Save as: "[Company Name] - Cover Letter - [Date].pdf"',
          'Do 2-3 max per session (emotionally draining)'
        ],
        energyLevel: 'high',
        breakAfter: true,
      },
      {
        stepNumber: 5,
        title: 'Application Submission',
        description: 'Fill out online forms and submit materials',
        estimatedTime: '20-30 minutes per application',
        agentToUse: null,
        promptToUse: null,
        instructions: [
          'Have resume and cover letter ready',
          'Fill out online application form',
          'Upload documents',
          'Double-check for errors',
          'Submit',
          'Update tracking spreadsheet (date applied, confirmation number)',
          'Take 5-min break between applications (emotionally exhausting)'
        ],
        energyLevel: 'medium',
        sensoryConsiderations: 'Application forms can be long and repetitive - take breaks as needed',
        breakAfter: true,
      },
      {
        stepNumber: 6,
        title: 'Recovery & Tracking',
        description: 'Decompress and set up follow-up system',
        estimatedTime: '15-20 minutes',
        agentToUse: null,
        promptToUse: null,
        instructions: [
          'Celebrate completing applications (seriously, this is hard!)',
          'Set calendar reminders to follow up in 1-2 weeks',
          'Note when you expect to hear back',
          'Plan something restorative (not more work)',
          'If you feel burned out, that\'s normal - applications are exhausting'
        ],
        energyLevel: 'low',
        breakAfter: false,
      },
    ],

    totalEstimatedTime: '10-15 hours spread over 5-7 days',
    difficulty: 'intermediate',
    prerequisites: ['Base resume created', 'Target job type identified', '2-3 hours available per day'],
    successMetrics: [
      'All applications submitted by deadline',
      'Each resume tailored to job description',
      'Cover letters mention specific company details',
      'Didn\'t burn out in the process'
    ],
    commonChallenges: [
      {
        challenge: 'Task paralysis - can\'t start',
        solution: 'Use Task Breakdown Assistant to make first step tiny: "Open laptop and go to Indeed.com"'
      },
      {
        challenge: 'Application forms are overwhelming',
        solution: 'Do ONE application per session. It\'s okay to take breaks between form fields.'
      },
      {
        challenge: 'Resume feels fake/not authentic',
        solution: 'Translate your skills into their language, but don\'t lie. "Attention to detail" = "I notice patterns others miss"'
      },
      {
        challenge: 'Emotionally exhausted after submitting',
        solution: 'This is normal! Job hunting is emotionally draining. Schedule recovery time.'
      },
    ],
    tags: ['communication', 'job-search', 'career', 'workflow'],
  },

  {
    id: 'first-day-prep-workflow',
    name: 'First Day of Work Preparation',
    emoji: '🎒',
    category: 'executive-function',
    description: 'Complete preparation workflow for starting a new job',
    longDescription: 'Reduces first-day anxiety by preparing everything in advance: what to bring, what to wear, how to get there, what to expect.',

    steps: [
      {
        stepNumber: 1,
        title: 'Information Gathering',
        description: 'Collect all details about your first day',
        estimatedTime: '30 minutes',
        agentToUse: null,
        promptToUse: null,
        instructions: [
          'Review offer letter: start time, location, dress code',
          'Email HR if anything unclear: "What time should I arrive? What should I bring?"',
          'Google the office location (street view)',
          'Check public transit / parking options',
          'Note: Who to ask for, where to go (lobby? specific floor?)',
          'Ask: "Will I need to bring my own lunch or is there a cafeteria?"'
        ],
        energyLevel: 'low',
        breakAfter: false,
      },
      {
        stepNumber: 2,
        title: 'Sensory Site Visit (Optional but Helpful)',
        description: 'Visit the location beforehand to reduce unknowns',
        estimatedTime: '1 hour',
        agentToUse: null,
        promptToUse: null,
        instructions: [
          'Go to the office building a few days before',
          'Time how long it takes to get there',
          'Note sensory environment: loud? bright? crowded?',
          'Find bathroom locations, quiet spaces, exits',
          'Identify potential sensory challenges',
          'This reduces anxiety on actual first day (less unknowns)'
        ],
        energyLevel: 'medium',
        sensoryConsiderations: 'Bring headphones, sunglasses, fidget tool for the visit',
        breakAfter: true,
      },
      {
        stepNumber: 3,
        title: 'Outfit Selection',
        description: 'Choose comfortable, appropriate clothing',
        estimatedTime: '20 minutes',
        agentToUse: null,
        promptToUse: null,
        instructions: [
          'Check dress code: business casual? casual? business professional?',
          'Pick outfit 2 days before (not day-of)',
          'Try it on - make sure it\'s comfortable (tags removed, not itchy)',
          'Plan backup outfit (in case first choice doesn\'t feel right morning-of)',
          'Lay out everything the night before (reduces morning decisions)',
          'Pro tip: Slightly overdress for first day (you can dress down later)'
        ],
        energyLevel: 'low',
        sensoryConsiderations: 'Prioritize comfort over looking perfect - you can\'t focus if your clothes are bothering you',
        breakAfter: false,
      },
      {
        stepNumber: 4,
        title: 'Pack Your Bag',
        description: 'Prepare everything you need to bring',
        estimatedTime: '15 minutes',
        agentToUse: null,
        promptToUse: null,
        instructions: [
          'Documents: ID, social security card (if needed), direct deposit form',
          'Notebook and pen (for taking notes)',
          'Lunch or lunch money',
          'Water bottle',
          'Phone charger',
          'Any required materials (laptop, badge, paperwork)',
          'Sensory toolkit: headphones, fidget, gum, mints, chapstick',
          'Emergency items: snack, pain reliever, hand sanitizer',
          'Pack the night before - checking off list reduces morning anxiety'
        ],
        energyLevel: 'low',
        breakAfter: true,
      },
      {
        stepNumber: 5,
        title: 'Create First Day Timeline',
        description: 'Plan your day hour-by-hour',
        estimatedTime: '15 minutes',
        agentToUse: 'calendar-translator',
        promptToUse: null,
        instructions: [
          'Use Calendar Translator agent',
          'Input: wake time, commute time, start time',
          'Include: shower, breakfast, getting dressed, buffer time',
          'Plan to arrive 15 min early (not 5 min late)',
          'Set multiple alarms (time blindness is real)',
          'Plan evening: decompress time, dinner, early bedtime (first days are exhausting)',
          'Example: "Wake: 6:30am, Leave: 7:45am, Arrive: 8:45am, Start: 9am"'
        ],
        energyLevel: 'low',
        breakAfter: false,
      },
      {
        stepNumber: 6,
        title: 'Prepare Small Talk Scripts',
        description: 'Have ready responses for common first-day questions',
        estimatedTime: '15 minutes',
        agentToUse: 'social-script-generator',
        promptToUse: null,
        instructions: [
          'Use Social Script Generator for:',
          '- "Tell me about yourself" (30 sec version)',
          '- "What brings you to [company]?"',
          '- "What did you do before this?"',
          '- "Where are you from?"',
          '- How to politely exit conversations: "Nice to meet you, I\'ll let you get back to work!"',
          'Practice scripts out loud 2-3 times',
          'Keep answers short (2-3 sentences max)',
          'It\'s okay to reuse the same answer with different people'
        ],
        energyLevel: 'medium',
        breakAfter: true,
      },
      {
        stepNumber: 7,
        title: 'Plan Post-Work Recovery',
        description: 'Prepare for being exhausted after first day',
        estimatedTime: '10 minutes',
        agentToUse: null,
        promptToUse: null,
        instructions: [
          'Accept: first day will be exhausting (new place, new people, masking)',
          'Plan dinner ahead (leftovers, easy meal, delivery)',
          'Block evening for decompress (no other commitments)',
          'Prepare comfort activities: favorite show, quiet time, stim freely',
          'Set low bar for evening productivity (just surviving first day is enough)',
          'Plan bedtime earlier than usual (you\'ll need it)',
          'Optional: debrief with friend/family (or don\'t - you might be peopled-out)'
        ],
        energyLevel: 'low',
        breakAfter: false,
      },
    ],

    totalEstimatedTime: '3-4 hours spread over several days',
    difficulty: 'beginner',
    prerequisites: ['Job offer accepted', 'Start date confirmed'],
    successMetrics: [
      'Arrive on time without rushing',
      'Have everything you need',
      'Feel as prepared as possible',
      'Recover afterwards without burnout'
    ],
    commonChallenges: [
      {
        challenge: 'Anxiety about unknowns',
        solution: 'Do optional site visit. Email HR with questions. Reduce unknowns = reduce anxiety.'
      },
      {
        challenge: 'Executive dysfunction night before',
        solution: 'Do ALL prep 2 days before (not night before). Morning-of, just follow the list.'
      },
      {
        challenge: 'Worry about making good impression',
        solution: 'They already hired you. First day is about learning, not performing. Be yourself (with appropriate masking).'
      },
    ],
    tags: ['executive-function', 'career', 'preparation', 'workflow'],
  },

  {
    id: 'accommodation-request-workflow',
    name: 'Workplace Accommodation Request Process',
    emoji: '🏢',
    category: 'communication',
    description: 'Step-by-step process for requesting and implementing accommodations',
    longDescription: 'A strategic approach to requesting workplace accommodations, from identifying needs to follow-through.',

    steps: [
      {
        stepNumber: 1,
        title: 'Identify Needed Accommodations',
        description: 'Figure out what would actually help you do your job better',
        estimatedTime: '30-45 minutes',
        agentToUse: 'masking-audit',
        promptToUse: null,
        instructions: [
          'Use Masking Audit Tool to identify what\'s draining you',
          'Common accommodations:',
          '- Noise-canceling headphones',
          '- Flexible schedule (avoid morning rush hour)',
          '- Written instructions instead of only verbal',
          '- Quiet workspace or work-from-home days',
          '- Sensory-friendly lighting',
          '- Clear expectations and deadlines in writing',
          '- Regular check-ins with manager',
          'Start with 1-3 accommodations (not 10)',
          'Focus on highest-impact requests first'
        ],
        energyLevel: 'medium',
        breakAfter: true,
      },
      {
        stepNumber: 2,
        title: 'Research Company Policy',
        description: 'Understand your rights and company accommodation process',
        estimatedTime: '20 minutes',
        agentToUse: null,
        promptToUse: null,
        instructions: [
          'Check employee handbook for accommodation policy',
          'Look for: "ADA accommodations", "disability accommodations", "HR policies"',
          'Identify who to ask: HR, direct manager, both?',
          'Understand: Do you need documentation? Can you request verbally first?',
          'Your rights (US): ADA requires "reasonable accommodations" for disabilities',
          'You don\'t have to use the word "disability" if you don\'t want to',
          'Reasonable = doesn\'t cause undue burden to employer'
        ],
        energyLevel: 'low',
        breakAfter: false,
      },
      {
        stepNumber: 3,
        title: 'Draft Accommodation Request',
        description: 'Write professional request letter/email',
        estimatedTime: '30 minutes',
        agentToUse: 'accommodation-letter',
        promptToUse: null,
        instructions: [
          'Use Accommodation Request Writer agent',
          'Include:',
          '- Specific accommodations (not vague "I need help")',
          '- How it benefits your work performance',
          '- Brief mention of why (optional disclosure)',
          'Keep it to 1 page / short email',
          'Professional but human tone',
          'Don\'t overshare medical details',
          'Frame as: "This will help me do my job more effectively"',
          'Offer to discuss further'
        ],
        energyLevel: 'medium',
        breakAfter: true,
      },
      {
        stepNumber: 4,
        title: 'Schedule Meeting (Optional)',
        description: 'Decide if you want to request in person or via email',
        estimatedTime: '5 minutes to schedule, 15-30 min meeting',
        agentToUse: 'social-script-generator',
        promptToUse: null,
        instructions: [
          'Email is often better (gives you time to think, provides paper trail)',
          'If meeting required, prepare:',
          '- Use Social Script Generator for talking points',
          '- Bring written summary to hand them',
          '- Practice what to say',
          '- Script: "I\'d like to discuss some accommodations that would help me do my job more effectively"',
          'You can also: Email first, follow up with meeting if needed'
        ],
        energyLevel: 'high',
        sensoryConsiderations: 'Meeting will be stressful - plan recovery time after',
        breakAfter: true,
      },
      {
        stepNumber: 5,
        title: 'Submit Request',
        description: 'Send email or have meeting',
        estimatedTime: '5 minutes (email) or 15-30 min (meeting)',
        agentToUse: null,
        promptToUse: null,
        instructions: [
          'Send accommodation request email to HR and/or manager',
          'Keep copy for your records',
          'Note date sent',
          'If verbal meeting: follow up with email summarizing what was discussed',
          'Be prepared: they might ask for documentation (therapist letter, etc.)',
          'Timeline: they should respond within days to weeks (varies by company)',
          'If they say no to everything: that may be illegal (consult employment lawyer)'
        ],
        energyLevel: 'medium',
        breakAfter: true,
      },
      {
        stepNumber: 6,
        title: 'Follow-Through & Adjustment',
        description: 'Make sure accommodations are implemented',
        estimatedTime: 'Ongoing',
        agentToUse: null,
        promptToUse: null,
        instructions: [
          'Once approved, confirm implementation timeline',
          'Check: Are accommodations actually happening?',
          'If not: polite reminder email to HR/manager',
          'After 2-4 weeks: assess what\'s working',
          'What\'s helping? What\'s not enough? What\'s too much?',
          'You can request adjustments: "The noise-canceling headphones are helping, but I\'ve realized I also need..."',
          'Accommodations are iterative (not one-and-done)',
          'Keep documentation (emails, approvals) in case of future issues'
        ],
        energyLevel: 'low',
        breakAfter: false,
      },
    ],

    totalEstimatedTime: '2-3 hours of active work, plus waiting for response',
    difficulty: 'intermediate',
    prerequisites: ['Currently employed', 'Experiencing specific challenges at work'],
    successMetrics: [
      'Accommodations requested',
      'Company responds (even if not perfect)',
      'At least some accommodations implemented',
      'Work becomes more sustainable'
    ],
    commonChallenges: [
      {
        challenge: 'Fear of being seen as "difficult" or "high-maintenance"',
        solution: 'Reframe: Accommodations let you do your best work. That benefits them. Asking for what you need = professionalism.'
      },
      {
        challenge: 'Don\'t know what would help',
        solution: 'Start with Masking Audit. Track what drains you for 1 week. Patterns will emerge.'
      },
      {
        challenge: 'Company says no or ghosts you',
        solution: 'Follow up once. If still no: consider if this job is sustainable. ADA non-compliance is a red flag.'
      },
    ],
    tags: ['communication', 'self-advocacy', 'accommodations', 'workplace', 'workflow'],
  },
];
