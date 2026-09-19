import React, { useState } from 'react';
import { SlidersHorizontal, X, ArrowRight, ShieldAlert, Sparkles, RotateCcw, AlertTriangle } from 'lucide-react';

interface WhatIfSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyScenario?: (score: number) => void;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  isOpen,
  onClose,
  onApplyScenario
}) => {
  // Configurable sliders
  const [amount, setAmount] = useState<number>(482000);
  const [isInternational, setIsInternational] = useState<boolean>(true);
  const [isNewDevice, setIsNewDevice] = useState<boolean>(true);
  const [isOffHours, setIsOffHours] = useState<boolean>(true); // 2:30 AM
  const [failedAttempts, setFailedAttempts] = useState<number>(3);
  const [linkedAccounts, setLinkedAccounts] = useState<number>(4);

  // Simulation state
  const baselineScore = 32; // Normal user baseline

  // Dynamic score calculator
  const calculateSimulatedScore = () => {
    let score = 15; // base baseline

    // Amount weight
    if (amount > 500000) score += 28;
    else if (amount > 200000) score += 22;
    else if (amount > 80000) score += 14;
    else score += 5;

    // International / impossible travel
    if (isInternational) score += 22;

    // New device
    if (isNewDevice) score += 18;

    // Time of day (off hours)
    if (isOffHours) score += 10;

    // Failed auth attempts
    score += Math.min(failedAttempts * 5, 15);

    // Linked accounts on device
    if (linkedAccounts >= 4) score += 14;
    else if (linkedAccounts > 1) score += 8;

    return Math.min(score, 99);
  };

  const calculatedScore = calculateSimulatedScore();
  const scoreDelta = calculatedScore - baselineScore;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['JetBrains_Mono']">
                "WHAT IF?" FRAUD SIMULATOR
              </h3>
              <p className="text-xs text-slate-400">
                Manipulate transaction telemetry in real-time to observe dynamic risk score recalibration.
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Comparison Score Banner */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 grid grid-cols-3 gap-4 text-center">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase block">
                Typical Baseline
              </span>
              <span className="text-2xl font-bold font-mono text-slate-400 mt-1 block">
                {baselineScore}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">NORMAL</span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <ArrowRight className="w-5 h-5 text-slate-600" />
              <span className="text-xs font-mono font-bold text-rose-400 mt-1">
                +{scoreDelta} Points
              </span>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase block">
                Recalculated Score
              </span>
              <span className="text-3xl font-bold font-mono text-rose-400 mt-0.5 block">
                {calculatedScore}
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  calculatedScore >= 85
                    ? 'bg-rose-500/20 text-rose-400'
                    : calculatedScore >= 60
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-emerald-500/20 text-emerald-400'
                }`}
              >
                {calculatedScore >= 85 ? '🔴 CRITICAL' : calculatedScore >= 60 ? '🟠 HIGH' : '🟢 LOW'}
              </span>
            </div>
          </div>

          {/* Sliders and Controls */}
          <div className="space-y-5 text-xs">
            {/* Amount Slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono">
                <span className="text-slate-300 font-semibold">Transaction Amount:</span>
                <span className="text-rose-400 font-bold text-sm">
                  ₹{amount.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>₹10,000 (Routine)</span>
                <span>₹5,00,000</span>
                <span>₹10,00,000 (Extreme Spike)</span>
              </div>
            </div>

            {/* Toggles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
              {/* International Jump */}
              <div
                onClick={() => setIsInternational(!isInternational)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isInternational
                    ? 'bg-rose-950/40 border-rose-500/60 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div>
                  <div className="font-bold">Location Jump</div>
                  <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                    {isInternational ? 'Bangalore → London (+22 pts)' : 'Domestic Bangalore (+0 pts)'}
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full ${isInternational ? 'bg-rose-500' : 'bg-slate-700'}`}></div>
              </div>

              {/* Hardware Device Fingerprint */}
              <div
                onClick={() => setIsNewDevice(!isNewDevice)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isNewDevice
                    ? 'bg-rose-950/40 border-rose-500/60 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div>
                  <div className="font-bold">Device Footprint</div>
                  <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                    {isNewDevice ? 'Unrecognized Canvas (+18 pts)' : 'Verified Hardware (+0 pts)'}
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full ${isNewDevice ? 'bg-rose-500' : 'bg-slate-700'}`}></div>
              </div>

              {/* Off-Hours Execution */}
              <div
                onClick={() => setIsOffHours(!isOffHours)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isOffHours
                    ? 'bg-amber-950/40 border-amber-500/60 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div>
                  <div className="font-bold">Time of Execution</div>
                  <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                    {isOffHours ? '2:30 AM Off-Hours (+10 pts)' : '2:00 PM Business Hours (+0 pts)'}
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full ${isOffHours ? 'bg-amber-500' : 'bg-slate-700'}`}></div>
              </div>

              {/* Failed Attempts Slider */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-300">Failed 2FA Attempts:</span>
                  <span className="text-rose-400 font-bold">{failedAttempts}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={failedAttempts}
                  onChange={e => setFailedAttempts(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>

            {/* Linked Accounts on Device */}
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between font-mono">
                <span className="font-bold text-slate-300">
                  Device Sharing (Other Accounts on Same Hardware):
                </span>
                <span className="text-rose-400 font-bold">{linkedAccounts} Accounts</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={linkedAccounts}
                onChange={e => setLinkedAccounts(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="text-[11px] text-slate-400 font-sans">
                {linkedAccounts >= 4
                  ? '⚠ Device multiplexing ring detected (Linked to 4+ accounts with active transfers).'
                  : 'Normal multi-user threshold.'}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <button
            onClick={() => {
              setAmount(45000);
              setIsInternational(false);
              setIsNewDevice(false);
              setIsOffHours(false);
              setFailedAttempts(0);
              setLinkedAccounts(1);
            }}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Clean Baseline
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Dismiss
            </button>
            <button
              onClick={() => {
                if (onApplyScenario) onApplyScenario(calculatedScore);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30"
            >
              Apply Simulation to Case
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
