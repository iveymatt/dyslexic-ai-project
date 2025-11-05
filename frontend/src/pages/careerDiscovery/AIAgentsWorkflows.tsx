import { useState } from 'react';
import { aiAgents, aiWorkflows } from '../../data/careerDiscovery/aiAgents';
import type { AIAgent, AIWorkflow } from '../../types/career';
import { Bot, Workflow, Search, Filter, ArrowRight, Clock, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

interface AIAgentsWorkflowsProps {
  onBack: () => void;
}

type CategoryFilter = 'all' | 'executive-function' | 'organizing-systems' | 'sensory-emotional' | 'masking' | 'communication';
type ViewMode = 'agents' | 'workflows';

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  'executive-function': { bg: 'bg-purple-900/20', border: 'border-purple-700/30', text: 'text-purple-400' },
  'organizing-systems': { bg: 'bg-blue-900/20', border: 'border-blue-700/30', text: 'text-blue-400' },
  'sensory-emotional': { bg: 'bg-green-900/20', border: 'border-green-700/30', text: 'text-green-400' },
  'masking': { bg: 'bg-pink-900/20', border: 'border-pink-700/30', text: 'text-pink-400' },
  'communication': { bg: 'bg-cyan-900/20', border: 'border-cyan-700/30', text: 'text-cyan-400' },
};

const categoryLabels: Record<string, string> = {
  'executive-function': '🧠 Executive Function',
  'organizing-systems': '📅 Organizing Systems',
  'sensory-emotional': '❤️ Sensory & Emotional',
  'masking': '🛡️ Masking & Camouflaging',
  'communication': '💬 Communication',
};

