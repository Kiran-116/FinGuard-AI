import React, { useState, useEffect } from 'react';
import { AgentStep, Transaction } from '../types/fraud';
import { 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  Bot, 
  ShieldAlert, 
  Sparkles, 
  Activity, 
  ChevronRight, 
  Check, 
  Clock, 
  AlertCircle,
  Lock,
  Cpu
} from 'lucide-react';

interface AgentInvestigationLiveProps {
  transaction: Transaction;
  steps: AgentStep[];
  onCompleteInvestigation: () => void;
  onRequestAction: (actionType: string) => void;
}

export const AgentInvestigationLive: React.FC<AgentInvestigationLiveProps> = ({
  transaction,
  steps,
  onCompleteInvestigation,
  onRequestAction
}) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(steps.length); // initially finished or can be re-run
  const [activeTab, setActiveTab] = useState<'stepper' | 'terminal'>('stepper');
  const [speedMs, setSpeedMs] = useState<number>(300);

  const startAutonomousInvestigation = () => {
    setIsRunning(true);
    setActiveStepIndex(0);
  };

  useEffect(() => {
    if (!isRunning) return;

    if (activeStepIndex < steps.length) {
      const timer = setTimeout(() => {
        setActiveStepIndex(prev => prev + 1);
      }, speedMs);
      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
      onCompleteInvestigation();
    }
  }, [isRunning, activeStepIndex, steps.length, speedMs, onCompleteInvestigation]);

  const getAgentBadgeColor = (agent: string) => {
    switch (agent) {
      case 'Supervisor': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Transaction Agent': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Identity Agent': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'Network Agent': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'Behavior Agent': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Risk Analyst': return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'Action Agent': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
      {/* Top Killer Feature Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
              <Bot className="w-5 h-5" />
            </span>
            <h3 className="text-base font-bold text-white font-['JetBrains_Mono']">
              AUTONOMOUS INVESTIGATION ENGINE
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Multi-Agent Swarm
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Traverses Transaction → Customer → Device → IP → Merchant → Connected Accounts → Follow The Money.
          </p>
        </div>

        {/* Primary Launch Button */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            id="btn-investigate-this"
            disabled={isRunning}
            onClick={startAutonomousInvestigation}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-bold text-xs tracking-wide shadow-xl flex items-center justify-center gap-2 transition-all ${
              isRunning
                ? 'bg-amber-600 text-white cursor-wait animate-pulse'
                : 'bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-[1.02]'
            }`}
          >
            {isRunning ? (
              <>
                <Cpu className="w-4 h-4 animate-spin" />
                <span>AGENTS INVESTIGATING LIVE ({activeStepIndex + 1}/10)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>🔍 INVESTIGATE THIS TRANSACTION</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setActiveStepIndex(steps.length);
              setIsRunning(false);
            }}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Reset to Dossier View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress & Speed Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-3">
          <span className="font-mono text-slate-400">
            Progress:{' '}
            <strong className="text-white">
              {Math.min(activeStepIndex, 10)} / 10 Steps Complete
            </strong>
          </span>
          <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden hidden sm:block">
            <div
              className="bg-gradient-to-r from-rose-500 to-amber-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${(Math.min(activeStepIndex, 10) / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400">Execution Cadence:</span>
          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 font-mono text-[11px]">
            <button
              onClick={() => setSpeedMs(500)}
              className={`px-2 py-0.5 rounded ${speedMs === 500 ? 'bg-slate-700 text-white font-bold' : 'text-slate-400'}`}
            >
              Demo (0.5s)
            </button>
            <button
              onClick={() => setSpeedMs(200)}
              className={`px-2 py-0.5 rounded ${speedMs === 200 ? 'bg-slate-700 text-white font-bold' : 'text-slate-400'}`}
            >
              Fast (0.2s)
            </button>
          </div>
        </div>
      </div>

      {/* 10-Step Visual Flow Stepper */}
      <div className="space-y-3">
        {steps.map((step, idx) => {
          const isDone = idx < activeStepIndex;
          const isCurrent = idx === activeStepIndex && isRunning;
          const isPending = idx > activeStepIndex;

          return (
            <div
              key={step.stepNumber}
              className={`p-3.5 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-slate-800/90 border-amber-500 ring-2 ring-amber-500/30 shadow-lg'
                  : isDone
                  ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/30 border-slate-900 opacity-40'
              }`}
            >
              <div className="flex items-start sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  {/* Step Status Icon */}
                  <div className="mt-0.5 sm:mt-0">
                    {isDone ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center animate-spin">
                        <Activity className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-500 border border-slate-700 flex items-center justify-center text-xs font-mono">
                        {step.stepNumber}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getAgentBadgeColor(step.agentName)}`}>
                        {step.agentName}
                      </span>
                      <h4 className="text-xs font-bold text-white">
                        {step.actionTitle}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      {step.logDetail}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-slate-400 block">
                    {step.latencyMs}ms
                  </span>
                  {isDone && (
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                      VERIFIED
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-[10px] font-mono text-amber-400 font-semibold animate-pulse">
                      EXECUTING
                    </span>
                  )}
                </div>
              </div>

              {/* Verified Finding Badge */}
              {isDone && (
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-rose-300 bg-rose-950/20 px-2.5 py-1 rounded-lg">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="font-mono text-[11px] font-semibold">{step.findings}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Post-Investigation Action Trigger */}
      {activeStepIndex >= steps.length && (
        <div className="p-4 bg-gradient-to-r from-rose-950/40 to-slate-900 rounded-xl border border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">
                Autonomous Investigation Concluded (385ms)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Action Agent recommends <strong>HOLD_TRANSACTION</strong>. Human Authorization is required by FinGuard Guardrails.
            </p>
          </div>

          <button
            onClick={() => onRequestAction('HOLD_TRANSACTION')}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 flex items-center gap-1.5 transition-all"
          >
            <Lock className="w-3.5 h-3.5" />
            Authorize Hold in Action Center
          </button>
        </div>
      )}
    </div>
  );
};
