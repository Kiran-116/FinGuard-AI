import React, { useState } from 'react';
import { Transaction } from '../types/fraud';
import { 
  HelpCircle, 
  Brain, 
  CheckCircle2, 
  TrendingUp, 
  Smartphone, 
  Plane, 
  Activity, 
  Globe, 
  Share2, 
  AlertTriangle,
  FileText
} from 'lucide-react';

interface ExplainabilityPanelProps {
  transaction: Transaction;
}

export const ExplainabilityPanel: React.FC<ExplainabilityPanelProps> = ({ transaction }) => {
  const [explanationMode, setExplanationMode] = useState<'analyst' | 'executive'>('analyst');

  const getCategoryIcon = (category: string) => {
    if (category.includes('Transaction') || category.includes('Velocity')) return <TrendingUp className="w-3.5 h-3.5 text-rose-400" />;
    if (category.includes('Device')) return <Smartphone className="w-3.5 h-3.5 text-cyan-400" />;
    if (category.includes('Travel')) return <Plane className="w-3.5 h-3.5 text-amber-400" />;
    if (category.includes('IP') || category.includes('Geo')) return <Globe className="w-3.5 h-3.5 text-indigo-400" />;
    if (category.includes('Syndicate') || category.includes('Linked')) return <Share2 className="w-3.5 h-3.5 text-purple-400" />;
    return <Activity className="w-3.5 h-3.5 text-emerald-400" />;
  };

  const totalPoints = transaction.breakdown.reduce((acc, curr) => acc + curr.points, 0);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-['JetBrains_Mono']">
              EXPLAINABLE FRAUD SCORING &amp; CONFIDENCE
            </h3>
            <p className="text-xs text-slate-400">
              Additive contribution breakdown and grounded forensic reasoning.
            </p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setExplanationMode('analyst')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              explanationMode === 'analyst'
                ? 'bg-slate-800 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Analyst Explanation
          </button>
          <button
            onClick={() => setExplanationMode('executive')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              explanationMode === 'executive'
                ? 'bg-slate-800 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Executive Brief
          </button>
        </div>
      </div>

      {/* Feature 16: AI Confidence vs Evidence Strength */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Metric 1: AI Confidence */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              AI MODEL CONFIDENCE
            </div>
            <div className="text-2xl font-bold font-mono text-white mt-0.5">
              {transaction.confidenceScore}% <span className="text-xs font-normal text-slate-400">Certainty</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Multi-agent agreement rate across 5 specialized evaluators.
            </div>
          </div>
          <div className="h-12 w-12 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 flex items-center justify-center font-mono font-bold text-xs text-indigo-400">
            {transaction.confidenceScore}%
          </div>
        </div>

        {/* Metric 2: Evidence Strength */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              EVIDENCE STRENGTH
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-0.5">
              {transaction.evidenceStrength}{' '}
              <span className="text-xs font-normal text-slate-400 font-mono">
                ({transaction.verifiedSignalsCount} of {transaction.totalSignalsEvaluated} verified)
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {transaction.missingInfoCount} signal pending external telecom carrier HLR lookup.
            </div>
          </div>
          <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Feature 15: Additive Point Contribution Matrix */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono font-bold uppercase tracking-wider text-slate-300">
            WHY RISK SCORE IS {transaction.riskScore}?
          </span>
          <span className="font-mono text-slate-400">
            Sum of Signals: <strong className="text-rose-400">+{totalPoints} pts</strong>
          </span>
        </div>

        <div className="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800/80">
          {transaction.breakdown.map((item, idx) => (
            <div key={idx} className="p-3 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                  {getCategoryIcon(item.category)}
                </div>
                <div>
                  <div className="font-semibold text-slate-200">
                    {item.category}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {item.description}
                  </div>
                </div>
              </div>

              <div className="text-right font-mono font-bold text-rose-400 shrink-0 text-sm">
                +{item.points}
              </div>
            </div>
          ))}

          {/* Total Sum Row */}
          <div className="p-3 bg-slate-900/60 flex items-center justify-between font-mono text-xs">
            <span className="font-bold text-white uppercase">Calibrated Final Risk Score</span>
            <span className="text-base font-bold text-rose-400">
              {transaction.riskScore} / 100
            </span>
          </div>
        </div>
      </div>

      {/* Natural Language Explanation */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
          <FileText className="w-3.5 h-3.5" />
          {explanationMode === 'analyst'
            ? "Explain Like I'm an Analyst"
            : 'Executive Compliance Summary'}
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          {explanationMode === 'analyst'
            ? transaction.analystExplanation
            : transaction.executiveExplanation}
        </p>
      </div>
    </div>
  );
};
