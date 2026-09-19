import React, { useState } from 'react';
import { 
  NetworkNode, 
  NetworkEdge, 
  RiskLevel 
} from '../types/fraud';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ShieldAlert, 
  Server, 
  Smartphone, 
  Globe, 
  CreditCard, 
  User, 
  Building2, 
  CheckCircle2, 
  AlertTriangle,
  Info
} from 'lucide-react';

interface NetworkGraphProps {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  selectedNodeId?: string;
  onSelectNode: (node: NetworkNode) => void;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[1]; // default to Transaction #84721

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'MERCHANT': return <Building2 className="w-4 h-4" />;
      case 'TRANSACTION': return <ShieldAlert className="w-4 h-4" />;
      case 'CUSTOMER': return <User className="w-4 h-4" />;
      case 'DEVICE': return <Smartphone className="w-4 h-4" />;
      case 'IP': return <Globe className="w-4 h-4" />;
      case 'CARD': return <CreditCard className="w-4 h-4" />;
      case 'LINKED_USER': return <User className="w-4 h-4" />;
      default: return <Server className="w-4 h-4" />;
    }
  };

  const getRiskColors = (risk: RiskLevel | 'NORMAL') => {
    switch (risk) {
      case 'CRITICAL':
        return {
          border: 'border-rose-500',
          bg: 'bg-rose-950/80',
          text: 'text-rose-400',
          glow: 'shadow-[0_0_15px_rgba(244,63,94,0.4)]',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          dot: 'bg-rose-500'
        };
      case 'HIGH':
        return {
          border: 'border-orange-500',
          bg: 'bg-orange-950/80',
          text: 'text-orange-400',
          glow: 'shadow-[0_0_15px_rgba(249,115,22,0.3)]',
          badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
          dot: 'bg-orange-500'
        };
      case 'MEDIUM':
        return {
          border: 'border-amber-500',
          bg: 'bg-amber-950/80',
          text: 'text-amber-400',
          glow: 'shadow-[0_0_10px_rgba(245,158,11,0.2)]',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          dot: 'bg-amber-500'
        };
      default:
        return {
          border: 'border-slate-700',
          bg: 'bg-slate-900/90',
          text: 'text-slate-400',
          glow: '',
          badge: 'bg-slate-800 text-slate-300 border-slate-700',
          dot: 'bg-emerald-500'
        };
    }
  };

  const filteredNodes = nodes.filter(n => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'ACCOUNTS') return n.type === 'CUSTOMER' || n.type === 'LINKED_USER';
    if (activeFilter === 'HARDWARE') return n.type === 'DEVICE' || n.type === 'IP';
    if (activeFilter === 'CRITICAL') return n.risk === 'CRITICAL';
    return true;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full min-h-[640px]">
      {/* Visual Canvas Area */}
      <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col p-4 shadow-xl">
        {/* Top Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              ENTITY RELATIONSHIP GRAPH
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
              9 Nodes · 10 Edges
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Pills */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px]">
              {['ALL', 'CRITICAL', 'ACCOUNTS', 'HARDWARE'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-2 py-1 rounded transition-colors ${
                    activeFilter === filter
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setZoom(prev => Math.min(prev + 0.15, 1.6))}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoom(prev => Math.max(prev - 0.15, 0.7))}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoom(1)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                title="Reset View"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive SVG Canvas */}
        <div className="relative flex-1 w-full h-[520px] overflow-hidden flex items-center justify-center select-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]">
          <div 
            className="w-[800px] h-[640px] relative transition-transform duration-200"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* SVG Connecting Edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker
                  id="arrow-danger"
                  viewBox="0 0 10 10"
                  refX="22"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
                </marker>
                <marker
                  id="arrow-normal"
                  viewBox="0 0 10 10"
                  refX="22"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
                </marker>
              </defs>

              {edges.map(edge => {
                const src = nodes.find(n => n.id === edge.source);
                const tgt = nodes.find(n => n.id === edge.target);
                if (!src || !tgt) return null;

                const isConnectedToSelected = selectedNode && (edge.source === selectedNode.id || edge.target === selectedNode.id);

                return (
                  <g key={edge.id}>
                    <line
                      x1={src.x}
                      y1={src.y}
                      x2={tgt.x}
                      y2={tgt.y}
                      stroke={
                        isConnectedToSelected
                          ? '#f43f5e'
                          : edge.isSuspicious
                          ? '#e11d48'
                          : '#334155'
                      }
                      strokeWidth={isConnectedToSelected ? 2.5 : edge.isSuspicious ? 2 : 1.2}
                      strokeDasharray={edge.isSuspicious ? '5,5' : 'none'}
                      opacity={isConnectedToSelected ? 1 : 0.65}
                    />
                    {/* Edge Label */}
                    <text
                      x={(src.x + tgt.x) / 2}
                      y={(src.y + tgt.y) / 2 - 4}
                      fill={isConnectedToSelected ? '#fecdd3' : '#64748b'}
                      fontSize="9"
                      fontFamily="JetBrains Mono"
                      textAnchor="middle"
                      className="bg-slate-950/80 px-1 py-0.5 rounded"
                    >
                      {edge.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Render Nodes */}
            {filteredNodes.map(node => {
              const colors = getRiskColors(node.risk);
              const isSelected = selectedNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  id={`graph-node-${node.id}`}
                  onClick={() => onSelectNode(node)}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className={`absolute cursor-pointer group transition-all duration-200 z-10`}
                >
                  <div
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border ${colors.border} ${colors.bg} ${colors.glow} backdrop-blur-md transition-all ${
                      isSelected
                        ? 'ring-2 ring-rose-400 scale-105 shadow-2xl z-20'
                        : 'hover:scale-105 hover:border-slate-400'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg bg-slate-950/80 ${colors.text}`}>
                      {getNodeIcon(node.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-100 whitespace-nowrap">
                          {node.label}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${colors.dot} ${node.risk === 'CRITICAL' ? 'animate-ping' : ''}`}></span>
                      </div>
                      {node.sublabel && (
                        <p className="text-[10px] font-mono text-slate-400">
                          {node.sublabel}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Canvas Legend */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Critical Risk (Fraud / Anomaly)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> High Risk
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span> Normal Baseline
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            Click any node to inspect evidence &amp; attributes
          </p>
        </div>
      </div>

      {/* Selected Node Evidence Inspector Panel */}
      <div className="lg:col-span-4 bg-slate-900 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between shadow-xl">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-rose-400" />
              <h3 className="font-semibold text-sm text-slate-200">
                Entity Evidence Inspector
              </h3>
            </div>
            {selectedNode && (
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase border ${getRiskColors(selectedNode.risk).badge}`}>
                {selectedNode.risk}
              </span>
            )}
          </div>

          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-mono text-slate-400">
                  {selectedNode.type}
                </span>
                <h4 className="text-base font-bold text-white">
                  {selectedNode.label}
                </h4>
                {selectedNode.sublabel && (
                  <p className="text-xs font-mono text-rose-400 mt-0.5">
                    {selectedNode.sublabel}
                  </p>
                )}
              </div>

              {/* Evidence Details */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <h5 className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  {selectedNode.evidence.title}
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {selectedNode.evidence.details}
                </p>
              </div>

              {/* Anomaly Flags */}
              <div>
                <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1.5">
                  Identified Risk Signals
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.evidence.flags.map((flag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20 flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3 h-3 text-rose-400" />
                      {flag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Attributes Table */}
              <div>
                <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1.5">
                  Hardware &amp; Forensic Attributes
                </label>
                <div className="bg-slate-950/60 rounded-xl border border-slate-800 divide-y divide-slate-800/80 font-mono text-xs">
                  {Object.entries(selectedNode.evidence.attributes).map(([key, val]) => (
                    <div key={key} className="px-3 py-2 flex items-center justify-between">
                      <span className="text-slate-400">{key}</span>
                      <span className="text-slate-200 font-medium truncate max-w-[180px]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-500 text-xs">
              Select an entity node on the canvas to view forensic evidence.
            </div>
          )}
        </div>

        {/* Quick Action in Inspector */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Evidence Graph Grounded
            </span>
            <span className="text-[10px] font-mono text-slate-500">FinGuard Graph v4.2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
