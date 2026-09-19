import React from 'react';
import { DeviceIntel } from '../types/fraud';
import { Smartphone, AlertTriangle, ShieldAlert, Cpu, Layers } from 'lucide-react';

interface DeviceIntelligenceCardProps {
  device: DeviceIntel;
}

export const DeviceIntelligenceCard: React.FC<DeviceIntelligenceCardProps> = ({ device }) => {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white font-['JetBrains_Mono']">
              DEVICE INTELLIGENCE: {device.id}
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">
              Hardware Canvas Hash: {device.canvasHash}
            </span>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
          Linked Accounts: {device.linkedAccountsCount}
        </span>
      </div>

      {/* Forensic Footprint */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 block">Hardware Architecture</span>
          <span className="text-slate-200 truncate block mt-0.5">{device.model}</span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 block">Registration Recency</span>
          <span className="text-rose-400 truncate block mt-0.5 font-bold">{device.firstSeen}</span>
        </div>
      </div>

      {/* Linked Accounts Cluster List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>CONCURRENTLY ASSOCIATED ACCOUNTS</span>
          <span>RECENT VOLUME</span>
        </div>

        <div className="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800/80 max-h-48 overflow-y-auto">
          {device.linkedAccounts.map((acc, idx) => (
            <div key={idx} className="p-2.5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    acc.riskStatus === 'FRAUD'
                      ? 'bg-rose-500'
                      : acc.riskStatus === 'SUSPICIOUS'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                ></span>
                <div>
                  <span className="text-slate-200 font-bold block">
                    {acc.accountId}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {acc.accountHolder}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    acc.riskStatus === 'FRAUD'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : acc.riskStatus === 'SUSPICIOUS'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {acc.riskStatus}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {acc.recentVolume}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnostic Callout */}
      <div className="p-3 bg-rose-950/30 border border-rose-500/30 rounded-xl flex items-start gap-2 text-xs text-rose-200">
        <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
        <p className="leading-snug text-[11px]">
          <strong>Cluster Alert:</strong> {device.verdict}
        </p>
      </div>
    </div>
  );
};
