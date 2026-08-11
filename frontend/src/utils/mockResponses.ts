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

// SKEPTIC MODE RESPONSES
const realityCheckResponses = [
  "I can see why you're thinking about this - it's a solid starting point. Now let me help you stress-test it:\n\n**Questions to Consider:**\n• What assumptions are you making here?\n• Who might disagree with this approach and why?\n• What constraints haven't we discussed yet (budget, time, people, policies)?\n\n**Potential Blind Spots:**\n• [Area you might not have considered]\n• [Another perspective to think about]\n\n**How to Strengthen This:**\n• [Specific improvement suggestion]\n• [Risk mitigation strategy]\n\nWhat feels most important to address first? 🎯",
  "This is a strong idea! Let's make it bulletproof. I'm going to challenge a few things - remember, I'm on your side:\n\n**Assumption Check:**\nYou're assuming [X]. What if that's not true? How would your plan change?\n\n**Stakeholder Test:**\nWho needs to approve this? Who might resist? What are their concerns?\n\n**Reality Constraints:**\n• Time: Is your timeline realistic?\n• Budget: Any hidden costs?\n• People: Do you have the right team/support?\n\n**Making It Stronger:**\nHere's what would address those concerns: [suggestions]\n\nThoughts?",
  "Good thinking! Now let's play devil's advocate to make this even better:\n\n**If I were skeptical, I'd ask:**\n1. What's your evidence this will work?\n2. What's worked/failed in similar situations?\n3. What if your main assumption is wrong?\n\n**Perspectives You Might Be Missing:**\n• [Viewpoint A]\n• [Viewpoint B]\n\n**Strengthening Strategy:**\n• Address [concern] by [solution]\n• Test [assumption] by [method]\n\nThis isn't about shutting down the idea - it's about making it unstoppable. Which concern do you want to tackle first?",
];

const riskAssessorResponses = [
  "Let's make sure this plan is bulletproof. I'll help you spot the risks:\n\n**HIGH-RISK AREAS:**\n• [Risk 1] (High likelihood) - Why this matters: [explanation]\n• [Risk 2] (Medium likelihood) - Potential impact: [details]\n\n**FAILURE MODES:**\n• What if [X] goes wrong? → Impact: [Y]\n• What if [X] takes 3x longer? → Impact: [Y]\n\n**MITIGATION STRATEGIES:**\n• For [Risk 1]: Consider [solution]\n• For [Risk 2]: Build in [buffer/backup plan]\n\n**REALISTIC OBSTACLES:**\n💰 Budget: [potential hidden costs]\n⏰ Time: [what might take longer]\n👥 People: [approval/resistance challenges]\n\nWhat's the biggest risk that concerns you?",
  "Smart to think this through! Let me identify the landmines before you step on them:\n\n**RISK ANALYSIS:**\n\n**🔴 Critical Risks:**\n• [High-impact risk] - If this happens, it could [consequence]\n• [Another critical risk] - Likelihood: [assessment]\n\n**🟡 Moderate Risks:**\n• [Medium-impact risk] - Manageable if caught early\n• [Another moderate risk] - Can be mitigated by [action]\n\n**WHAT COULD DERAIL THIS:**\n1. [Scenario 1] → Plan B: [backup strategy]\n2. [Scenario 2] → Plan B: [alternative approach]\n\n**QUESTIONS TO ANSWER BEFORE PROCEEDING:**\n• [Critical question 1]\n• [Critical question 2]\n\nCelebrate that you're catching these NOW, not later! Which risk should we plan for first?",
  "Great initiative! Let's identify risks so you can plan ahead:\n\n**FAILURE MODE ANALYSIS:**\n\n**If [key component] fails:**\n• Impact: [what breaks]\n• Probability: [likelihood]\n• Mitigation: [how to prevent/recover]\n\n**If timeline slips:**\n• Where's the slack? [buffer zones]\n• What's the critical path? [must-have milestones]\n• Backup plan: [alternatives]\n\n**If stakeholders resist:**\n• Who are the blockers? [identify]\n• What are their concerns? [empathize]\n• How to get buy-in? [strategy]\n\n**RISK SCORECARD:**\n🎯 Highest priority to address: [top risk]\n⚠️ Watch closely: [risks to monitor]\n✅ Acceptable risks: [low concern items]\n\nLet's build contingencies for the top ones. Ready?",
];

