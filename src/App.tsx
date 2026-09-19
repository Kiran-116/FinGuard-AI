import React, { useState } from 'react';
import { 
  PRIMARY_FRAUD_CASE, 
  SUSPICIOUS_MULE_CASE, 
  CLEARED_NORMAL_CASE, 
  ALL_CASES,
  INITIAL_AUDIT_LEDGER, 
  KNOWLEDGE_BASE_DATA, 
  GUARDRAIL_RULES 
} from './data/mockCases';
import { FraudCase, NetworkNode, AuditLedgerEntry } from './types/fraud';

import { Navbar } from './components/Navbar';
import { NetworkGraph } from './components/NetworkGraph';
import { FollowTheMoney } from './components/FollowTheMoney';
import { AgentInvestigationLive } from './components/AgentInvestigationLive';
import { ExplainabilityPanel } from './components/ExplainabilityPanel';
import { DeviceIntelligenceCard } from './components/DeviceIntelligenceCard';
import { ImpossibleTravelCard } from './components/ImpossibleTravelCard';
import { FraudPatternLibraryCard } from './components/FraudPatternLibraryCard';

import { WhatIfSimulator } from './components/WhatIfSimulator';
import { AttackScenariosModal } from './components/AttackScenariosModal';
import { HumanApprovalModal } from './components/HumanApprovalModal';
import { CaseReportModal } from './components/CaseReportModal';
import { GuardrailsModal } from './components/GuardrailsModal';
import { KnowledgeBaseDrawer } from './components/KnowledgeBaseDrawer';
import { AuditLedgerModal } from './components/AuditLedgerModal';
import { AnalystCopilot } from './components/AnalystCopilot';

import { 
  ShieldAlert, 
  AlertTriangle, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Share2, 
  Clock, 
  RefreshCw,
  BellRing
} from 'lucide-react';

