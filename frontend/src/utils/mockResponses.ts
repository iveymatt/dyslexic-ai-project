import type { AgentMode } from '../types';

const studyBuddyResponses = [
  "Great question! Let me break this down into smaller pieces. Think of it like building with blocks - each piece fits together to create the whole picture. What part would you like to explore first?",
  "I love your curiosity! Here's an analogy that might help: imagine it's like a recipe. You have ingredients (inputs), a process (what you do), and a final dish (output). Does that make sense so far?",
  "Let's use the Socratic method here. Instead of me just telling you, what do YOU think might happen if we tried this approach? There's no wrong answer - I'm genuinely curious about your thinking!",
  "That's a complex topic, so let's chunk it down. First, the basic concept... Then, how it works in practice... And finally, why it matters. Ready to dive into step one?",
];

const writingHelperResponses = [
  "I can help with that! Here's a clearer version:\n\n**Before:** [original text]\n\n**After:** [improved version]\n\n**Why these changes help:**\n- Shorter sentences = easier to follow\n- Active voice = more direct\n- Simpler words = clearer meaning\n\nWhat do you think?",
  "Good start! Let's polish this together. I see a few opportunities to make your writing even stronger. The core idea is great - we just need to refine the delivery. Want me to show you what I'm thinking?",
  "Let me help you structure this. Right now, your ideas are all good, but they're arranged in a way that might confuse readers. Think of it like organizing a room - same furniture, better layout. Here's what I suggest...",
  "Your voice is coming through nicely here! I'd keep most of this as-is. Just a couple of tiny grammar tweaks and one sentence that could be split for easier reading. You're doing well!",
];

const taskMasterResponses = [
  "Okay, let's break this down into bite-sized tasks!\n\n**Phase 1: Planning (Day 1)**\n☐ Task 1 (30 mins)\n☐ Task 2 (45 mins)\n\n**Phase 2: Execution (Days 2-3)**\n☐ Task 3 (1 hour)\n☐ Task 4 (1 hour)\n\n**Phase 3: Wrap-up (Day 4)**\n☐ Final review (30 mins)\n\nLet's start with Task 1 - that's your quick win!",
  "I see you're feeling overwhelmed. That's totally normal for a project this size! Here's the good news: we can split this into small, manageable pieces. Would you like me to prioritize them for you, or shall we tackle them in chronological order?",
  "Perfect! Here's your action plan:\n\n**This Week:**\n- Monday: Do X (1 hour)\n- Wednesday: Do Y (1 hour)\n- Friday: Do Z (30 mins)\n\n**Next Week:**\n- Continue with...\n\nNotice I've built in rest days. Your brain needs breaks to process and recharge!",
  "Let's use the 'eat the frog' method - tackle the hardest thing first when your energy is highest. Here's what I think is your 'frog' for this project... Does that feel right to you?",
];

const executiveCoachResponses = [
  "Let's use the Eisenhower Matrix to prioritize:\n\n**DO FIRST (Urgent + Important):**\n1. [Priority task]\n\n**SCHEDULE (Important, not urgent):**\n2. [Important task]\n\n**SIMPLIFY (Urgent, not important):**\n3. [Quick task]\n\n**SKIP (Neither):**\n- You can honestly let this go\n\nPick ONE from 'Do First' and let's make that happen today.",
  "I hear you - task paralysis is real. Let's try the 2-minute rule: if something takes less than 2 minutes, do it NOW. Otherwise, add it to your list. This gets small tasks out of the way and builds momentum. Ready to identify your 2-minute tasks?",
  "Focus tip: Try the Pomodoro Technique! Work for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer 15-30 minute break. This matches how most brains actually work best. Want to try one Pomodoro right now?",
  "Time to match tasks to your energy! When are you most alert and focused? Schedule your hardest tasks then. When are you in 'zombie mode'? Save easy, mindless tasks for that time. Let's map out your energy patterns.",
];

