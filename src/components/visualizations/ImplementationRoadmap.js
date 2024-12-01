import React from 'react';
import { Milestone, Flag, Code, Users, Rocket } from 'lucide-react';

export default function ImplementationRoadmap() {
  const phases = [
    {
      phase: "Foundation Phase",
      timeline: "Months 1-3",
      icon: Flag,
      items: [
        "Environment Setup",
        "Initial Research",
        "Architecture Design",
        "Team Assembly"
      ]
    },
    {
      phase: "Development Phase",
      timeline: "Months 4-6",
      icon: Code,
      items: [
        "Core Feature Development",
        "70B Model Integration",
        "Initial Testing",
        "Prototype Launch"
      ]
    },
    {
      phase: "Testing Phase",
      timeline: "Months 7-9",
      icon: Users,
      items: [
        "Beta Testing",
        "Performance Optimization",
        "User Feedback",
        "Feature Refinement"
      ]
    },
    {
      phase: "Launch Phase",
      timeline: "Months 10-12",
      icon: Rocket,
      items: [
        "Final Testing",
        "Documentation",
        "Public Release",
        "Support Setup"
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 style={{color: '#f80f90'}} className="text-2xl font-bold mb-6">Implementation Roadmap</h2>
      
      <div className="space-y-8">
        {phases.map((phase, index) => (
          <div key={index} className="bg-gray-900 p-6 rounded-lg border border-[#00cbff]">
            <div className="flex items-center gap-4 mb-4">
              <phase.icon style={{color: '#f80f90'}} size={24} />
              <h3 style={{color: '#00cbff'}} className="text-xl font-bold">{phase.phase}</h3>
              <span className="text-white ml-auto">{phase.timeline}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {phase.items.map((item, i) => (
                <div key={i} className="flex items-center text-white">
                  <span className="mr-2">•</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
