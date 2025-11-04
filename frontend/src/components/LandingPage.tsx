import React from 'react';
import {
  Brain,
  Volume2,
  Type,
  MessageSquare,
  Mic,
  Network,
  CheckSquare,
  ArrowRight,
  BookOpen,
  Trophy,
  Star,
  Lightbulb,
  List,
  Target,
  Users,
  Sparkles,
  Zap,
  Briefcase,
  Clock,
  TrendingUp,
  Bot,
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full mb-8 animate-pulse">
          <Brain size={40} />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
          Cognitive Partner
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-semibold">
          The complete AI platform for dyslexic and neurodivergent thinkers
        </p>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          AI chat + Prompt library + Tool comparison + Career discovery. Everything you need to work WITH your brain, not against it.
        </p>
        <button
          onClick={onGetStarted}
          className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          Start Free →
          <ArrowRight size={20} />
        </button>
        <p className="text-sm text-gray-500 mt-4">No signup required • Privacy-focused • Open source</p>
      </header>

      {/* Feature Highlights - 4 Major Features */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-4">Four Tools. One Platform.</h2>
        <p className="text-center text-gray-400 mb-12 text-lg max-w-3xl mx-auto">
          We built the platform we wished existed. Here's what makes Cognitive Partner different.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Prompt Library */}
          <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 p-8 rounded-2xl border border-green-700/50 hover:border-green-600 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-6">
              <BookOpen size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Prompt Library</h3>
            <p className="text-gray-300 mb-6 text-lg">
              30+ ready-to-use AI prompts created by neurodivergent people for neurodivergent people.
            </p>
            <ul className="space-y-3 text-gray-300 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-green-400 flex-shrink-0 mt-1">✓</span>
                <span>Organized by who you are (student, professional, parent, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 flex-shrink-0 mt-1">✓</span>
                <span>Real example use cases from real people</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 flex-shrink-0 mt-1">✓</span>
                <span>One click to copy, one click to use</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 flex-shrink-0 mt-1">✓</span>
                <span>Community-rated and verified</span>
              </li>
            </ul>
            <div className="bg-green-900/30 rounded-lg p-4 border border-green-700/30">
              <p className="text-sm text-green-200 italic">
                "Finally, prompts that actually work for ADHD brains. No more staring at a blank screen."
              </p>
            </div>
          </div>

          {/* AI Leaderboard */}
          <div className="bg-gradient-to-br from-blue-900/40 to-purple-800/40 p-8 rounded-2xl border border-blue-700/50 hover:border-blue-600 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
              <Trophy size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">AI Tool Leaderboard</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Which AI tools actually support neurodivergent thinking? We tested them. Here's the data.
            </p>
            <ul className="space-y-3 text-gray-300 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 flex-shrink-0 mt-1">✓</span>
                <span>4 dimensions: lateral thinking, linear thinking, language, awareness</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 flex-shrink-0 mt-1">✓</span>
                <span>Real test results with actual AI responses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 flex-shrink-0 mt-1">✓</span>
                <span>Compare 6 major AI tools side-by-side</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 flex-shrink-0 mt-1">✓</span>
                <span>Filter by your thinking style</span>
              </li>
            </ul>
            <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700/30">
              <p className="text-sm text-blue-200 italic">
                "The only benchmark that measures if AI tools actually 'get' how dyslexic brains work."
              </p>
            </div>
          </div>

          {/* AI Chat */}
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-800/40 p-8 rounded-2xl border border-purple-700/50 hover:border-purple-600 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-6">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Accessible AI Chat</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Two thinking modes (Socratic & Strategic), built-in accessibility, designed for dyslexic brains.
            </p>
            <ul className="space-y-3 text-gray-300 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 flex-shrink-0 mt-1">✓</span>
                <span>Text-to-speech & voice input built-in</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 flex-shrink-0 mt-1">✓</span>
                <span>Dyslexic-friendly fonts & spacing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 flex-shrink-0 mt-1">✓</span>
                <span>Simplify responses instantly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 flex-shrink-0 mt-1">✓</span>
                <span>Switch between exploration & direct answers</span>
              </li>
            </ul>
            <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-700/30">
              <p className="text-sm text-purple-200 italic">
                "First AI chat that doesn't make me feel stupid. It adapts to how MY brain works."
              </p>
            </div>
          </div>

          {/* Career Discovery */}
          <div className="bg-gradient-to-br from-orange-900/40 to-red-800/40 p-8 rounded-2xl border border-orange-700/50 hover:border-orange-600 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full mb-6">
              <Briefcase size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Career Discovery</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Find careers that match how YOUR brain works. Learn life skills. Master AI tools. Use pre-built AI agents. Built for neurodivergent young adults.
            </p>
            <ul className="space-y-3 text-gray-300 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-orange-400 flex-shrink-0 mt-1">✓</span>
                <span>30+ careers matched to your cognitive profile</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 flex-shrink-0 mt-1">✓</span>
                <span>Life skills coach organized by 5 core themes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 flex-shrink-0 mt-1">✓</span>
                <span>AI literacy training (10 modules, hands-on practice)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 flex-shrink-0 mt-1">✓</span>
                <span>10 AI agents & 3 workflows for career transition</span>
              </li>
            </ul>
            <div className="bg-orange-900/30 rounded-lg p-4 border border-orange-700/30">
              <p className="text-sm text-orange-200 italic">
                "I have autism and ADHD. I never knew what career would work for me. This showed me jobs that actually fit my brain. Game changer."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Thinking Modes Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-4">Two Thinking Modes</h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto text-lg">
          Neurodivergent brains think laterally (connections, exploration) AND need structure (step-by-step, organized).
          We support both.
        </p>

        {/* Mode Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* SOCRATIC Mode */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-2xl text-white shadow-2xl transform hover:scale-105 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb size={40} className="text-yellow-300" />
              <h3 className="text-3xl font-bold">SOCRATIC</h3>
            </div>
            <p className="text-xl mb-6 text-blue-100 font-semibold">Explore together. Ask questions. Think it through.</p>
            <p className="text-blue-100 mb-6">
              Perfect for when you need to think through problems, explore ideas, or understand something deeply.
              The AI asks questions back, follows tangents, makes creative connections.
            </p>
            <div className="space-y-3">
              <div className="bg-white/10 rounded-lg p-4 border border-blue-400/30">
                <h4 className="font-semibold mb-1 flex items-center gap-2">
                  <Sparkles size={16} />
                  Think Out Loud
                </h4>
                <p className="text-sm text-blue-100">Explore ideas through dialogue & creative connections</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 border border-blue-400/30">
                <h4 className="font-semibold mb-1 flex items-center gap-2">
                  <Target size={16} />
                  Executive Strategist
                </h4>
                <p className="text-sm text-blue-100">ADHD-aware planning, decision-making & prioritization</p>
              </div>
            </div>
            <div className="mt-6 bg-blue-900/40 rounded-lg p-4 border border-blue-400/30">
              <p className="text-sm text-blue-100">
                <strong>Use when:</strong> Stuck on a problem, making decisions, learning concepts, brainstorming
              </p>
            </div>
          </div>

          {/* STRATEGIC Mode */}
          <div className="bg-gradient-to-br from-green-600 to-green-800 p-8 rounded-2xl text-white shadow-2xl transform hover:scale-105 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Zap size={40} className="text-yellow-300" />
              <h3 className="text-3xl font-bold">STRATEGIC</h3>
            </div>
            <p className="text-xl mb-6 text-green-100 font-semibold">Get direct answers. Clear info. Done.</p>
            <p className="text-green-100 mb-6">
              Perfect for when you need quick answers, actionable steps, or direct information.
              No fluff. Just clear, organized, practical help.
            </p>
            <div className="space-y-3">
              <div className="bg-white/10 rounded-lg p-4 border border-green-400/30">
                <h4 className="font-semibold mb-1 flex items-center gap-2">
                  <Type size={16} />
                  Writing Clarity
                </h4>
                <p className="text-sm text-green-100">Direct, actionable writing feedback & editing</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 border border-green-400/30">
                <h4 className="font-semibold mb-1 flex items-center gap-2">
                  <List size={16} />
                  Task Breakdown
                </h4>
                <p className="text-sm text-green-100">Break overwhelming projects into achievable steps</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 border border-green-400/30">
                <h4 className="font-semibold mb-1 flex items-center gap-2">
                  <Brain size={16} />
                  Research Digest
                </h4>
                <p className="text-sm text-green-100">Summarize & organize complex information</p>
              </div>
            </div>
            <div className="mt-6 bg-green-900/40 rounded-lg p-4 border border-green-400/30">
              <p className="text-sm text-green-100">
                <strong>Use when:</strong> Need quick answers, want specific steps, improving writing, researching
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prompt Library Deep Dive */}
      <section className="container mx-auto px-6 py-16 bg-gray-800/50 rounded-3xl my-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
              <BookOpen size={32} />
            </div>
            <h2 className="text-4xl font-bold mb-4">Prompt Library: Your Secret Weapon</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              30+ battle-tested prompts organized by who you are and what you need. No more blank screen paralysis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <PromptPreviewCard
              emoji="🎓"
              title="For Students"
              examples={[
                'Explain this concept simply',
                'Create a study guide I can use',
                'Break down this confusing assignment',
              ]}
              color="blue"
            />
            <PromptPreviewCard
              emoji="💼"
              title="For Professionals"
              examples={[
                'Help me write this email professionally',
                'Break this project into steps',
                'How do I ask for accommodations?',
              ]}
              color="green"
            />
            <PromptPreviewCard
              emoji="🚀"
              title="For Entrepreneurs"
              examples={[
                'Help me plan my business idea',
                'How do I stay organized?',
                'Understand this financial thing',
              ]}
              color="purple"
            />
            <PromptPreviewCard
              emoji="👩‍🏫"
              title="For Teachers"
              examples={[
                'Teach [subject] to dyslexic students',
                'Create accessible lesson materials',
                'Recognize dyslexic strengths',
              ]}
              color="orange"
            />
            <PromptPreviewCard
              emoji="👨‍👩‍👧"
              title="For Parents"
              examples={[
                'Explain dyslexia to me',
                'Help my child with homework',
                'Build my child\'s confidence',
              ]}
              color="pink"
            />
            <PromptPreviewCard
              emoji="🎯"
              title="For Coaches"
              examples={[
                'Coach dyslexic people effectively',
                'Understand neurodivergent thinking',
                'Celebrate neurodivergent strengths',
              ]}
              color="teal"
            />
          </div>

          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-8 border border-green-700/30">
            <div className="flex items-start gap-4">
              <Users size={32} className="text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Community-Powered</h3>
                <p className="text-gray-300 mb-4">
                  Every prompt is created by neurodivergent people who actually use them. Real problems. Real solutions.
                  Rated, verified, and constantly improving.
                </p>
                <p className="text-sm text-gray-400">
                  Each prompt includes: when to use it, the full prompt text, real example use case, best mode
                  (Socratic/Strategic), and related prompts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Leaderboard Deep Dive */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Trophy size={32} />
            </div>
            <h2 className="text-4xl font-bold mb-4">AI Tool Leaderboard</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The only benchmark that measures if AI tools actually understand neurodivergent thinking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Brain className="text-primary-400" />
                What We Test
              </h3>
              <div className="space-y-4">
                <ScoreDimension
                  icon={<Lightbulb size={20} className="text-yellow-500" />}
                  title="Lateral Thinking Support"
                  description="Can it handle non-linear exploration & creative connections?"
                />
                <ScoreDimension
                  icon={<List size={20} className="text-blue-500" />}
                  title="Linear Thinking Support"
                  description="Can it organize & structure information clearly?"
                />
                <ScoreDimension
                  icon={<MessageSquare size={20} className="text-green-500" />}
                  title="Language Adaptability"
                  description="Does it adjust to dyslexic language processing needs?"
                />
                <ScoreDimension
                  icon={<Brain size={20} className="text-purple-500" />}
                  title="Neurodivergent Awareness"
                  description="Does it understand & celebrate ND strengths?"
                />
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Star className="text-yellow-500" />
                Top Performers
              </h3>
              <div className="space-y-4">
                <LeaderboardPreview rank={1} name="Cognitive Partner" score={9.75} color="green" />
                <LeaderboardPreview rank={2} name="Claude (Anthropic)" score={8.75} color="blue" />
                <LeaderboardPreview rank={3} name="ChatGPT (OpenAI)" score={8.0} color="blue" />
                <LeaderboardPreview rank={4} name="Perplexity AI" score={7.0} color="yellow" />
                <LeaderboardPreview rank={5} name="Gemini (Google)" score={7.0} color="yellow" />
                <LeaderboardPreview rank={6} name="Microsoft Copilot" score={6.5} color="orange" />
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-400">
                  Each tool tested with 4 questions across all dimensions. Full test results, AI responses, and scoring
                  reasoning available in the leaderboard.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 border border-blue-700/30">
            <h3 className="text-xl font-bold mb-4">Why This Matters</h3>
            <p className="text-gray-300 text-lg mb-4">
              <strong className="text-blue-400">Dyslexia is a language-processing difference.</strong> LLMs are
              language models.
            </p>
            <p className="text-gray-300">
              We asked: Which AI tools adapt to BOTH lateral thinking (how neurodivergent brains naturally work) AND
              linear thinking (structured support when needed)? Which ones truly "get" us? Now you have the data.
            </p>
          </div>
        </div>
      </section>

      {/* Career Discovery Deep Dive */}
      <section className="container mx-auto px-6 py-16 bg-gray-800/50 rounded-3xl my-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full mb-4">
              <Briefcase size={32} />
            </div>
            <h2 className="text-4xl font-bold mb-4">Career Discovery: Your Future, Your Brain</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The complete career development platform for neurodivergent young adults. Find jobs that fit how YOUR brain works.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Career Matching */}
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-xl p-6 border border-orange-700/30">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="text-orange-400" size={28} />
                <h3 className="text-xl font-bold">Career Matching</h3>
              </div>
              <p className="text-gray-300 mb-4">
                30+ careers matched to your neurodivergent strengths, challenges, and interests.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span>Cognitive fit scores</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span>AI-risk ratings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span>Sensory/social demands</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span>Growth paths & guides</span>
                </li>
              </ul>
            </div>

            {/* Life Skills Coach */}
            <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-xl p-6 border border-green-700/30">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-green-400" size={28} />
                <h3 className="text-xl font-bold">Life Skills Coach</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Master the skills you need for adult life. Built for neurodivergent brains.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">🧠</span>
                  <span>Executive Function</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">📅</span>
                  <span>Organizing Systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">❤️</span>
                  <span>Emotional Regulation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">🛡️</span>
                  <span>Masking & Unmasking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">💬</span>
                  <span>Self-Advocacy</span>
                </li>
              </ul>
            </div>

            {/* AI Literacy Training */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-700/30">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-blue-400" size={28} />
                <h3 className="text-xl font-bold">AI Literacy</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Master AI tools for job search, learning, and daily life.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>What is AI & how it works</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Writing effective prompts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>AI for career & learning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Ethics & safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Hands-on practice</span>
                </li>
              </ul>
            </div>

            {/* AI Agents & Workflows */}
            <div className="bg-gradient-to-br from-primary-900/30 to-accent-900/30 rounded-xl p-6 border border-primary-700/30">
              <div className="flex items-center gap-3 mb-4">
                <Bot className="text-primary-400" size={28} />
                <h3 className="text-xl font-bold">AI Agents & Workflows</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Pre-built AI assistants and step-by-step processes for career transition.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-primary-400">🤖</span>
                  <span>10 ready-to-use AI agents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-400">🔄</span>
                  <span>3 multi-step workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-400">📋</span>
                  <span>Task breakdown & planning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-400">💬</span>
                  <span>Social scripts & prep</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-400">✨</span>
                  <span>Voice-optimized prompts</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-900/30 to-purple-900/30 rounded-xl p-8 border border-orange-700/30 mb-8">
            <h3 className="text-2xl font-bold mb-4">How It Works</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-xl font-bold mb-3">1</div>
                <h4 className="font-semibold mb-2">Build Your Profile</h4>
                <p className="text-sm text-gray-400">7-step questionnaire: neurodivergence, strengths, challenges, interests</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-xl font-bold mb-3">2</div>
                <h4 className="font-semibold mb-2">Get Matched</h4>
                <p className="text-sm text-gray-400">See 30+ jobs ranked by cognitive fit, AI-risk, and sensory/social demands</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-xl font-bold mb-3">3</div>
                <h4 className="font-semibold mb-2">Learn Skills</h4>
                <p className="text-sm text-gray-400">Take bite-sized lessons on time, money, interviews, emotions, social skills</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-xl font-bold mb-3">4</div>
                <h4 className="font-semibold mb-2">Master AI</h4>
                <p className="text-sm text-gray-400">Complete 10-module AI course with hands-on practice and certification</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-8 border border-green-700/30">
            <div className="flex items-start gap-4">
              <Users size={32} className="text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-4">Built FOR Neurodivergent People, BY Neurodivergent People</h3>
                <p className="text-gray-300 text-lg mb-4">
                  Every job, every lesson, every prompt is designed with neurodivergent thinking at the center.
                  We celebrate your strengths. We're honest about challenges. We never make you feel broken.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 rounded-lg p-4 border border-green-700/30">
                    <p className="text-sm text-green-200 italic">
                      "I have autism and ADHD. I never knew what career would work for me. This tool showed me jobs that actually fit how my brain works. I found a job I love as a Software Tester."
                    </p>
                    <p className="text-xs text-gray-500 mt-2">- Alex, 23</p>
                  </div>
                  <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700/30">
                    <p className="text-sm text-blue-200 italic">
                      "The Life Skills Coach saved me. Time management lessons actually made sense for my ADHD brain. I'm not 'lazy'—I just needed tools that work WITH how I think."
                    </p>
                    <p className="text-xs text-gray-500 mt-2">- Jordan, 20</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="container mx-auto px-6 py-16 bg-gray-800/50 rounded-3xl my-16">
        <h2 className="text-4xl font-bold text-center mb-4">Accessibility First, Always</h2>
        <p className="text-center text-gray-400 mb-12 text-lg max-w-3xl mx-auto">
          Every feature, every design choice, built with dyslexic and neurodivergent users at the center.
        </p>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <AccessibilityFeature icon={<Volume2 size={24} />} title="Text-to-Speech" description="Every message can be read aloud. Adjustable speed. No extra clicks." />
          <AccessibilityFeature icon={<Type size={24} />} title="Dyslexic-Friendly Fonts" description="OpenDyslexic, Comic Sans, Verdana. Adjust size & spacing instantly." />
          <AccessibilityFeature icon={<Mic size={24} />} title="Voice Input" description="Speak your thoughts instead of typing. Perfect for verbal processors." />
          <AccessibilityFeature icon={<MessageSquare size={24} />} title="Simplify Responses" description="Any AI response can be instantly rewritten in simpler language." />
          <AccessibilityFeature icon={<Network size={24} />} title="Mind Maps" description="Turn complex text into visual mind maps that show connections." />
          <AccessibilityFeature icon={<CheckSquare size={24} />} title="Task Extraction" description="Automatically pull out action items from any conversation." />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-5xl font-bold mb-6">Ready to Think Better?</h2>
        <p className="text-xl text-gray-400 mb-4">
          No signup required. No credit card. No BS.
        </p>
        <p className="text-lg text-gray-500 mb-8">
          Start chatting, browse prompts, compare AI tools. Free. Forever.
        </p>
        <button
          onClick={onGetStarted}
          className="btn-primary text-xl px-10 py-5 inline-flex items-center gap-3 shadow-2xl hover:shadow-primary-500/50 transform hover:scale-110 transition-all"
        >
          Launch Cognitive Partner
          <ArrowRight size={24} />
        </button>
        <p className="text-xs text-gray-600 mt-6">
          Join thousands of neurodivergent thinkers who finally found an AI that gets them.
        </p>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-gray-800">
        <div className="text-center space-y-4">
          <p className="text-gray-400 text-lg">
            Built with ❤️ by neurodivergent people, for neurodivergent people
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span>🔒 Privacy-focused</span>
            <span>•</span>
            <span>💾 Open source</span>
            <span>•</span>
            <span>🌍 Community-driven</span>
          </div>
          <p className="text-xs text-gray-600 mt-4">
            No tracking. No data collection. Just tools that work for your brain.
          </p>
        </div>
      </footer>
    </div>
  );
}

function PromptPreviewCard({
  emoji,
  title,
  examples,
  color,
}: {
  emoji: string;
  title: string;
  examples: string[];
  color: string;
}) {
  const colorClasses = {
    blue: 'border-blue-700/50 hover:border-blue-600',
    green: 'border-green-700/50 hover:border-green-600',
    purple: 'border-purple-700/50 hover:border-purple-600',
    orange: 'border-orange-700/50 hover:border-orange-600',
    pink: 'border-pink-700/50 hover:border-pink-600',
    teal: 'border-teal-700/50 hover:border-teal-600',
  };

  return (
    <div className={`bg-gray-800 rounded-xl p-6 border ${colorClasses[color as keyof typeof colorClasses]} transition-all hover:scale-105`}>
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {examples.map((example, i) => (
          <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
            <span className="text-primary-500 mt-0.5">→</span>
            <span>{example}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScoreDimension({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div>
        <h4 className="font-semibold text-white mb-1">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}

function LeaderboardPreview({ rank, name, score, color }: { rank: number; name: string; score: number; color: string }) {
  const colorClasses = {
    green: 'text-green-500',
    blue: 'text-blue-500',
    yellow: 'text-yellow-500',
    orange: 'text-orange-500',
  };

  const medalEmoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';

  return (
    <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700">
      <div className="flex items-center gap-3">
        <span className="text-2xl w-8 text-center">{medalEmoji || `${rank}.`}</span>
        <span className="font-semibold text-white">{name}</span>
      </div>
      <span className={`text-lg font-bold ${colorClasses[color as keyof typeof colorClasses]}`}>{score.toFixed(2)}/10</span>
    </div>
  );
}

function AccessibilityFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 p-5 bg-gray-800 rounded-xl border border-gray-700">
      <div className="text-primary-500 flex-shrink-0 mt-1">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}
