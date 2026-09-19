import React, { useState, useRef, useEffect } from 'react';
import { Transaction } from '../types/fraud';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  User, 
  ShieldAlert, 
  CornerDownLeft, 
  Cpu, 
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface AnalystCopilotProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AnalystCopilot: React.FC<AnalystCopilotProps> = ({
  isOpen,
  onClose,
  transaction
}) => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: `Hello Analyst. I am FinGuard Copilot, grounded in Case ${transaction.id}. I have indexed transaction telemetry, entity graph nodes, device DEV-8472 associations, and RBI/FATF regulatory directives. How can I assist your investigation?`,
      timestamp: '10:47 AM'
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Why did the model flag this?',
    'Has this device been seen before?',
    'Show me linked accounts on device DEV-8472',
    'Summarize this case for a SAR report',
    'What is the recommended action?'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          context: {
            transactionId: transaction.id,
            amount: transaction.formattedAmount,
            customer: transaction.customerName,
            riskScore: transaction.riskScore,
            device: 'DEV-8472',
            explanation: transaction.analystExplanation
          }
        })
      });

      if (!response.ok) {
        throw new Error('Copilot response error');
      }

      const data = await response.json();

      const assistantMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: data.answer || 'Analysis complete.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      // Fallback deterministic grounded answer if server error
      const assistantMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: `Transaction ${transaction.id} presents an aggregate risk score of ${transaction.riskScore}/100. Primary flags include: 18.4× volume spike, impossible velocity from Bangalore to London in 16 min, and hardware fingerprint DEV-8472 multiplexed across 7 accounts. Action recommended: Hold Transaction and initiate out-of-band biometric challenge.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[560px] animate-in slide-in-from-bottom-5 duration-200">
      {/* Copilot Header */}
      <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-white font-['JetBrains_Mono']">
                FINGUARD COPILOT
              </h3>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Grounded
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Analyst Investigation Assistant
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs ${
                msg.sender === 'user'
                  ? 'bg-rose-600 text-white'
                  : 'bg-indigo-950 border border-indigo-700 text-indigo-300'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-rose-600 text-white rounded-tr-sm'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-sm'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>
              <div
                className={`text-[9px] mt-1 text-right font-mono ${
                  msg.sender === 'user' ? 'text-rose-200' : 'text-slate-500'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 w-fit">
            <Cpu className="w-3.5 h-3.5 animate-spin text-rose-400" />
            <span>Consulting entity graph &amp; knowledge base...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Pills */}
      <div className="px-3 py-2 border-t border-slate-800/80 bg-slate-950/50 flex items-center gap-1.5 overflow-x-auto text-[10px]">
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 whitespace-nowrap transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask Copilot about evidence, graph, rules..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 font-sans"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white rounded-xl shadow-md transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
