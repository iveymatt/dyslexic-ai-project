import type { Prompt } from '../types/prompts';

export const prompts: Prompt[] = [
  // ==================== STUDENTS (5) ====================
  {
    id: 'explain-concept',
    title: 'Explain this concept simply',
    emoji: '💡',
    description: 'When you\'re reading/learning something complex and your brain gets stuck. This prompt helps break it down into digestible pieces.',
    prompt: `I need to understand [TOPIC]. I have dyslexia, so please:
1. Explain in simple words (no jargon)
2. Use an analogy or real-world example
3. Break it into 3-4 key ideas
4. Tell me why it matters

Here's what confuses me: [WHAT SPECIFICALLY CONFUSES YOU]`,
    userType: 'student',
    bestMode: 'socratic',
    tags: ['#Learning', '#Understanding', '#Explained-Simply', '#ADHD'],
    exampleUseCase: 'Sarah, a college student, used this to understand photosynthesis for her biology class. Instead of re-reading a dense textbook chapter 5 times, she got a clear explanation with a cooking analogy in 2 minutes.',
    relatedPromptIds: ['break-down-assignment', 'study-guide-creator', 'note-taking-help'],
    rating: 247,
    usedCount: 1834,
    commentCount: 18,
    dateAdded: '2025-10-15',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'study-guide-creator',
    title: 'Create a study guide I can use',
    emoji: '📚',
    description: 'Turn messy notes, lecture transcripts, or textbook chapters into an organized study guide that actually makes sense to your brain.',
    prompt: `Help me create a study guide from these notes. I have ADHD and dyslexia, so make it:
- Organized by topic (clear headers)
- Key concepts in bold
- Short bullet points (not paragraphs)
- Include memory tricks or mnemonics if helpful

Here are my notes/materials:
[PASTE YOUR NOTES, TRANSCRIPT, OR CHAPTER TEXT]`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Organization', '#Studying', '#ADHD', '#Executive-Function'],
    exampleUseCase: 'Marcus used this before his history exam. He pasted 3 weeks of lecture transcripts and got a scannable 2-page study guide organized by era, with key dates highlighted.',
    relatedPromptIds: ['explain-concept', 'note-taking-help', 'overwhelmed-start'],
    rating: 198,
    usedCount: 1456,
    commentCount: 14,
    dateAdded: '2025-10-12',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'note-taking-help',
    title: 'Help me take notes from this',
    emoji: '📝',
    description: 'Turn a lecture recording, video transcript, or reading into organized notes you can actually use. Great for when listening/reading is hard.',
    prompt: `Help me take notes from this [LECTURE / VIDEO / READING]. I process information better when it's organized.

Please:
- Pull out the main points (3-5 max)
- Group related ideas together
- Skip the fluff, keep it essential
- Use simple language

Source material:
[PASTE TRANSCRIPT, TEXT, OR LINK]`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Note-Taking', '#Learning', '#Organization', '#ADHD'],
    exampleUseCase: 'Emma, who struggles with auditory processing, pasted a 40-minute lecture transcript and got organized notes in under a minute. She can now review without re-watching the whole lecture.',
    relatedPromptIds: ['study-guide-creator', 'explain-concept', 'break-down-assignment'],
    rating: 176,
    usedCount: 1289,
    commentCount: 11,
    dateAdded: '2025-10-10',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'break-down-assignment',
    title: 'Break down this confusing assignment',
    emoji: '📋',
    description: 'When the assignment instructions make no sense. This helps you figure out what your teacher actually wants.',
    prompt: `I have an assignment and I'm not sure what my teacher wants. Help me understand it.

Assignment instructions:
[PASTE THE INSTRUCTIONS]

Can you tell me:
1. What is the main thing they want me to do?
2. What format should my answer be in? (essay, presentation, etc.)
3. What are the key parts I need to include?
4. Is there anything tricky I should watch out for?`,
    userType: 'student',
    bestMode: 'socratic',
    tags: ['#Understanding', '#Tasks', '#School', '#Executive-Function'],
    exampleUseCase: 'Jake got an essay prompt that was 3 paragraphs long with multiple sub-questions. This prompt helped him see it was actually just asking for 3 things, not 10.',
    relatedPromptIds: ['overwhelmed-start', 'explain-concept', 'study-guide-creator'],
    rating: 164,
    usedCount: 1102,
    commentCount: 9,
    dateAdded: '2025-10-08',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'overwhelmed-start',
    title: 'I\'m overwhelmed - where do I start?',
    emoji: '😰',
    description: 'Big project. Panic mode. This helps you break it down into a realistic first step so you can just START.',
    prompt: `I have a big project and I'm completely overwhelmed. I don't know where to start.

Project: [DESCRIBE IT]
Due date: [WHEN]
What I've done so far: [NOTHING / OR WHAT YOU'VE DONE]

I need you to:
1. Tell me ONE small thing I can do right now (10-15 min max)
2. Don't give me the whole plan yet, just the first step
3. Make it so easy I can't say no

Help me START.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Overwhelm', '#Executive-Function', '#ADHD', '#Getting-Started'],
    exampleUseCase: 'Mia had a research paper due in 2 weeks and was frozen. This prompt told her to just pick her topic and write it down. That\'s it. She did it in 5 minutes and the momentum got her moving.',
    relatedPromptIds: ['break-down-assignment', 'study-guide-creator', 'project-breakdown'],
    rating: 231,
    usedCount: 1678,
    commentCount: 22,
    dateAdded: '2025-10-14',
    submittedBy: 'dyslexic-community',
    verified: true,
  },

  // ==================== PROFESSIONALS (5) ====================
  {
    id: 'email-help',
    title: 'Help me write this email professionally',
    emoji: '✉️',
    description: 'You need to write an important email but get stuck on tone, structure, or what to say. Gets it organized and polished.',
    prompt: `Help me write a professional email.

Context: [WHO IS IT TO? WHY ARE YOU WRITING?]
Main point: [WHAT DO YOU NEED TO SAY?]
Tone should be: [FRIENDLY / FORMAL / APOLOGETIC / etc]

Here's my draft (or leave blank if you haven't started):
[PASTE YOUR ATTEMPT OR DELETE THIS LINE]

Make it clear, professional, and not too long (3-5 sentences max if possible).`,
    userType: 'professional',
    bestMode: 'strategic',
    tags: ['#Writing', '#Work', '#Communication', '#Executive-Function'],
    exampleUseCase: 'Marcus, a project manager with dyslexia, used this to write an email to his boss about a deadline change. Took 3 minutes instead of 30 minutes of staring at a blank screen.',
    relatedPromptIds: ['workplace-jargon', 'mistake-fix', 'project-breakdown'],
    rating: 189,
    usedCount: 1423,
    commentCount: 12,
    dateAdded: '2025-10-14',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'workplace-jargon',
    title: 'Explain this workplace thing simply',
    emoji: '🏢',
    description: 'Your boss/coworker used corporate jargon or mentioned a concept you don\'t know. This translates it to human language.',
    prompt: `Someone at work said "[PHRASE OR CONCEPT]" and I'm not sure what they mean.

Can you:
1. Explain it in simple terms (no corporate jargon)
2. Give me an example of how it's used
3. Tell me why it matters in a workplace context

I need to understand this quickly without looking clueless.`,
    userType: 'professional',
    bestMode: 'socratic',
    tags: ['#Understanding', '#Work', '#Communication', '#Confidence'],
    exampleUseCase: 'Lisa\'s manager mentioned "synergy" and "bandwidth" in a meeting. This prompt helped her understand they just meant "working together" and "do you have time?"',
    relatedPromptIds: ['email-help', 'accommodations-request', 'project-breakdown'],
    rating: 142,
    usedCount: 987,
    commentCount: 8,
    dateAdded: '2025-10-11',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'accommodations-request',
    title: 'How do I ask for accommodations at work?',
    emoji: '🤝',
    description: 'You need accommodations but don\'t know how to ask without sounding "difficult." This helps you advocate for yourself professionally.',
    prompt: `I need to ask for accommodations at work because of my [DYSLEXIA / ADHD / etc] but I'm nervous.

What I need:
[EXAMPLES: extra time to read documents, written instructions instead of verbal, flexible deadlines, etc.]

Can you help me:
1. Draft what I should say to my manager
2. Frame it as helping me do BETTER work (not asking for special treatment)
3. Keep it confident but not defensive

Make it professional and clear.`,
    userType: 'professional',
    bestMode: 'strategic',
    tags: ['#Advocacy', '#Work', '#Accommodations', '#Confidence'],
    exampleUseCase: 'David needed extra time to review contracts because of dyslexia. This prompt helped him write a script for his boss that positioned it as "ensuring accuracy" rather than "I struggle."',
    relatedPromptIds: ['email-help', 'workplace-jargon', 'mistake-fix'],
    rating: 167,
    usedCount: 1156,
    commentCount: 15,
    dateAdded: '2025-10-09',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'project-breakdown',
    title: 'Break this project into steps',
    emoji: '📊',
    description: 'You have a big work project and your brain sees chaos. This turns it into a clear action plan with realistic time estimates.',
    prompt: `I have a work project and I need help organizing it.

Project: [DESCRIBE IT]
Deadline: [DATE]
Resources I have: [TEAM / TOOLS / BUDGET / etc]

Please:
1. Break it into 5-7 clear steps
2. Put them in order (what has to happen first)
3. Estimate how long each step will take
4. Tell me which step to start with TODAY

Make it realistic for someone with ADHD who needs concrete next actions.`,
    userType: 'professional',
    bestMode: 'strategic',
    tags: ['#Tasks', '#Work', '#Organization', '#Executive-Function'],
    exampleUseCase: 'Priya had to plan a product launch and was overwhelmed. This broke it into 6 steps with time estimates. She printed it out and checked them off one by one.',
    relatedPromptIds: ['overwhelmed-start', 'email-help', 'delegate-tasks'],
    rating: 178,
    usedCount: 1298,
    commentCount: 10,
    dateAdded: '2025-10-13',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'mistake-fix',
    title: 'I made a mistake - how do I fix it?',
    emoji: '🔧',
    description: 'You messed up at work and need to address it. This helps you own it, fix it, and move forward without spiraling.',
    prompt: `I made a mistake at work and I need to handle it.

What happened: [BRIEF DESCRIPTION]
Who it affects: [YOUR BOSS / A CLIENT / YOUR TEAM / etc]
Where things stand now: [HAS ANYONE NOTICED? WHAT'S THE CURRENT SITUATION?]

Help me:
1. Figure out how to tell them (what to say)
2. Offer a solution (not just apologize)
3. Keep it brief and professional (not over-apologizing)

I tend to catastrophize, so help me keep perspective.`,
    userType: 'professional',
    bestMode: 'socratic',
    tags: ['#Work', '#Communication', '#Problem-Solving', '#Confidence'],
    exampleUseCase: 'Tom missed a deadline because he misread his calendar. This prompt helped him draft an email owning it, offering a new timeline, and moving forward. His boss appreciated the honesty.',
    relatedPromptIds: ['email-help', 'accommodations-request', 'project-breakdown'],
    rating: 153,
    usedCount: 1045,
    commentCount: 13,
    dateAdded: '2025-10-07',
    submittedBy: 'dyslexic-community',
    verified: true,
  },

  // ==================== ENTREPRENEURS (5) ====================
  {
    id: 'business-idea-plan',
    title: 'Help me plan my business idea',
    emoji: '💼',
    description: 'You have a business idea but it\'s fuzzy. This helps you clarify it into something concrete and actionable.',
    prompt: `I have a business idea but it's not fully formed yet. Help me think it through.

My idea (rough version): [DESCRIBE IT]
Who I want to help: [TARGET AUDIENCE]
What problem I'm solving: [THE PROBLEM]

Ask me questions to help me:
1. Get clear on what I'm actually offering
2. Figure out who would pay for it
3. Identify what makes it different
4. Decide on a realistic first step

I think better when I talk it out, so ask me one question at a time.`,
    userType: 'entrepreneur',
    bestMode: 'socratic',
    tags: ['#Business', '#Planning', '#Ideas', '#ADHD'],
    exampleUseCase: 'Nina had a vague idea for a coaching business. Through this conversation, she realized her niche was career coaching for neurodivergent professionals. That clarity changed everything.',
    relatedPromptIds: ['business-organization', 'business-task-breakdown', 'delegate-tasks'],
    rating: 134,
    usedCount: 892,
    commentCount: 11,
    dateAdded: '2025-10-06',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'business-organization',
    title: 'How do I stay organized running my business?',
    emoji: '📁',
    description: 'Running a business with ADHD = chaos. This helps you create simple systems that actually work for your brain.',
    prompt: `I'm running a business and I'm drowning in tasks, emails, and decisions. I have ADHD and I need systems.

Current chaos:
- [WHAT'S OVERWHELMING YOU? clients, finances, admin, marketing, etc.]

Help me create:
1. A simple system for [PICK ONE AREA TO START]
2. Something I can maintain (not a complex productivity system I'll abandon)
3. Tools that work for ADHD brains (visual, simple, not 10 apps)

Start with ONE system. Keep it stupid simple.`,
    userType: 'entrepreneur',
    bestMode: 'strategic',
    tags: ['#Organization', '#Business', '#ADHD', '#Executive-Function'],
    exampleUseCase: 'Jake, a freelance designer, was losing track of client projects. This helped him set up a simple Trello board with 3 columns: To Do, Doing, Done. That\'s it. Game changer.',
    relatedPromptIds: ['business-idea-plan', 'business-task-breakdown', 'project-breakdown'],
    rating: 145,
    usedCount: 1034,
    commentCount: 9,
    dateAdded: '2025-10-08',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'business-task-breakdown',
    title: 'Break down this business task',
    emoji: '✅',
    description: 'A specific business task feels huge and vague. This breaks it into concrete steps you can actually do.',
    prompt: `I need to [BUSINESS TASK] but I don't know where to start.

Task: [LAUNCH A WEBSITE / SET UP ACCOUNTING / WRITE A PROPOSAL / etc]
Why it matters: [WHY YOU NEED TO DO THIS]
Timeline: [WHEN DO YOU NEED IT DONE?]

Break this down into:
1. Concrete steps (not vague like "research options")
2. Order (what comes first)
3. Time estimates
4. What I can do TODAY in 30 min or less

I have ADHD, so make the first step TINY.`,
    userType: 'entrepreneur',
    bestMode: 'strategic',
    tags: ['#Tasks', '#Business', '#ADHD', '#Getting-Started'],
    exampleUseCase: 'Maria needed to "set up accounting" but had no idea what that meant. This broke it into 4 steps: choose software (15 min), create account (10 min), connect bank (5 min), enter first invoice (10 min).',
    relatedPromptIds: ['business-organization', 'overwhelmed-start', 'project-breakdown'],
    rating: 128,
    usedCount: 876,
    commentCount: 7,
    dateAdded: '2025-10-05',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'business-financial-legal',
    title: 'Help me understand this financial/legal thing',
    emoji: '💰',
    description: 'Business finances and legal stuff are confusing. This translates it into language your brain can process.',
    prompt: `I need to understand [FINANCIAL OR LEGAL CONCEPT] for my business.

What I'm trying to figure out: [LLC vs sole proprietor, quarterly taxes, contracts, invoicing, etc.]

Explain it to me:
1. In simple terms (I have dyslexia, so skip the jargon)
2. Why it matters for my business
3. What I actually need to DO about it
4. Where to get help if I need it

Make it practical, not theoretical.`,
    userType: 'entrepreneur',
    bestMode: 'socratic',
    tags: ['#Business', '#Learning', '#Understanding', '#Finances'],
    exampleUseCase: 'Carlos was confused about quarterly estimated taxes. This explained it like "a pre-payment plan with the IRS" and told him to set aside 25% of income every month. Simple.',
    relatedPromptIds: ['workplace-jargon', 'explain-concept', 'business-idea-plan'],
    rating: 119,
    usedCount: 734,
    commentCount: 8,
    dateAdded: '2025-10-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'delegate-tasks',
    title: 'How do I delegate this task?',
    emoji: '🤲',
    description: 'You need to hand off a task but struggle with letting go or explaining it clearly. This helps you delegate effectively.',
    prompt: `I need to delegate [TASK] to [TEAM MEMBER / FREELANCER / VA] but I'm not sure how.

The task: [WHAT NEEDS TO BE DONE]
Why I'm delegating: [DON'T HAVE TIME / NOT MY STRENGTH / etc]
Their skill level: [EXPERIENCED / NEEDS GUIDANCE / BRAND NEW]

Help me:
1. Write clear instructions they can follow
2. Decide what level of detail they need
3. Figure out how to check in without micromanaging

I tend to either over-explain or under-explain. Find the middle.`,
    userType: 'entrepreneur',
    bestMode: 'strategic',
    tags: ['#Business', '#Communication', '#Team', '#Executive-Function'],
    exampleUseCase: 'Sophie, a founder with ADHD, was trying to delegate social media. This helped her create a simple content calendar template and a 5-minute daily check-in system.',
    relatedPromptIds: ['business-organization', 'email-help', 'project-breakdown'],
    rating: 112,
    usedCount: 698,
    commentCount: 6,
    dateAdded: '2025-10-03',
    submittedBy: 'dyslexic-community',
    verified: true,
  },

  // ==================== TEACHERS/EDUCATORS (5) ====================
  {
    id: 'teach-dyslexic-students',
    title: 'How do I teach [subject] to dyslexic students?',
    emoji: '👩‍🏫',
    description: 'You want to make your lessons accessible for dyslexic students but aren\'t sure how. This gives you practical strategies.',
    prompt: `I'm teaching [SUBJECT/TOPIC] and I want to make it accessible for dyslexic students.

Topic: [WHAT YOU'RE TEACHING]
Grade level: [K-12, COLLEGE, ADULT ED]
Current approach: [HOW YOU USUALLY TEACH THIS]

Give me:
1. 3-5 dyslexic-friendly teaching strategies for this topic
2. What to avoid (reading aloud, timed tests, dense text, etc.)
3. How to check understanding without relying on writing

Make it practical and easy to implement tomorrow.`,
    userType: 'teacher',
    bestMode: 'strategic',
    tags: ['#Teaching', '#Accessibility', '#Dyslexia', '#Education'],
    exampleUseCase: 'Mr. Thompson was teaching the water cycle. This suggested using a physical model, visual diagrams with arrows, and verbal explanations instead of reading from the textbook. His dyslexic students finally got it.',
    relatedPromptIds: ['accessible-materials', 'explain-dyslexia-class', 'accommodations-offer'],
    rating: 156,
    usedCount: 1123,
    commentCount: 14,
    dateAdded: '2025-10-10',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'accessible-materials',
    title: 'Create accessible lesson materials',
    emoji: '📄',
    description: 'Turn your existing lesson materials into formats that work for dyslexic and neurodivergent students.',
    prompt: `I have lesson materials that need to be more accessible for dyslexic students.

Current materials: [HANDOUT / SLIDES / WORKSHEET / etc]
Content: [PASTE IT OR DESCRIBE IT]

Make it accessible by:
1. Using simple, clear language (shorter sentences)
2. Breaking it into sections with headers
3. Adding visual elements (icons, bullet points)
4. Keeping paragraphs short (3-4 lines max)

Rewrite this to be dyslexic-friendly while keeping the same information.`,
    userType: 'teacher',
    bestMode: 'strategic',
    tags: ['#Accessibility', '#Teaching', '#Materials', '#Dyslexia'],
    exampleUseCase: 'Ms. Garcia had a dense 2-page history handout. This rewrote it with headers, bullet points, and simplified language. Her students with dyslexia could finally read it without overwhelm.',
    relatedPromptIds: ['teach-dyslexic-students', 'explain-dyslexia-class', 'accommodations-offer'],
    rating: 143,
    usedCount: 1056,
    commentCount: 10,
    dateAdded: '2025-10-09',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'explain-dyslexia-class',
    title: 'How do I explain dyslexia to my class?',
    emoji: '💬',
    description: 'You want to educate your class about dyslexia (maybe because a student disclosed) but need age-appropriate language.',
    prompt: `I want to explain dyslexia to my class in a positive, educational way.

Grade level: [AGE/GRADE]
Context: [WHY YOU'RE DOING THIS - student disclosed, general education, etc.]
Goal: [BUILD EMPATHY / REDUCE STIGMA / CELEBRATE DIFFERENCES / etc.]

Help me:
1. Write a 2-3 minute script I can use
2. Use age-appropriate language
3. Focus on strengths, not just challenges
4. Make it relatable (maybe an analogy or example)

Keep it positive and clear. I want students to understand, not pity.`,
    userType: 'teacher',
    bestMode: 'socratic',
    tags: ['#Education', '#Dyslexia', '#Communication', '#Advocacy'],
    exampleUseCase: 'A 4th grader disclosed their dyslexia to the class. The teacher used this prompt to create a brief explanation comparing dyslexia to "reading a different language" and celebrated the student\'s creativity and problem-solving.',
    relatedPromptIds: ['teach-dyslexic-students', 'accessible-materials', 'recognize-strengths'],
    rating: 137,
    usedCount: 892,
    commentCount: 12,
    dateAdded: '2025-10-07',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'accommodations-offer',
    title: 'What accommodations should I offer?',
    emoji: '🎯',
    description: 'You have dyslexic/neurodivergent students and want to provide accommodations proactively, but aren\'t sure what helps.',
    prompt: `I have students with dyslexia/ADHD and I want to offer helpful accommodations.

Class: [SUBJECT AND GRADE LEVEL]
Current struggles I'm seeing: [READING SPEED, WRITTEN ASSIGNMENTS, TIMED TESTS, etc.]

Suggest:
1. 5-7 accommodations I can offer to ALL students (not just diagnosed ones)
2. How to implement them without extra work for me
3. How to frame it so students don't feel singled out

Focus on "universal design" - accommodations that help everyone.`,
    userType: 'teacher',
    bestMode: 'strategic',
    tags: ['#Accommodations', '#Teaching', '#Accessibility', '#Support'],
    exampleUseCase: 'A high school English teacher started offering all students the option to record verbal responses instead of writing essays. Half the class used it, including non-dyslexic students. Everyone benefited.',
    relatedPromptIds: ['teach-dyslexic-students', 'accessible-materials', 'recognize-strengths'],
    rating: 149,
    usedCount: 1087,
    commentCount: 11,
    dateAdded: '2025-10-08',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'recognize-strengths',
    title: 'How do I recognize dyslexic strengths?',
    emoji: '⭐',
    description: 'You want to celebrate what dyslexic students ARE good at, not just accommodate their challenges. This helps you spot and name their strengths.',
    prompt: `I want to recognize and celebrate the strengths of my dyslexic/neurodivergent students, not just focus on their challenges.

What I'm noticing:
[DESCRIBE THE STUDENT OR SITUATION]

Help me:
1. Identify potential strengths I might be missing (big-picture thinking, creativity, problem-solving, verbal skills, etc.)
2. Give me specific language to affirm these strengths
3. Suggest ways to let them showcase these strengths in class

I want them to feel VALUED, not just accommodated.`,
    userType: 'teacher',
    bestMode: 'socratic',
    tags: ['#Strengths', '#Confidence', '#Teaching', '#Dyslexia'],
    exampleUseCase: 'Mrs. Lee noticed a dyslexic student struggling with written work but excelling in class discussions. This prompt helped her create opportunities for verbal presentations and recognize their "synthesizing complex ideas" strength.',
    relatedPromptIds: ['explain-dyslexia-class', 'teach-dyslexic-students', 'accommodations-offer'],
    rating: 162,
    usedCount: 1198,
    commentCount: 16,
    dateAdded: '2025-10-11',
    submittedBy: 'dyslexic-community',
    verified: true,
  },

  // ==================== PARENTS (5) ====================
  {
    id: 'explain-dyslexia-parent',
    title: 'Explain dyslexia to me - I\'m new to this',
    emoji: '🤔',
    description: 'Your child was just diagnosed with dyslexia and you\'re trying to understand what it means. This gives you a clear, practical overview.',
    prompt: `My child was just diagnosed with dyslexia and I'm trying to understand what this means.

My child's age: [AGE]
What I'm seeing: [STRUGGLES WITH READING, SPELLING, etc.]
My biggest questions: [WHAT ARE YOU MOST WORRIED ABOUT?]

Please explain:
1. What dyslexia actually is (simple terms)
2. What this means for my child's future (be honest but hopeful)
3. What I should do FIRST (not overwhelm me with 20 steps)
4. What my child's strengths might be

I'm scared and overwhelmed. Help me understand.`,
    userType: 'parent',
    bestMode: 'socratic',
    tags: ['#Dyslexia', '#Understanding', '#Parents', '#Support'],
    exampleUseCase: 'Linda\'s 8-year-old was diagnosed and she was terrified he\'d "never be able to read." This conversation helped her see dyslexia as a difference, not a disability, and gave her a clear first step: talk to his teacher.',
    relatedPromptIds: ['parent-homework-help', 'parent-advocacy', 'parent-confidence'],
    rating: 189,
    usedCount: 1487,
    commentCount: 23,
    dateAdded: '2025-10-12',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'parent-homework-help',
    title: 'How do I help my child with homework?',
    emoji: '📚',
    description: 'Homework time is a battle. This gives you strategies to support your dyslexic child without doing it for them.',
    prompt: `Homework with my dyslexic child is a daily struggle. I want to help without taking over.

Child's age/grade: [AGE/GRADE]
Subject they struggle with most: [READING, MATH, WRITING, etc.]
Current frustrations: [TAKES FOREVER, MELTDOWNS, REFUSES TO START, etc.]

Give me:
1. 3-5 strategies to make homework less painful
2. How to help them without doing it for them
3. When to let them struggle vs when to step in
4. How to keep my own frustration in check

Make it practical for weeknight chaos.`,
    userType: 'parent',
    bestMode: 'strategic',
    tags: ['#Homework', '#Parents', '#Support', '#ADHD'],
    exampleUseCase: 'Tom\'s dad learned to break homework into 15-minute chunks with breaks, use text-to-speech for reading assignments, and let Tom explain answers verbally instead of writing everything. Homework time went from 3 hours to 1.',
    relatedPromptIds: ['explain-dyslexia-parent', 'parent-frustration', 'parent-advocacy'],
    rating: 176,
    usedCount: 1376,
    commentCount: 19,
    dateAdded: '2025-10-11',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'parent-frustration',
    title: 'My child is frustrated - how do I help?',
    emoji: '😢',
    description: 'Your child is melting down about school/reading/homework. This helps you support them emotionally in the moment.',
    prompt: `My child is having a meltdown about [READING / HOMEWORK / SCHOOL / etc] and I don't know how to help.

What's happening: [DESCRIBE THE SITUATION]
What they're saying: [QUOTES IF POSSIBLE - "I'm stupid", "I can't do this", etc.]
My instinct: [WHAT YOU WANT TO DO/SAY]

Help me:
1. Understand what they're really feeling (translate the meltdown)
2. Figure out what to say RIGHT NOW (not lecture, just support)
3. Decide if we should power through or take a break
4. Avoid making it worse

I'm trying not to cry too. Help.`,
    userType: 'parent',
    bestMode: 'socratic',
    tags: ['#Emotions', '#Support', '#Parents', '#Confidence'],
    exampleUseCase: 'Emma\'s daughter said "I\'m too stupid to read" during homework. This prompt helped Emma respond with "Your brain works differently, not worse" and suggest they read together instead of pushing her to do it alone.',
    relatedPromptIds: ['parent-homework-help', 'parent-confidence', 'explain-dyslexia-parent'],
    rating: 194,
    usedCount: 1523,
    commentCount: 27,
    dateAdded: '2025-10-13',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'parent-advocacy',
    title: 'How do I advocate for my child at school?',
    emoji: '🎒',
    description: 'You need to talk to your child\'s teacher/school about accommodations or support, but aren\'t sure how to approach it.',
    prompt: `I need to advocate for my dyslexic child at school but I'm not sure how to do it effectively.

Situation: [WHAT'S HAPPENING AT SCHOOL]
What my child needs: [ACCOMMODATIONS, SUPPORT, UNDERSTANDING, etc.]
My worry: [BEING "THAT PARENT", NOT BEING TAKEN SERIOUSLY, etc.]

Help me:
1. Figure out exactly what to ask for
2. Write a script for talking to the teacher
3. Know my child's rights (briefly)
4. Stay calm and collaborative (not combative)

I want to be my child's advocate without making enemies.`,
    userType: 'parent',
    bestMode: 'strategic',
    tags: ['#Advocacy', '#School', '#Parents', '#Accommodations'],
    exampleUseCase: 'Miguel\'s son wasn\'t getting accommodations despite an IEP. This prompt helped him draft an email to the teacher asking for a meeting, listing specific accommodations, and keeping a collaborative tone. It worked.',
    relatedPromptIds: ['explain-dyslexia-parent', 'parent-homework-help', 'accommodations-request'],
    rating: 183,
    usedCount: 1412,
    commentCount: 21,
    dateAdded: '2025-10-10',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'parent-confidence',
    title: 'How do I build my child\'s confidence?',
    emoji: '💪',
    description: 'Your child\'s confidence is taking a hit because of dyslexia/school struggles. This gives you ways to build them back up.',
    prompt: `My child's confidence is really low because of dyslexia/school struggles. I want to help them feel capable.

Age: [AGE]
What I'm seeing: [NEGATIVE SELF-TALK, GIVING UP EASILY, COMPARING TO PEERS, etc.]
Their strengths (that they might not see): [CREATIVE, GOOD AT SPORTS, FUNNY, KIND, etc.]

Help me:
1. Identify and affirm their actual strengths (not just generic praise)
2. Respond to negative self-talk ("I'm dumb", "I can't read")
3. Find small wins to celebrate
4. Help them see dyslexia isn't the whole story

Give me specific things to SAY and DO.`,
    userType: 'parent',
    bestMode: 'socratic',
    tags: ['#Confidence', '#Parents', '#Strengths', '#Support'],
    exampleUseCase: 'Jasmine\'s daughter thought she was "bad at everything." This conversation helped Jasmine spot her daughter\'s strengths (problem-solving, empathy, art) and create opportunities to showcase them. Slowly, her confidence grew.',
    relatedPromptIds: ['parent-frustration', 'recognize-strengths', 'explain-dyslexia-parent'],
    rating: 201,
    usedCount: 1598,
    commentCount: 29,
    dateAdded: '2025-10-14',
    submittedBy: 'dyslexic-community',
    verified: true,
  },

  // ==================== COACHES/MENTORS/ADVOCATES (5) ====================
  {
    id: 'coach-effectively',
    title: 'How do I coach dyslexic people effectively?',
    emoji: '🎯',
    description: 'You\'re coaching/mentoring someone with dyslexia and want to adapt your approach to work with their brain, not against it.',
    prompt: `I'm coaching/mentoring someone with dyslexia and I want to be more effective.

What I'm coaching them on: [CAREER, LIFE, BUSINESS, ACADEMICS, etc.]
What I'm noticing: [CHALLENGES THEY FACE]
My usual coaching style: [HOW YOU TYPICALLY WORK]

Help me adapt my approach:
1. What should I do differently for neurodivergent brains?
2. How do I give feedback that lands (not overwhelms)?
3. What strengths should I look for and leverage?
4. How do I structure our sessions?

I want to meet them where they are.`,
    userType: 'coach',
    bestMode: 'socratic',
    tags: ['#Coaching', '#Support', '#Dyslexia', '#Mentoring'],
    exampleUseCase: 'A career coach started using visual maps instead of written action plans, giving verbal feedback instead of long written notes, and celebrating lateral thinking instead of trying to force linear processes. Her dyslexic clients thrived.',
    relatedPromptIds: ['understand-neurodivergent', 'advocacy-strategies', 'celebrate-strengths-coach'],
    rating: 128,
    usedCount: 867,
    commentCount: 13,
    dateAdded: '2025-10-09',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'understand-neurodivergent',
    title: 'Help me understand neurodivergent thinking',
    emoji: '🧠',
    description: 'You work with neurodivergent people and want to genuinely understand how their brains work, not just accommodate them.',
    prompt: `I work with neurodivergent people (dyslexia, ADHD, autism, etc.) and I want to understand how they think.

Specific question: [WHAT ARE YOU TRYING TO UNDERSTAND?]
Why it matters: [HOW THIS HELPS YOUR WORK]

Help me understand:
1. How neurodivergent brains process information differently
2. What strengths come from thinking this way
3. What I might be misunderstanding or missing
4. How to support without "fixing"

I want to get it right, not just be "nice."`,
    userType: 'coach',
    bestMode: 'socratic',
    tags: ['#Understanding', '#Neurodivergent', '#Learning', '#Support'],
    exampleUseCase: 'A school counselor asked why her ADHD students couldn\'t "just focus." This conversation helped her see ADHD as interest-based attention, not laziness. She completely changed how she supported them.',
    relatedPromptIds: ['coach-effectively', 'advocacy-strategies', 'mental-health-support'],
    rating: 141,
    usedCount: 976,
    commentCount: 15,
    dateAdded: '2025-10-08',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'advocacy-strategies',
    title: 'What advocacy strategies actually work?',
    emoji: '📢',
    description: 'You\'re advocating for neurodivergent people (in schools, workplaces, systems) and want to know what creates real change.',
    prompt: `I'm advocating for [STUDENTS / EMPLOYEES / CLIENTS] with dyslexia/neurodivergence.

Context: [SCHOOL, WORKPLACE, ORGANIZATION, COMMUNITY]
Current challenge: [WHAT'S NOT WORKING]
My goal: [WHAT CHANGE YOU WANT TO SEE]

Give me advocacy strategies that:
1. Actually create change (not just talk)
2. Work within the system (realistic)
3. Center the neurodivergent people, not my agenda
4. Don't burn me out

What's worked for others?`,
    userType: 'coach',
    bestMode: 'strategic',
    tags: ['#Advocacy', '#Support', '#Systems', '#Change'],
    exampleUseCase: 'An HR professional wanted to make her company more neurodivergent-friendly. This helped her start with flexible work options and written instructions as company-wide defaults, framing it as "better for everyone" instead of "accommodations."',
    relatedPromptIds: ['coach-effectively', 'understand-neurodivergent', 'accommodations-request'],
    rating: 135,
    usedCount: 892,
    commentCount: 11,
    dateAdded: '2025-10-07',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'mental-health-support',
    title: 'How do I support someone\'s mental health around dyslexia?',
    emoji: '💙',
    description: 'The person you\'re working with is struggling emotionally with dyslexia/neurodivergence. This helps you support them without overstepping.',
    prompt: `I'm working with someone who's struggling emotionally because of dyslexia/neurodivergence.

What I'm seeing: [ANXIETY, SHAME, LOW CONFIDENCE, BURNOUT, etc.]
My role: [COACH, TEACHER, COUNSELOR, MENTOR, etc.]
What I want to do: [HOW YOU WANT TO HELP]

Help me:
1. Understand what they might be feeling (beneath the surface)
2. Know what to say (and what NOT to say)
3. Figure out when to listen vs when to offer solutions
4. Recognize when they need professional help beyond my scope

I care, but I don't want to make it worse.`,
    userType: 'coach',
    bestMode: 'socratic',
    tags: ['#Mental-Health', '#Support', '#Dyslexia', '#Wellbeing'],
    exampleUseCase: 'A college advisor noticed a student with dyslexia was burned out. This conversation helped her validate the student\'s exhaustion, normalize therapy, and adjust academic expectations. The student felt seen.',
    relatedPromptIds: ['parent-frustration', 'coach-effectively', 'understand-neurodivergent'],
    rating: 147,
    usedCount: 1023,
    commentCount: 18,
    dateAdded: '2025-10-10',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'celebrate-strengths-coach',
    title: 'How do I celebrate neurodivergent strengths?',
    emoji: '🌟',
    description: 'You want to highlight what\'s GOOD about neurodivergent thinking, not just compensate for challenges. This helps you spot and name strengths.',
    prompt: `I want to help the neurodivergent people I work with see their STRENGTHS, not just manage their challenges.

Who I'm working with: [STUDENTS, CLIENTS, EMPLOYEES, etc.]
Strengths I'm noticing: [CREATIVITY, BIG-PICTURE THINKING, PROBLEM-SOLVING, etc.]

Help me:
1. Identify neurodivergent strengths I might be overlooking
2. Find language to affirm these strengths (not patronizing)
3. Create opportunities for them to USE these strengths
4. Shift from deficit-focused to strengths-based

I want them to feel PROUD of how their brain works.`,
    userType: 'coach',
    bestMode: 'socratic',
    tags: ['#Strengths', '#Support', '#Neurodivergent', '#Confidence'],
    exampleUseCase: 'A life coach helped her ADHD client see their "jumping between ideas" as "synthesizing connections" instead of "lack of focus." That reframe changed everything about how the client viewed themselves.',
    relatedPromptIds: ['recognize-strengths', 'parent-confidence', 'coach-effectively'],
    rating: 152,
    usedCount: 1098,
    commentCount: 16,
    dateAdded: '2025-10-11',
    submittedBy: 'dyslexic-community',
    verified: true,
  },

  // ==================== READING STRUGGLES (5) ====================
  {
    id: 'read-but-dont-remember',
    title: 'I read the whole page but don\'t remember anything',
    emoji: '📖',
    description: 'You finish reading and realize you have no idea what you just read. Your eyes moved but your brain didn\'t absorb it.',
    prompt: `I just read [TEXT/CHAPTER/ARTICLE] but I don't remember what I read. My brain was somewhere else.

Help me:
1. Summarize what I just read in 3-4 sentences
2. Pull out the most important point
3. Give me 2-3 questions to check if I understand it
4. Suggest a strategy so this doesn't keep happening

Here's what I read:
[PASTE THE TEXT OR DESCRIBE IT]`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Reading', '#Memory', '#Comprehension', '#ADHD'],
    exampleUseCase: 'Marcus read 5 pages of his history textbook but couldn\'t recall a single fact. This prompt summarized the key points and gave him 3 questions to test understanding. Now he does this after every page.',
    relatedPromptIds: ['explain-concept', 'study-guide-creator', 'note-taking-help'],
    rating: 213,
    usedCount: 1654,
    commentCount: 24,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'read-faster',
    title: 'Everyone reads faster than me - how can I keep up?',
    emoji: '⏱️',
    description: 'Reading takes you forever. Everyone else finishes assignments in half the time and you\'re still on page 3.',
    prompt: `I have to read [ASSIGNMENT/BOOK/ARTICLE] and it's taking me forever. I feel so slow.

What I'm reading: [DESCRIBE IT]
How long it's taking me: [TIME]
Why I need to speed up: [DEADLINE, KEEPING UP WITH CLASS, etc.]

Help me:
1. Decide if I need to read EVERY word or if I can skim
2. Show me what to focus on (and what to skip)
3. Give me a faster strategy for getting what I need from this
4. Remind me that slow ≠ stupid

I need practical help, not "just read faster."`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Reading', '#Speed', '#Time-Management', '#Dyslexia'],
    exampleUseCase: 'Sarah had to read a 30-page chapter in one night. This prompt taught her to read the intro/conclusion first, scan headers, and focus on bold terms. She finished in 90 minutes instead of 4 hours.',
    relatedPromptIds: ['read-but-dont-remember', 'note-taking-help', 'overwhelmed-start'],
    rating: 198,
    usedCount: 1523,
    commentCount: 19,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'skip-words-lines',
    title: 'Why do I keep skipping words and lines?',
    emoji: '👀',
    description: 'Your eyes jump around the page. You skip words, re-read the same line, or lose your place constantly.',
    prompt: `I keep skipping words or losing my place when I read. It's exhausting.

What happens:
[I SKIP WORDS / RE-READ THE SAME LINE / LOSE MY PLACE / MY EYES JUMP AROUND]

Help me:
1. Understand WHY this happens (is it normal for dyslexia?)
2. Give me 3-5 practical tools or tricks to help
3. Tell me if there are assistive tech options
4. Reassure me I'm not broken

I just want reading to be less exhausting.`,
    userType: 'student',
    bestMode: 'socratic',
    tags: ['#Reading', '#Dyslexia', '#Tools', '#Understanding'],
    exampleUseCase: 'Jake\'s eyes would jump lines constantly. This prompt explained visual tracking issues in dyslexia and suggested using a ruler/bookmark, trying colored overlays, and using text-to-speech. The ruler alone changed his life.',
    relatedPromptIds: ['tool-recommendations', 'read-but-dont-remember', 'read-faster'],
    rating: 187,
    usedCount: 1445,
    commentCount: 21,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'break-down-text',
    title: 'Help me break down this confusing text',
    emoji: '🧩',
    description: 'The text is dense, complicated, or full of big words. You need it simplified so your brain can process it.',
    prompt: `I'm trying to read this text but it's way too confusing.

Text:
[PASTE THE CONFUSING TEXT]

Help me:
1. Rewrite it in simple, clear language (like you're explaining to a 10-year-old)
2. Break it into smaller chunks with headers
3. Define any big/complicated words
4. Tell me the main point in one sentence

I have dyslexia, so simpler = better.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Reading', '#Understanding', '#Simplified', '#Dyslexia'],
    exampleUseCase: 'Emma had to read a dense paragraph about the Civil War. This prompt rewrote it in 3 short sentences with simple words. She finally understood what her textbook was trying to say.',
    relatedPromptIds: ['explain-concept', 'read-but-dont-remember', 'note-taking-help'],
    rating: 205,
    usedCount: 1589,
    commentCount: 17,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'anxious-reading-aloud',
    title: 'I\'m anxious about reading out loud in class',
    emoji: '😰',
    description: 'Reading out loud in front of people makes you panic. You stumble, freeze, or avoid it completely.',
    prompt: `I have to read out loud in class and I'm terrified.

What I'm worried about:
[STUMBLING OVER WORDS / PEOPLE JUDGING ME / LOSING MY PLACE / etc.]

The situation:
[WHEN, WHAT CLASS, HOW OFTEN THIS HAPPENS]

Help me:
1. Give me coping strategies for RIGHT NOW
2. Suggest what to say to my teacher (if I want accommodations)
3. Remind me that struggling with reading aloud doesn't mean I'm stupid
4. Help me prepare so I feel less anxious

I need practical + emotional support.`,
    userType: 'student',
    bestMode: 'socratic',
    tags: ['#Reading', '#Anxiety', '#School', '#Confidence'],
    exampleUseCase: 'Liam would fake being sick on days his English class did round-robin reading. This prompt gave him a script to ask his teacher to let him pass, and strategies to practice at home with his mom. He finally told his teacher.',
    relatedPromptIds: ['accommodations-student', 'confidence-boost', 'parent-advocacy'],
    rating: 221,
    usedCount: 1732,
    commentCount: 28,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },

  // ==================== WRITING CHALLENGES (5) ====================
  {
    id: 'spelling-three-ways',
    title: 'I spell the same word three different ways in one essay',
    emoji: '✍️',
    description: 'Your spelling is all over the place. Spell-check helps but doesn\'t catch everything, and you feel embarrassed.',
    prompt: `My spelling is a mess. I spell the same word differently every time and spell-check doesn't catch it all.

Current problem:
[DESCRIBE THE WRITING TASK - essay, email, report, etc.]

Help me:
1. Check this text for spelling errors (especially words spell-check misses)
2. Show me patterns in my mistakes (so I can learn)
3. Suggest tools that work better than basic spell-check
4. Remind me that bad spelling ≠ bad writer

Here's my text:
[PASTE YOUR WRITING]`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Writing', '#Spelling', '#Dyslexia', '#Tools'],
    exampleUseCase: 'Zoe wrote "there" "their" and "thier" all in one paragraph. This prompt caught all the errors, explained the difference, and suggested using Grammarly. Her essays improved immediately.',
    relatedPromptIds: ['write-professionally', 'fix-grammar', 'tool-recommendations'],
    rating: 192,
    usedCount: 1498,
    commentCount: 16,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'know-but-cant-write',
    title: 'I know what I want to say but I can\'t write it down',
    emoji: '💭',
    description: 'The ideas are clear in your head, but when you try to write them, they come out wrong or don\'t make sense.',
    prompt: `I know EXACTLY what I want to say, but when I try to write it, it comes out wrong.

What I'm trying to write:
[ESSAY, EMAIL, REPORT, etc.]

What I want to say (in my own words):
[TELL ME VERBALLY - just type it like you're talking]

Help me:
1. Turn my verbal explanation into clear written sentences
2. Organize it logically
3. Keep my voice (don't make it sound too formal unless I need that)
4. Show me how to do this myself next time

I think better when I TALK than when I WRITE.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Writing', '#Expression', '#Dyslexia', '#Communication'],
    exampleUseCase: 'Marcus could explain photosynthesis perfectly out loud but his written answer made no sense. This prompt helped him "talk" his answer first, then turned it into a clear paragraph. He started recording himself before writing.',
    relatedPromptIds: ['essay-organizer', 'email-help', 'write-professionally'],
    rating: 217,
    usedCount: 1687,
    commentCount: 23,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'write-professionally',
    title: 'Help me write this in a professional way',
    emoji: '💼',
    description: 'You need to write an email, cover letter, or document that sounds professional, but you\'re not sure if your tone is right.',
    prompt: `I need to write something professional but I'm not sure if it sounds right.

What I'm writing:
[EMAIL, COVER LETTER, WORK MESSAGE, etc.]

My attempt so far:
[PASTE WHAT YOU'VE WRITTEN OR LEAVE BLANK]

Help me:
1. Make it sound professional (but not stiff)
2. Fix any awkward phrasing
3. Check for spelling/grammar errors
4. Keep it clear and concise

I have dyslexia, so I need help making sure it sounds polished.`,
    userType: 'professional',
    bestMode: 'strategic',
    tags: ['#Writing', '#Work', '#Professional', '#Communication'],
    exampleUseCase: 'Priya needed to email a potential client but wasn\'t sure if her tone was too casual. This prompt polished her email, fixed some spelling errors, and made it sound confident. The client responded immediately.',
    relatedPromptIds: ['email-help', 'spelling-three-ways', 'fix-grammar'],
    rating: 201,
    usedCount: 1567,
    commentCount: 18,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'essay-organizer',
    title: 'Help me organize my essay - I have ideas but no structure',
    emoji: '📝',
    description: 'You have a bunch of ideas for your essay but don\'t know how to organize them into a logical structure.',
    prompt: `I have to write an essay and I have ideas, but I don't know how to organize them.

Essay topic:
[WHAT YOU'RE WRITING ABOUT]

My ideas (messy version):
[DUMP ALL YOUR THOUGHTS HERE - bullet points, fragments, whatever]

Help me:
1. Organize these ideas into a clear structure (intro, body paragraphs, conclusion)
2. Tell me what order to put them in
3. Identify if I'm missing anything important
4. Give me a simple outline I can follow

I have ADHD, so I need a clear roadmap.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Writing', '#Organization', '#Essays', '#ADHD'],
    exampleUseCase: 'Lila had 10 ideas for her persuasive essay but they were all jumbled. This prompt organized them into 3 clear body paragraphs with an intro and conclusion. She followed the outline and finished in 2 hours.',
    relatedPromptIds: ['know-but-cant-write', 'overwhelmed-start', 'break-down-assignment'],
    rating: 209,
    usedCount: 1621,
    commentCount: 20,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'fix-grammar',
    title: 'Fix my spelling and grammar so I don\'t look careless',
    emoji: '🔍',
    description: 'You\'ve written something but need it checked for spelling, grammar, and awkward phrasing before you submit/send it.',
    prompt: `I wrote this but I need it checked for spelling, grammar, and anything that sounds weird.

What it's for:
[SCHOOL ASSIGNMENT, WORK EMAIL, JOB APPLICATION, etc.]

My text:
[PASTE YOUR WRITING]

Help me:
1. Fix spelling and grammar errors
2. Point out any sentences that don't make sense
3. Suggest better phrasing for awkward parts
4. Keep my voice (don't rewrite it completely)

I have dyslexia, so I need a second set of eyes.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Writing', '#Grammar', '#Spelling', '#Proofreading'],
    exampleUseCase: 'David wrote a cover letter but was terrified of typos. This prompt caught 8 spelling errors, fixed 3 awkward sentences, and gave him confidence to hit "send." He got the interview.',
    relatedPromptIds: ['spelling-three-ways', 'write-professionally', 'email-help'],
    rating: 194,
    usedCount: 1512,
    commentCount: 15,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },

  // ==================== ORGANIZATION & EXECUTIVE FUNCTION (6) ====================
  {
    id: 'lost-track-time',
    title: 'I lost track of time and now I\'m behind',
    emoji: '⏰',
    description: 'Time blindness strikes again. You thought you had plenty of time and suddenly the deadline is tomorrow.',
    prompt: `I completely lost track of time and now [ASSIGNMENT/PROJECT/TASK] is due [SOON] and I'm behind.

What I need to do:
[DESCRIBE THE TASK]

Time I have left:
[HOURS/DAYS]

What I've done so far:
[NOTHING / OR WHAT YOU'VE DONE]

Help me:
1. Figure out what I can realistically finish in the time I have
2. Create a time-blocked plan for the rest of today/this week
3. Help me prioritize (what's essential vs what can I skip?)
4. Keep me from panicking

I have ADHD time blindness. Help me salvage this.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Time-Management', '#ADHD', '#Deadlines', '#Executive-Function'],
    exampleUseCase: 'Mia thought her paper was due Friday but it was due Wednesday. With 24 hours left, this prompt helped her cut the assignment into essential parts, time-block her evening, and finish a solid draft. She got a B+.',
    relatedPromptIds: ['overwhelmed-start', 'project-breakdown', 'planning-help'],
    rating: 226,
    usedCount: 1789,
    commentCount: 26,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'losing-things',
    title: 'I keep losing my keys/phone/wallet - where do I put them?',
    emoji: '🔑',
    description: 'You lose the same things every single day. Keys, phone, wallet, homework - it\'s exhausting.',
    prompt: `I keep losing [KEYS / PHONE / WALLET / HOMEWORK / etc] and it's driving me crazy.

What I keep losing:
[LIST THE THINGS]

Current "system" (if any):
[WHAT YOU'VE TRIED]

Help me:
1. Create a simple system for where to put these things
2. Make it so obvious I can't forget
3. Give me a backup plan for when I still lose them
4. Suggest any tools that might help (tile trackers, visual reminders, etc.)

I have ADHD. I need SIMPLE and VISUAL.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Organization', '#ADHD', '#Executive-Function', '#Daily-Life'],
    exampleUseCase: 'Carlos lost his keys 4 times a week. This prompt suggested a bright bowl by the door, a Tile tracker, and a rule: "Keys go in the bowl the second you walk in." He hasn\'t lost them in 2 months.',
    relatedPromptIds: ['simple-organization-system', 'visual-system', 'adhd-life-hacks'],
    rating: 218,
    usedCount: 1698,
    commentCount: 24,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'todo-list-chaos',
    title: 'My to-do list is so long it\'s useless',
    emoji: '📋',
    description: 'Your to-do list has 47 things on it and you don\'t know where to start, so you do nothing.',
    prompt: `My to-do list is out of control. It's so long that I just stare at it and do nothing.

Current to-do list:
[PASTE YOUR LIST OR DESCRIBE THE CHAOS]

Help me:
1. Cut this down to 3-5 things I should do TODAY
2. Move the rest to "someday" or delete them
3. Put today's tasks in order (what to do first)
4. Teach me how to keep my list from getting this crazy again

I have ADHD. Long lists paralyze me.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Organization', '#ADHD', '#Tasks', '#Executive-Function'],
    exampleUseCase: 'Nina had 38 things on her list and hadn\'t crossed off one in days. This prompt helped her pick 3 for today, move 20 to "someday/maybe," and delete 15 completely. She finished all 3 that day.',
    relatedPromptIds: ['overwhelmed-start', 'project-breakdown', 'planning-help'],
    rating: 234,
    usedCount: 1842,
    commentCount: 29,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'started-never-finished',
    title: 'I start projects but never finish them',
    emoji: '🚧',
    description: 'You have 10 half-finished projects and starting a new one sounds more exciting than finishing the old ones.',
    prompt: `I have a bunch of unfinished projects and I can't seem to finish any of them.

Projects I've started:
[LIST THEM]

Why I think I stopped:
[LOST INTEREST / GOT STUCK / NEW IDEA DISTRACTED ME / etc.]

Help me:
1. Pick ONE project to finish (help me choose)
2. Break it into tiny steps so I can actually finish it
3. Figure out why I keep abandoning things (is this ADHD?)
4. Teach me how to finish things instead of just starting them

I'm tired of being a "project graveyard."`,
    userType: 'entrepreneur',
    bestMode: 'socratic',
    tags: ['#ADHD', '#Executive-Function', '#Projects', '#Completion'],
    exampleUseCase: 'Jake had 6 unfinished coding projects. This conversation helped him pick the smallest one to finish first, break it into 5 steps, and commit to 30 min/day. He finished it in a week and felt amazing.',
    relatedPromptIds: ['overwhelmed-start', 'project-breakdown', 'business-task-breakdown'],
    rating: 241,
    usedCount: 1903,
    commentCount: 31,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'planning-help',
    title: 'Help me plan my week/day - I have no idea where to start',
    emoji: '🗓️',
    description: 'Planning feels impossible. You have 20 things to do this week and no idea how to fit them in.',
    prompt: `I have a bunch of things to do this week and I don't know how to plan it.

What I need to do:
[LIST EVERYTHING]

Time I have available:
[AFTER SCHOOL, EVENINGS, WEEKENDS, etc.]

Help me:
1. Put these tasks into a realistic weekly plan
2. Tell me what to do each day (be specific about times)
3. Build in breaks (I have ADHD and can't work for 4 hours straight)
4. Help me actually STICK to this plan

I have ADHD and executive function issues. I need external structure.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Planning', '#ADHD', '#Time-Management', '#Executive-Function'],
    exampleUseCase: 'Emma had 3 assignments, swim practice, and a family event all this week. This prompt time-blocked her week with 30-min tasks and built in breaks. She printed it out and checked off each block. Everything got done.',
    relatedPromptIds: ['lost-track-time', 'project-breakdown', 'todo-list-chaos'],
    rating: 228,
    usedCount: 1765,
    commentCount: 25,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'remember-important-things',
    title: 'How do I remember important things I need to do?',
    emoji: '🧠',
    description: 'You forget appointments, deadlines, and promises constantly. Your memory feels like a sieve.',
    prompt: `I forget everything. Appointments, deadlines, things I promised to do. It's embarrassing.

What I keep forgetting:
[EXAMPLES]

Current system (if any):
[PHONE REMINDERS / PLANNER / NOTHING / etc.]

Help me:
1. Create a memory system that works for ADHD brains
2. Suggest tools (apps, planners, alarms, etc.)
3. Give me a backup plan for when I still forget
4. Help me stop feeling like I'm failing at life

I don't MEAN to forget. My brain just... does.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Memory', '#ADHD', '#Executive-Function', '#Tools'],
    exampleUseCase: 'Liam missed 3 doctor appointments in 2 months. This prompt suggested setting 3 phone alarms (1 day before, 1 hour before, 15 min before) and putting appointments in Google Calendar immediately. He hasn\'t missed one since.',
    relatedPromptIds: ['losing-things', 'planning-help', 'tool-recommendations'],
    rating: 223,
    usedCount: 1734,
    commentCount: 27,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },

  // ==================== CONFIDENCE & SELF-ESTEEM (5) ====================
  {
    id: 'feel-stupid',
    title: 'I feel stupid because of dyslexia (but I know I\'m not)',
    emoji: '💔',
    description: 'Dyslexia makes you feel dumb even though logically you know you\'re not. You need someone to remind you of your worth.',
    prompt: `I feel stupid because of my dyslexia, even though I KNOW I'm not actually stupid.

What happened recently that made me feel this way:
[DESCRIBE THE SITUATION]

What the mean voice in my head is saying:
[BE HONEST]

Help me:
1. Remind me of what dyslexia actually is (and isn't)
2. Challenge the "I'm stupid" thought with facts
3. Help me see my strengths (even when I can't see them)
4. Give me something to say back to that mean voice

I need a pep talk from someone who gets it.`,
    userType: 'student',
    bestMode: 'socratic',
    tags: ['#Confidence', '#Dyslexia', '#Self-Esteem', '#Mental-Health'],
    exampleUseCase: 'After bombing a spelling test, Zoe felt like the "dumbest person in class." This conversation reminded her that dyslexia affects spelling, not intelligence, and helped her list 5 things she\'s actually great at. She cried, then felt better.',
    relatedPromptIds: ['confidence-boost', 'recognize-strengths', 'parent-confidence'],
    rating: 267,
    usedCount: 2103,
    commentCount: 38,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'imposter-syndrome',
    title: 'I\'m terrified someone will find out I\'m not as smart as they think',
    emoji: '😱',
    description: 'Imposter syndrome is hitting hard. You\'re succeeding but convinced you\'re faking it and will be "found out."',
    prompt: `I'm doing well at [SCHOOL / WORK / etc] but I feel like a fraud. I'm terrified someone will realize I'm not actually smart.

Current situation:
[WHAT YOU'RE SUCCEEDING AT]

What I'm scared of:
[BEING EXPOSED, PEOPLE FINDING OUT, FAILING PUBLICLY, etc.]

Why I think I'm faking it:
[YOUR THOUGHTS]

Help me:
1. Understand if this is imposter syndrome (and if it's common with dyslexia)
2. Separate facts from feelings (am I ACTUALLY faking it?)
3. Remember my real accomplishments
4. Handle this fear when it comes up

I need reality check + reassurance.`,
    userType: 'professional',
    bestMode: 'socratic',
    tags: ['#Confidence', '#Imposter-Syndrome', '#Mental-Health', '#Work'],
    exampleUseCase: 'Marcus got promoted at work but was convinced his boss would "realize" he wasn\'t qualified. This conversation helped him see imposter syndrome is common in neurodivergent people and list concrete evidence of his competence. He accepted the promotion.',
    relatedPromptIds: ['feel-stupid', 'recognize-strengths', 'confidence-boost'],
    rating: 253,
    usedCount: 1987,
    commentCount: 34,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'recognize-strengths',
    title: 'Help me recognize my strengths (I only see my struggles)',
    emoji: '💪',
    description: 'You focus on what\'s hard for you and can\'t see what you\'re actually good at. You need help identifying your strengths.',
    prompt: `I only see what I'm BAD at. I want to see what I'm GOOD at.

My challenges (the ones I focus on):
[LIST THEM]

Things people have complimented me on (even if I don't believe them):
[THINK HARD - WHAT HAVE PEOPLE SAID?]

Help me:
1. Identify potential strengths I'm overlooking
2. See how dyslexia might have HELPED me develop certain strengths
3. Find evidence of these strengths in my life
4. Reframe my "weaknesses" as trade-offs, not failures

I want to believe I'm good at SOMETHING.`,
    userType: 'student',
    bestMode: 'socratic',
    tags: ['#Strengths', '#Confidence', '#Dyslexia', '#Self-Esteem'],
    exampleUseCase: 'Lila could only list her struggles. Through this conversation, she realized she\'s great at big-picture thinking, problem-solving, and connecting with people. Her dyslexia actually made her a better listener because she focuses on meaning, not words.',
    relatedPromptIds: ['feel-stupid', 'celebrate-strengths-coach', 'parent-confidence'],
    rating: 246,
    usedCount: 1923,
    commentCount: 32,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'mistake-spiral',
    title: 'I made a mistake and now I\'m spiraling',
    emoji: '😰',
    description: 'You made one mistake and now you\'re catastrophizing. Your brain is telling you this means you\'re incompetent.',
    prompt: `I made a mistake and now I can't stop thinking about it.

What happened:
[DESCRIBE THE MISTAKE]

What my brain is telling me:
[I'M STUPID / I'M GOING TO GET FIRED / EVERYONE THINKS I'M INCOMPETENT / etc.]

Help me:
1. Get perspective (how bad is this ACTUALLY?)
2. Challenge the catastrophic thoughts
3. Figure out if I need to fix anything or just move on
4. Stop spiraling

I tend to blow things out of proportion. Help me reality-check this.`,
    userType: 'professional',
    bestMode: 'socratic',
    tags: ['#Confidence', '#Anxiety', '#Work', '#Mental-Health'],
    exampleUseCase: 'Priya sent an email with a typo to a client and spiraled for 2 hours. This conversation helped her see it was a minor typo, not a career-ending mistake. She corrected it in a follow-up and moved on. The client didn\'t even notice.',
    relatedPromptIds: ['mistake-fix', 'feel-stupid', 'imposter-syndrome'],
    rating: 238,
    usedCount: 1856,
    commentCount: 30,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'confidence-boost',
    title: 'I need a pep talk - today was rough',
    emoji: '🌟',
    description: 'You\'re feeling defeated and need someone to remind you that you\'re capable, worthy, and doing better than you think.',
    prompt: `Today was rough and I need a pep talk.

What happened:
[DESCRIBE YOUR DAY / THE STRUGGLE]

How I'm feeling:
[DEFEATED / EXHAUSTED / LIKE GIVING UP / etc.]

Help me:
1. Remind me why dyslexia doesn't define my worth
2. Acknowledge that this IS hard (validate me)
3. Point out things I might be overlooking (small wins, progress, strengths)
4. Give me encouragement that feels real, not fake

I don't need toxic positivity. I need real talk + kindness.`,
    userType: 'student',
    bestMode: 'socratic',
    tags: ['#Confidence', '#Support', '#Mental-Health', '#Dyslexia'],
    exampleUseCase: 'After failing another reading test, David felt like giving up. This conversation acknowledged the pain, reminded him reading speed isn\'t intelligence, and helped him see he\'d actually improved from last month. He kept going.',
    relatedPromptIds: ['feel-stupid', 'recognize-strengths', 'parent-confidence'],
    rating: 279,
    usedCount: 2198,
    commentCount: 41,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },

  // ==================== SOCIAL & DISCLOSURE (6) ====================
  {
    id: 'should-i-tell-boss',
    title: 'Should I tell my boss I have dyslexia?',
    emoji: '🤔',
    description: 'You\'re not sure if disclosing your dyslexia at work will help or hurt you. You need help weighing the decision.',
    prompt: `I'm debating whether to tell my boss I have dyslexia.

Current situation:
[ARE YOU STRUGGLING? NEED ACCOMMODATIONS? JUST STARTING A NEW JOB?]

What I'm worried about:
[DISCRIMINATION / BEING SEEN AS LESS CAPABLE / LOSING OPPORTUNITIES / etc.]

What I hope would happen if I tell them:
[ACCOMMODATIONS / UNDERSTANDING / LESS PRESSURE / etc.]

Help me:
1. Weigh the pros and cons
2. Assess my specific workplace (is it safe to disclose?)
3. Decide what makes sense for MY situation
4. Know my rights (briefly)

I need help thinking this through logically.`,
    userType: 'professional',
    bestMode: 'socratic',
    tags: ['#Disclosure', '#Work', '#Advocacy', '#Decision-Making'],
    exampleUseCase: 'Nina was struggling with written reports at work but scared to tell her manager. This conversation helped her assess that her boss was supportive, and disclosure led to getting dictation software and extra time for reports. It changed everything.',
    relatedPromptIds: ['write-disclosure-email', 'accommodations-request', 'explain-to-others'],
    rating: 244,
    usedCount: 1912,
    commentCount: 28,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'write-disclosure-email',
    title: 'Help me write a disclosure email/message',
    emoji: '✉️',
    description: 'You\'ve decided to disclose your dyslexia but don\'t know how to say it professionally without over-explaining or apologizing.',
    prompt: `I want to tell [MY BOSS / MY TEACHER / MY TEAM] that I have dyslexia, but I'm not sure how to word it.

Who I'm telling:
[BOSS, PROFESSOR, COWORKER, etc.]

Why I'm disclosing:
[NEED ACCOMMODATIONS / WANT UNDERSTANDING / EXPLAINING A MISTAKE / etc.]

What tone I want:
[CONFIDENT / MATTER-OF-FACT / COLLABORATIVE / etc.]

Help me:
1. Write a clear, professional disclosure message
2. Focus on solutions, not just problems
3. Avoid over-apologizing or making excuses
4. Keep it brief (3-5 sentences max)

I want to sound confident, not defensive.`,
    userType: 'professional',
    bestMode: 'strategic',
    tags: ['#Disclosure', '#Communication', '#Work', '#Advocacy'],
    exampleUseCase: 'Carlos needed to tell his professor he has dyslexia to request extra time on exams. This prompt helped him write a 4-sentence email that was clear, confident, and professional. His professor responded supportively within an hour.',
    relatedPromptIds: ['should-i-tell-boss', 'accommodations-request', 'explain-to-others'],
    rating: 237,
    usedCount: 1847,
    commentCount: 26,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'explain-to-others',
    title: 'How do I explain dyslexia to someone who doesn\'t get it?',
    emoji: '💬',
    description: 'Someone says "You don\'t look dyslexic" or "But you\'re so smart!" and you need language to explain what dyslexia actually is.',
    prompt: `Someone said [QUOTE THEIR COMMENT] and I want to explain dyslexia in a way they'll understand.

Who said it:
[FRIEND / COWORKER / FAMILY MEMBER / etc.]

What they seem to misunderstand:
[DYSLEXIA MEANS LOW IQ / IT'S JUST READING / YOU SHOULD BE OVER IT BY NOW / etc.]

Help me:
1. Explain dyslexia in simple, relatable terms
2. Correct their misconception without being defensive
3. Use an analogy or example they'll get
4. Keep it brief (they won't listen to a 10-minute lecture)

I want to educate, not argue.`,
    userType: 'student',
    bestMode: 'socratic',
    tags: ['#Disclosure', '#Education', '#Communication', '#Dyslexia'],
    exampleUseCase: 'Jake\'s uncle said "You\'re so smart, I thought dyslexia was for people who can\'t read." This helped Jake explain dyslexia as "my brain processing words differently, like trying to read a different language" - his uncle finally got it.',
    relatedPromptIds: ['explain-dyslexia-parent', 'explain-dyslexia-class', 'should-i-tell-boss'],
    rating: 231,
    usedCount: 1798,
    commentCount: 24,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'handle-awkward-situation',
    title: 'Help me handle this awkward dyslexia situation',
    emoji: '😬',
    description: 'Something awkward happened because of your dyslexia (mispronounced a word, misspelled something publicly, etc.) and you don\'t know how to respond.',
    prompt: `Something awkward just happened because of my dyslexia and I'm not sure how to handle it.

What happened:
[DESCRIBE THE SITUATION]

How I responded (if at all):
[WHAT YOU SAID/DID OR NOTHING]

Current vibe:
[ARE PEOPLE STARING? DID SOMEONE COMMENT? IS IT AWKWARD?]

Help me:
1. Figure out if I should address it or just move on
2. Suggest what to say if I need to say something
3. Handle any embarrassment I'm feeling
4. Prepare for if this happens again

I want to handle this with confidence, not shame.`,
    userType: 'professional',
    bestMode: 'socratic',
    tags: ['#Social', '#Confidence', '#Dyslexia', '#Communication'],
    exampleUseCase: 'Emma mispronounced a client\'s name in a meeting and everyone went silent. This conversation helped her address it with humor ("Dyslexia strikes again! Can you help me with the pronunciation?"). The client laughed and moved on.',
    relatedPromptIds: ['mistake-fix', 'confidence-boost', 'explain-to-others'],
    rating: 229,
    usedCount: 1776,
    commentCount: 23,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'tell-but-not-defined',
    title: 'I want to tell people, but I don\'t want dyslexia to define me',
    emoji: '🎭',
    description: 'You want people to know you have dyslexia (for understanding/accommodations) but you don\'t want it to become your whole identity.',
    prompt: `I want to be open about having dyslexia, but I don't want it to be the ONLY thing people know about me.

Current struggle:
[DESCRIBE THE BALANCE YOU'RE TRYING TO FIND]

What I want:
[UNDERSTANDING? ACCOMMODATIONS? JUST HONESTY?]

What I'm afraid of:
[BEING SEEN AS "THE DYSLEXIC ONE" / PITY / LOWER EXPECTATIONS / etc.]

Help me:
1. Find language to disclose without making it my whole identity
2. Set boundaries around talking about it
3. Redirect conversations when dyslexia becomes the focus
4. Own it without being defined by it

I want to be honest but not be reduced to my diagnosis.`,
    userType: 'student',
    bestMode: 'socratic',
    tags: ['#Disclosure', '#Identity', '#Confidence', '#Boundaries'],
    exampleUseCase: 'After disclosing to her study group, Mia felt like every conversation became about dyslexia. This conversation helped her create a script: "Yep, I have dyslexia. It affects how I read, but it\'s not the whole story. Anyway, back to biology..."',
    relatedPromptIds: ['should-i-tell-boss', 'explain-to-others', 'recognize-strengths'],
    rating: 248,
    usedCount: 1934,
    commentCount: 27,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'explain-to-partner',
    title: 'How do I explain dyslexia to my partner/date?',
    emoji: '❤️',
    description: 'You\'re dating someone or in a relationship and need to explain what dyslexia means for you, without it being weird or heavy.',
    prompt: `I want to explain my dyslexia to [PARTNER / DATE / PERSON I'M SEEING] but I'm not sure how to bring it up.

Current situation:
[NEW RELATIONSHIP / BEEN TOGETHER A WHILE / JUST STARTED DATING]

Why I want to tell them:
[SO THEY UNDERSTAND / THEY NOTICED SOMETHING / JUST WANT TO BE OPEN]

What I want them to know:
[HOW IT AFFECTS ME / WHAT I NEED / WHAT IT DOESN'T MEAN]

Help me:
1. Find a natural way to bring it up (not make it A Big Talk)
2. Explain what it means in practical terms (not clinical terms)
3. Let them know how they can support me (if at all)
4. Keep it light and confident, not heavy or apologetic

I want to be honest without making it weird.`,
    userType: 'student',
    bestMode: 'socratic',
    tags: ['#Disclosure', '#Relationships', '#Communication', '#Dyslexia'],
    exampleUseCase: 'Liam was dating someone new and she noticed he asked her to read the menu. This gave him language to casually say "I have dyslexia, so reading menus is annoying, but I love talking about food - what looks good to you?" She thought it was charming.',
    relatedPromptIds: ['explain-to-others', 'should-i-tell-boss', 'recognize-strengths'],
    rating: 219,
    usedCount: 1689,
    commentCount: 22,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },

  // ==================== TOOLS & STRATEGIES (5) ====================
  {
    id: 'tool-recommendations',
    title: 'Which tool is best for [specific need]?',
    emoji: '🛠️',
    description: 'You need a tool (text-to-speech, dictation, note-taking, etc.) but don\'t know what to choose. You want recommendations.',
    prompt: `I need a tool to help with [READING / WRITING / ORGANIZATION / NOTE-TAKING / etc] but I don't know what to use.

What I need help with:
[BE SPECIFIC - READING FASTER? SPELLING? TAKING NOTES?]

My situation:
[STUDENT / WORKING PROFESSIONAL / DEVICE I HAVE / BUDGET]

What I've tried (if anything):
[LIST TOOLS YOU'VE TRIED]

Help me:
1. Recommend 2-3 specific tools for my need
2. Explain why each one might work for me
3. Tell me if any are free or low-cost
4. Give me a starting point (which one to try first)

I'm overwhelmed by options. Just tell me what works.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Tools', '#Technology', '#Dyslexia', '#Recommendations'],
    exampleUseCase: 'Zoe needed text-to-speech for college reading. This recommended Natural Reader (free), Voice Dream (paid, $10), and browser extensions. She started with the free option and it changed her life. She now finishes readings in half the time.',
    relatedPromptIds: ['how-to-use-tool', 'best-font-overlay', 'remember-important-things'],
    rating: 256,
    usedCount: 2012,
    commentCount: 33,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'how-to-use-tool',
    title: 'Show me how to use [specific tool]',
    emoji: '📱',
    description: 'You have a tool but don\'t know how to set it up or use it effectively. You need a tutorial.',
    prompt: `I have [TOOL NAME] but I'm not sure how to use it.

The tool:
[NAME OF THE TOOL - text-to-speech, Grammarly, dictation, etc.]

What I'm trying to do with it:
[WHAT'S YOUR GOAL?]

Where I'm stuck:
[SETUP? FEATURES? MAKING IT WORK FOR MY NEEDS?]

Help me:
1. Walk me through setup (step-by-step)
2. Show me the key features I should actually use
3. Give me tips to make it work better for dyslexia
4. Troubleshoot any issues I'm having

Pretend I'm not tech-savvy. Be VERY specific.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Tools', '#Technology', '#How-To', '#Support'],
    exampleUseCase: 'Marcus downloaded Voice Dream but didn\'t know how to import his textbook PDFs. This prompt walked him through importing, adjusting speed, and highlighting while listening. He finally used the tool he\'d paid for months ago.',
    relatedPromptIds: ['tool-recommendations', 'best-font-overlay', 'simple-organization-system'],
    rating: 242,
    usedCount: 1889,
    commentCount: 25,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'best-font-overlay',
    title: 'What\'s the best font/overlay/formatting for dyslexia?',
    emoji: '🎨',
    description: 'You\'ve heard about dyslexia-friendly fonts and colored overlays but don\'t know what actually works or how to use them.',
    prompt: `I want to make reading easier with fonts, colors, or overlays, but I don't know what works.

What I'm reading:
[TEXTBOOKS, COMPUTER SCREEN, PRINTED DOCUMENTS, etc.]

Current struggles:
[LETTERS MOVE, GET TIRED QUICKLY, LOSE MY PLACE, etc.]

Help me:
1. Recommend fonts that help dyslexic readers
2. Explain colored overlays (do they work? which colors?)
3. Suggest formatting tricks (spacing, contrast, etc.)
4. Tell me how to implement these (browser extensions, apps, etc.)

I've heard about this stuff but don't know where to start.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Tools', '#Reading', '#Accessibility', '#Formatting'],
    exampleUseCase: 'Lila\'s eyes got exhausted reading on her laptop. This recommended OpenDyslexic font, a cream background instead of white, and the Helperbird browser extension. She installed Helperbird and reading online became 10x easier.',
    relatedPromptIds: ['skip-words-lines', 'tool-recommendations', 'how-to-use-tool'],
    rating: 233,
    usedCount: 1821,
    commentCount: 21,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'study-note-strategies',
    title: 'Help me figure out the best way to study/take notes',
    emoji: '📓',
    description: 'Traditional note-taking doesn\'t work for your brain. You need strategies that actually help you learn and remember.',
    prompt: `Traditional note-taking doesn't work for me. I need a better way.

What I'm studying:
[SUBJECT/TOPIC]

Current method (what's NOT working):
[WRITING NOTES, HIGHLIGHTING, REREADING, etc.]

My learning style (if you know):
[VISUAL? VERBAL? HANDS-ON? NOT SURE?]

Help me:
1. Suggest 3-4 study/note-taking methods for dyslexic brains
2. Explain HOW to do each one
3. Help me pick which to try first
4. Make it practical for [CLASS / WORK / EXAM PREP]

I need strategies that work with my brain, not against it.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Studying', '#Note-Taking', '#Learning', '#Strategies'],
    exampleUseCase: 'Emma was failing tests despite hours of studying. This suggested mind mapping instead of linear notes, recording herself explaining concepts, and teaching the material to her dog. She tried all three and her grades went up a full letter.',
    relatedPromptIds: ['note-taking-help', 'study-guide-creator', 'explain-concept'],
    rating: 249,
    usedCount: 1945,
    commentCount: 28,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'visual-system',
    title: 'Help me create a visual organization system',
    emoji: '🗂️',
    description: 'Text-based organization doesn\'t stick. You need something visual that your brain can actually process and remember.',
    prompt: `I need to organize [TASKS / SCHEDULE / PROJECTS / etc] but text lists don't work for my brain. I need something VISUAL.

What I'm trying to organize:
[BE SPECIFIC]

Why text lists don't work:
[I FORGET TO LOOK AT THEM / THEY OVERWHELM ME / I CAN'T PRIORITIZE]

Tools I have:
[PHONE, COMPUTER, PAPER, WHITEBOARD, etc.]

Help me:
1. Suggest visual organization systems (color-coding, symbols, charts, etc.)
2. Show me how to set it up
3. Keep it simple (I have ADHD, can't maintain complex systems)
4. Make it something I'll actually USE

I'm a visual learner. Work with my brain.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Organization', '#Visual', '#ADHD', '#Systems'],
    exampleUseCase: 'Carlos had a text-based to-do list he never looked at. This helped him create a color-coded Trello board with 3 columns (To Do, Doing, Done) and emojis for priority. He checked it 5x a day because it was visual and satisfying.',
    relatedPromptIds: ['simple-organization-system', 'losing-things', 'planning-help'],
    rating: 251,
    usedCount: 1967,
    commentCount: 29,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },

  // ==================== ACCOMMODATIONS & ADVOCACY (8) ====================
  {
    id: 'accommodations-student',
    title: 'What accommodations should I ask for at school?',
    emoji: '📚',
    description: 'You know you need help but don\'t know what accommodations to request. This helps you identify what would actually help.',
    prompt: `I need accommodations at school but I don't know what to ask for.

My struggles:
[READING SPEED / WRITING / TESTS / HOMEWORK / etc.]

What I've noticed helps:
[EXTRA TIME? LISTENING INSTEAD OF READING? etc.]

Current situation:
[DO YOU HAVE AN IEP/504? WHAT GRADE/LEVEL?]

Help me:
1. Identify 3-5 accommodations that match my struggles
2. Explain what each accommodation actually means
3. Tell me how to request them
4. Give me language to use when talking to teachers/counselors

I want accommodations that actually help, not just token support.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Accommodations', '#School', '#Advocacy', '#IEP-504'],
    exampleUseCase: 'Marcus struggled with timed tests but didn\'t know he could get extended time. This helped him request 1.5x time, audio format for reading passages, and a quiet testing room. His grades improved by a full letter.',
    relatedPromptIds: ['parent-advocacy', 'accommodations-request', 'anxious-reading-aloud'],
    rating: 241,
    usedCount: 1876,
    commentCount: 27,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'accommodations-not-working',
    title: 'My school/work won\'t give me the accommodations I need',
    emoji: '🚫',
    description: 'You requested accommodations but they\'re being denied or ignored. You need to know your rights and how to advocate.',
    prompt: `I asked for accommodations but [THEY DENIED THEM / THEY'RE NOT FOLLOWING THROUGH / THEY'RE IGNORING ME].

What I asked for:
[LIST THE ACCOMMODATIONS]

What happened:
[DESCRIBE THE RESPONSE]

Current situation:
[SCHOOL OR WORK? DO YOU HAVE DOCUMENTATION?]

Help me:
1. Understand my rights (briefly)
2. Figure out next steps (who to talk to, how to escalate)
3. Draft a follow-up message or email
4. Know when to get outside help (disability advocate, lawyer, etc.)

I need this accommodation to do my job/schoolwork. This isn't optional.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Accommodations', '#Advocacy', '#Rights', '#Legal'],
    exampleUseCase: 'Emma\'s professor said "everyone has to take the same test" and denied her extra time despite her 504 plan. This helped her escalate to disability services with documentation. The professor was required to comply.',
    relatedPromptIds: ['parent-advocacy', 'accommodations-student', 'should-i-tell-boss'],
    rating: 236,
    usedCount: 1834,
    commentCount: 29,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'iep-504-prep',
    title: 'Help me prepare for my IEP/504 meeting',
    emoji: '📋',
    description: 'You have an IEP or 504 meeting coming up and don\'t know how to prepare or what to say.',
    prompt: `I have an IEP/504 meeting coming up and I want to be prepared.

Type of meeting:
[INITIAL EVALUATION / ANNUAL REVIEW / RE-EVALUATION]

My biggest concerns:
[WHAT DO YOU WANT TO MAKE SURE GETS ADDRESSED?]

Current accommodations (if any):
[LIST THEM]

Help me:
1. Know what to expect in the meeting
2. Prepare questions to ask
3. Identify accommodations to request or keep
4. Write down my main points so I don't forget
5. Understand my rights as a parent/student

I want to advocate effectively but I'm nervous.`,
    userType: 'parent',
    bestMode: 'strategic',
    tags: ['#IEP-504', '#Advocacy', '#School', '#Parents'],
    exampleUseCase: 'Linda was going into her son\'s first IEP meeting terrified and unprepared. This helped her list 5 accommodations to request, questions about reading interventions, and talking points. She felt confident and got everything on the IEP.',
    relatedPromptIds: ['parent-advocacy', 'accommodations-student', 'accommodations-not-working'],
    rating: 248,
    usedCount: 1923,
    commentCount: 31,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'self-advocate-student',
    title: 'How do I advocate for myself (without my parents)?',
    emoji: '🗣️',
    description: 'You\'re in college or becoming independent and need to learn to advocate for yourself without relying on parents.',
    prompt: `I need to learn to advocate for myself, but I'm used to my parents doing it for me.

Current situation:
[COLLEGE? FIRST JOB? LIVING INDEPENDENTLY?]

What I need to advocate for:
[ACCOMMODATIONS / UNDERSTANDING / SUPPORT / etc.]

What makes this hard:
[SCARED / DON'T KNOW WHAT TO SAY / WORRIED ABOUT JUDGMENT / etc.]

Help me:
1. Build confidence to speak up for myself
2. Know what to say (script or talking points)
3. Figure out who to talk to
4. Stop feeling like I'm being "difficult"

I need to learn to do this on my own.`,
    userType: 'student',
    bestMode: 'socratic',
    tags: ['#Advocacy', '#Independence', '#College', '#Self-Advocacy'],
    exampleUseCase: 'Jake, 18, started college and needed to register with disability services himself for the first time. This helped him practice what to say, schedule the appointment, and advocate for text-to-speech software. He did it without his mom.',
    relatedPromptIds: ['accommodations-student', 'should-i-tell-boss', 'write-disclosure-email'],
    rating: 239,
    usedCount: 1867,
    commentCount: 25,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'disability-services-college',
    title: 'How do I register with disability services in college?',
    emoji: '🎓',
    description: 'You\'re in college and don\'t know how to access accommodations through disability services.',
    prompt: `I'm in college and I need to register with disability services but I don't know how.

My situation:
[DIAGNOSED WITH DYSLEXIA? HAVE DOCUMENTATION? FIRST YEAR OR LATER?]

What I need help with:
[THE PROCESS / WHAT TO BRING / WHAT ACCOMMODATIONS TO ASK FOR]

What I'm worried about:
[IS IT WORTH IT? WILL PROFESSORS JUDGE ME? IS IT TOO MUCH WORK?]

Help me:
1. Understand the step-by-step process
2. Know what documentation I need
3. Figure out what accommodations to request
4. Get over my hesitation about doing this

Everyone says to register but I don't know where to start.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#College', '#Accommodations', '#Disability-Services', '#Registration'],
    exampleUseCase: 'Mia waited until sophomore year to register with disability services because she didn\'t know how. This walked her through the process: get documentation, schedule appointment, request accommodations. She finally got the help she needed.',
    relatedPromptIds: ['accommodations-student', 'self-advocate-student', 'should-i-tell-boss'],
    rating: 252,
    usedCount: 1967,
    commentCount: 28,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'workplace-accommodations-request',
    title: 'What accommodations can I request at work?',
    emoji: '💼',
    description: 'You\'re struggling at work and need accommodations but don\'t know what\'s reasonable or how to ask.',
    prompt: `I'm struggling at work and think I need accommodations, but I don't know what to ask for.

My struggles:
[READING EMAILS / WRITING REPORTS / MEETINGS / TIME MANAGEMENT / etc.]

What helps me:
[WRITTEN INSTRUCTIONS / EXTRA TIME / QUIET SPACE / etc.]

My workplace:
[SUPPORTIVE? FORMAL? SMALL/LARGE COMPANY?]

Help me:
1. Identify 3-5 workplace accommodations that match my struggles
2. Know what's reasonable to ask for (legally and practically)
3. Figure out how to request them formally
4. Anticipate pushback and how to respond

I need help, but I don't want to seem difficult.`,
    userType: 'professional',
    bestMode: 'strategic',
    tags: ['#Accommodations', '#Work', '#ADA', '#Advocacy'],
    exampleUseCase: 'Priya struggled with long email threads and verbal-only meetings. This helped her request written meeting notes, extra time for written reports, and Grammarly as assistive tech. Her employer approved all three under ADA.',
    relatedPromptIds: ['accommodations-request', 'should-i-tell-boss', 'write-disclosure-email'],
    rating: 244,
    usedCount: 1901,
    commentCount: 26,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'simple-organization-system',
    title: 'Help me create a simple system I\'ll actually use',
    emoji: '📦',
    description: 'Complex organization systems don\'t work for you. You need something so simple you can\'t fail.',
    prompt: `I've tried 20 organization systems and abandoned them all. I need something SIMPLE.

What I've tried:
[LIST THE SYSTEMS YOU'VE TRIED]

Why they didn't work:
[TOO COMPLICATED / FORGOT TO USE THEM / OVERWHELMING / etc.]

What I need to organize:
[TASKS / TIME / PAPERS / BELONGINGS / etc.]

Help me:
1. Create the SIMPLEST possible system (3 steps max)
2. Make it visual if possible
3. Build in reminders so I actually use it
4. Accept that "good enough" is better than perfect

I have ADHD. If it's not stupid simple, I won't do it.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#Organization', '#ADHD', '#Systems', '#Simplicity'],
    exampleUseCase: 'Carlos tried bullet journaling, apps, planners - all abandoned within a week. This helped him create a 3-bin system: "Do Today" "Do This Week" "Someday." He\'s used it for 6 months because it\'s that simple.',
    relatedPromptIds: ['visual-system', 'losing-things', 'planning-help'],
    rating: 261,
    usedCount: 2045,
    commentCount: 33,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'adhd-life-hacks',
    title: 'Give me life hacks for ADHD that actually work',
    emoji: '💡',
    description: 'You need practical, real-world strategies for managing ADHD in daily life, not generic advice.',
    prompt: `I have ADHD and I need practical life hacks that actually work.

My biggest struggles:
[TIME MANAGEMENT / LOSING THINGS / REMEMBERING / STARTING TASKS / etc.]

What I've tried:
[LIST STRATEGIES YOU'VE TRIED]

My lifestyle:
[STUDENT / WORKING / STAY-AT-HOME PARENT / etc.]

Give me:
1. 5-7 specific, practical hacks for my struggles
2. Ones that don't require sustained effort (because... ADHD)
3. Low-cost or free solutions
4. Real examples of how to implement them

No generic advice like "make a schedule." Tell me HOW.`,
    userType: 'student',
    bestMode: 'strategic',
    tags: ['#ADHD', '#Life-Hacks', '#Practical', '#Executive-Function'],
    exampleUseCase: 'Emma kept losing her phone 10x a day. Hacks that worked: phone always goes in right pocket, Tile tracker attached, "where\'s my phone?" routine before leaving any room. She hasn\'t lost it in 2 weeks.',
    relatedPromptIds: ['losing-things', 'remember-important-things', 'simple-organization-system'],
    rating: 273,
    usedCount: 2145,
    commentCount: 38,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },

  // ==================== UNDERSTANDING DYSLEXIA (5) ====================
  {
    id: 'do-i-have-dyslexia',
    title: 'Do I have dyslexia? Help me figure this out',
    emoji: '❓',
    description: 'You\'ve been struggling and wondering if it\'s dyslexia. You need help understanding the signs and what to do next.',
    prompt: `I've been struggling with [READING / SPELLING / WRITING / etc] and I'm wondering if I have dyslexia.

What I'm experiencing:
[DESCRIBE YOUR STRUGGLES]

How long this has been happening:
[ALWAYS / RECENTLY / SINCE CHILDHOOD]

Help me:
1. Explain common signs of dyslexia
2. Help me assess if my experiences match those signs
3. Tell me what to do next (testing, evaluation, etc.)
4. Reassure me that getting answers is a good thing

I'm scared but also relieved to have a name for this.`,
    userType: 'student',
    bestMode: 'socratic',
    tags: ['#Dyslexia', '#Diagnosis', '#Understanding', '#Assessment'],
    exampleUseCase: 'Nina, 28, had struggled with reading her whole life but thought she was "just slow." This conversation helped her recognize dyslexia signs and connect with an educational psychologist for testing. She was diagnosed at 29 and finally got answers.',
    relatedPromptIds: ['explain-dyslexia-simple', 'dyslexia-vs-adhd', 'will-i-always-have-dyslexia'],
    rating: 264,
    usedCount: 2076,
    commentCount: 36,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'explain-dyslexia-simple',
    title: 'Explain dyslexia to me in simple terms',
    emoji: '🧠',
    description: 'You want to understand what dyslexia actually IS - not medical jargon, just a clear explanation of how your brain works.',
    prompt: `I want to understand what dyslexia actually is. Explain it to me in simple, clear language.

What I already know (or think I know):
[YOUR CURRENT UNDERSTANDING]

What confuses me:
[WHAT YOU DON'T GET OR HAVE QUESTIONS ABOUT]

Help me understand:
1. What dyslexia is (and what it ISN'T)
2. Why my brain processes words differently
3. Whether it's just about reading (or more than that)
4. What this means for my life going forward

No medical jargon. Talk to me like I'm a human, not a textbook.`,
    userType: 'student',
    bestMode: 'socratic',
    tags: ['#Dyslexia', '#Understanding', '#Education', '#Simple-Explanation'],
    exampleUseCase: 'Jake was just diagnosed and had no idea what dyslexia actually meant. This conversation explained it as "his brain taking a different route to process words - slower but often more creative." He finally understood himself.',
    relatedPromptIds: ['do-i-have-dyslexia', 'dyslexia-vs-adhd', 'explain-dyslexia-parent'],
    rating: 271,
    usedCount: 2134,
    commentCount: 37,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'dyslexia-vs-adhd',
    title: 'What\'s the difference between dyslexia, ADHD, and other learning differences?',
    emoji: '🔍',
    description: 'You\'re confused about how dyslexia is different from ADHD, dyscalculia, or other diagnoses. You need clarity.',
    prompt: `I'm confused about the difference between dyslexia, ADHD, and other learning differences.

What I have (or think I have):
[YOUR DIAGNOSIS OR WHAT YOU'RE WONDERING ABOUT]

What confuses me:
[DO I HAVE BOTH? HOW ARE THEY DIFFERENT? WHY DO THEY OVERLAP?]

Help me understand:
1. How dyslexia is different from ADHD
2. Whether you can have both (and what that looks like)
3. Other related conditions (dyscalculia, dysgraphia, etc.)
4. Why this matters for getting the right support

Make it clear and simple. I'm overwhelmed by labels.`,
    userType: 'student',
    bestMode: 'socratic',
    tags: ['#Dyslexia', '#ADHD', '#Understanding', '#Diagnosis'],
    exampleUseCase: 'Mia had both dyslexia and ADHD and didn\'t understand how they were different. This explained dyslexia affects word processing, ADHD affects attention/exec function, and they often co-occur. She finally understood why both accommodations helped.',
    relatedPromptIds: ['explain-dyslexia-simple', 'do-i-have-dyslexia', 'understand-neurodivergent'],
    rating: 258,
    usedCount: 2023,
    commentCount: 31,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'dyslexia-superpower',
    title: 'Is dyslexia actually a "superpower" or is that just toxic positivity?',
    emoji: '🦸',
    description: 'You keep hearing dyslexia is a "gift" but it feels hard. You want an honest answer about strengths AND struggles.',
    prompt: `People keep telling me dyslexia is a "superpower" or a "gift" but that doesn't match my experience. What's the truth?

My experience with dyslexia:
[BE HONEST - WHAT'S HARD? WHAT MIGHT BE STRENGTHS?]

Why the "superpower" narrative bothers me (if it does):
[YOUR THOUGHTS]

Help me:
1. Get an honest answer (not toxic positivity)
2. Understand what the research actually says about strengths
3. Validate that the struggles are REAL
4. Find a balanced view that doesn't sugarcoat OR catastrophize

I want the truth, not a pep talk.`,
    userType: 'student',
    bestMode: 'socratic',
    tags: ['#Dyslexia', '#Strengths', '#Understanding', '#Real-Talk'],
    exampleUseCase: 'Liam was frustrated by "dyslexia is a gift" messaging while failing spelling tests. This conversation validated that dyslexia IS hard, explained research on spatial reasoning/creativity strengths, and helped him see both truths can exist. He felt seen.',
    relatedPromptIds: ['recognize-strengths', 'feel-stupid', 'explain-dyslexia-simple'],
    rating: 268,
    usedCount: 2109,
    commentCount: 39,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
  {
    id: 'will-i-always-have-dyslexia',
    title: 'Will I always have dyslexia? Can it be cured?',
    emoji: '🔮',
    description: 'You\'re wondering if dyslexia goes away, gets better, or if you\'ll struggle forever. You want an honest answer.',
    prompt: `Will I always have dyslexia? Can it be cured or will it get better?

Current situation:
[YOUR AGE, HOW LONG YOU'VE KNOWN, WHAT YOU'RE STRUGGLING WITH]

What I'm hoping for:
[BE HONEST]

Help me understand:
1. Does dyslexia go away or is it lifelong?
2. Can it get better (even if it doesn't go away)?
3. What does "better" look like realistically?
4. What I can do to make things easier going forward

I want the truth, not false hope or doom and gloom.`,
    userType: 'student',
    bestMode: 'socratic',
    tags: ['#Dyslexia', '#Understanding', '#Future', '#Real-Talk'],
    exampleUseCase: 'Emma, 16, wanted to know if dyslexia would "go away" in college. This explained it\'s lifelong BUT skills improve, strategies help, and many dyslexic adults thrive. She stopped waiting to be "fixed" and started building strategies.',
    relatedPromptIds: ['explain-dyslexia-simple', 'do-i-have-dyslexia', 'tool-recommendations'],
    rating: 255,
    usedCount: 1998,
    commentCount: 32,
    dateAdded: '2025-11-04',
    submittedBy: 'dyslexic-community',
    verified: true,
  },
];

// Helper function to get all unique tags
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  prompts.forEach(prompt => {
    prompt.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

// Helper function to get prompts by user type
export function getPromptsByUserType(userType: string): Prompt[] {
  if (userType === 'all') return prompts;
  return prompts.filter(p => p.userType === userType);
}

// Helper function to get a prompt by ID
export function getPromptById(id: string): Prompt | undefined {
  return prompts.find(p => p.id === id);
}