export function AIAgentsWorkflows({ onBack }: AIAgentsWorkflowsProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('agents');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<AIWorkflow | null>(null);

  // Filter agents/workflows
  const filteredAgents = aiAgents.filter(agent => {
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredWorkflows = aiWorkflows.filter(workflow => {
    const matchesCategory = selectedCategory === 'all' || workflow.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Viewing agent details
  if (selectedAgent) {
    return <AgentDetailView agent={selectedAgent} onBack={() => setSelectedAgent(null)} />;
  }

  // Viewing workflow details
  if (selectedWorkflow) {
    return <WorkflowDetailView workflow={selectedWorkflow} onBack={() => setSelectedWorkflow(null)} />;
  }

  // Main list view
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Bot className="text-primary-400" size={32} />
                <h1 className="text-4xl font-bold">AI Agents & Workflows</h1>
              </div>
              <p className="text-gray-400 text-lg">
                Pre-built AI assistants and multi-step processes to help with career transition
              </p>
            </div>
            <button onClick={onBack} className="btn-secondary">
              ← Back
            </button>
          </div>

          {/* Intro */}
          <div className="bg-gradient-to-br from-primary-900/30 to-accent-900/30 rounded-xl p-8 border border-primary-700/30 mb-8">
            <h2 className="text-2xl font-bold mb-4">What's the Difference?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="text-primary-400" size={24} />
                  <h3 className="text-xl font-bold">AI Agents</h3>
                </div>
                <p className="text-gray-300 mb-2">
                  Single-purpose AI assistants that help with specific tasks
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Use when you need help with ONE specific thing</li>
                  <li>• Takes 5-20 minutes per use</li>
                  <li>• Examples: Breaking down tasks, writing scripts, analyzing energy patterns</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Workflow className="text-accent-400" size={24} />
                  <h3 className="text-xl font-bold">Workflows</h3>
                </div>
                <p className="text-gray-300 mb-2">
                  Multi-step processes that combine multiple agents and prompts
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Use when you have a BIG project with multiple steps</li>
                  <li>• Takes hours to days (spread out)</li>
                  <li>• Examples: Complete job application process, first day prep, accommodation requests</li>
                </ul>
              </div>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setViewMode('agents')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'agents'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <Bot size={20} />
              <span>Agents ({aiAgents.length})</span>
            </button>
            <button
              onClick={() => setViewMode('workflows')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'workflows'
                  ? 'bg-accent-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <Workflow size={20} />
              <span>Workflows ({aiWorkflows.length})</span>
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder={`Search ${viewMode}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as CategoryFilter)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
              >
                <option value="all">All Categories</option>
                <option value="executive-function">🧠 Executive Function</option>
                <option value="organizing-systems">📅 Organizing Systems</option>
                <option value="sensory-emotional">❤️ Sensory & Emotional</option>
                <option value="masking">🛡️ Masking & Camouflaging</option>
                <option value="communication">💬 Communication</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-gray-500 text-sm mb-4">
            Showing {viewMode === 'agents' ? filteredAgents.length : filteredWorkflows.length} results
          </p>

          {/* Agents Grid */}
          {viewMode === 'agents' && (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredAgents.map(agent => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onClick={() => setSelectedAgent(agent)}
                />
              ))}
            </div>
          )}

          {/* Workflows Grid */}
          {viewMode === 'workflows' && (
            <div className="space-y-4">
              {filteredWorkflows.map(workflow => (
                <WorkflowCard
                  key={workflow.id}
                  workflow={workflow}
                  onClick={() => setSelectedWorkflow(workflow)}
                />
              ))}
            </div>
          )}

          {/* No results */}
          {((viewMode === 'agents' && filteredAgents.length === 0) ||
            (viewMode === 'workflows' && filteredWorkflows.length === 0)) && (
            <div className="text-center py-12">
              <p className="text-gray-500">No {viewMode} found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Agent Card Component
interface AgentCardProps {
  agent: AIAgent;
  onClick: () => void;
}

function AgentCard({ agent, onClick }: AgentCardProps) {
  const colors = categoryColors[agent.category];

  return (
    <button
      onClick={onClick}
      className={`w-full ${colors.bg} border ${colors.border} rounded-xl p-6 text-left hover:border-primary-500 transition-all group`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{agent.emoji}</span>
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
              {agent.name}
            </h3>
            <p className="text-xs text-gray-500">{categoryLabels[agent.category]}</p>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${colors.text} bg-gray-800/50`}>
          {agent.difficulty}
        </span>
      </div>

      <p className="text-gray-300 text-sm mb-4">{agent.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock size={14} />
          <span>{agent.estimatedTime}</span>
        </div>
        <span className="text-primary-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
          View Details
          <ArrowRight size={16} />
        </span>
      </div>
    </button>
  );
}

// Workflow Card Component
interface WorkflowCardProps {
  workflow: AIWorkflow;
  onClick: () => void;
}

function WorkflowCard({ workflow, onClick }: WorkflowCardProps) {
  const colors = categoryColors[workflow.category];

  return (
    <button
      onClick={onClick}
      className={`w-full ${colors.bg} border ${colors.border} rounded-xl p-6 text-left hover:border-accent-500 transition-all group`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{workflow.emoji}</span>
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-accent-400 transition-colors">
              {workflow.name}
            </h3>
            <p className="text-xs text-gray-500">{categoryLabels[workflow.category]}</p>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${colors.text} bg-gray-800/50`}>
          {workflow.difficulty}
        </span>
      </div>

      <p className="text-gray-300 text-sm mb-4">{workflow.description}</p>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Workflow size={14} />
            <span>{workflow.steps.length} steps</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={14} />
            <span>{workflow.totalEstimatedTime}</span>
          </div>
        </div>
        <span className="text-accent-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
          Start Workflow
          <ArrowRight size={16} />
        </span>
      </div>
    </button>
  );
}

// Agent Detail View Component
interface AgentDetailViewProps {
  agent: AIAgent;
  onBack: () => void;
}

function AgentDetailView({ agent, onBack }: AgentDetailViewProps) {
  const colors = categoryColors[agent.category];
  const [copied, setCopied] = useState(false);

  const copySystemPrompt = () => {
    navigator.clipboard.writeText(agent.systemPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <button onClick={onBack} className="btn-secondary mb-6">
            ← Back to Agents
          </button>

          {/* Agent Title */}
          <div className={`${colors.bg} border ${colors.border} rounded-xl p-8 mb-6`}>
            <div className="flex items-start gap-4">
              <span className="text-5xl">{agent.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{agent.name}</h1>
                  <span className={`text-xs px-2 py-1 rounded ${colors.text} bg-gray-800/50`}>
                    {agent.difficulty}
                  </span>
                </div>
                <p className={`text-sm ${colors.text} mb-2`}>{categoryLabels[agent.category]}</p>
                <p className="text-gray-300 text-lg">{agent.longDescription}</p>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-3">
                  <Clock size={16} />
                  <span>{agent.estimatedTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="text-yellow-400" size={24} />
              When to Use This Agent
            </h2>
            <ul className="space-y-2">
              {agent.useCases.map((useCase, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-300">
                  <span className="text-primary-400 flex-shrink-0">→</span>
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* System Prompt */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Agent Instructions (System Prompt)</h2>
              <button
                onClick={copySystemPrompt}
                className={`btn-secondary text-sm ${copied ? 'bg-green-600' : ''}`}
              >
                {copied ? '✓ Copied!' : 'Copy Prompt'}
              </button>
            </div>
            <pre className="bg-gray-900 p-4 rounded-lg text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
              {agent.systemPrompt}
            </pre>
          </div>

          {/* How to Use */}
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-blue-300">How to Use</h2>

            {agent.voicePromptTemplate && (
              <div className="mb-4">
                <h3 className="font-semibold text-white mb-2">🎤 Voice-to-Text Version:</h3>
                <p className="text-gray-300 text-sm bg-gray-800 p-3 rounded-lg">
                  {agent.voicePromptTemplate}
                </p>
              </div>
            )}

            {agent.typedPromptTemplate && (
              <div>
                <h3 className="font-semibold text-white mb-2">⌨️ Typed Version:</h3>
                <pre className="text-gray-300 text-sm bg-gray-800 p-3 rounded-lg whitespace-pre-wrap">
                  {agent.typedPromptTemplate}
                </pre>
              </div>
            )}
          </div>

          {/* Example */}
          {agent.exampleInput && agent.exampleOutput && (
            <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-green-300">Example</h2>

              <div className="mb-4">
                <h3 className="font-semibold text-white mb-2">📥 User Input:</h3>
                <p className="text-gray-300 text-sm bg-gray-800 p-3 rounded-lg">
                  {agent.exampleInput}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">📤 Agent Output:</h3>
                <pre className="text-gray-300 text-sm bg-gray-800 p-3 rounded-lg whitespace-pre-wrap overflow-x-auto">
                  {agent.exampleOutput}
                </pre>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {agent.tags.map((tag, idx) => (
              <span key={idx} className="text-xs px-3 py-1 bg-gray-800 rounded-full text-gray-400">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Workflow Detail View Component
interface WorkflowDetailViewProps {
  workflow: AIWorkflow;
  onBack: () => void;
}

function WorkflowDetailView({ workflow, onBack }: WorkflowDetailViewProps) {
  const colors = categoryColors[workflow.category];

  const energyColors = {
    low: 'text-green-400',
    medium: 'text-yellow-400',
    high: 'text-red-400',
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <button onClick={onBack} className="btn-secondary mb-6">
            ← Back to Workflows
          </button>

          {/* Workflow Title */}
          <div className={`${colors.bg} border ${colors.border} rounded-xl p-8 mb-6`}>
            <div className="flex items-start gap-4">
              <span className="text-5xl">{workflow.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{workflow.name}</h1>
                  <span className={`text-xs px-2 py-1 rounded ${colors.text} bg-gray-800/50`}>
                    {workflow.difficulty}
                  </span>
                </div>
                <p className={`text-sm ${colors.text} mb-2`}>{categoryLabels[workflow.category]}</p>
                <p className="text-gray-300 text-lg mb-3">{workflow.longDescription}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Workflow size={16} />
                    {workflow.steps.length} steps
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {workflow.totalEstimatedTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Prerequisites */}
          {workflow.prerequisites.length > 0 && (
            <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-3 text-yellow-300 flex items-center gap-2">
                <AlertCircle size={24} />
                Before You Start
              </h2>
              <ul className="space-y-2">
                {workflow.prerequisites.map((prereq, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300">
                    <span className="text-yellow-400 flex-shrink-0">✓</span>
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Steps */}
          <div className="space-y-6 mb-6">
            <h2 className="text-2xl font-bold">Workflow Steps</h2>
            {workflow.steps.map((step, idx) => (
              <div key={idx} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center font-bold">
                    {step.stepNumber}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{step.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                      <span className="text-gray-500">
                        <Clock className="inline mr-1" size={14} />
                        {step.estimatedTime}
                      </span>
                      <span className={`${energyColors[step.energyLevel]} flex items-center gap-1`}>
                        <Zap size={14} />
                        {step.energyLevel.charAt(0).toUpperCase() + step.energyLevel.slice(1)} Energy
                      </span>
                      {step.breakAfter && (
                        <span className="text-green-400">☕ Break after this step</span>
                      )}
                    </div>

                    {step.agentToUse && (
                      <div className="bg-primary-900/30 border border-primary-700/30 rounded-lg p-3 mb-3 text-sm">
                        <span className="text-primary-300">🤖 Use Agent: {step.agentToUse}</span>
                      </div>
                    )}

                    {step.promptToUse && (
                      <div className="bg-accent-900/30 border border-accent-700/30 rounded-lg p-3 mb-3 text-sm">
                        <span className="text-accent-300">💡 Use Prompt: {step.promptToUse}</span>
                      </div>
                    )}

                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">Instructions:</h4>
                      <ul className="space-y-2">
                        {step.instructions.map((instruction, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                            <span className="text-primary-400 flex-shrink-0">•</span>
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {step.sensoryConsiderations && (
                      <div className="mt-3 bg-purple-900/20 border border-purple-700/30 rounded-lg p-3 text-sm">
                        <span className="text-purple-300">
                          🎧 Sensory note: {step.sensoryConsiderations}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Success Metrics */}
          <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-3 text-green-300 flex items-center gap-2">
              <CheckCircle2 size={24} />
              How to Know You Succeeded
            </h2>
            <ul className="space-y-2">
              {workflow.successMetrics.map((metric, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-300">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Challenges */}
          {workflow.commonChallenges.length > 0 && (
            <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-red-300">Common Challenges & Solutions</h2>
              <div className="space-y-4">
                {workflow.commonChallenges.map((item, idx) => (
                  <div key={idx} className="bg-gray-800 rounded-lg p-4">
                    <p className="font-semibold text-red-400 mb-2">
                      ⚠️ Challenge: {item.challenge}
                    </p>
                    <p className="text-gray-300 text-sm">
                      💡 Solution: {item.solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {workflow.tags.map((tag, idx) => (
              <span key={idx} className="text-xs px-3 py-1 bg-gray-800 rounded-full text-gray-400">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
