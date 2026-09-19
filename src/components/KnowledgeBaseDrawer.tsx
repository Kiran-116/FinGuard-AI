import React, { useState } from 'react';
import { BookOpen, X, Search, FileText, ChevronRight, Scale, ShieldAlert } from 'lucide-react';
import { KnowledgeBaseItem } from '../types/fraud';

interface KnowledgeBaseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: KnowledgeBaseItem[];
}

export const KnowledgeBaseDrawer: React.FC<KnowledgeBaseDrawerProps> = ({
  isOpen,
  onClose,
  items
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<KnowledgeBaseItem | null>(items[0]);

  if (!isOpen) return null;

  const filteredItems = items.filter(
    item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['JetBrains_Mono']">
                KNOWLEDGE BASE &amp; REGULATORY POLICIES
              </h3>
              <p className="text-xs text-slate-400">
                Grounding policies for FinGuard AI agents (RBI Circulars, FATF Recommendations, Internal AML Playbooks).
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

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/40">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search regulatory directives, structuring rules, velocity thresholds..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Main Split Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* List column */}
          <div className="md:col-span-5 border-r border-slate-800 overflow-y-auto max-h-[500px] divide-y divide-slate-800">
            {filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`p-3.5 cursor-pointer transition-colors ${
                  selectedItem?.id === item.id
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>{item.category}</span>
                  <span className="text-sky-400">{item.id}</span>
                </div>
                <div className="text-xs font-bold leading-snug">
                  {item.title}
                </div>
              </div>
            ))}
          </div>

          {/* Reader Detail column */}
          <div className="md:col-span-7 p-6 overflow-y-auto max-h-[500px] bg-slate-950 space-y-4">
            {selectedItem ? (
              <>
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
                    {selectedItem.category}
                  </span>
                  <h4 className="text-base font-bold text-white mt-2 font-['JetBrains_Mono']">
                    {selectedItem.title}
                  </h4>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                  {selectedItem.content}
                </div>

                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-400">
                  <div className="font-bold text-slate-300 mb-1">Agent Utilization:</div>
                  Grounding vectors from this policy are automatically injected into the Risk Analyst and Action Agent prompts during autonomous evaluation.
                </div>
              </>
            ) : (
              <div className="text-center py-20 text-xs text-slate-500">
                Select a regulatory policy to view clauses.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Synced with Enterprise Bedrock Knowledge Base</span>
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