const researchPartnerResponses = [
  "**TL;DR:** [Main takeaway in one sentence]\n\n**KEY POINTS:**\n• Point 1: Most important finding\n• Point 2: Supporting evidence\n• Point 3: What this means\n\n**DETAILS:**\nLet me break down each point...\n\n**NEXT STEPS:**\nBased on this, you might want to explore...",
  "Here's what I found in that source:\n\n**Main Argument:** [Core thesis]\n\n**Evidence:**\n1. Data point 1\n2. Data point 2\n3. Data point 3\n\n**Credibility:** [Source quality assessment]\n\n**How This Connects:** This relates to your other sources by...",
  "I've organized your findings into themes:\n\n**Theme 1: [Topic]**\n- Source A says...\n- Source B adds...\n\n**Theme 2: [Topic]**\n- Source C shows...\n\n**Contradictions:**\nInterestingly, Source A and C disagree about...",
  "**Summary in Simple Terms:**\n\n[Complex concept explained like you're explaining to a friend]\n\n**Why This Matters:**\n[Practical implications]\n\n**If You Want to Learn More:**\n- Read this next: [suggestion]\n- Key term to search: [term]",
];

const generalResponses = [
  "That's an interesting perspective! Tell me more about what you're thinking.",
  "I'm here to help! Could you give me a bit more context about what you're working on?",
  "Let's work through this together. What's the main thing you're trying to figure out or accomplish?",
  "Good question! Let me think about the best way to explain this in a way that makes sense for how your brain works.",
];

export function generateMockResponse(userMessage: string, agentMode: AgentMode): string {
  const lowerMessage = userMessage.toLowerCase();

  // Check for specific quick actions
  if (lowerMessage.includes('simpler language') || lowerMessage.includes('simplify')) {
    return "**Simplified Version:**\n\nHere's the same information, but easier to read:\n\n" +
           "[The previous response rewritten with shorter sentences, everyday words, and clearer structure]\n\n" +
           "Is this easier to understand? Let me know if you want me to simplify any specific part even more!";
  }

  if (lowerMessage.includes('mind map')) {
    return "**Mind Map:**\n\n" +
           "**Central Topic**\n" +
           "├─ Main Branch 1\n" +
           "│  ├─ Sub-topic A\n" +
           "│  └─ Sub-topic B\n" +
           "├─ Main Branch 2\n" +
           "│  ├─ Sub-topic C\n" +
           "│  └─ Sub-topic D\n" +
           "└─ Main Branch 3\n" +
           "   ├─ Sub-topic E\n" +
           "   └─ Sub-topic F\n\n" +
           "Does this structure help you visualize the connections?";
  }

  if (lowerMessage.includes('extract tasks') || lowerMessage.includes('action items')) {
    return "**Action Items Checklist:**\n\n" +
           "☐ **Task 1:** [First actionable item] (Priority: High)\n" +
           "☐ **Task 2:** [Second actionable item] (Priority: Medium)\n" +
           "☐ **Task 3:** [Third actionable item] (Priority: Low)\n\n" +
           "**Estimated Time:** 2-3 hours total\n\n" +
           "**Suggested Order:** Start with Task 1, it'll give you momentum!\n\n" +
           "Ready to tackle these?";
  }

  if (lowerMessage.includes('follow-up questions') || lowerMessage.includes('ask follow')) {
    return "**Great Follow-Up Questions:**\n\n" +
           "1. **Dive Deeper:** \"Can you explain more about [specific aspect]?\"\n\n" +
           "2. **Real-World Application:** \"How would I use this in [your context]?\"\n\n" +
           "3. **Connection:** \"How does this relate to [related topic you mentioned]?\"\n\n" +
           "Which one sounds most helpful? Or would you like to explore something else?";
  }

  // Agent-specific responses
  let responses: string[];
  switch (agentMode) {
    case 'study-buddy':
      responses = studyBuddyResponses;
      break;
    case 'writing-helper':
      responses = writingHelperResponses;
      break;
    case 'task-master':
      responses = taskMasterResponses;
      break;
    case 'executive-coach':
      responses = executiveCoachResponses;
      break;
    case 'research-partner':
      responses = researchPartnerResponses;
      break;
    default:
      responses = generalResponses;
  }

  // Return a random response from the agent's response set
  return responses[Math.floor(Math.random() * responses.length)];
}
