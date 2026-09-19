import React from 'react';
import { AuditLedgerEntry } from '../types/fraud';
import { CheckCircle2, X, ShieldAlert, User, Cpu, Hash, FileCheck } from 'lucide-react';

interface AuditLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: AuditLedgerEntry[];
}

export const AuditLedgerModal: React.FC<AuditLedgerModalProps> = ({
  isOpen,
  onClose,
  entries
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-['JetBrains_Mono']">
                  IMMUTABLE AI DECISION LEDGER
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  TAMPER-EVIDENT
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Cryptographically hashed audit chain meeting RBI Section 35A &amp; PCI-DSS Req 10 compliance.
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

        {/* Audit Entries Table */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 text-[11px] uppercase">
                  <th className="p-3">Timestamp / Ref</th>
                  <th className="p-3">Actor / Model</th>
                  <th className="p-3">Action Executed</th>
                  <th className="p-3">Forensic Rationale</th>
                  <th className="p-3">Evidence Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {entries.map(entry => (
                  <tr key={entry.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-3 whitespace-nowrap">
                      <div className="text-white font-bold">{entry.timestamp}</div>
                      <div className="text-[10px] text-slate-400">{entry.caseId}</div>
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {entry.actorType === 'HUMAN' ? (
                          <User className="w-3.5 h-3.5 text-amber-400" />
                        ) : (
                          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                        )}
                        <span className="text-slate-200 font-semibold">{entry.actor}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">{entry.modelVersion}</div>
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-rose-300 font-bold text-[10px]">
                        {entry.action}
                      </span>
                    </td>

                    <td className="p-3 text-slate-300 font-sans text-xs max-w-xs">
                      {entry.rationale}
                    </td>

                    <td className="p-3 text-slate-400 font-mono text-[10px] whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Hash className="w-3 h-3 text-purple-400" />
                        <span>{entry.evidenceHash.substring(0, 16)}...</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>All model weights, prompt context vectors, and supervisor decisions are sealed into audit logs.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
