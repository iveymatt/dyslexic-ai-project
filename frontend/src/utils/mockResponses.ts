import type { ThinkingMode, SubAgent } from '../types';

// SOCRATIC MODE RESPONSES
const thinkOutLoudResponses = [
  "Great question! Let me ask you this first: what part of this feels most confusing to you? Is it the overall goal, or a specific step? Understanding where you're stuck will help me ask better questions. 🤔",
  "I love that you're exploring this! Before we dive in, tell me: why is this important to you right now? Understanding your 'why' often unlocks the 'how.'",
  "Interesting! Let's think through this together. What have you already tried? Sometimes the 'failed' attempts tell us more than we realize.",
  "That's a big question - let's break it down. If you could only focus on one piece of this right now, which piece would make the biggest difference? Start there.",
];

const executiveStrategistResponses = [
  "Let's figure this out together. First: what's your energy level right now - high, medium, or running on fumes? Be honest. That'll shape our strategy.",
  "Good! Before we plan, tell me: when do you work best? Morning fresh? Late night hyperfocus? Deadline pressure? Let's work WITH your brain, not against it.",
  "I hear you. This feels overwhelming. Let's start small: what's ONE thing you could do in the next 10 minutes? Just one. Sometimes starting is the hardest part.",
  "Smart question! Let's prioritize by asking: what happens if you DON'T do this? If the answer is 'not much,' it might not be as urgent as it feels.",
];

// STRATEGIC MODE RESPONSES
const writingClarityResponses = [
  "**ORIGINAL:** [Your text]\n\n**IMPROVED:** [Clearer version with shorter sentences and simpler words]\n\n**WHY THESE CHANGES:**\n• Shorter sentences = easier to follow\n• Active voice = more direct\n• Simpler words = clearer meaning\n\nYour core idea is great - these tweaks just make it shine! ✨",
  "Let me help clean this up:\n\n**BEFORE:**\n[Original]\n\n**AFTER:**\n[Improved]\n\n**What Changed:**\n1. Removed jargon\n2. Split long sentence into two\n3. Used everyday words\n\nMuch easier to read now!",
  "Good start! Here's a tighter version:\n\n**YOUR VERSION:** [Original text]\n**STREAMLINED:** [Improved text]\n\n**Key improvements:**\n- Cut 30% of words (clarity, not fluff)\n- One idea per sentence\n- Stronger verbs\n\nYou're getting there!",
];

const taskBreakdownResponses = [
  "**GOAL:** [Your project]\n\n**STEPS:**\n1. **Do X** (30 min) - This is your 'easy win' to build momentum\n2. **Then Y** (1 hour) - This is the meat of it\n3. **Finally Z** (15 min) - Save the easy wrap-up for when you're tired\n\n**TOTAL TIME:** ~2 hours\n\n**WHY THIS ORDER:** X sets up Y, and you want fresh energy for Y. Z is easy, so you can coast through it.\n\nStart with Step 1 right now? 🚀",
  "Let's break this down:\n\n**PHASE 1: Setup** (Day 1)\n☐ Task A (20 min)\n☐ Task B (30 min)\n\n**PHASE 2: Main Work** (Days 2-3)\n☐ Task C (2 hours) - Break this into two 1-hour sessions\n☐ Task D (1 hour)\n\n**PHASE 3: Finish** (Day 4)\n☐ Review (30 min)\n\n**REALISTIC TIMELINE:** 4 days with breaks built in. Don't rush Phase 2!",
  "Here's your game plan:\n\n**Step 1:** Do the boring admin stuff first (30 min) - Get it out of the way\n**Step 2:** Do the creative/hard thinking (1-2 hours) - When your brain is fresh\n**Step 3:** Do the easy execution (45 min) - You can do this on autopilot\n\n**Pro tip:** Schedule Step 2 for your personal 'peak brain time.' When is that for you?",
];

