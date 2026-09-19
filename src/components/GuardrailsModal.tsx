import React from 'react';
import { ShieldCheck, X, Check, AlertOctagon, CheckCircle2, ShieldAlert } from 'lucide-react';
import { GuardrailRule } from '../types/fraud';

interface GuardrailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  guardrails: GuardrailRule[];
}

export const GuardrailsModal: React.FC<GuardrailsModalProps> = ({
  isOpen,
  onClose,
  guardrails
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['JetBrains_Mono']">
                AI OPERATIONAL GUARDRAILS
              </h3>
              <p className="text-xs text-slate-400">
                Boundaries defining autonomous agent permissions vs. mandatory human-in-the-loop authorizations.
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

        {/* Guardrail Rules Split Matrix */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Can vs Cannot Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* What AI CAN do */}
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 font-mono">
                <CheckCircle2 className="w-4 h-4" />
                WHAT AI CAN EXECUTE AUTONOMOUSLY
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Traverse internal entity relationship graphs &amp; device databases.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Request frictionless biometric step-up challenges for medium risk (&lt;60).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Apply temporary 2-minute latency delay to suspicious clearing requests.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Draft regulatory SAR / STR case files for supervisory review.</span>
                </li>
              </ul>
            </div>

            {/* What AI CANNOT do */}
            <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 font-mono">
                <AlertOctagon className="w-4 h-4" />
                STRICTLY PROHIBITED WITHOUT HUMAN SIGN-OFF
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>Permanently seizing or confiscating customer account balances.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>Debiting punitive dispute fees or reversal chargebacks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>Transmitting final STR reports to law enforcement without analyst sign-off.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>Overriding customer whitelist without multi-supervisor quorum.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Active Policies Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Configured Enterprise Guardrail Policies
            </h4>
            <div className="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800 text-xs">
              {guardrails.map(gr => (
                <div key={gr.id} className="p-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-slate-200">{gr.ruleName}</div>
                    <div className="text-[11px] text-slate-400">{gr.condition}</div>
                  </div>
                  <div className="text-right font-mono shrink-0">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                      Action: {gr.enforcement}
                    </span>
                    <span className="block text-[10px] text-emerald-400 mt-0.5">
                      {gr.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Enforced via AWS Bedrock Guardrails &amp; Deterministic Policy Interceptors</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
