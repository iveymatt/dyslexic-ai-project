import { ArrowLeft, Brain, Lightbulb, List, MessageSquare, Target, CheckCircle } from 'lucide-react';

interface HowWeScoreProps {
  onBack: () => void;
}

export function HowWeScore({ onBack }: HowWeScoreProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="btn-icon"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Brain className="text-primary-500" size={28} />
              How We Score Neurodivergent Thinking Support
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Methodology, test questions, and scoring rubric
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Why This Matters */}
        <section className="bg-gradient-to-r from-primary-900/30 to-blue-900/30 rounded-2xl p-8 border border-primary-700/50">
          <h2 className="text-3xl font-bold text-white mb-4">Why This Matters</h2>
          <div className="text-gray-200 space-y-4 leading-relaxed text-lg">
            <p>
              <span className="font-semibold text-primary-300">Dyslexia is a language-processing difference.</span>{' '}
              LLMs are language models.
            </p>
            <p>
              <span className="font-semibold text-blue-300">Neurodivergent brains think differently</span> - more
              laterally, non-linearly, creatively.
            </p>
            <p>
              We measure how well each AI tool supports <span className="font-bold text-white">BOTH</span> lateral
              and linear thinking, because neurodivergent thinkers need tools that work{' '}
              <span className="font-bold text-white">WITH</span> their brain, not against it.
            </p>
          </div>
        </section>

        {/* The 4 Dimensions */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">The 4 Dimensions We Measure</h2>

          <div className="space-y-6">
            {/* Lateral Thinking */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-start gap-4">
                <Lightbulb className="text-yellow-400 mt-1 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">1. Lateral Thinking Support (1-10)</h3>
                  <p className="text-gray-400 mb-4">"Can this model handle non-linear exploration?"</p>

                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-white mb-2">What we're testing:</h4>
                    <ul className="space-y-1 text-sm text-gray-300 list-disc list-inside">
                      <li>Can you ask a question without knowing the full problem yet?</li>
                      <li>Does it ask clarifying questions or jump to answers?</li>
                      <li>Does it encourage exploration and tangents?</li>
                      <li>Can it make creative connections?</li>
                      <li>Does it celebrate unconventional thinking?</li>
                    </ul>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3">
                      <p className="font-semibold text-green-400 mb-1">Good score (8-10):</p>
                      <p className="text-gray-300">
                        Asks questions first, explores with you, follows tangents, makes creative leaps
                      </p>
                    </div>
                    <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3">
                      <p className="font-semibold text-red-400 mb-1">Bad score (1-3):</p>
                      <p className="text-gray-300">
                        Demands structure first, gets lost, forces linear thinking
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-gray-900/50 rounded-lg p-4">
                    <p className="text-xs font-semibold text-gray-400 mb-2">WHY IT MATTERS:</p>
                    <p className="text-sm text-gray-300">
                      Dyslexic/ADHD brains often think in connections and tangents. We need tools that can explore
                      with us, not tools that force us into linear boxes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Linear Thinking */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-start gap-4">
                <List className="text-blue-400 mt-1 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">2. Linear Thinking Support (1-10)</h3>
                  <p className="text-gray-400 mb-4">"Can this model organize and structure information?"</p>

                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-white mb-2">What we're testing:</h4>
                    <ul className="space-y-1 text-sm text-gray-300 list-disc list-inside">
                      <li>Does it break things into clear steps?</li>
                      <li>Can it create organized checklists/timelines?</li>
                      <li>Does it prioritize information?</li>
                      <li>Can it turn chaos into structure?</li>
                      <li>Is the output well-organized for scanning?</li>
                    </ul>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3">
                      <p className="font-semibold text-green-400 mb-1">Good score (8-10):</p>
                      <p className="text-gray-300">
                        Clear structure, numbered steps, organized output, easy to scan
                      </p>
                    </div>
                    <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3">
                      <p className="font-semibold text-red-400 mb-1">Bad score (1-3):</p>
                      <p className="text-gray-300">
                        Walls of text, no structure, overwhelming
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-gray-900/50 rounded-lg p-4">
                    <p className="text-xs font-semibold text-gray-400 mb-2">WHY IT MATTERS:</p>
                    <p className="text-sm text-gray-300">
                      When we DO need structure, we need it clear and simple. Executive function challenges mean
                      we need external organization systems that actually work.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Language Adaptability */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-start gap-4">
                <MessageSquare className="text-green-400 mt-1 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">3. Language Adaptability (1-10)</h3>
                  <p className="text-gray-400 mb-4">"Does this model adjust to how I process language?"</p>

                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-white mb-2">What we're testing:</h4>
                    <ul className="space-y-1 text-sm text-gray-300 list-disc list-inside">
                      <li>Can it write simply when asked?</li>
                      <li>Does it use plain language by default?</li>
                      <li>Can it explain complex things simply?</li>
                      <li>Does it notice if something is too dense and simplify?</li>
                      <li>Can it match reading level?</li>
                      <li>Does it break things into digestible chunks?</li>
                    </ul>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3">
                      <p className="font-semibold text-green-400 mb-1">Good score (8-10):</p>
                      <p className="text-gray-300">
                        Simplifies by default, uses plain language, breaks into chunks, easy to read
                      </p>
                    </div>
                    <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3">
                      <p className="font-semibold text-red-400 mb-1">Bad score (1-3):</p>
                      <p className="text-gray-300">
                        Uses jargon, walls of text, assumes comprehension, dense writing
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-gray-900/50 rounded-lg p-4">
                    <p className="text-xs font-semibold text-gray-400 mb-2">WHY IT MATTERS:</p>
                    <p className="text-sm text-gray-300">
                      Language processing is different for dyslexic brains. We need tools that adapt to our
                      reading speed, comprehension style, and need for clarity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Neurodivergent Awareness */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-start gap-4">
                <Brain className="text-purple-400 mt-1 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">4. Neurodivergent Awareness (1-10)</h3>
                  <p className="text-gray-400 mb-4">"Does this model understand how neurodivergent brains work?"</p>

                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-white mb-2">What we're testing:</h4>
                    <ul className="space-y-1 text-sm text-gray-300 list-disc list-inside">
                      <li>Does it recognize ADHD/dyslexic strengths (big picture, creative, hyperfocus)?</li>
                      <li>Does it offer neurodivergent-friendly strategies?</li>
                      <li>Does it avoid ableist language ("even though you have dyslexia")?</li>
                      <li>Does it celebrate differences, not just fix deficits?</li>
                      <li>Does it understand context switching, overwhelm, overstimulation?</li>
                      <li>When helping with a task, does it account for executive function challenges?</li>
                    </ul>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3">
                      <p className="font-semibold text-green-400 mb-1">Good score (8-10):</p>
                      <p className="text-gray-300">
                        Celebrates strengths, offers neurodivergent strategies, affirming tone
                      </p>
                    </div>
                    <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3">
                      <p className="font-semibold text-red-400 mb-1">Bad score (1-3):</p>
                      <p className="text-gray-300">
                        Clinical/ableist, focuses only on deficits, doesn't understand context
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-gray-900/50 rounded-lg p-4">
                    <p className="text-xs font-semibold text-gray-400 mb-2">WHY IT MATTERS:</p>
                    <p className="text-sm text-gray-300">
                      Too many tools are designed for neurotypical brains. We need tools that understand our
                      strengths, celebrate our differences, and offer strategies that actually work for us.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Test Questions */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Test Questions We Use</h2>
          <p className="text-gray-300 mb-6">
            We ask each AI tool these 4 questions designed to reveal the dimensions above:
          </p>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
              <h3 className="font-bold text-primary-400 mb-2">Test 1: Lateral Thinking</h3>
              <p className="text-gray-300 italic mb-2">
                "I want to build something but I'm not sure what yet. I like coding and music. What questions should
                I ask myself to figure out what to build?"
              </p>
              <p className="text-sm text-gray-500">
                Scoring: Does it ask curious questions? Does it explore possibilities? Or does it force a linear
                answer?
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
              <h3 className="font-bold text-blue-400 mb-2">Test 2: Linear Thinking + Organization</h3>
              <p className="text-gray-300 italic mb-2">
                "Help me break down starting a personal website into steps. I get overwhelmed easily. Make it as
                simple as possible with time estimates."
              </p>
              <p className="text-sm text-gray-500">
                Scoring: Clear numbered steps? Realistic small steps? Overwhelming detail? Practical timeline?
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
              <h3 className="font-bold text-green-400 mb-2">Test 3: Language Adaptability</h3>
              <p className="text-gray-300 italic mb-2">
                "Explain neural networks to someone with dyslexia who's never heard of it before. Use simple words.
                Keep it short."
              </p>
              <p className="text-sm text-gray-500">
                Scoring: Simple language? Short paragraphs? Actually understandable? Jargon or density?
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
              <h3 className="font-bold text-purple-400 mb-2">Test 4: Neurodivergent Awareness</h3>
              <p className="text-gray-300 italic mb-2">
                "I have dyslexia and ADHD. I need help organizing my work. What strategies work best for brains
                like mine?"
              </p>
              <p className="text-sm text-gray-500">
                Scoring: Celebrates strengths? Offers neurodivergent strategies? Affirming tone? Clinical/ableist
                language? Actually helpful?
              </p>
            </div>
          </div>
        </section>

        {/* Scoring Rubric */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Scoring Rubric (1-10)</h2>

          <div className="space-y-3">
            <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="text-green-400" size={20} />
                <h3 className="font-bold text-green-400 text-lg">9-10: Excellent</h3>
              </div>
              <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                <li>Directly addresses the need</li>
                <li>Uses simple, clear language</li>
                <li>Shows understanding of neurodivergent thinking</li>
                <li>Affirming, supportive tone</li>
                <li>Practically useful</li>
                <li>Easy to scan/understand</li>
              </ul>
            </div>

            <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="text-blue-400" size={20} />
                <h3 className="font-bold text-blue-400 text-lg">7-8: Good</h3>
              </div>
              <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                <li>Mostly addresses the need</li>
                <li>Generally clear language</li>
                <li>Shows some understanding</li>
                <li>Professional tone, not ableist</li>
                <li>Somewhat useful</li>
                <li>Reasonably well-organized</li>
              </ul>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4">
              <h3 className="font-bold text-yellow-400 text-lg mb-2">5-6: Okay</h3>
              <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                <li>Partially addresses the need</li>
                <li>Mix of clear and complex language</li>
                <li>Limited understanding of neurodivergent thinking</li>
                <li>Neutral tone (not affirming or ableist)</li>
                <li>Some useful information</li>
                <li>Could be better organized</li>
              </ul>
            </div>

            <div className="bg-orange-900/30 border border-orange-700/50 rounded-lg p-4">
              <h3 className="font-bold text-orange-400 text-lg mb-2">3-4: Poor</h3>
              <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                <li>Somewhat misses the need</li>
                <li>Dense or jargon-heavy</li>
                <li>Shows little understanding of neurodivergent thinking</li>
                <li>Slightly clinical/dismissive tone</li>
                <li>Limited usefulness</li>
                <li>Hard to follow</li>
              </ul>
            </div>

            <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4">
              <h3 className="font-bold text-red-400 text-lg mb-2">1-2: Very Poor</h3>
              <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                <li>Misses the need entirely</li>
                <li>Very dense or impossible to understand</li>
                <li>Shows no understanding or is ableist</li>
                <li>Unhelpful or discouraging</li>
                <li>Very hard to follow</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Is This Perfect? */}
        <section className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-4">Is This Perfect?</h2>
          <div className="text-gray-300 space-y-4 leading-relaxed">
            <p className="text-xl font-semibold text-primary-300">No. This is MVP v1.</p>
            <p>
              We're learning from our community. If you think we should measure something different,{' '}
              <span className="font-semibold text-white">tell us</span>.
            </p>
            <p className="text-lg italic text-gray-400">
              Neurodivergent-powered benchmark, by neurodivergent people, for neurodivergent people.
            </p>
          </div>
        </section>

        {/* Back Button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
          >
            Back to Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
