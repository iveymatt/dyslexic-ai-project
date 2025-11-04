import { Lightbulb, Eye, CheckCircle, Target } from 'lucide-react';
import type { TeachableMoment } from '../../types/career';

interface TeachableMomentCardProps {
  teachableMoment: TeachableMoment;
}

export function TeachableMomentCard({ teachableMoment }: TeachableMomentCardProps) {
  return (
    <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-2 border-amber-600/50 rounded-xl p-6 mt-8">
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb size={28} className="text-amber-400" />
        <h3 className="text-xl font-bold text-amber-300">💡 Teachable Moment: Real-World Scenario</h3>
      </div>

      {/* Scenario */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            1
          </div>
          <h4 className="font-semibold text-purple-300 text-lg">The Situation</h4>
        </div>
        <p className="text-gray-200 ml-10 italic">
          "{teachableMoment.scenario}"
        </p>
      </div>

      {/* What to Notice */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Eye size={18} className="text-white" />
          </div>
          <h4 className="font-semibold text-blue-300 text-lg">What to Notice</h4>
        </div>
        <p className="text-gray-200 ml-10">
          {teachableMoment.whatToNotice}
        </p>
      </div>

      {/* How to Respond */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <CheckCircle size={18} className="text-white" />
          </div>
          <h4 className="font-semibold text-green-300 text-lg">How to Respond</h4>
        </div>
        <p className="text-gray-200 ml-10">
          {teachableMoment.howToRespond}
        </p>
      </div>

      {/* Why It Matters */}
      <div className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 rounded-lg p-4 border border-pink-600/30">
        <div className="flex items-center gap-2 mb-2">
          <Target size={20} className="text-pink-400" />
          <h4 className="font-semibold text-pink-300">Why This Matters for Your Independence</h4>
        </div>
        <p className="text-gray-200 text-sm">
          {teachableMoment.whyItMatters}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-amber-600/30">
        <p className="text-xs text-amber-200/70 italic">
          💡 Practice this scenario mentally. Imagine yourself in this situation. What would you do? Having a plan BEFORE it happens makes responding easier.
        </p>
      </div>
    </div>
  );
}
