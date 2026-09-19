import React from 'react';
import { FlaskConical, X, ArrowRight, Play, ShieldAlert, Users, Layers, Plane } from 'lucide-react';

interface AttackScenariosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScenario: (scenarioId: string) => void;
}

export const AttackScenariosModal: React.FC<AttackScenariosModalProps> = ({
  isOpen,
  onClose,
  onSelectScenario
}) => {
  if (!isOpen) return null;

  const scenarios = [
    {
      id: 'SCENARIO_ATO',
      title: 'Scenario 1 — Account Takeover (ATO)',
      tag: 'Flagship Attack',
      severity: 'CRITICAL',
      icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
      steps: ['New Device Registered', 'Password Reset (OTP Bypassed)', 'New Beneficiary Added', 'Max Limit Transfer (₹4.82L)'],
      description: 'Attacker executes credential stuffing via headless browser, resets credentials, provisions unverified crypto beneficiary, and drains funds in one burst.',
      expectedRisk: '93 / 100'
    },
    {
      id: 'SCENARIO_RING',
      title: 'Scenario 2 — Coordinated Fraud Syndicate Ring',
      tag: 'Multi-Entity Graph',
      severity: 'CRITICAL',
      icon: <Users className="w-5 h-5 text-purple-400" />,
      steps: ['10 Sleeper Accounts Activated', 'Shared Hardware Footprint DEV-8472', 'Same London Proxy 103.241.x', 'Synchronized ₹4L-₹8L Wires'],
      description: 'Syndicate uses identical canvas hardware fingerprint to multiplex fraudulent disbursements across multiple shell accounts into a shared crypto exchange.',
      expectedRisk: '96 / 100'
    },
    {
      id: 'SCENARIO_MULE',
      title: 'Scenario 3 — Mule Account Funnel & Layering',
      tag: 'AML Structuring',
      severity: 'HIGH',
      icon: <Layers className="w-5 h-5 text-amber-400" />,
      steps: ['Micro-deposits: ₹10K, ₹15K, ₹12K, ₹18K', 'Consolidation in Funnel Hub', 'Rapid Inter-bank Hop (4 mins)', 'Terminal Liquidation to Bullion Dealer'],
      description: 'Rapid smurfing: aggregating micro-UPI transfers from scam victims into an intermediary mule account and off-ramping 94% of the volume in under 15 minutes.',
      expectedRisk: '89 / 100'
    },
    {
      id: 'SCENARIO_TRAVEL',
      title: 'Scenario 4 — Impossible Travel Teleportation',
      tag: 'Geolocation Anomaly',
      severity: 'HIGH',
      icon: <Plane className="w-5 h-5 text-cyan-400" />,
      steps: ['10:31 AM: Bangalore Session Verified', '10:47 AM: London Gateway Execution', 'Distance: 8,024 km', 'Calculated Speed: 30,090 km/h (33x Mach 1)'],
      description: 'Token replay or proxy hijack: consecutive authentication timestamps make physical transit mathematically impossible, triggering immediate out-of-band challenge.',
      expectedRisk: '87 / 100'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['JetBrains_Mono']">
                ATTACK SCENARIO SIMULATOR
              </h3>
              <p className="text-xs text-slate-400">
                Launch prebuilt real-world attack vectors to test FinGuard's autonomous multi-agent response.
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

        {/* Scenarios Grid */}
        <div className="p-6 overflow-y-auto space-y-4">
          {scenarios.map(sc => (
            <div
              key={sc.id}
              className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    {sc.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white font-['JetBrains_Mono']">
                        {sc.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {sc.tag}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Expected Risk Score: <strong className="text-rose-400 font-mono">{sc.expectedRisk}</strong>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectScenario(sc.id);
                    onClose();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md shadow-amber-600/30 flex items-center gap-1.5 transition-all whitespace-nowrap"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Run Scenario
                </button>
              </div>

              {/* Step Sequence Flow */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                {sc.steps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-2 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                      {step}
                    </span>
                    {idx < sc.steps.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-slate-600" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <p className="text-xs text-slate-400 font-sans">
                {sc.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Clicking "Run Scenario" injects the attack into the ingress stream and triggers live autonomous agents.</span>
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
