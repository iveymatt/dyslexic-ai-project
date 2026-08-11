import type {
  SoftSkill,
  AIAssistiveTool,
  Accommodation,
  FutureAIImpact,
  SensoryDemands,
  SocialDemandDetails,
} from '../../types/career';
import {
  Sparkles,
  Brain,
  Zap,
  CheckCircle2,
  AlertCircle,
  Users,
  Volume2,
  Sun,
  Home,
  MessageSquare,
  Clock,
  TrendingUp,
  Shield,
  Lightbulb,
} from 'lucide-react';

// ========== SOFT SKILLS COMPONENT ==========
interface SoftSkillsProps {
  skills: SoftSkill[];
  userChallenges?: string[];
}

export function SoftSkillsSection({ skills }: SoftSkillsProps) {
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical':
        return 'text-red-400 border-red-500/50 bg-red-900/20';
      case 'helpful':
        return 'text-blue-400 border-blue-500/50 bg-blue-900/20';
      case 'optional':
        return 'text-earth-500 border-earth-300/50 bg-earth-50';
      default:
        return 'text-earth-500 border-earth-300/50 bg-earth-50';
    }
  };

  const getImportanceLabel = (importance: string) => {
    switch (importance) {
      case 'critical':
        return '🔴 Critical';
      case 'helpful':
        return '🔵 Helpful';
      case 'optional':
        return '⚪ Optional';
      default:
        return importance;
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-700/50">
      <div className="flex items-center gap-3 mb-4">
        <Brain size={28} className="text-purple-400" />
        <h3 className="text-2xl font-bold">Soft Skills (Neurodivergent-Friendly Guide)</h3>
      </div>
      <p className="text-earth-600 mb-6">
        What soft skills matter for this job? We break down each skill with tips for neurodivergent
        thinkers and tools that can help.
      </p>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`rounded-lg p-4 border-2 ${getImportanceColor(skill.importance)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                {skill.name}
                {skill.canBeSupported && <Zap size={16} className="text-yellow-400" />}
              </h4>
              <span className="text-sm px-2 py-1 rounded bg-white/50">
                {getImportanceLabel(skill.importance)}
              </span>
            </div>

            {skill.neurodivergentTips && (
              <div className="bg-purple-900/30 rounded p-3 mb-3 border-l-4 border-purple-400">
                <p className="text-sm text-purple-200">
                  <strong>💡 ND Tips:</strong> {skill.neurodivergentTips}
                </p>
              </div>
            )}

            {skill.supportTools && skill.supportTools.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-earth-500 mb-1">Tools that help:</p>
                <div className="flex flex-wrap gap-2">
                  {skill.supportTools.map((tool, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded bg-yellow-900/30 text-yellow-200 border border-yellow-700/50">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== AI ASSISTIVE TOOLS COMPONENT ==========
interface AIToolsProps {
  tools: AIAssistiveTool[];
  userChallenges?: string[];
}

export function AIAssistiveToolsSection({ tools }: AIToolsProps) {
  const getCostIcon = (cost: string) => {
    switch (cost) {
      case 'free':
        return '✅ Free';
      case 'low':
        return '💵 $';
      case 'medium':
        return '💰 $$';
      case 'expensive':
        return '💸 $$$';
      default:
        return cost;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'writing':
        return '✍️';
      case 'organization':
        return '📋';
      case 'communication':
        return '💬';
      case 'time-management':
        return '⏰';
      case 'sensory':
        return '🎧';
      case 'learning':
        return '📚';
      case 'task-automation':
        return '⚡';
      default:
        return '🔧';
    }
  };

  // Group tools by category
  const groupedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, AIAssistiveTool[]>);

  return (
    <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl p-6 border border-cyan-700/50">
      <div className="flex items-center gap-3 mb-4">
        <Zap size={28} className="text-cyan-400" />
        <h3 className="text-2xl font-bold">AI Tools That Help Neurodivergent Workers</h3>
      </div>
      <p className="text-earth-600 mb-2">
        AI isn't just a threat to jobs - it's a powerful <strong>accommodation tool</strong>! These AI
        tools help neurodivergent people excel in this career.
      </p>
      <p className="text-sm text-cyan-200 mb-6 bg-cyan-900/30 rounded p-3 border-l-4 border-cyan-400">
        💡 <strong>Key Insight:</strong> While AI may automate some tasks (AI Risk Score), it also
        provides assistive technology that levels the playing field for neurodivergent thinkers.
      </p>

      <div className="space-y-6">
        {Object.entries(groupedTools).map(([category, categoryTools]) => (
          <div key={category}>
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-cyan-300">
              <span>{getCategoryIcon(category)}</span>
              <span className="capitalize">{category.replace('-', ' ')}</span>
            </h4>
            <div className="space-y-3">
              {categoryTools.map((tool, index) => (
                <div key={index} className="bg-white/50 rounded-lg p-4 border border-cyan-700/30">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-semibold text-cyan-100">{tool.name}</h5>
                    <span className="text-xs px-2 py-1 rounded bg-cyan-900/50 text-cyan-200">
                      {getCostIcon(tool.costLevel)}
                    </span>
                  </div>
                  <p className="text-sm text-earth-500 mb-2">{tool.description}</p>
                  <div className="bg-cyan-900/30 rounded p-2 border-l-4 border-cyan-400">
                    <p className="text-sm text-cyan-200">
                      <strong>🧠 For Neurodivergent Brains:</strong> {tool.neurodivergentBenefit}
                    </p>
                  </div>
                  {tool.helpsWithChallenges && tool.helpsWithChallenges.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {tool.helpsWithChallenges.map((challenge, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded bg-purple-900/30 text-purple-200"
                        >
                          {challenge.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== ACCOMMODATIONS COMPONENT ==========
interface AccommodationsProps {
  accommodations: Accommodation[];
}

export function AccommodationsSection({ accommodations }: AccommodationsProps) {
  const getLikelihoodColor = (likelihood: string) => {
    switch (likelihood) {
      case 'common':
        return 'text-green-400 bg-green-900/30 border-green-500/50';
      case 'negotiable':
        return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50';
      case 'rare':
        return 'text-orange-400 bg-orange-900/30 border-orange-500/50';
      default:
        return 'text-earth-500 bg-earth-50 border-earth-300/50';
    }
  };

  const getLikelihoodLabel = (likelihood: string) => {
    switch (likelihood) {
      case 'common':
        return '✅ Common';
      case 'negotiable':
        return '🤝 Negotiable';
      case 'rare':
        return '⚠️ Rare';
      default:
        return likelihood;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sensory':
        return <Volume2 size={20} className="text-purple-400" />;
      case 'social':
        return <Users size={20} className="text-blue-400" />;
      case 'time':
        return <Clock size={20} className="text-green-400" />;
      case 'communication':
        return <MessageSquare size={20} className="text-cyan-400" />;
      case 'workspace':
        return <Home size={20} className="text-orange-400" />;
      case 'tech':
        return <Zap size={20} className="text-yellow-400" />;
      default:
        return <CheckCircle2 size={20} className="text-earth-500" />;
    }
  };

  // Group by type
  const groupedAccommodations = accommodations.reduce((acc, accommodation) => {
    if (!acc[accommodation.type]) {
      acc[accommodation.type] = [];
    }
    acc[accommodation.type].push(accommodation);
    return acc;
  }, {} as Record<string, Accommodation[]>);

  return (
    <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-xl p-6 border border-green-700/50">
      <div className="flex items-center gap-3 mb-4">
        <Shield size={28} className="text-green-400" />
        <h3 className="text-2xl font-bold">Workplace Accommodations</h3>
      </div>
      <p className="text-earth-600 mb-6">
        Accommodations you can request to succeed in this job. We tell you how common they are and how
        to ask for them.
      </p>

      <div className="space-y-6">
        {Object.entries(groupedAccommodations).map(([type, typeAccommodations]) => (
          <div key={type}>
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-green-300 capitalize">
              {getTypeIcon(type)}
              <span>{type} Accommodations</span>
            </h4>
            <div className="space-y-3">
              {typeAccommodations.map((accommodation, index) => (
                <div key={index} className="bg-white/50 rounded-lg p-4 border border-green-700/30">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-semibold text-green-100">{accommodation.name}</h5>
                    <span
                      className={`text-xs px-2 py-1 rounded border ${getLikelihoodColor(
                        accommodation.likelihood
                      )}`}
                    >
                      {getLikelihoodLabel(accommodation.likelihood)}
                    </span>
                  </div>
                  <p className="text-sm text-earth-500 mb-3">{accommodation.description}</p>
                  {accommodation.howToRequest && (
                    <div className="bg-green-900/30 rounded p-3 border-l-4 border-green-400">
                      <p className="text-sm text-green-200">
                        <strong>💬 How to request:</strong> {accommodation.howToRequest}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== FUTURE AI IMPACT COMPONENT ==========
interface FutureAIProps {
  impact: FutureAIImpact;
  aiRiskScore: number;
}

export function FutureAIImpactSection({ impact, aiRiskScore }: FutureAIProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-6 border border-indigo-700/50">
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp size={28} className="text-indigo-400" />
        <h3 className="text-2xl font-bold">The AI Future: Risk + Opportunity</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Automation Risk */}
        <div className="bg-red-900/20 rounded-lg p-4 border border-red-700/50">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={20} className="text-red-400" />
            <h4 className="font-semibold text-red-300">Automation Risk</h4>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-red-400">{impact.automationRisk}/10</span>
            <span className="text-sm text-earth-500">(Overall: {aiRiskScore}/10)</span>
          </div>
          <p className="text-sm text-earth-500">Parts AI might automate</p>
        </div>

        {/* Augmentation Opportunity */}
        <div className="bg-green-900/20 rounded-lg p-4 border border-green-700/50">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={20} className="text-green-400" />
            <h4 className="font-semibold text-green-300">Augmentation Opportunity</h4>
          </div>
          <div className="text-3xl font-bold text-green-400 mb-2">
            {impact.augmentationOpportunity}/10
          </div>
          <p className="text-sm text-earth-500">How much AI helps you do the job BETTER</p>
        </div>
      </div>

      {/* Neurodivergent Advantage */}
      {impact.neurodivergentAdvantage && (
        <div className="bg-purple-900/30 rounded-lg p-4 border-l-4 border-purple-400 mb-6">
          <div className="flex items-start gap-2 mb-2">
            <Brain size={20} className="text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-purple-300 mb-2">Why Neurodivergent Thinking Wins</h4>
              <p className="text-sm text-purple-200">{impact.neurodivergentAdvantage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Emerging Tools */}
      {impact.emergingTools.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-indigo-300 mb-3 flex items-center gap-2">
            <Lightbulb size={20} />
            Emerging AI Tools (Coming Soon)
          </h4>
          <ul className="space-y-2">
            {impact.emergingTools.map((tool, index) => (
              <li key={index} className="text-sm text-earth-600 flex items-start gap-2">
                <span className="text-indigo-400">▸</span>
                <span>{tool}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Future Skills */}
      {impact.futureSkillsNeeded.length > 0 && (
        <div>
          <h4 className="font-semibold text-indigo-300 mb-3 flex items-center gap-2">
            <CheckCircle2 size={20} />
            Skills to Learn Now (Stay Relevant)
          </h4>
          <ul className="space-y-2">
            {impact.futureSkillsNeeded.map((skill, index) => (
              <li key={index} className="text-sm text-earth-600 flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ========== ENHANCED SENSORY/SOCIAL DETAILS ==========
interface EnhancedSensoryProps {
  sensory: SensoryDemands;
  socialDetails?: SocialDemandDetails;
}

export function EnhancedSensorySection({ sensory, socialDetails }: EnhancedSensoryProps) {
  return (
    <div className="space-y-6">
      {/* Sensory Details */}
      <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-xl p-6 border border-purple-700/50">
        <div className="flex items-center gap-3 mb-4">
          <Volume2 size={24} className="text-purple-400" />
          <h3 className="text-xl font-bold">Sensory Environment (Detailed)</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Noise */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Volume2 size={16} className="text-purple-400" />
              <span className="font-semibold">Noise Level: {sensory.noise}</span>
            </div>
            {sensory.noiseDetails && <p className="text-sm text-earth-500">{sensory.noiseDetails}</p>}
          </div>

          {/* Lighting */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sun size={16} className="text-yellow-400" />
              <span className="font-semibold">Lighting: {sensory.lights}</span>
            </div>
            {sensory.lightingDetails && (
              <p className="text-sm text-earth-500">{sensory.lightingDetails}</p>
            )}
          </div>

          {/* Open Plan */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Home size={16} className="text-blue-400" />
              <span className="font-semibold">
                Open Plan: {sensory.openPlan ? 'Yes' : 'No / Private'}
              </span>
            </div>
            {sensory.openPlanDetails && (
              <p className="text-sm text-earth-500">{sensory.openPlanDetails}</p>
            )}
          </div>

          {/* Remote */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Home size={16} className="text-green-400" />
              <span className="font-semibold">Remote: {sensory.remote ? 'Available' : 'In-office'}</span>
            </div>
            {sensory.remoteDetails && <p className="text-sm text-earth-500">{sensory.remoteDetails}</p>}
          </div>
        </div>

        {/* Sensory Accommodations */}
        {sensory.sensoryAccommodations && sensory.sensoryAccommodations.length > 0 && (
          <div className="mt-4 pt-4 border-t border-purple-700/30">
            <h4 className="font-semibold text-purple-300 mb-2">Sensory Accommodations Available:</h4>
            <div className="flex flex-wrap gap-2">
              {sensory.sensoryAccommodations.map((accommodation, i) => (
                <span
                  key={i}
                  className="text-sm px-3 py-1 rounded bg-purple-900/30 text-purple-200 border border-purple-700/50"
                >
                  ✓ {accommodation}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Social Details */}
      {socialDetails && (
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-6 border border-blue-700/50">
          <div className="flex items-center gap-3 mb-4">
            <Users size={24} className="text-blue-400" />
            <h3 className="text-xl font-bold">Social Demands (Detailed)</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-earth-500">Team Size</span>
              <p className="font-semibold">{socialDetails.teamSize || 'Varies'} people</p>
            </div>
            <div>
              <span className="text-sm text-earth-500">Daily Interactions</span>
              <p className="font-semibold">{socialDetails.dailyInteractions}</p>
            </div>
            <div>
              <span className="text-sm text-earth-500">Client Facing?</span>
              <p className="font-semibold">{socialDetails.clientFacing ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <span className="text-sm text-earth-500">Presentations?</span>
              <p className="font-semibold">{socialDetails.presentationsRequired ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <span className="text-sm text-earth-500">Phone Calls?</span>
              <p className="font-semibold">{socialDetails.phoneCallsRequired ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <span className="text-sm text-earth-500">Communication Style</span>
              <p className="font-semibold capitalize">
                {socialDetails.writtenVsVerbal?.replace('-', ' ')}
              </p>
            </div>
          </div>

          {/* Social Accommodations */}
          {socialDetails.socialAccommodations && socialDetails.socialAccommodations.length > 0 && (
            <div className="mt-4 pt-4 border-t border-blue-700/30">
              <h4 className="font-semibold text-blue-300 mb-2">Social Accommodations Available:</h4>
              <div className="flex flex-wrap gap-2">
                {socialDetails.socialAccommodations.map((accommodation, i) => (
                  <span
                    key={i}
                    className="text-sm px-3 py-1 rounded bg-blue-900/30 text-blue-200 border border-blue-700/50"
                  >
                    ✓ {accommodation}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
