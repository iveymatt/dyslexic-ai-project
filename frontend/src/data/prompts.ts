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