export default function App() {
  const [currentCase, setCurrentCase] = useState<FraudCase>(PRIMARY_FRAUD_CASE);
  const [activeTab, setActiveTab] = useState<string>('command');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('tx-1');

  // Modals state
  const [isWhatIfOpen, setIsWhatIfOpen] = useState<boolean>(false);
  const [isScenariosOpen, setIsScenariosOpen] = useState<boolean>(false);
  const [isHumanApprovalOpen, setIsHumanApprovalOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isGuardrailsOpen, setIsGuardrailsOpen] = useState<boolean>(false);
  const [isKnowledgeBaseOpen, setIsKnowledgeBaseOpen] = useState<boolean>(false);
  const [isAuditLedgerOpen, setIsAuditLedgerOpen] = useState<boolean>(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);

  // Action status toast
  const [notification, setNotification] = useState<string | null>(null);
  const [auditLedger, setAuditLedger] = useState<AuditLedgerEntry[]>(INITIAL_AUDIT_LEDGER);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleSelectCase = (caseId: string) => {
    const found = ALL_CASES.find(c => c.id === caseId);
    if (found) {
      setCurrentCase(found);
      showNotification(`Switched to Case ${found.id} (${found.title})`);
    }
  };

  const handleApplySimulation = (newRiskScore: number) => {
    setCurrentCase(prev => ({
      ...prev,
      transaction: {
        ...prev.transaction,
        riskScore: newRiskScore,
        riskLevel: newRiskScore >= 80 ? 'CRITICAL' : newRiskScore >= 60 ? 'HIGH' : 'MEDIUM'
      }
    }));
    showNotification(`Simulation Applied: Risk Score recalibrated to ${newRiskScore}/100`);
  };

  const handleSelectScenario = (scenarioId: string) => {
    if (scenarioId === 'SCENARIO_ATO' || scenarioId === 'SCENARIO_TRAVEL' || scenarioId === 'SCENARIO_RING') {
      setCurrentCase(PRIMARY_FRAUD_CASE);
    } else if (scenarioId === 'SCENARIO_MULE') {
      setCurrentCase(SUSPICIOUS_MULE_CASE);
    }
    showNotification(`Attack Scenario loaded into ingress queue: Multi-agent swarm engaged.`);
    setActiveTab('command');
  };

  const handleConfirmAction = (actionType: string, notes: string) => {
    const newEntry: AuditLedgerEntry = {
      id: `AL-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      caseId: currentCase.id,
      actor: 'Sr. Fraud Analyst (Badge #8402)',
      actorType: 'HUMAN',
      action: actionType,
      modelVersion: 'FinGuard-Core-v4.2 + Bedrock-Anthropic-Claude',
      evidenceHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 8)}`,
      rationale: notes,
      status: 'EXECUTED'
    };

    setAuditLedger(prev => [newEntry, ...prev]);

    // Update case status
    setCurrentCase(prev => ({
      ...prev,
      transaction: {
        ...prev.transaction,
        status: actionType === 'CLEAR_TRANSACTION' ? 'CLEARED' : 'HELD'
      }
    }));

    showNotification(`Action Authorized: ${actionType.replace('_', ' ')} executed and recorded in tamper-evident ledger.`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-16 right-6 z-50 animate-in slide-in-from-top-3 duration-200">
          <div className="bg-slate-900 border border-rose-500/50 text-white px-4 py-3 rounded-xl shadow-2xl shadow-rose-950 flex items-center gap-3 text-xs font-mono">
            <BellRing className="w-4 h-4 text-rose-400 animate-bounce" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenWhatIf={() => setIsWhatIfOpen(true)}
        onOpenScenarios={() => setIsScenariosOpen(true)}
        onOpenGuardrails={() => setIsGuardrailsOpen(true)}
        onOpenKnowledgeBase={() => setIsKnowledgeBaseOpen(true)}
        onOpenAuditLedger={() => setIsAuditLedgerOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        isCopilotOpen={isCopilotOpen}
        setIsCopilotOpen={setIsCopilotOpen}
        activeCaseId={currentCase.id}
        riskScore={currentCase.transaction.riskScore}
      />

      {/* Case Header Strip */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">ACTIVE INCIDENT:</span>
              <span className="text-sm font-bold font-mono text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {currentCase.id}
              </span>
            </div>

            <span className="text-xs text-slate-300 font-semibold">
              {currentCase.title}
            </span>

            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                {currentCase.transaction.riskScore}/100 {currentCase.transaction.riskLevel}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-300">{currentCase.transaction.formattedAmount}</span>
              <span className="text-slate-400">•</span>
              <span className="text-amber-400">{currentCase.transaction.status}</span>
            </div>
          </div>

          {/* Quick Case Switcher Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline font-mono">Load Preset Case:</span>
            <select
              value={currentCase.id}
              onChange={e => handleSelectCase(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs font-mono rounded-lg px-2.5 py-1.5 text-slate-300 focus:outline-none focus:border-rose-500 cursor-pointer"
            >
              <option value="FG-84721">Case #84721: Account Takeover &amp; Crypto Gateway (Critical)</option>
              <option value="FG-84722">Case #84722: Smurfing Mule Ring Structuring (High)</option>
              <option value="FG-84723">Case #84723: Clean Baseline Salary Disbursal (Normal)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Tab Views */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Tab 1: Command Center */}
        {activeTab === 'command' && (
          <div className="space-y-6">
            {/* The Killer Feature: Autonomous Investigation Stepper */}
            <AgentInvestigationLive
              transaction={currentCase.transaction}
              steps={currentCase.investigationSteps}
              onCompleteInvestigation={() => {
                showNotification('Autonomous Multi-Agent Investigation Complete. High-Confidence Evidence Established.');
              }}
              onRequestAction={actionType => {
                setIsHumanApprovalOpen(true);
              }}
            />

            {/* Middle Grid: Explainability & Forensics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Why 92? & AI Confidence vs Evidence */}
              <div className="lg:col-span-7">
                <ExplainabilityPanel transaction={currentCase.transaction} />
              </div>

              {/* Right Column: Impossible Travel & Device Intel DEV-8472 */}
              <div className="lg:col-span-5 space-y-6">
                <ImpossibleTravelCard location={currentCase.location} />
                <DeviceIntelligenceCard device={currentCase.device} />
              </div>
            </div>

            {/* Bottom Row: Detected Fraud Patterns & Follow-the-Money Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6">
                <FraudPatternLibraryCard patterns={currentCase.fraudPatterns} />
              </div>

              <div className="lg:col-span-6 bg-slate-900 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                        <Layers className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-white font-['JetBrains_Mono']">
                        FOLLOW THE MONEY — QUICK GLANCE
                      </h4>
                    </div>
                    <button
                      onClick={() => setActiveTab('money')}
                      className="text-xs text-rose-400 hover:text-rose-300 font-mono flex items-center gap-1"
                    >
                      Full Interactive Trace →
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 mb-4">
                    Reconstructed 4-hop disbursement path starting from Customer Account A to high-risk merchant Apex Global Assets Ltd.
                  </p>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Hop 1: Account A → Account B</span>
                      <span className="text-rose-400 font-bold">₹5,00,000</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>Hop 2: Account B → Account C</span>
                      <span>₹4,80,000 (-4% fee)</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>Hop 3: Account C → Account D</span>
                      <span>₹4,50,000 (-6.25% fee)</span>
                    </div>
                    <div className="flex items-center justify-between text-amber-300 text-[11px] font-bold">
                      <span>Hop 4: Account D → Merchant X</span>
                      <span>₹4,32,000 (Crypto Gateway)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-rose-400 font-semibold text-[11px]">
                    ⚠ Potential fund-layering &amp; mule funnel pattern detected
                  </span>
                  <button
                    onClick={() => setIsHumanApprovalOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/30"
                  >
                    Action Center
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Full Entity Relationship Graph */}
        {activeTab === 'graph' && (
          <NetworkGraph
            nodes={currentCase.networkNodes}
            edges={currentCase.networkEdges}
            selectedNodeId={selectedNodeId}
            onSelectNode={node => setSelectedNodeId(node.id)}
          />
        )}

        {/* Tab 3: Full Follow The Money */}
        {activeTab === 'money' && (
          <FollowTheMoney
            moneyTrace={currentCase.moneyTrace}
            onRequestAction={() => setIsHumanApprovalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-4 py-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">FinGuard AI Platform</span>
            <span>•</span>
            <span>Autonomous Financial Fraud Investigation Engine</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Bedrock Multi-Agent Architecture</span>
            <span>•</span>
            <span className="text-emerald-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Supervisory Auditable
            </span>
          </div>
        </div>
      </footer>

      {/* Modals and Drawers */}
      <WhatIfSimulator
        isOpen={isWhatIfOpen}
        onClose={() => setIsWhatIfOpen(false)}
        onApplyScenario={handleApplySimulation}
      />

      <AttackScenariosModal
        isOpen={isScenariosOpen}
        onClose={() => setIsScenariosOpen(false)}
        onSelectScenario={handleSelectScenario}
      />

      <HumanApprovalModal
        isOpen={isHumanApprovalOpen}
        onClose={() => setIsHumanApprovalOpen(false)}
        transaction={currentCase.transaction}
        onConfirmAction={handleConfirmAction}
      />

      <CaseReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        transaction={currentCase.transaction}
      />

      <GuardrailsModal
        isOpen={isGuardrailsOpen}
        onClose={() => setIsGuardrailsOpen(false)}
        guardrails={GUARDRAIL_RULES}
      />

      <KnowledgeBaseDrawer
        isOpen={isKnowledgeBaseOpen}
        onClose={() => setIsKnowledgeBaseOpen(false)}
        items={KNOWLEDGE_BASE_DATA}
      />

      <AuditLedgerModal
        isOpen={isAuditLedgerOpen}
        onClose={() => setIsAuditLedgerOpen(false)}
        entries={auditLedger}
      />

      <AnalystCopilot
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        transaction={currentCase.transaction}
      />
    </div>
  );
}
