import React, { useState } from 'react';
import { FraudPattern } from '../types/fraud';
import { Dna, ShieldAlert, Check, ChevronRight } from 'lucide-react';

interface FraudPatternLibraryCardProps {
  patterns: FraudPattern[];
}

export const FraudPatternLibraryCard: React.FC<FraudPatternLibraryCardProps> = ({ patterns }) => {
  const [selectedPattern, setSelectedPattern] = useState<FraudPattern | null>(patterns[0]);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
            <Dna className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white font-['JetBrains_Mono']">
              DETECTED FRAUD PATTERNS
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">
              Pattern Recognition Library (10 Monitored Vectors)
            </span>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
          Top 3 Matched
        </span>
      </div>

      {/* Pattern Matching List */}
      <div className="space-y-2.5">
        {patterns.slice(0, 5).map(pat => {
          const isSelected = selectedPattern?.id === pat.id;

          return (
            <div
              key={pat.id}
              onClick={() => setSelectedPattern(pat)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-800/90 border-rose-500 ring-1 ring-rose-500/40 shadow-md'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      pat.severity === 'CRITICAL'
                        ? 'bg-rose-500'
                        : pat.severity === 'HIGH'
                        ? 'bg-orange-500'
                        : 'bg-amber-500'
                    }`}
                  ></span>
                  <span className="text-xs font-bold text-slate-200">
                    {pat.name}
                  </span>
                </div>

                <span
                  className={`text-xs font-mono font-bold ${
                    pat.matchScore >= 85
                      ? 'text-rose-400'
                      : pat.matchScore >= 75
                      ? 'text-orange-400'
                      : 'text-amber-400'
                  }`}
                >
                  {pat.matchScore}% Match
                </span>
              </div>

              {/* Match Progress Bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    pat.matchScore >= 85
                      ? 'bg-rose-500'
                      : pat.matchScore >= 75
                      ? 'bg-orange-500'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${pat.matchScore}%` }}
                ></div>
              </div>

              {/* Matched Indicators preview */}
              <div className="mt-2 flex flex-wrap gap-1">
                {pat.matchedSignals.map((sig, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                  >
                    ✓ {sig}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
