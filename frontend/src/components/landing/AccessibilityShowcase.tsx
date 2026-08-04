import React from 'react';
import { Volume2, Type, Mic, MessageSquare, Network, CheckSquare } from 'lucide-react';

function AccessibilityFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-earth-200 transition-all hover:scale-[1.02] hover:-translate-y-0.5">
      <div className="text-cyan-500 flex-shrink-0 mt-1">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-earth-500 text-sm">{description}</p>
      </div>
    </div>
  );
}

export function AccessibilityShowcase() {
  return (
    <section id="accessibility" className="container mx-auto px-6 py-20 md:py-24 bg-earth-50 rounded-3xl my-8 scroll-mt-20">
      <h2 className="text-4xl font-bold text-center mb-4">Accessibility First, Always</h2>
      <p className="text-center text-earth-500 mb-12 text-lg max-w-3xl mx-auto">
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
  );
}