const researchDigestResponses = [
  "**TL;DR:** The main point in one sentence.\n\n**KEY POINTS:**\n• Most important finding #1\n• Key insight #2\n• Critical detail #3\n\n**DETAILS:**\nHere's the breakdown of each point with more context and explanation...\n\n**WHAT THIS MEANS FOR YOU:**\nPractical takeaway or action step.\n\n**WANT TO LEARN MORE?**\n[Suggested next steps or resources]",
  "**QUICK ANSWER:**\n[Direct answer to your question]\n\n**EVIDENCE:**\n1. Data point supporting this\n2. Research showing that\n3. Example proving it\n\n**IN SIMPLE TERMS:**\n[Explanation like you're talking to a friend]\n\n**BOTTOM LINE:**\n[What you should actually do with this information]",
  "Here's what you need to know:\n\n**THE ANSWER:** [Main point]\n\n**WHY IT MATTERS:** [Context]\n\n**HOW IT WORKS:** [Explanation]\n\n**WHAT TO DO:** [Action steps]\n\nClear? Want me to dive deeper into any part?",
];

export function generateMockResponse(userMessage: string, mode: ThinkingMode, subAgent: SubAgent): string {
  const lowerMessage = userMessage.toLowerCase();

  // Check for specific quick actions (work across all modes)
  if (lowerMessage.includes('simpler language') || lowerMessage.includes('simplify')) {
    return "**Simplified Version:**\n\n" +
           "Here's the same information, but easier to read:\n\n" +
           "[The previous response rewritten with shorter sentences, everyday words, and clearer structure]\n\n" +
           "Each sentence has one main idea. No jargon. Short paragraphs.\n\n" +
           "Is this easier to understand? Let me know if you want me to simplify any specific part even more!";
  }

  if (lowerMessage.includes('mind map')) {
    return "**Mind Map:**\n\n" +
           "📍 **Central Topic**\n" +
           "├─ 🔵 Main Branch 1\n" +
           "│  ├─ Sub-topic A\n" +
           "│  └─ Sub-topic B\n" +
           "├─ 🟢 Main Branch 2\n" +
           "│  ├─ Sub-topic C\n" +
           "│  └─ Sub-topic D\n" +
           "└─ 🟡 Main Branch 3\n" +
           "   ├─ Sub-topic E\n" +
           "   └─ Sub-topic F\n\n" +
           "Does this structure help you see the connections? Want me to expand any branch?";
  }

  if (lowerMessage.includes('extract tasks') || lowerMessage.includes('action items')) {
    return "**Action Items Checklist:**\n\n" +
           "☐ **Task 1:** [First actionable item] (Priority: High, Time: 30 min)\n" +
           "☐ **Task 2:** [Second actionable item] (Priority: Medium, Time: 1 hour)\n" +
           "☐ **Task 3:** [Third actionable item] (Priority: Low, Time: 15 min)\n\n" +
           "**Total Estimated Time:** 1 hour 45 minutes\n\n" +
           "**Suggested Order:** Start with Task 1 - it's quick and will give you momentum!\n\n" +
           "**Best Time To Do This:** When do you have 2 hours of uninterrupted time?";
  }

  if (lowerMessage.includes('follow-up questions') || lowerMessage.includes('ask follow')) {
    if (mode === 'socratic') {
      return "**Great Follow-Up Questions to Ask Yourself:**\n\n" +
             "1. **Dig Deeper:** \"Why does this matter to me specifically?\"\n\n" +
             "2. **Challenge Assumptions:** \"What am I assuming that might not be true?\"\n\n" +
             "3. **Think Broader:** \"What am I not considering? What's missing?\"\n\n" +
             "Which question resonates most? Let's explore that one together.";
    } else {
      return "**Useful Follow-Up Questions:**\n\n" +
             "1. **For More Detail:** \"Can you explain more about [specific aspect]?\"\n\n" +
             "2. **For Application:** \"How would I use this in [your context]?\"\n\n" +
             "3. **For Connections:** \"How does this relate to [related topic]?\"\n\n" +
             "Pick one and I'll give you a direct answer!";
    }
  }

  // Mode and sub-agent specific responses
  let responses: string[];

  if (mode === 'socratic') {
    if (subAgent === 'think-out-loud') {
      responses = thinkOutLoudResponses;
    } else if (subAgent === 'executive-strategist') {
      responses = executiveStrategistResponses;
    } else {
      responses = thinkOutLoudResponses;
    }
  } else {
    // strategic mode
    if (subAgent === 'writing-clarity') {
      responses = writingClarityResponses;
    } else if (subAgent === 'task-breakdown') {
      responses = taskBreakdownResponses;
    } else if (subAgent === 'research-digest') {
      responses = researchDigestResponses;
    } else {
      responses = taskBreakdownResponses;
    }
  }

  // Return a random response from the appropriate response set
  return responses[Math.floor(Math.random() * responses.length)];
}