const assumptionChallengerResponses = [
  "I love the vision here! Let me help you uncover what you might be taking for granted:\n\n**ASSUMPTIONS I'M HEARING:**\n• You're assuming [X] - What if that's not true? How would you validate this?\n• You're assuming [Y] - What's the evidence for this belief?\n• You're assuming [Z] - What if the opposite were true?\n\n**ALTERNATIVE PERSPECTIVES:**\nHow might these people see this differently?\n• [Stakeholder A]: They might think [viewpoint]\n• [Stakeholder B]: They might worry about [concern]\n• [Stakeholder C]: They might prioritize [different goal]\n\n**QUESTIONS TO TEST YOUR ASSUMPTIONS:**\n• [Test question 1]\n• [Test question 2]\n• [Test question 3]\n\n**BLIND SPOTS TO CONSIDER:**\n• [Unexplored area]\n• [Missing perspective]\n\nWhich assumption feels most critical to validate?",
  "Strong start! Now let's test the foundation. I'm noticing some assumptions we should validate:\n\n**ASSUMPTION AUDIT:**\n\n**About Users/Audience:**\n• Assuming they want [X] - Have you asked them?\n• Assuming they'll pay [Y] - What's that based on?\n• Assuming they'll use it [Z way] - What if they don't?\n\n**About Resources:**\n• Assuming you have [time/budget/people]\n• Assuming [X] will be available when needed\n• Assuming costs will be [estimate]\n\n**About Implementation:**\n• Assuming it will take [timeframe]\n• Assuming [technical assumption]\n• Assuming [process assumption]\n\n**HOW TO VALIDATE:**\n1. For [assumption 1]: Try [validation method]\n2. For [assumption 2]: Test by [experiment]\n3. For [assumption 3]: Ask [specific people]\n\nWhat's one assumption you could test this week?",
  "This is exciting! Let me help you see what you might be jumping over:\n\n**HIDDEN ASSUMPTIONS:**\n\n**You're assuming people will:**\n• [Behavior assumption] - But what if they actually [different behavior]?\n• [Motivation assumption] - Have you validated this?\n\n**You're assuming the environment:**\n• [Context assumption] - Is this still true?\n• [Market/policy assumption] - What's changed recently?\n\n**You're assuming about yourself:**\n• [Capability assumption] - Do you have the skills/time/resources?\n• [Commitment assumption] - What if your priorities shift?\n\n**WHAT IF YOU'RE WRONG?**\nIf [key assumption] is wrong, then [impact]. How would you pivot?\n\n**STRESS TEST:**\nLet's validate the 3 most critical assumptions. Which ones feel shakiest?\n\nRemember: Neurodivergent brains make brilliant leaps - we're just making sure the landing pad is solid! 🚀",
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
  } else if (mode === 'strategic') {
    if (subAgent === 'writing-clarity') {
      responses = writingClarityResponses;
    } else if (subAgent === 'task-breakdown') {
      responses = taskBreakdownResponses;
    } else if (subAgent === 'research-digest') {
      responses = researchDigestResponses;
    } else {
      responses = taskBreakdownResponses;
    }
  } else if (mode === 'skeptic') {
    if (subAgent === 'reality-check') {
      responses = realityCheckResponses;
    } else if (subAgent === 'risk-assessor') {
      responses = riskAssessorResponses;
    } else if (subAgent === 'assumption-challenger') {
      responses = assumptionChallengerResponses;
    } else {
      responses = realityCheckResponses;
    }
  } else {
    // Fallback to socratic
    responses = thinkOutLoudResponses;
  }

  // Return a random response from the appropriate response set
  return responses[Math.floor(Math.random() * responses.length)];
}
