import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  SlidersHorizontal, 
  FlaskConical, 
  ShieldCheck, 
  BookOpen, 
  FileText, 
  MessageSquareCode,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenWhatIf: () => void;
  onOpenScenarios: () => void;
  onOpenGuardrails: () => void;
  onOpenKnowledgeBase: () => void;
  onOpenAuditLedger: () => void;
  onOpenReport: () => void;
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  activeCaseId: string;
  riskScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenWhatIf,
  onOpenScenarios,
  onOpenGuardrails,
  onOpenKnowledgeBase,
  onOpenAuditLedger,
  onOpenReport,
  isCopilotOpen,
  setIsCopilotOpen,
  activeCaseId,
  riskScore
}) => {
  return (
    <header className="bg-slate-900/90 border-b border-slate-800 backdrop-blur sticky top-0 z-30 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-rose-500 to-amber-500 p-0.5 shadow-lg shadow-rose-500/20">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white font-['JetBrains_Mono']">
                  FINGUARD<span className="text-rose-500">.AI</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                  LIVE AGENT
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                From suspicious transaction to complete investigation — autonomously.
              </p>
            </div>
          </div>

          {/* Mobile Case Pill */}
          <div className="md:hidden flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
            <span className="text-xs font-mono text-slate-300">{activeCaseId}</span>
            <span className="text-xs font-bold text-rose-400 font-mono">{riskScore}/100</span>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs font-medium w-full md:w-auto overflow-x-auto">
          <button
            id="nav-tab-command"
            onClick={() => setActiveTab('command')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'command'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            Command Center
          </button>

          <button
            id="nav-tab-graph"
            onClick={() => setActiveTab('graph')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'graph'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <span className="text-sm">🕸️</span>
            Network Graph
          </button>

          <button
            id="nav-tab-money"
            onClick={() => setActiveTab('money')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'money'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <span className="text-sm">💸</span>
            Follow The Money
          </button>
        </div>

        {/* Right Tools & Modals */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end overflow-x-auto">
          <button
            id="btn-what-if"
            onClick={onOpenWhatIf}
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-200 border border-indigo-700/50 transition-colors whitespace-nowrap"
            title="Interactive What-If Fraud Parameter Simulator"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
            What-If?
          </button>

          <button
            id="btn-scenarios"
            onClick={onOpenScenarios}
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 text-amber-200 border border-amber-700/50 transition-colors whitespace-nowrap"
            title="1-Click Attack Scenarios"
          >
            <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
            Scenarios
          </button>

          <button
            id="btn-report"
            onClick={onOpenReport}
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-200 border border-rose-700/50 transition-colors whitespace-nowrap"
            title="Generate & Export Case Investigation Report"
          >
            <FileText className="w-3.5 h-3.5 text-rose-400" />
            Report
          </button>

          <button
            id="btn-guardrails"
            onClick={onOpenGuardrails}
            className="hidden lg:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors whitespace-nowrap"
            title="AI Guardrails & Operational Boundaries"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Guardrails
          </button>

          <button
            id="btn-kb"
            onClick={onOpenKnowledgeBase}
            className="hidden xl:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors whitespace-nowrap"
            title="Fraud Knowledge Base & AML Policies"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            Policies
          </button>

          <button
            id="btn-audit"
            onClick={onOpenAuditLedger}
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors whitespace-nowrap"
            title="Immutable AI Decision Ledger"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            Ledger
          </button>

          <button
            id="btn-copilot"
            onClick={() => setIsCopilotOpen(!isCopilotOpen)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              isCopilotOpen 
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' 
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <MessageSquareCode className="w-3.5 h-3.5" />
            Copilot
          </button>
        </div>
      </div>
    </header>
  );
};
