import React from 'react';
import { LocationIntel } from '../types/fraud';
import { Plane, AlertTriangle, MapPin, Clock, Gauge, ArrowRight } from 'lucide-react';

interface ImpossibleTravelCardProps {
  location: LocationIntel;
}

export const ImpossibleTravelCard: React.FC<ImpossibleTravelCardProps> = ({ location }) => {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
            <Plane className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white font-['JetBrains_Mono']">
              IMPOSSIBLE TRAVEL DETECTION
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">
              Aerodynamic Velocity Telemetry
            </span>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold">
          +{location.riskContribution} PTS TO RISK
        </span>
      </div>

      {/* Origin vs Destination Flight Card */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative overflow-hidden">
        {/* Subtle background world plane line */}
        <div className="flex items-center justify-between gap-2 text-xs">
          {/* Origin */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">
              Origin (Confirmed Login)
            </span>
            <div className="flex items-center gap-1.5 text-white font-bold">
              <span className="text-base">🇮🇳</span>
              <span>{location.loginCity}, {location.loginCountry}</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {location.loginTime}
            </div>
            <div className="text-[10px] font-mono text-slate-500 truncate max-w-[120px]">
              IP: {location.loginIp}
            </div>
          </div>

          {/* Center Velocity Bridge */}
          <div className="flex flex-col items-center px-3">
            <div className="flex items-center gap-1 text-[11px] font-mono text-rose-400 font-bold">
              <Plane className="w-3.5 h-3.5" />
              <span>{location.distanceKm.toLocaleString()} km</span>
            </div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-emerald-500 via-rose-500 to-rose-500 my-1 relative">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            </div>
            <span className="text-[10px] font-mono text-amber-300">
              in {location.elapsedTimeMin} minutes
            </span>
          </div>

          {/* Destination */}
          <div className="space-y-1 text-right">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">
              Execution Location
            </span>
            <div className="flex items-center justify-end gap-1.5 text-white font-bold">
              <span>{location.txCity}, {location.txCountry}</span>
              <span className="text-base">🇬🇧</span>
            </div>
            <div className="text-[11px] font-mono text-rose-400 font-bold">
              {location.txTime}
            </div>
            <div className="text-[10px] font-mono text-slate-500 truncate max-w-[120px]">
              IP: {location.txIp}
            </div>
          </div>
        </div>
      </div>

      {/* Anomaly Metrics Bar */}
      <div className="grid grid-cols-3 gap-2 text-xs font-mono">
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 block">Required Speed</span>
          <span className="text-rose-400 font-bold text-xs mt-0.5">
            ~{location.requiredSpeedKmh.toLocaleString()} km/h
          </span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 block">Max Jet Speed</span>
          <span className="text-slate-400 text-xs mt-0.5">~900 km/h</span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 block">Physical Viability</span>
          <span className="text-rose-500 font-bold text-xs mt-0.5">IMPOSSIBLE (33x)</span>
        </div>
      </div>

      {/* Warning Callout */}
      <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-2 text-xs text-amber-200">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="text-[11px]">
          Session hijacked or token replayed via UK commercial egress proxy.
        </span>
      </div>
    </div>
  );
};
