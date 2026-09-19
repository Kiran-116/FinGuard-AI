import React from 'react';
import { Transaction } from '../types/fraud';
import { 
  FileText, 
  X, 
  Download, 
  Printer, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  Building2, 
  CheckCircle2,
  Lock
} from 'lucide-react';

interface CaseReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
}

export const CaseReportModal: React.FC<CaseReportModalProps> = ({
  isOpen,
  onClose,
  transaction
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with Print & Export */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-rose-400" />
            <span className="font-bold text-sm text-white font-['JetBrains_Mono']">
              CASE DOSSIER #{transaction.id} — AUDIT REPORT
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document */}
        <div id="printable-case-report" className="p-8 overflow-y-auto space-y-6 bg-slate-950 text-slate-200 font-sans">
          {/* Formal Letterhead */}
          <div className="border-b border-slate-800 pb-5 flex items-start justify-between">
            <div>
              <div className="text-xl font-bold font-['JetBrains_Mono'] text-white flex items-center gap-2">
                <span>FINGUARD FINANCIAL INTELLIGENCE</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 font-mono">
                  CONFIDENTIAL
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Autonomous Financial Fraud Investigation &amp; Decision Dossier
              </p>
              <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                FIU-IND Compliance Reference: STR-2026-FG-84721
              </div>
            </div>

            <div className="text-right font-mono text-xs">
              <div className="text-slate-400">Date of Incident:</div>
              <div className="text-white font-bold">{transaction.timestamp}</div>
              <div className="text-rose-400 font-bold mt-1 text-sm">
                Risk Rating: {transaction.riskScore} / 100 ({transaction.riskLevel})
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
              1. Executive Summary
            </h4>
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              Transaction <strong>#{transaction.id}</strong> in the amount of{' '}
              <strong>{transaction.formattedAmount}</strong> initiated by Customer{' '}
              <strong>{transaction.customerName} ({transaction.customerId})</strong> was identified
              as critical risk due to extreme volume deviation (18.4× 90-day average), zero-day headless hardware registration, impossible geographic jump (Bangalore to London in 16 min), and multi-hop fund layering targeting offshore digital asset gateway Apex Global Assets Ltd.
            </div>
          </div>

          {/* Key Evidentiary Findings */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
              2. Evidentiary Findings Matrix
            </h4>
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <span className="font-mono text-rose-400 font-bold shrink-0">E-01:</span>
                <span>
                  <strong>Transaction Anomaly:</strong> Amount of ₹4,82,000 exceeds customer's historical 90-day moving average of ₹26,200 by 18.4× with zero prior wires over ₹50,000.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono text-rose-400 font-bold shrink-0">E-02:</span>
                <span>
                  <strong>Device Multiplexing:</strong> Hardware fingerprint DEV-8472 is shared with 4 other accounts that executed structuring transactions within the prior 24 hours.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono text-rose-400 font-bold shrink-0">E-03:</span>
                <span>
                  <strong>Aerodynamic Telemetry:</strong> Physical displacement of 8,024 km in 16 minutes requires 30,090 km/h flight speed, proving session token hijack or datacenter proxy egress.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono text-rose-400 font-bold shrink-0">E-04:</span>
                <span>
                  <strong>Fund Layering Chain:</strong> Traced 4-hop dispersion flow (Account A → B → C → D → Merchant X) with dwell time under 5 minutes per hop and 4% mule commission dissipation.
                </span>
              </div>
            </div>
          </div>

          {/* Chronological Incident Timeline */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
              3. Chronological Forensic Timeline
            </h4>
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 font-mono text-xs divide-y divide-slate-800">
              <div className="py-2 flex items-center justify-between">
                <span className="text-slate-400">10:21:04 AM</span>
                <span className="text-slate-200">Customer authenticated on verified mobile in Bangalore, India (IP: 49.207.182.41)</span>
                <span className="text-emerald-400 text-[10px]">AUTH_OK</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="text-slate-400">10:39:18 AM</span>
                <span className="text-rose-400">Unrecognized hardware DEV-8472 registered session via London proxy (IP: 103.241.12.88)</span>
                <span className="text-rose-400 text-[10px]">NEW_DEV</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="text-slate-400">10:43:50 AM</span>
                <span className="text-amber-300">3 consecutive 2FA OTP submission failures recorded in 90 seconds</span>
                <span className="text-amber-400 text-[10px]">FAIL_AUTH</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="text-slate-400">10:47:12 AM</span>
                <span className="text-white font-bold">Transaction FG-84721 executed for ₹4,82,000 to Apex Global Assets</span>
                <span className="text-rose-400 text-[10px]">TRIGGER_FLAG</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="text-slate-400">10:47:12.385 AM</span>
                <span className="text-emerald-400 font-semibold">Autonomous multi-agent swarm completed investigation in 385ms</span>
                <span className="text-indigo-400 text-[10px]">AI_RESOLVED</span>
              </div>
            </div>
          </div>

          {/* Recommended Operational Actions */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
              4. Recommended Remediations
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-rose-950/30 border border-rose-500/30 rounded-xl">
                <div className="font-bold text-rose-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-rose-400" />
                  Hold Transaction
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-sans">
                  Immediate 24-hour clearing hold under RBI Circular SEC-804.
                </div>
              </div>
              <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  Biometric Step-Up
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-sans">
                  Challenge customer with verified out-of-band facial presence.
                </div>
              </div>
              <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-xl">
                <div className="font-bold text-purple-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-purple-400" />
                  Syndicate Freeze
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-sans">
                  Freeze 4 linked accounts sharing canvas DEV-8472.
                </div>
              </div>
            </div>
          </div>

          {/* Cryptographic Ledger Block Stamp */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <div>
              <span className="text-[10px] uppercase text-slate-500 block">AI Decision Hash</span>
              <span className="text-slate-300">0x7f4e91a0c4982a4f...991ebc320d</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase text-slate-500 block">Investigating System</span>
              <span className="text-emerald-400 font-bold">FinGuard AI Engine v4.2</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono">
            Auditable under PCI-DSS Req 10 &amp; PMLA Section 12
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
