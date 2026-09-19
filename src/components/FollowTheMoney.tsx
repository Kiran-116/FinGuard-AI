import React, { useState } from 'react';
import { MoneyTrace, MoneyTraceHop } from '../types/fraud';
import { 
  ArrowDown, 
  Clock, 
  ShieldAlert, 
  Building2, 
  User, 
  AlertOctagon, 
  Info, 
  Layers, 
  TrendingDown, 
  FileCheck2,
  Lock
} from 'lucide-react';

interface FollowTheMoneyProps {
  moneyTrace: MoneyTrace;
  onRequestAction: (actionType: string) => void;
}

export const FollowTheMoney: React.FC<FollowTheMoneyProps> = ({
  moneyTrace,
  onRequestAction
}) => {
  const [selectedHop, setSelectedHop] = useState<MoneyTraceHop | null>(moneyTrace.hops[0]);

  return (
    <div className="space-y-6">
      {/* Signature Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-rose-950/60 p-5 rounded-2xl border border-amber-500/30 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white font-['JetBrains_Mono']">
                  TRACE MONEY — FUND LAYERING DETECTION
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  CRITICAL AML SIGNAL
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Autonomous ledger analysis reconstructed a 4-hop sequential fund distribution path. Rapid dwell time and micro-dissipation matches structured mule layering.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onRequestAction('HOLD_TRANSACTION')}
              className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 flex items-center gap-1.5 transition-all whitespace-nowrap"
            >
              <Lock className="w-3.5 h-3.5" />
              Place Outbound Hold
            </button>
          </div>
        </div>

        {/* Responsible Risk Framing Banner */}
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-2.5 text-xs text-amber-200">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>AI Assessment Signal:</strong> Potential fund-layering and structuring pattern detected. Presented as an actionable risk hypothesis requiring analyst validation, in accordance with supervisory audit standards.
          </span>
        </div>
      </div>

      {/* Main Interactive Trace Flow & Hop Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Flow Chain */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              Reconstructed Transaction Flow
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Chain ID: {moneyTrace.chainId}
            </span>
          </div>

          <div className="space-y-4">
            {moneyTrace.hops.map((hop, index) => {
              const isSelected = selectedHop?.hopNumber === hop.hopNumber;

              return (
                <div key={hop.hopNumber} className="relative">
                  {/* Step Card */}
                  <div
                    onClick={() => setSelectedHop(hop)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800/90 border-rose-500 ring-1 ring-rose-500/50 shadow-lg'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-rose-400">
                          0{hop.hopNumber}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            {hop.fromAccount}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              {hop.timestamp}
                            </span>
                            <span className="text-amber-400">({hop.hopTimeDelta})</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold font-mono text-rose-400">
                          {hop.formattedAmount}
                        </span>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {hop.retentionPercent}% passed
                        </div>
                      </div>
                    </div>

                    {hop.flag && (
                      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 italic">
                          {hop.flag}
                        </span>
                        <span className="text-rose-400 font-medium">Flagged Hop</span>
                      </div>
                    )}
                  </div>

                  {/* Flow Down Indicator */}
                  {index < moneyTrace.hops.length - 1 && (
                    <div className="flex items-center justify-center py-1">
                      <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800">
                        <ArrowDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                        <span className="text-amber-300 font-semibold">{moneyTrace.hops[index + 1].formattedAmount}</span>
                      </div>
                    </div>
                  )}

                  {/* Final Destination indicator */}
                  {index === moneyTrace.hops.length - 1 && (
                    <div className="flex items-center justify-center py-2">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/60">
                        <Building2 className="w-3.5 h-3.5 text-rose-400" />
                        <span>Off-Ramp Destination: Apex Global Assets (Crypto Gateway)</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Forensic Hop Details & AML Rules */}
        <div className="lg:col-span-5 space-y-6">
          {/* Selected Hop Inspector */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-xl">
            <h3 className="text-sm font-semibold text-slate-200 pb-3 border-b border-slate-800 mb-4 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-amber-400" />
              Hop #{selectedHop?.hopNumber} Forensic Evidence
            </h3>

            {selectedHop ? (
              <div className="space-y-4 text-xs font-mono">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] uppercase text-slate-400">Transfer Vector</div>
                  <div className="text-white font-bold text-sm mt-0.5">
                    {selectedHop.fromAccount}
                  </div>
                  <div className="text-rose-400 text-xs mt-1">
                    ↓ Routed into: {selectedHop.toAccount}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Amount Transferred</span>
                    <span className="text-base font-bold text-white font-mono">
                      {selectedHop.formattedAmount}
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Dwell Time Delta</span>
                    <span className="text-base font-bold text-amber-400 font-mono">
                      {selectedHop.hopTimeDelta}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Mule Retained Dissipation:</span>
                    <span className="font-bold text-rose-400 font-mono">
                      {(100 - selectedHop.retentionPercent).toFixed(1)}% Fee Cut
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-rose-500 h-full rounded-full"
                      style={{ width: `${selectedHop.retentionPercent}%` }}
                    ></div>
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    Standard mule funnel behavior: accounts retain 4-7% as compensation before immediate liquidation.
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* AML Regulatory Grounding Box */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-xl">
            <h3 className="text-sm font-semibold text-slate-200 pb-3 border-b border-slate-800 mb-3 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              Applicable Regulatory Directives
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="font-bold text-slate-200">PMLA Section 3 (Offence of Money-Laundering)</div>
                <div className="text-slate-400 text-[11px] mt-0.5">
                  Mandatory automated alert for cascading transactions with dwell time under 15 minutes.
                </div>
              </div>
              <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="font-bold text-slate-200">FATF Travel Rule Compliance</div>
                <div className="text-slate-400 text-[11px] mt-0.5">
                  Missing originator identification payload between Hop 3 and unregulated VASP Gateway.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
