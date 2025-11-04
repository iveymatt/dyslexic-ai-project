import type { LifeSkillsModule } from '../../types/career';

export const lifeSkillsModules: LifeSkillsModule[] = [
  {
    id: 'time-management',
    title: 'Time Management & Scheduling',
    icon: '⏰',
    description: 'Master your time, not the clock',
    coreThemes: ['Capacity & Executive Function', 'Organizing Systems'],

    lessons: [
      {
        id: 'lesson-1',
        title: 'Understanding Your Energy Patterns',
        duration: 5,
        coreTheme: 'executive-function',
        content: `Many neurodivergent people experience energy differently throughout the day. Some are night owls. Some have ADHD and their focus comes in waves. Time blindness is real.

**Key Concept:** Work WITH your brain, not against it.

**What to learn:**
- Track when you feel most focused (morning? afternoon? night?)
- Notice your "crash times" (when energy drops)
- Identify what recharges you (breaks? movement? quiet?)

**Why this matters:** Scheduling important tasks during your peak energy times = success.

**Career Connection:**
- **Software Testers** need sustained attention to detail—schedule testing during your peak focus hours
- **Data Entry Specialists** thrive with hyperfocus blocks of 2-4 hours—align these with your natural energy peaks
- **Graphic Designers** juggling multiple client projects need to match creative work with high-energy times`,
        exercise: 'For 3 days, write down your energy level every 2 hours (1-10 scale). Notice patterns.',
        teachableMoment: {
          scenario: "It's your first week at a new job. Your boss asks you to complete a detailed report by Friday. You notice you feel most alert around 2-4pm, but meetings are always scheduled then. By 5pm you're exhausted and can't focus.",
          whatToNotice: "Pay attention to: (1) When do you feel most alert? (2) What drains your energy (meetings, noise, interruptions)? (3) When do you hit a 'wall' and can't think clearly anymore?",
          howToRespond: "This week, track your energy honestly. Don't force yourself to work when you're crashing. Next week, talk to your supervisor: 'I've noticed I do my best detailed work between 2-4pm. Would it be possible to block that time for focused tasks and move meetings to mornings?' Most employers value self-awareness.",
          whyItMatters: "Understanding your energy patterns prevents burnout and helps you advocate for yourself. Autistic people often experience energy differently—honoring that isn't 'special treatment,' it's working smarter. This skill helps you succeed long-term instead of burning out in 6 months."
        }
      },
      {
        id: 'lesson-2',
        title: 'Breaking Tasks into Time Blocks',
        duration: 5,
        coreTheme: 'executive-function',
        content: `Big tasks feel overwhelming. "Write report" feels impossible. "Write introduction for 15 minutes" feels doable.

**Key Concept:** Small chunks = progress.

**Time blocking strategies:**
- **Pomodoro:** 25 min work + 5 min break
- **ADHD-friendly:** 15 min work + 3 min movement break
- **Flexible blocks:** Work for as long as hyperfocus lasts, then break

**The secret:** It's okay to stop. Progress > perfection.

**Career Examples:**
- **Software Testers:** Break testing into 25-min test case blocks, then document bugs in 15-min writing blocks
- **Data Entry:** Use 45-min hyperfocus blocks for data input, 10-min breaks to prevent burnout
- **Graphic Designers:** 30-min design blocks for creativity, 15-min blocks for client emails and admin tasks`,
        exercise: 'Pick one task today. Break it into 15-minute chunks. Try working for just one chunk.',
        teachableMoment: {
          scenario: "You're moving into your first apartment. The thought of packing, cleaning, setting up utilities, buying furniture, and organizing everything feels overwhelming. You keep procrastinating because you don't know where to start.",
          whatToNotice: "Notice how your brain freezes when you think 'I have to move.' That's task paralysis—common for autistic people facing big, undefined projects.",
          howToRespond: "Break it down into tiny blocks: Monday 2-3pm: Pack books. Tuesday 2-3pm: Pack kitchen. Wednesday 2-3pm: Call electric company. Just ONE hour, ONE category. Set a timer. When it rings, STOP—even if you want to keep going. Rest. Repeat tomorrow. In 2 weeks, you're moved. In one day trying to 'do it all'? Burnout.",
          whyItMatters: "Executive function challenges make task initiation hard. Time blocking removes the 'where do I start?' paralysis. This skill applies to EVERYTHING: job searching, learning new software, cleaning your home, managing projects at work. Master this, and 'impossible' tasks become doable."
        }
      },
      {
        id: 'lesson-3',
        title: 'Building Routines That Stick',
        duration: 5,
        content: `Routines help neurodivergent brains by removing decisions. But rigid routines can feel suffocating.

**Key Concept:** Flexible routines work better.

**How to build one:**
1. Start with ONE thing (e.g., "Morning coffee + check calendar")
2. Anchor it to something you already do
3. Make it stupidly easy (no 10-step routines)
4. Give yourself permission to skip it sometimes

**Example routine:**
- Wake up → Coffee → Look at today\'s 3 tasks → Start`,
        exercise: 'Choose ONE small routine to try this week. Just one.',
      },
      {
        id: 'lesson-4',
        title: 'Dealing with Time Blindness',
        duration: 5,
        content: `Time blindness = losing track of time. It's not laziness. It's a neurodivergent trait.

**Key Concept:** External cues help when internal time sense doesn't work.

**Strategies:**
- **Timers:** Set alarms for transitions (not just deadlines)
- **Visual timers:** See time passing (Time Timer app)
- **Body cues:** "When I feel hungry = lunchtime"
- **Backwards planning:** Start from deadline, work backwards

**Pro tip:** Build in buffer time. If something takes 1 hour, block 1.5 hours.`,
        exercise: 'Use a visual timer for one task today. Notice how it feels to SEE time.',
      },
      {
        id: 'lesson-5',
        title: 'Tools That Work for Neurodivergent Brains',
        duration: 5,
        content: `Generic productivity apps don't always work for us. Here's what DOES work:

**Visual tools:**
- Google Calendar (color-code by type)
- Notion (visual boards)
- Trello (drag-and-drop tasks)

**ADHD-friendly tools:**
- Goblin.tools (break tasks into steps)
- Forest app (gamified focus)
- Brain.fm (focus music)

**Reminders:**
- Phone alarms (lots of them)
- Sticky notes (physical reminders)
- Accountability buddies (text check-ins)

**The best tool = the one you'll actually use.**`,
        exercise: 'Try ONE new tool this week. Just one. See if it helps.',
      },
    ],

    skillsYouGain: ['Energy awareness', 'Time blocking', 'Routine building', 'Using tools effectively'],

    practiceActivity: 'Create your personal weekly schedule. Block your peak energy times for important work. Schedule breaks. Use color coding.',

    affirmation: 'Time blindness is real. You\'re not lazy. You\'re not broken. Your brain works differently, and that\'s okay. These tools help you work WITH your brain.',
  },

  {
    id: 'money-management',
    title: 'Money Management & Budgeting',
    icon: '💰',
    description: 'Take control of your finances, reduce money stress',

    lessons: [
      {
        id: 'lesson-1',
        title: 'Understanding Where Money Goes',
        duration: 5,
        content: `ADHD impulse spending is real. Executive dysfunction makes budgeting hard. Let's make it easier.

**Key Concept:** You can't manage what you don't track.

**Simple tracking method:**
1. Check bank account once per week
2. Write down: What did I spend on?
3. Categories: Needs (rent, food) vs. Wants (fun stuff)

**No judgment.** Just awareness.

**Common neurodivergent money struggles:**
- Impulse purchases (dopamine!)
- Forgetting to pay bills (executive function)
- Avoiding looking at finances (overwhelm)

You're not alone.`,
        exercise: 'This week, track your spending. Just write it down. No judgment.',
      },
      {
        id: 'lesson-2',
        title: 'The Simple Budget That Actually Works',
        duration: 5,
        content: `Forget complicated spreadsheets. Here's a budget that works for ADHD brains:

**The 50/30/20 Rule:**
- 50% = Needs (rent, food, bills)
- 30% = Wants (fun, hobbies, treats)
- 20% = Savings (future you will thank you)

**Neurodivergent-friendly version:**
- Automate EVERYTHING (bills, savings)
- Use separate accounts (one for bills, one for spending)
- Give yourself "fun money" guilt-free

**Pro tip:** Round numbers up. If rent is $847, budget $900. The extra cushion saves you.`,
        exercise: 'Calculate your 50/30/20 split. Write it down. Does it match reality?',
      },
      {
        id: 'lesson-3',
        title: 'Automating to Reduce Executive Function Load',
        duration: 5,
        content: `Remembering to pay bills = executive function. Automate it = problem solved.

**What to automate:**
- Bill payments (set to autopay)
- Savings transfers (automatic every payday)
- Subscriptions (review yearly, cancel unused)

**Apps that help:**
- Mint (track spending automatically)
- YNAB (You Need A Budget - assigns every dollar a job)
- Simplifi (visual budgeting)

**ADHD tax avoidance:**
Set up autopay BEFORE the due date. Late fees are expensive.`,
        exercise: 'Set up ONE automated payment this week. Start small.',
      },
      {
        id: 'lesson-4',
        title: 'Dealing with Impulse Spending',
        duration: 5,
        content: `Dopamine-driven purchases are a neurodivergent thing. Here's how to manage it:

**The 24-hour rule:**
Want something? Wait 24 hours. Still want it? Maybe buy it.

**Unsubscribe from marketing emails:**
Can't impulse buy what you don't see.

**Remove saved payment info:**
Adding card details = friction = thinking time.

**Budget for "fun money":**
Give yourself permission to spend guilt-free from this pot.

**It's not about restriction. It's about intentional spending.**`,
        exercise: 'Unsubscribe from 3 marketing emails today. Remove saved cards from 1 site.',
      },
      {
        id: 'lesson-5',
        title: 'Building an Emergency Fund (Even on Low Income)',
        duration: 5,
        content: `Financial stress is real. An emergency fund = peace of mind.

**Goal:** Save $500-$1000 (covers most emergencies)

**How to start:**
- Save $5/week = $260/year
- Save $10/week = $520/year
- Round up purchases, save the difference

**Where to keep it:**
- Separate savings account (so you don't spend it)
- High-yield savings (earn a little interest)

**Neurodivergent-friendly tip:**
Automate it. $10 auto-transfers every payday. You won't miss it.

**It's okay to start small. $5 saved > $0 saved.**`,
        exercise: 'Set up ONE automatic transfer to savings. Even $5. Start today.',
      },
    ],

    skillsYouGain: ['Budget creation', 'Expense tracking', 'Automation', 'Impulse control strategies'],

    practiceActivity: 'Create your first simple budget using the 50/30/20 rule. Set up one automatic payment or savings transfer.',

    affirmation: 'Money management is hard for neurodivergent brains. Executive function struggles are real. You\'re not bad with money—you just need systems that work for YOUR brain.',
  },

  {
    id: 'job-interviews',
    title: 'Job Interviews & Communication',
    icon: '💼',
    description: 'Navigate interviews and workplace communication with confidence',

    lessons: [
      {
        id: 'lesson-1',
        title: 'Understanding What Interviewers Actually Want',
        duration: 5,
        content: `Interviews are stressful, especially for neurodivergent people. Social cues, small talk, eye contact—it's a lot.

**Key Concept:** They want to know: Can you do the job? Will you fit the team?

**What they're REALLY asking:**
- "Tell me about yourself" = What's relevant to this job?
- "Why do you want this job?" = Are you genuinely interested?
- "What's your weakness?" = Are you self-aware?

**Neurodivergent advantage:**
You're probably more honest than neurotypical people. Use that.

**You don't have to mask completely. But you do need to translate your skills into their language.**

**Career-Specific Interview Focus:**
- **Software Tester roles:** They'll ask about your attention to detail and problem-solving—your neurodivergent pattern-recognition is a STRENGTH here
- **Graphic Designer roles:** Expect questions about receiving feedback and client communication—be ready to share how you handle creative critiques
- **Data Entry roles:** They want to know about focus and accuracy—hyperfocus is your superpower, mention it!`,
        exercise: 'Write down 3 strengths you have. How do they relate to jobs you want?',
      },
      {
        id: 'lesson-2',
        title: 'Preparing Answers (Scripts Help!)',
        duration: 5,
        content: `Neurodivergent brains often work better with preparation. Scripts = less anxiety.

**Common questions + how to answer:**

**"Tell me about yourself"**
Formula: Present (what you do now) + Past (relevant experience) + Future (why this job)

**"Why should we hire you?"**
Formula: Your skills + How they match the job + What you'll bring

**"What's your biggest weakness?"**
Pick a real one, then say how you manage it.
Example: "I sometimes hyperfocus and lose track of time. I use timers to stay on schedule."

**Practice out loud.** Your brain processes differently when you speak vs. think.

**Career-Specific Sample Answers:**

**For Software Tester:** "My attention to detail is exceptional—I naturally notice patterns and inconsistencies others miss. I use tools like Notion to track test cases systematically."

**For Graphic Designer:** "I'm highly creative and visual, but I've learned to handle feedback professionally. When clients request changes, I use Figma to show multiple options and let the work speak for itself."

**For Data Entry:** "I have strong hyperfocus abilities—I can maintain accuracy for long periods. I use Excel macros and double-checking systems to ensure quality."`,
        exercise: 'Write your "Tell me about yourself" answer. Say it out loud 3 times.',
      },
      {
        id: 'lesson-3',
        title: 'Managing Sensory Overload & Anxiety',
        duration: 5,
        content: `Interviews are sensory nightmares: bright lights, eye contact, small talk, surprise questions.

**Before the interview:**
- Visit the location beforehand (reduces unknowns)
- Bring stim tools (fidget, gum, smooth stone)
- Wear comfortable clothes (itchy = distracted)

**During the interview:**
- It's okay to pause before answering
- "That's a great question, let me think..." = totally fine
- Eye contact tip: Look at their eyebrows or nose bridge

**After the interview:**
- Decompress somewhere quiet
- Stim freely
- Celebrate: you did it

**Disclosing neurodivergence:** Your choice. You don't have to. But if the job values it, it might help.`,
        exercise: 'Identify one sensory accommodation you need. Plan how to get it during interviews.',
      },
      {
        id: 'lesson-4',
        title: 'Email & Professional Communication',
        duration: 5,
        content: `Workplace communication has unwritten rules. Let's make them written.

**Email structure:**
- Greeting: "Hi [Name],"
- Purpose: "I'm writing to..."
- Details: Keep it short (3-5 sentences max)
- Action: "Could you please..."
- Closing: "Thanks, [Your name]"

**Tone tips:**
- Add ONE exclamation point (not zero, not five)
- Use "Thanks" not "Thx"
- Proofread for tone (read it out loud)

**When you're confused:**
"Just to clarify, you're asking me to [X], correct?"

**It's okay to ask for clarification. It's better than guessing wrong.**`,
        exercise: 'Write a practice professional email asking for a meeting. Check the tone.',
      },
      {
        id: 'lesson-5',
        title: 'Asking for Accommodations',
        duration: 5,
        coreTheme: 'communication',
        content: `You have the right to workplace accommodations (ADA in the US). Here's how to ask:

**What you CAN ask for:**
- Noise-canceling headphones
- Flexible schedule
- Written instructions (not just verbal)
- Quiet workspace
- Extra time for tasks (if reasonable)

**How to ask:**
- Be specific: "I work best with written task lists. Could I get that?"
- Frame as benefit: "This helps me do my best work"
- Don't over-explain: You don't owe your diagnosis

**Example:**
"I have ADHD and focus better with noise-canceling headphones. Would it be okay to use them while working?"

**Most employers will say yes. If they say no, that's a red flag about the workplace.**

**Career-Specific Accommodations & Likelihood:**
Each job in Career Discovery now includes:
- **Common accommodations** (usually granted): Remote work for Software Testers, headphones for Data Entry
- **Negotiable accommodations** (worth asking): Flexible hours for Graphic Designers, written briefs instead of verbal
- **Rare accommodations** (harder to get): 4-day work weeks, unlimited work-from-home
- **Exact request scripts** for each accommodation—check the Accommodations section on job detail pages!

**Pro Tip:** Review the job's accommodation section BEFORE your interview so you know what's typically granted.`,
        exercise: 'Identify 2 accommodations that would help you. Write how you\'d ask for them.',
        teachableMoment: {
          scenario: "It's your first 'real job' and you're terrified to ask for accommodations. The fluorescent lights give you headaches. Your manager gives verbal instructions and you forget them immediately. You're afraid if you ask for help, they'll think you can't do the job and fire you.",
          whatToNotice: "Notice the fear: 'If I ask for accommodations, they'll know I'm different and get rid of me.' This fear is valid—ableism is real. BUT: struggling in silence until you burn out or make mistakes? That ACTUALLY gets you fired. Accommodations help you succeed.",
          howToRespond: "Week 1: Say nothing. Observe. See if others use headphones, work from home sometimes, or ask for clarification. Week 2: Start small. Ask for ONE thing framed as productivity: 'I've noticed I retain information better when I have written task lists. Would it be possible to get tasks via email or Slack instead of verbally?' If they say yes, great. If they say no rudely? Start job searching—that's a toxic workplace.",
          whyItMatters: "This is self-advocacy—a core life skill. You're not asking for 'special treatment.' You're asking for what you need to do your job well. Neurotypical people get accommodations all the time (ergonomic chairs, coffee breaks, flexible hours)—they just don't call them that. Learning to ask for what you need without shame is how you build a sustainable career instead of burning out every 6 months."
        }
      },
    ],

    skillsYouGain: ['Interview preparation', 'Professional communication', 'Advocacy', 'Accommodation requests'],

    practiceActivity: 'Do a mock interview with a friend or family member. Practice answering common questions out loud.',

    affirmation: 'Interviews are hard for neurodivergent people. Social performance is exhausting. You\'re not "bad at interviews"—you\'re navigating a system not designed for you. Preparation helps.',
  },

  {
    id: 'emotional-regulation',
    title: 'Emotional Regulation & Stress Management',
    icon: '😊',
    description: 'Understand and manage your emotions effectively',
    coreThemes: ['Sensory & Emotional Regulation', 'Masking & Camouflaging'],

    lessons: [
      {
        id: 'lesson-1',
        title: 'Understanding Emotional Dysregulation',
        duration: 5,
        coreTheme: 'sensory-emotional',
        content: `Many neurodivergent people experience emotions MORE intensely. It's not being "dramatic." It's neurobiology.

**Key Concept:** Your feelings are valid. AND you can learn to manage them.

**Why emotions feel bigger:**
- ADHD: Emotions come fast and intense
- Autism: Delayed processing, then BAM
- Anxiety: Everything feels like a threat
- Depression: Everything feels heavy

**It's not weakness. It's how your nervous system works.**

**Goal:** Not to "stop feeling," but to respond skillfully.`,
        exercise: 'Next time you feel a big emotion, name it: "I\'m feeling [angry/sad/overwhelmed]."',
        teachableMoment: {
          scenario: "You're at your new job. After 3 hours in a loud, bright office with constant interruptions, you feel like you're going to explode or cry. A coworker asks you a simple question and you snap at them. Now you feel guilty and scared they'll report you. You want to run to your car and never come back.",
          whatToNotice: "This is sensory and emotional overload leading to dysregulation. Notice the early warning signs BEFORE you snap: tension in shoulders, racing thoughts, feeling 'prickly,' wanting to escape, sounds getting louder. These are your body's 'I'm at capacity' signals.",
          howToRespond: "In the moment: If safe, excuse yourself. 'I need to step out for 5 minutes.' Go to bathroom, your car, outside. Splash cold water on face. Do box breathing (in 4, hold 4, out 4, hold 4). Don't try to 'fix' anything while dysregulated. After: Apologize briefly to coworker: 'Sorry I was short earlier, I was overwhelmed.' Don't over-explain. Prevention: Ask for accommodations BEFORE you're at breaking point (see Lesson 5).",
          whyItMatters: "Autistic meltdowns and shutdowns aren't 'tantrums' or 'manipulation'—they're nervous system overload. Learning to recognize your early warning signs and take preventive breaks is how you avoid meltdowns at work, in relationships, and while living independently. This is survival-level emotional regulation. Masking until you collapse doesn't work long-term."
        }
      },
      {
        id: 'lesson-2',
        title: 'The Regulation Toolbox',
        duration: 5,
        content: `Different tools work for different emotions and different brains. Build your personal toolbox.

**When overwhelmed:**
- 5-4-3-2-1 grounding: 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste
- Step outside (change environment)
- Cold water on face (resets nervous system)

**When anxious:**
- Box breathing: In 4, hold 4, out 4, hold 4
- Progressive muscle relaxation
- Movement (walk, dance, shake it out)

**When understimulated (ADHD):**
- Upbeat music
- Physical activity
- Fidget tools

**The key: Experiment. Find what works for YOUR brain.**`,
        exercise: 'Try box breathing right now. In 4, hold 4, out 4, hold 4. Repeat 4 times.',
      },
      {
        id: 'lesson-3',
        title: 'Identifying Your Triggers',
        duration: 5,
        content: `Triggers = situations that reliably cause big emotions. Knowing them = power.

**Common neurodivergent triggers:**
- Sensory overload (too much noise, light, people)
- Transitions (changing activities)
- Criticism (rejection sensitivity dysphoria)
- Uncertainty (not knowing what to expect)
- Being interrupted (especially during hyperfocus)

**How to identify yours:**
1. Think: When do I usually get upset/overwhelmed/angry?
2. Look for patterns
3. Write them down

**Once you know them, you can plan around them or prepare coping strategies.**

**Career-Specific Triggers to Watch For:**
- **Graphic Designers:** Client feedback can trigger RSD (Rejection Sensitivity Dysphoria)—remember, feedback is about the WORK, not YOU
- **Software Testers:** Bug report rejections or developers dismissing your findings can feel personal—develop a "professional distance" mindset
- **Data Entry:** Interruptions during hyperfocus can cause frustration—use "Do Not Disturb" signals and communicate your focus needs
- **All Careers:** Workplace noise and social demands vary—check each job's sensory profile in Career Discovery before applying`,
        exercise: 'List 3 situations that usually trigger big emotions for you. Just notice them.',
      },
      {
        id: 'lesson-4',
        title: 'Creating a Personal Calm-Down Plan',
        duration: 5,
        content: `When you're in crisis mode, your brain can't problem-solve. Decide NOW what helps.

**Your Calm-Down Plan:**

**Step 1: Notice**
What's my body telling me? (Tight chest? Racing thoughts? Tears?)

**Step 2: Pause**
Can I remove myself from the situation? (Bathroom break, walk outside, leave early)

**Step 3: Regulate**
Pick ONE tool from your toolbox (breathing, cold water, movement, etc.)

**Step 4: Reflect**
When calm: What triggered this? What can I do differently next time?

**Write this plan down. Put it in your phone. You can't remember it when you're dysregulated.**`,
        exercise: 'Write your personal calm-down plan. What\'s your go-to regulation tool?',
      },
      {
        id: 'lesson-5',
        title: 'Building Emotional Resilience Over Time',
        duration: 5,
        content: `Resilience = bouncing back faster. It's a skill you can build.

**Daily practices that help:**
- **Sleep:** Emotional regulation starts with rest
- **Movement:** Walk, dance, yoga—whatever you enjoy
- **Routine:** Predictability reduces stress
- **Connection:** Talk to people who get you
- **Boundaries:** Say no to things that drain you

**Neurodivergent-friendly self-care:**
- It doesn't have to be "meditation and green smoothies"
- It CAN be: video games, special interest time, alone time, stimming freely

**Self-care = what recharges YOUR nervous system.**

**Progress isn't linear. Bad days happen. That's okay.**`,
        exercise: 'Pick ONE daily practice to try this week. Start small (5 minutes).',
      },
    ],

    skillsYouGain: ['Emotional awareness', 'Regulation techniques', 'Trigger identification', 'Self-care planning'],

    practiceActivity: 'Create your personal calm-down plan card. Write it down. Keep it accessible (phone, wallet, desk).',

    affirmation: 'Emotional dysregulation is a neurodivergent trait, not a character flaw. Big feelings are valid. You can learn to work WITH your emotions, not against them.',
  },

  {
    id: 'social-skills',
    title: 'Social Skills & Relationships',
    icon: '🗣️',
    description: 'Navigate social situations and build meaningful connections',

    lessons: [
      {
        id: 'lesson-1',
        title: 'Understanding Neurotypical Social Rules',
        duration: 5,
        content: `Social rules often feel arbitrary because... they kind of are. But understanding them helps you decide when to follow them.

**Unwritten rules neurotypicals follow:**
- Small talk before big talk (build rapport first)
- Don't interrupt (even if you're excited)
- Match energy levels (don't be super loud if they're quiet)
- Ask questions back (conversation is a tennis match, not a lecture)

**The thing is: You're not "bad at socializing." You're playing a game where no one explained the rules.**

**Good news:** You can learn the rules WITHOUT masking your whole personality.

**How This Applies to Different Careers:**
- **Software Testers (Minimal Social):** Team size 5-8, mostly Slack messages, brief standups—very manageable social load
- **Graphic Designers (Moderate Social):** Client-facing meetings required, but you can use Loom for async presentations to reduce live interaction
- **Data Entry (Minimal Social):** Team size 1-3, mostly independent work—perfect for those who prefer limited social interaction
- **Check Job Profiles:** Each career in Career Discovery shows detailed social demands (team size, daily interactions, phone calls, etc.)`,
        exercise: 'Observe one social interaction today. What unwritten rules do you notice?',
      },
      {
        id: 'lesson-2',
        title: 'Small Talk Survival Guide',
        duration: 5,
        content: `Small talk feels pointless to many neurodivergent people. "Why are we talking about weather when we could discuss something INTERESTING?"

**Why neurotypicals do it:** It's social lubrication. Low-stakes connection.

**Small talk formula:**
1. Greeting: "Hi, how are you?"
2. Safe topic: Weather, weekend plans, recent event
3. Their turn: Ask a question
4. Your turn: Answer briefly, ask back
5. Exit: "Nice talking to you!"

**Script bank:**
- "How's your day going?"
- "Any plans this weekend?"
- "Did you see [relevant news/show/event]?"
- "How long have you been [doing this job/living here]?"

**Pro tip:** You don't have to LOVE small talk. You just have to survive it for 2 minutes.**`,
        exercise: 'Practice one small talk script with someone safe (family, friend).',
      },
      {
        id: 'lesson-3',
        title: 'Reading Social Cues (When Your Brain Doesn\'t Do It Automatically)',
        duration: 5,
        content: `Many neurodivergent people don't automatically read body language or tone. You can learn it intellectually instead.

**Body language decoder:**
- Arms crossed = defensive or cold
- Leaning in = interested
- Looking at phone = bored or busy
- Nodding = "I'm listening"
- Backing away = uncomfortable

**Tone decoder:**
- Short answers = probably wants to end conversation
- Long answers = engaged
- Higher pitch = excited or nervous
- Flat tone = could be bored (or autistic!)

**When in doubt, ASK:**
"Are you okay? You seem quiet."
"Is this a good time to talk?"

**It's okay to be direct. It's better than guessing wrong.**`,
        exercise: 'Watch a TV show with sound OFF. Try to guess emotions from body language.',
      },
      {
        id: 'lesson-4',
        title: 'Setting Boundaries Without Guilt',
        duration: 5,
        content: `Neurodivergent people often struggle with boundaries because we people-please or don't realize it's an option.

**You're allowed to:**
- Say no to social events (you don't need an excuse)
- Leave early when overstimulated
- Not answer texts immediately
- Ask for space
- End draining friendships

**How to set boundaries:**
- Be clear: "I can't make it" (not "I'll try")
- Be kind: "I need some alone time to recharge"
- Don't over-explain: "No" is a complete sentence
- Offer alternative (if you want): "I can't do lunch, but coffee next week?"

**People who respect you will respect your boundaries.**

**People who don't? Not your people.**`,
        exercise: 'Identify one boundary you need to set. Write down how you\'ll say it.',
      },
      {
        id: 'lesson-5',
        title: 'Finding Your People',
        duration: 5,
        content: `Not everyone will "get" you. That's okay. Focus on finding YOUR people.

**Where neurodivergent-friendly people hang out:**
- Special interest communities (online forums, Discord, Reddit)
- Neurodivergent support groups
- Hobby groups (less pressure than "make friends" groups)
- Online spaces (easier to connect without sensory overload)

**Green flags in friendships:**
- They accept your communication style
- They don't take offense when you need space
- They share or respect your interests
- You feel energized (or neutrally fine) after hanging out

**Red flags:**
- You're always masking
- They mock your interests
- You feel drained every time
- They don't respect boundaries

**Quality > quantity. One good friend > ten draining acquaintances.**`,
        exercise: 'Join one online community related to your special interest or neurodivergence.',
      },
    ],

    skillsYouGain: ['Social rule awareness', 'Small talk scripts', 'Boundary setting', 'Relationship evaluation'],

    practiceActivity: 'Have one low-stakes social interaction this week. Practice a small talk script or boundary setting.',

    affirmation: 'You\'re not "bad at socializing." You\'re navigating a neurotypical world with a neurodivergent brain. The right people will appreciate you as you are.',
  },
];
