import { Briefcase, Clock, TrendingUp, Bot, Users } from 'lucide-react';

export function CareerDiscoveryPreview() {
  return (
    <section className="container mx-auto px-6 py-20 md:py-24 bg-earth-50 rounded-3xl my-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4">
            <Briefcase size={32} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Career Discovery: Your Future, Your Brain</h2>
          <p className="text-xl text-earth-600 max-w-3xl mx-auto">
            The complete career development platform for neurodivergent young adults. Find jobs that fit how YOUR brain works.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Career Matching */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="text-orange-400" size={28} />
              <h3 className="text-xl font-bold">Career Matching</h3>
            </div>
            <p className="text-earth-600 mb-4">
              30+ careers matched to your neurodivergent strengths, challenges, and interests.
            </p>
            <ul className="space-y-2 text-sm text-earth-500">
              <li className="flex items-start gap-2"><span className="text-orange-400">&bull;</span><span>Cognitive fit scores</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-400">&bull;</span><span>AI-risk ratings</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-400">&bull;</span><span>Sensory/social demands</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-400">&bull;</span><span>Growth paths & guides</span></li>
            </ul>
          </div>

          {/* Life Skills Coach */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-green-400" size={28} />
              <h3 className="text-xl font-bold">Life Skills Coach</h3>
            </div>
            <p className="text-earth-600 mb-4">
              Master the skills you need for adult life. Built for neurodivergent brains.
            </p>
            <ul className="space-y-2 text-sm text-earth-500">
              <li className="flex items-start gap-2"><span className="text-green-400">&#x1F9E0;</span><span>Executive Function</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400">&#x1F4C5;</span><span>Organizing Systems</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400">&#x2764;&#xFE0F;</span><span>Emotional Regulation</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400">&#x1F6E1;&#xFE0F;</span><span>Masking & Unmasking</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400">&#x1F4AC;</span><span>Self-Advocacy</span></li>
            </ul>
          </div>

          {/* AI Literacy Training */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-blue-400" size={28} />
              <h3 className="text-xl font-bold">AI Literacy</h3>
            </div>
            <p className="text-earth-600 mb-4">
              Master AI tools for job search, learning, and daily life.
            </p>
            <ul className="space-y-2 text-sm text-earth-500">
              <li className="flex items-start gap-2"><span className="text-blue-400">&bull;</span><span>What is AI & how it works</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400">&bull;</span><span>Writing effective prompts</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400">&bull;</span><span>AI for career & learning</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400">&bull;</span><span>Ethics & safety</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400">&bull;</span><span>Hands-on practice</span></li>
            </ul>
          </div>

          {/* AI Agents & Workflows */}
          <div className="bg-gradient-to-br from-cyan-50 to-magenta-50 rounded-xl p-6 border border-cyan-200">
            <div className="flex items-center gap-3 mb-4">
              <Bot className="text-cyan-500" size={28} />
              <h3 className="text-xl font-bold">AI Agents</h3>
            </div>
            <p className="text-earth-600 mb-4">
              Pre-built AI assistants and step-by-step processes for career transition.
            </p>
            <ul className="space-y-2 text-sm text-earth-500">
              <li className="flex items-start gap-2"><span className="text-cyan-500">&#x1F916;</span><span>10 ready-to-use AI agents</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-500">&#x1F504;</span><span>3 multi-step workflows</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-500">&#x1F4CB;</span><span>Task breakdown & planning</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-500">&#x1F4AC;</span><span>Social scripts & prep</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-500">&#x2728;</span><span>Voice-optimized prompts</span></li>
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-orange-50 to-cyan-50 rounded-xl p-8 border border-orange-200 mb-8">
          <h3 className="text-2xl font-bold mb-4">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'Build Your Profile', desc: '7-step questionnaire: neurodivergence, strengths, challenges, interests' },
              { num: '2', title: 'Get Matched', desc: 'See 30+ jobs ranked by cognitive fit, AI-risk, and sensory/social demands' },
              { num: '3', title: 'Learn Skills', desc: 'Take bite-sized lessons on time, money, interviews, emotions, social skills' },
              { num: '4', title: 'Master AI', desc: 'Complete 10-module AI course with hands-on practice and certification' },
            ].map(step => (
              <div key={step.num}>
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-xl font-bold text-white mb-3">
                  {step.num}
                </div>
                <h4 className="font-semibold mb-2">{step.title}</h4>
                <p className="text-sm text-earth-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
          <div className="flex items-start gap-4">
            <Users size={32} className="text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold mb-4">Built FOR Neurodivergent People, BY Neurodivergent People</h3>
              <p className="text-earth-600 text-lg mb-4">
                Every job, every lesson, every prompt is designed with neurodivergent thinking at the center.
                We celebrate your strengths. We're honest about challenges. We never make you feel broken.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-green-700 italic">
                    "I have autism and ADHD. I never knew what career would work for me. This tool showed me jobs that actually fit how my brain works. I found a job I love as a Software Tester."
                  </p>
                  <p className="text-xs text-earth-400 mt-2">- Alex, 23</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-blue-700 italic">
                    "The Life Skills Coach saved me. Time management lessons actually made sense for my ADHD brain. I'm not 'lazy'---I just needed tools that work WITH how I think."
                  </p>
                  <p className="text-xs text-earth-400 mt-2">- Jordan, 20</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
