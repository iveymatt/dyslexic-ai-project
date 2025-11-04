import type { LifeSkillsModule } from '../../types/career';

export const lifeSkillsModules: LifeSkillsModule[] = [
  {
    id: 'executive-function',
    title: '🧠 Capacity & Executive Function',
    icon: '🧠',
    description: 'Planning, task initiation, flexibility, sustained attention',
    color: 'purple',
    coreThemes: ['Capacity & Executive Function'],

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
        coreTheme: 'executive-function',
        content: `Routines help neurodivergent brains by removing decisions. But rigid routines can feel suffocating.

**Key Concept:** Flexible routines work better.

**How to build one:**
1. Start with ONE thing (e.g., "Morning coffee + check calendar")
2. Anchor it to something you already do
3. Make it stupidly easy (no 10-step routines)
4. Give yourself permission to skip it sometimes

**Example routine:**
- Wake up → Coffee → Look at today's 3 tasks → Start`,
        exercise: 'Choose ONE small routine to try this week. Just one.',
      },
      {
        id: 'lesson-4',
        title: 'Dealing with Time Blindness',
        duration: 5,
        coreTheme: 'executive-function',
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
        title: 'Understanding Decision Fatigue & Cognitive Load',
        duration: 5,
        coreTheme: 'executive-function',
        content: `Every decision you make depletes mental energy. Neurodivergent brains often have less capacity to start with.

**Key Concept:** Reduce unnecessary decisions to preserve energy for what matters.

**How to reduce cognitive load:**
- **Automate small decisions:** Same breakfast every day, capsule wardrobe
- **Create templates:** Email templates, meal plans, weekly schedules
- **Limit options:** Pick from 3 choices, not 30
- **Delegate when possible:** Let others decide small things

**Career application:**
Use decision-making frameworks at work: "urgent + important = do now, important + not urgent = schedule"`,
        exercise: 'Identify 3 daily decisions you could automate or simplify this week.',
      },
    ],

    skillsYouGain: ['Energy awareness', 'Time blocking', 'Routine building', 'Task initiation', 'Cognitive load management'],

    practiceActivity: 'Track your energy patterns for 3 days. Break one big task into time blocks. Build one simple morning routine.',

    affirmation: 'Executive function challenges are neurodivergent traits, not personal failings. Your brain works differently. These strategies help you work WITH your brain, not against it.',
  },

  {
    id: 'organizing-systems',
    title: '📅 Organizing Systems',
    icon: '📅',
    description: 'Calendars, notes, deadlines that move from school to work',
    color: 'blue',
    coreThemes: ['Organizing Systems'],

    lessons: [
      {
        id: 'lesson-1',
        title: 'Tools That Work for Neurodivergent Brains',
        duration: 5,
        coreTheme: 'organizing-systems',
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
      {
        id: 'lesson-2',
        title: 'Money Management & Budgeting Basics',
        duration: 5,
        coreTheme: 'organizing-systems',
        content: `ADHD impulse spending is real. Executive dysfunction makes budgeting hard. Let's make it easier.

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
        coreTheme: 'organizing-systems',
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
        coreTheme: 'organizing-systems',
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
        title: 'Building an Emergency Fund & Financial Systems',
        duration: 5,
        coreTheme: 'organizing-systems',
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

    skillsYouGain: ['Tool selection', 'Budget creation', 'Automation', 'Financial planning', 'Impulse control strategies'],

    practiceActivity: 'Set up one productivity tool (calendar, budgeting app, or task manager). Create your first simple budget. Automate one payment or savings transfer.',

    affirmation: 'Organization is hard for neurodivergent brains. You\'re not lazy or irresponsible. You just need systems that work for YOUR brain. External systems = internal peace.',
  },

  {
    id: 'sensory-emotional',
    title: '❤️ Sensory & Emotional Regulation',
    icon: '❤️',
    description: 'Prevent burnout, manage sensory challenges',
    color: 'green',
    coreThemes: ['Sensory & Emotional Regulation'],

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
          howToRespond: "In the moment: If safe, excuse yourself. 'I need to step out for 5 minutes.' Go to bathroom, your car, outside. Splash cold water on face. Do box breathing (in 4, hold 4, out 4, hold 4). Don't try to 'fix' anything while dysregulated. After: Apologize briefly to coworker: 'Sorry I was short earlier, I was overwhelmed.' Don't over-explain. Prevention: Ask for accommodations BEFORE you're at breaking point.",
          whyItMatters: "Autistic meltdowns and shutdowns aren't 'tantrums' or 'manipulation'—they're nervous system overload. Learning to recognize your early warning signs and take preventive breaks is how you avoid meltdowns at work, in relationships, and while living independently. This is survival-level emotional regulation. Masking until you collapse doesn't work long-term."
        }
      },
      {
        id: 'lesson-2',
        title: 'The Regulation Toolbox',
        duration: 5,
        coreTheme: 'sensory-emotional',
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
        coreTheme: 'sensory-emotional',
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
- **Data Entry:** Interruptions during hyperfocus can cause frustration—use "Do Not Disturb" signals and communicate your focus needs`,
        exercise: 'List 3 situations that usually trigger big emotions for you. Just notice them.',
      },
      {
        id: 'lesson-4',
        title: 'Creating a Personal Calm-Down Plan',
        duration: 5,
        coreTheme: 'sensory-emotional',
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
        coreTheme: 'sensory-emotional',
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

    skillsYouGain: ['Emotional awareness', 'Regulation techniques', 'Trigger identification', 'Self-care planning', 'Resilience building'],

    practiceActivity: 'Create your personal calm-down plan card. Identify your top 3 triggers. Practice one regulation technique daily for a week.',

    affirmation: 'Emotional dysregulation is a neurodivergent trait, not a character flaw. Big feelings are valid. You can learn to work WITH your emotions, not against them.',
  },

  {
    id: 'masking-camouflaging',
    title: '🛡️ Masking & Camouflaging',
    icon: '🛡️',
    description: 'Unmask safely, reduce cognitive load',
    color: 'pink',
    coreThemes: ['Masking & Camouflaging'],

    lessons: [
      {
        id: 'lesson-1',
        title: 'Understanding Neurotypical Social Rules',
        duration: 5,
        coreTheme: 'masking',
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
- **Graphic Designers (Moderate Social):** Client-facing meetings required, but you can use Loom for async presentations
- **Data Entry (Minimal Social):** Team size 1-3, mostly independent work—perfect for those who prefer limited social interaction`,
        exercise: 'Observe one social interaction today. What unwritten rules do you notice?',
      },
      {
        id: 'lesson-2',
        title: 'Small Talk Survival Guide',
        duration: 5,
        coreTheme: 'masking',
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

**Pro tip:** You don't have to LOVE small talk. You just have to survive it for 2 minutes.`,
        exercise: 'Practice one small talk script with someone safe (family, friend).',
      },
      {
        id: 'lesson-3',
        title: 'Reading Social Cues (When Your Brain Doesn\'t Do It Automatically)',
        duration: 5,
        coreTheme: 'masking',
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
        title: 'Managing Sensory Overload in Social Situations',
        duration: 5,
        coreTheme: 'masking',
        content: `Social situations are sensory nightmares: bright lights, eye contact, small talk, surprise questions, perfumes, background noise.

**Before social events:**
- Visit the location beforehand (reduces unknowns)
- Bring stim tools (fidget, gum, smooth stone)
- Wear comfortable clothes (itchy = distracted)
- Plan your exit strategy

**During events:**
- It's okay to take breaks (bathroom = quiet space)
- Eye contact tip: Look at their eyebrows or nose bridge
- Have an excuse ready: "I need to take a call"

**After events:**
- Decompress somewhere quiet
- Stim freely
- Don't force yourself to process immediately

**You don't have to go to everything. Choose what's worth your energy.**`,
        exercise: 'Identify one sensory accommodation you need for social situations.',
      },
      {
        id: 'lesson-5',
        title: 'Unmasking Safely: When and How',
        duration: 5,
        coreTheme: 'masking',
        content: `Masking = hiding neurodivergent traits to "fit in." It's exhausting and leads to burnout.

**Signs you're masking too much:**
- You feel like a different person at work vs. home
- You're exhausted after social interactions
- You can't remember "what to say" and it feels like acting
- You have meltdowns/shutdowns when alone

**Where to unmask:**
- With trusted friends/family
- Alone at home
- In neurodivergent-friendly spaces
- Gradually at work (test the waters first)

**How to unmask at work (safely):**
- Start small: Use noise-canceling headphones
- Stim discreetly: Fidget tools under desk
- Ask for accommodations: "I focus better with written instructions"
- Disclose if safe: "I'm autistic/ADHD and this helps me work better"

**You don't owe anyone full disclosure. Unmask at your own pace, in spaces that feel safe.**`,
        exercise: 'Identify one place where you can unmask completely. Practice being yourself there.',
      },
    ],

    skillsYouGain: ['Social rule awareness', 'Small talk scripts', 'Body language reading', 'Sensory management', 'Strategic unmasking'],

    practiceActivity: 'Observe neurotypical social rules this week. Practice one small talk script. Identify one safe space to unmask.',

    affirmation: 'You\'re not "bad at socializing." You\'re navigating a neurotypical world with a neurodivergent brain. Masking is survival, but you deserve spaces to be yourself.',
  },

  {
    id: 'communication-advocacy',
    title: '💬 Communication & Self-Advocacy',
    icon: '💬',
    description: 'Scripts, confidence, professional communication',
    color: 'cyan',
    coreThemes: ['Communication & Self-Advocacy'],

    lessons: [
      {
        id: 'lesson-1',
        title: 'Understanding What Interviewers Actually Want',
        duration: 5,
        coreTheme: 'communication',
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
- **Software Tester roles:** They'll ask about attention to detail and problem-solving—your pattern-recognition is a STRENGTH
- **Graphic Designer roles:** Expect questions about receiving feedback and client communication
- **Data Entry roles:** They want to know about focus and accuracy—hyperfocus is your superpower!`,
        exercise: 'Write down 3 strengths you have. How do they relate to jobs you want?',
      },
      {
        id: 'lesson-2',
        title: 'Preparing Answers (Scripts Help!)',
        duration: 5,
        coreTheme: 'communication',
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

**For Software Tester:** "My attention to detail is exceptional—I naturally notice patterns and inconsistencies others miss."

**For Graphic Designer:** "I'm highly creative and visual, and I've learned to handle feedback professionally by focusing on the work, not taking it personally."

**For Data Entry:** "I have strong hyperfocus abilities—I can maintain accuracy for long periods using systematic checking methods."`,
        exercise: 'Write your "Tell me about yourself" answer. Say it out loud 3 times.',
      },
      {
        id: 'lesson-3',
        title: 'Email & Professional Communication',
        duration: 5,
        coreTheme: 'communication',
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
        id: 'lesson-4',
        title: 'Setting Boundaries Without Guilt',
        duration: 5,
        coreTheme: 'communication',
        content: `Neurodivergent people often struggle with boundaries because we people-please or don't realize it's an option.

**You're allowed to:**
- Say no to extra projects when at capacity
- Leave work on time (not stay late unpaid)
- Not answer emails after hours
- Ask for reasonable deadlines
- Take breaks when needed

**How to set boundaries professionally:**
- Be clear: "I can't take on additional projects right now"
- Be solution-oriented: "I can do this next week instead"
- Don't over-explain: "No" is a complete sentence
- Offer alternative: "I can't attend the 8am meeting, but could we do 10am?"

**People who respect you will respect your boundaries.**

**Saying no to protect your capacity = saying yes to quality work.**`,
        exercise: 'Identify one boundary you need to set at work or home. Write down how you\'ll say it.',
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
- **Common accommodations** (usually granted): Remote work for Software Testers, headphones for Data Entry
- **Negotiable accommodations** (worth asking): Flexible hours for Graphic Designers, written briefs instead of verbal
- **Rare accommodations** (harder to get): 4-day work weeks, unlimited work-from-home

**Pro Tip:** Ask early, before you're burning out. Prevention > crisis mode.`,
        exercise: 'Identify 2 accommodations that would help you. Write how you\'d ask for them.',
        teachableMoment: {
          scenario: "It's your first 'real job' and you're terrified to ask for accommodations. The fluorescent lights give you headaches. Your manager gives verbal instructions and you forget them immediately. You're afraid if you ask for help, they'll think you can't do the job and fire you.",
          whatToNotice: "Notice the fear: 'If I ask for accommodations, they'll know I'm different and get rid of me.' This fear is valid—ableism is real. BUT: struggling in silence until you burn out or make mistakes? That ACTUALLY gets you fired. Accommodations help you succeed.",
          howToRespond: "Week 1: Say nothing. Observe. See if others use headphones, work from home sometimes, or ask for clarification. Week 2: Start small. Ask for ONE thing framed as productivity: 'I've noticed I retain information better when I have written task lists. Would it be possible to get tasks via email or Slack instead of verbally?' If they say yes, great. If they say no rudely? Start job searching—that's a toxic workplace.",
          whyItMatters: "This is self-advocacy—a core life skill. You're not asking for 'special treatment.' You're asking for what you need to do your job well. Neurotypical people get accommodations all the time (ergonomic chairs, coffee breaks, flexible hours)—they just don't call them that. Learning to ask for what you need without shame is how you build a sustainable career instead of burning out every 6 months."
        }
      },
    ],

    skillsYouGain: ['Interview preparation', 'Professional communication', 'Boundary setting', 'Advocacy', 'Accommodation requests'],

    practiceActivity: 'Do a mock interview with a friend. Write one professional email. Practice asking for one accommodation using the scripts provided.',

    affirmation: 'Communication and self-advocacy are learnable skills. You have the right to ask for what you need. Your needs are valid, and the right workplace will support you.',
  },
];
