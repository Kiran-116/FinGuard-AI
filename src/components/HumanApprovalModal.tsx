import React, { useState } from 'react';
import { Transaction } from '../types/fraud';
import { 
  ShieldCheck, 
  X, 
  Lock, 
  UserX, 
  KeyRound, 
  FileWarning, 
  CheckCircle2, 
  AlertOctagon,
  HelpCircle,
  FileText
} from 'lucide-react';

interface HumanApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
  defaultAction?: string;
  onConfirmAction: (actionType: string, notes: string) => void;
}

export const HumanApprovalModal: React.FC<HumanApprovalModalProps> = ({
  isOpen,
  onClose,
  transaction,
  defaultAction = 'HOLD_TRANSACTION',
  onConfirmAction
}) => {
  const [selectedAction, setSelectedAction] = useState<string>(defaultAction);
  const [analystNotes, setAnalystNotes] = useState<string>(
    'Holding transaction FG-84721 based on autonomous multi-agent findings: 18.4x baseline volume anomaly, unverified headless device DEV-8472, impossible travel telemetry, and 4-hop mule funnel layering.'
  );

  if (!isOpen) return null;

  const actionOptions = [
    {
      id: 'HOLD_TRANSACTION',
      title: 'Hold Outbound Transaction',
      badge: 'RECOMMENDED BY AI',
      desc: 'Temporarily pause funds at the clearing switch (Rule SEC-804). Protects ₹4,82,000 from leaving bank perimeter.',
      icon: <Lock className="w-4 h-4 text-rose-400" />,
      severity: 'HIGH'
    },
    {
      id: 'STEP_UP_VERIFICATION',
      title: 'Request Biometric Step-Up Challenge',
      badge: 'STEP-UP',
      desc: 'Send cryptographic push-notification with live liveness facial biometric verification to genuine customer mobile.',
      icon: <KeyRound className="w-4 h-4 text-amber-400" />,
      severity: 'MEDIUM'
    },
    {
      id: 'FREEZE_ACCOUNT',
      title: 'Debit Freeze Customer & Linked Device Ring',
      badge: 'CONSEQUENTIAL',
      desc: 'Immediate debit freeze on Account A and blacklist device footprint DEV-8472 across all 7 connected identities.',
      icon: <UserX className="w-4 h-4 text-rose-500" />,
      severity: 'CRITICAL'
    },
    {
      id: 'ESCALATE_SAR',
      title: 'File Suspicious Activity Report (SAR / STR)',
      badge: 'COMPLIANCE',
      desc: 'Autonomously generate and transmit regulatory STR packet to FIU-IND / FinCEN under Section 12 PMLA.',
      icon: <FileWarning className="w-4 h-4 text-purple-400" />,
      severity: 'CRITICAL'
    },
    {
      id: 'CLEAR_TRANSACTION',
      title: 'Clear Transaction (False Positive)',
      badge: 'OVERRIDE',
      desc: 'Override AI Risk Score. Authorize immediate release of funds to Apex Global Assets.',
      icon: <CheckCircle2 className="w-4 h-4 text-slate-400" />,
      severity: 'LOW'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-['JetBrains_Mono']">
                  CONSEQUENTIAL ACTION CONFIRMATION
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                  HUMAN-IN-THE-LOOP
                </span>
              </div>
              <p className="text-xs text-slate-400">
                AWS Bedrock Agentic Action Gate: Potentially disruptive financial operations require explicit analyst approval.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Target Transaction Context Box */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Subject Transaction</span>
              <span className="text-white font-bold text-sm">{transaction.id}</span>
              <span className="text-slate-400 ml-2">({transaction.customerName})</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Amount</span>
              <span className="text-rose-400 font-bold text-sm">{transaction.formattedAmount}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Risk Score</span>
              <span className="text-rose-400 font-bold text-sm">{transaction.riskScore}/100 (CRITICAL)</span>
            </div>
          </div>

          {/* Action Choice Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono uppercase text-slate-400 block">
              Select Operational Intervention:
            </label>
            <div className="space-y-2">
              {actionOptions.map(opt => (
                <div
                  key={opt.id}
                  onClick={() => setSelectedAction(opt.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedAction === opt.id
                      ? 'bg-slate-800/90 border-rose-500 ring-1 ring-rose-500/50 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                        {opt.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            {opt.title}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-semibold">
                            {opt.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {opt.desc}
                        </p>
                      </div>
                    </div>

                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedAction === opt.id
                        ? 'border-rose-500 bg-rose-500 text-white'
                        : 'border-slate-700 bg-slate-900'
                    }`}>
                      {selectedAction === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Analyst Sign-Off Rationale */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-400 block">
              Analyst Justification &amp; Audit Log Notes (Mandatory for Compliance):
            </label>
            <textarea
              rows={3}
              value={analystNotes}
              onChange={e => setAnalystNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-rose-500"
              placeholder="Enter supervisory rationale..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirmAction(selectedAction, analystNotes);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 flex items-center gap-1.5 transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            Sign Off &amp; Authorize Action
          </button>
        </div>
      </div>
    </div>
  );
};
