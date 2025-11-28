// App.tsx - THE GUILD PRODUCT NEXUS: ULTIMATE CODE

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  // Common Guild Icons
  LayoutDashboard, ListTodo, Network, Bot, Bell, Plus, ChevronRight, BrainCircuit, Cpu, AlertTriangle, CheckCircle2, Clock, Zap, Hexagon, Eye, Menu, X,
  // IDYr Icons
  Lightbulb, Sparkles, FlaskConical, Atom,
  // Ares Nexus Icons
  TrendingUp, MessageSquare, Settings, Shield, Activity, Terminal, Wifi, Lock, User, GitPullRequestArrow, Rocket, RefreshCw, Target, Code, TestTube, Megaphone,
  // The Signal Icons
  ScrollText, PlayCircle, ArrowRight, Key, Server, Check,
} from 'lucide-react';
import Chart from 'chart.js/auto'; // For Chart.js integration
import * as THREE from 'three'; // For IDYr's 3D background

// --- Global Constants & Types ---
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE'; // !!! REPLACE WITH YOUR ACTUAL API KEY !!!
const API_MODEL = 'gemini3pro'; // Or 'gemini-1.5-flash' for production stable

type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
type Status = 'PENDING' | 'IN_PROGRESS' | 'BLOCKED' | 'COMPLETED';

interface Task {
  id: string;
  title: string;
  division: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  oracleInsight?: string;
  delegatedTo?: string; // Agent Name
  dependencies?: string[];
}

interface Product {
  id: string;
  label: string;
  icon: React.ElementType;
}

// --- Guild Branding Components ---
const NexusCipher = ({ className, pulse = false }: { className?: string; pulse?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 8l10 6 10-6-10-6z" className="text-oracle-cyber-cyan" fill="rgba(0, 200, 255, 0.1)" />
    <path d="M2 16l10 6 10-6" />
    <path d="M2 8v8" />
    <path d="M22 8v8" />
    <path d="M12 14v8" />
    <circle cx="12" cy="8" r="2" className={`${pulse ? 'animate-pulse' : ''} fill-cyan-400 stroke-none`} />
  </svg>
);

const OraclePulse = () => (
  <div className="relative flex items-center justify-center w-8 h-8">
    <div className="absolute w-full h-full bg-oracle-cyber-cyan/20 rounded-full animate-ping"></div>
    <div className="absolute w-6 h-6 bg-oracle-cyber-cyan/40 rounded-full animate-pulse"></div>
    <BrainCircuit size={16} className="text-cyan-100 relative z-10" />
  </div>
);

const GuildFooter = () => (
  <footer className="w-full bg-guild-deep-blue border-t border-slate-800 py-3 z-20">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between opacity-80 hover:opacity-100 transition duration-500">
      <div className="flex items-center space-x-3 mb-2 md:mb-0">
        <NexusCipher className="w-5 h-5 text-oracle-cyber-cyan" />
        <div className="h-4 w-[1px] bg-slate-700"></div>
        <span className="text-[10px] md:text-xs tracking-widest uppercase font-semibold text-slate-400">
          Powered by <span className="text-oracle-cyber-cyan font-bold">The Oracle</span>, an intelligence of the <span className="text-slate-300 font-bold">Heroes Guild</span>.
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] text-slate-500 font-mono">SYSTEM: OPTIMAL</span>
        </div>
        <div className="h-3 w-[1px] bg-slate-700"></div>
        <span className="text-[10px] text-slate-600 font-mono">GUILD SECURE PROTOCOL</span>
      </div>
    </div>
  </footer>
);

// --- Payment Section Component ---
const PaymentSection = ({ productName }: { productName: string }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'payid'>('card');
  const [price, setPrice] = useState(Math.floor(Math.random() * 500) + 100); // Random price for demo

  useEffect(() => {
    // Ensure product-specific pricing
    switch(productName) {
      case 'Guild Directive': setPrice(299); break;
      case 'IDYr': setPrice(199); break;
      case 'Ares Nexus': setPrice(999); break;
      case 'The Signal': setPrice(499); break;
      case 'Aether Forge Genesis': setPrice(4999); break; // AFG is the premium product
      default: setPrice(250);
    }
  }, [productName]);


  const handleBuyNow = () => {
    alert(`Initiating acquisition of "${productName}" for $${price} AUD via ${paymentMethod === 'card' ? 'Credit Card' : 'PayID'}. (Demo action only)`);
    // In a real application, this would trigger a payment gateway
  };

  return (
    <div className="mt-8 p-6 bg-slate-900/50 border border-slate-800 rounded-xl shadow-lg">
      <h3 className="text-lg font-bold text-white mb-4">Acquire {productName}</h3>
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-oracle-cyber-cyan">${price} AUD</span>
        <span className="text-sm text-slate-500">One-time purchase / Annual license</span>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setPaymentMethod('card')}
          className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
            paymentMethod === 'card'
              ? 'bg-oracle-cyber-cyan/20 border-oracle-cyber-cyan text-oracle-cyber-cyan'
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-oracle-cyber-cyan/50'
          }`}
        >
          Credit Card
        </button>
        <button
          onClick={() => setPaymentMethod('payid')}
          className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
            paymentMethod === 'payid'
              ? 'bg-oracle-cyber-cyan/20 border-oracle-cyber-cyan text-oracle-cyber-cyan'
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-oracle-cyber-cyan/50'
          }`}
        >
          PayID
        </button>
      </div>

      {paymentMethod === 'card' && (
        <div className="space-y-3 mb-4">
          <input type="text" placeholder="Card Number" className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white text-sm" />
          <div className="flex gap-3">
            <input type="text" placeholder="MM/YY" className="w-1/2 p-3 rounded bg-slate-800 border border-slate-700 text-white text-sm" />
            <input type="text" placeholder="CVC" className="w-1/2 p-3 rounded bg-slate-800 border border-slate-700 text-white text-sm" />
          </div>
        </div>
      )}

      {paymentMethod === 'payid' && (
        <div className="space-y-3 mb-4">
          <input type="text" placeholder="Your PayID (e.g., email@bank.com)" className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white text-sm" />
          <p className="text-xs text-slate-500">You will be redirected to confirm your payment.</p>
        </div>
      )}

      <button onClick={handleBuyNow} className="w-full bg-oracle-cyber-cyan hover:bg-cyan-400 text-black font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(0,200,255,0.3)] transition-all">
        Buy Now
      </button>
    </div>
  );
};

// --- API Utility for Gemini ---
async function callGeminiAPI(prompt: string, model: string = API_MODEL, tools: any[] = [], responseMimeType: string = "text/plain", systemInstruction?: string) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    console.warn("Gemini API Key missing or default. AI features will be simulated or fallback.");
    // Fallback or throw if API key is critical for a feature
    if (responseMimeType === "application/json") {
      return JSON.stringify({ riskScore: 50, isSafe: true, analysis: "AI Offline: Fallback protocol activated. Standard security checks passed." });
    }
    return "AI Offline: Fallback protocol activated. (API key not configured)";
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
  const delays = [1000, 2000, 4000]; // Exponential backoff delays

  const payload: any = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: responseMimeType },
  };
  if (tools.length > 0) payload.tools = tools;
  if (systemInstruction) payload.systemInstruction = { parts: [{ text: systemInstruction }] };


  for (let i = 0; i <= 3; i++) { // Max 3 retries
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        if (response.status === 429 || response.status >= 500) {
          if (i < 3) { // Retry if rate-limited or server error
            await new Promise(r => setTimeout(r, delays[i]));
            continue;
          }
        }
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    } catch (e) {
      console.error("Gemini API call failed:", e);
      if (i === 3) {
        if (responseMimeType === "application/json") {
          return JSON.stringify({ riskScore: 99, isSafe: false, analysis: `AI unavailable: ${e.message}. Threat assessment inconclusive.` });
        }
        return `Simulation Error: AI unavailable or API key invalid. (${(e as Error).message})`;
      }
      await new Promise(r => setTimeout(r, delays[i]));
    }
  }
  return "Simulation Error: AI unavailable after retries.";
}


// --- 1. Guild Directive View (Tasks) ---
const INITIAL_TASKS: Task[] = [
  { id: 'T-101', title: 'Deploy Sentinel Shield Patch v4.2', division: 'Cyber Security', priority: 'HIGH', status: 'IN_PROGRESS', dueDate: '2025-10-24', oracleInsight: 'Vulnerability detected in sector 7. Expedite deployment.' },
  { id: 'T-102', title: 'Analyze Vault Prime Market Fluctuations', division: 'Finance', priority: 'MEDIUM', status: 'PENDING', dueDate: '2025-10-25', delegatedTo: 'Agent Alpha-9' },
  { id: 'T-103', title: 'Design UI for Project Guild Directive', division: 'Design', priority: 'CRITICAL', status: 'IN_PROGRESS', dueDate: '2025-10-23', oracleInsight: 'Gun has requested MVP by Friday. Blocking Dev team.' },
  { id: 'T-104', title: 'Routine Server Maintenance', division: 'Infrastructure', priority: 'LOW', status: 'PENDING', dueDate: '2025-10-30' }
];
const AGENTS = [
  { name: 'Forge Agent 7-beta', status: 'Idle', specialty: 'Research' },
  { name: 'Div Garg Proxy', status: 'Active', specialty: 'Code Gen' },
  { name: 'Sentinel Bot', status: 'Active', specialty: 'Security' },
];

const PriorityBadge = ({ priority }: { priority: Priority }) => {
  const styles = {
    CRITICAL: 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]',
    HIGH: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    MEDIUM: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    LOW: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${styles[priority]}`}>
      {priority}
    </span>
  );
};

const TaskCard = ({ task, onClick }: { task: Task; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="bg-[#0f141e]/80 backdrop-blur-sm hover:bg-[#161b22] border border-slate-700/50 hover:border-oracle-cyber-cyan/50 rounded-lg p-4 cursor-pointer transition-all duration-300 group relative overflow-hidden shadow-lg"
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]"></div>
    {task.priority === 'CRITICAL' && (
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]"></div>
    )}
    <div className="flex justify-between items-start mb-2 pl-2 relative z-10">
      <div className="flex items-center gap-2">
        <PriorityBadge priority={task.priority} />
        <span className="text-xs text-slate-500 font-mono tracking-tight">{task.division}</span>
      </div>
      {task.delegatedTo && (
        <div className="flex items-center gap-1 text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
          <Bot size={12} />
          {task.delegatedTo}
        </div>
      )}
    </div>
    <h3 className="text-slate-200 font-medium text-sm mb-3 pl-2 group-hover:text-oracle-cyber-cyan transition-colors relative z-10">
      {task.title}
    </h3>
    {task.oracleInsight && (
      <div className="ml-2 mb-3 p-2 bg-indigo-500/5 rounded border border-indigo-500/20 flex items-start gap-2 relative z-10">
        <BrainCircuit size={14} className="text-indigo-400 mt-0.5 shrink-0" />
        <p className="text-[11px] text-indigo-300 leading-tight">
          <span className="font-bold">Oracle Insight:</span> {task.oracleInsight}
        </p>
      </div>
    )}
    <div className="flex justify-between items-center pl-2 mt-auto relative z-10">
      <div className="flex items-center gap-2 text-slate-500 text-xs">
        <Clock size={12} />
        <span>{task.dueDate}</span>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
        <ChevronRight size={16} className="text-oracle-cyber-cyan" />
      </div>
    </div>
  </div>
);

const GuildDirectiveView = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showAgentModal, setShowAgentModal] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      const optimized = [...tasks].sort((a, b) => {
        const priorityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      setTasks(optimized);
      setIsOptimizing(false);
    }, 2000);
  };

  const handleDelegate = (agentName: string) => {
    if (selectedTask) {
      const updatedTasks = tasks.map(t =>
        t.id === selectedTask.id
          ? { ...t, delegatedTo: agentName, status: 'IN_PROGRESS' as Status }
          : t
      );
      setTasks(updatedTasks);
      setSelectedTask({ ...selectedTask, delegatedTo: agentName, status: 'IN_PROGRESS' });
      setShowAgentModal(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto p-8 flex flex-col min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto w-full flex-1">
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900/80 via-[#0f141e]/90 to-slate-900/80 border border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-10 animate-pulse-slow">
            <BrainCircuit size={200} />
          </div>
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <OraclePulse />
                <h2 className="text-lg font-semibold text-white tracking-wide">Oracle Strategic Insight</h2>
              </div>
              <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                Analyzing Guild parameters. <span className="text-oracle-cyber-cyan font-medium">Project Chimera</span> is tracking 12% behind schedule due to resource contention in Division 4. Recommend delegating low-priority infrastructure tasks to autonomous agents.
              </p>
            </div>
            <button
              onClick={handleOptimize}
              disabled={isOptimizing}
              className="group flex flex-col items-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-cyan-900/20 border border-slate-700 hover:border-oracle-cyber-cyan/50 rounded-xl transition-all relative overflow-hidden"
            >
              {isOptimizing && <div className="absolute inset-0 bg-oracle-cyber-cyan/10 animate-pulse"></div>}
              {isOptimizing ? (
                <NexusCipher className="w-5 h-5 text-oracle-cyber-cyan animate-spin" />
              ) : (
                <Zap size={20} className="text-oracle-cyber-cyan group-hover:scale-110 transition-transform" />
              )}
              <span className="text-xs font-medium text-oracle-cyber-cyan">
                {isOptimizing ? 'Re-aligning...' : 'Optimize Schedule'}
              </span>
            </button>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Active Directives
            <span className="text-xs font-normal text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">{tasks.length}</span>
          </h2>
          <div className="flex gap-2">
            <span className="text-xs text-slate-500 self-center mr-2">Sorted by Strategic Impact</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />
          ))}
          <button className="border-2 border-dashed border-slate-800 hover:border-slate-700 hover:bg-slate-800/20 rounded-lg p-4 flex flex-col items-center justify-center text-slate-600 hover:text-slate-400 transition-all min-h-[160px] group">
            <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plus size={24} />
            </div>
            <span className="text-sm font-medium">Initialize New Directive</span>
          </button>
        </div>
      </div>

      <PaymentSection productName="Guild Directive" />

      {selectedTask && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-end">
          <div className="w-[600px] h-full bg-[#0d1117] border-l border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col animate-slide-in-right relative">
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(45deg,#00C8FF_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="p-6 border-b border-slate-800 flex justify-between items-start relative z-10 bg-[#0d1117]/90 backdrop-blur">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <PriorityBadge priority={selectedTask.priority} />
                  <span className="text-xs text-slate-500 font-mono tracking-wider">{selectedTask.id}</span>
                </div>
                <h2 className="text-2xl font-bold text-white leading-tight">{selectedTask.title}</h2>
              </div>
              <button onClick={() => setSelectedTask(null)} className="text-slate-500 hover:text-white transition-colors">
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 relative z-10">
              <div className="flex items-center gap-6 text-sm bg-slate-800/30 p-4 rounded-lg border border-slate-800">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Status</span>
                  <span className="text-white flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${selectedTask.status === 'IN_PROGRESS' ? 'bg-oracle-cyber-cyan shadow-[0_0_8px_#00C8FF]' : 'bg-slate-500'}`}></div>
                    {selectedTask.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="w-[1px] h-8 bg-slate-700/50"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Due Date</span>
                  <span className="text-white flex items-center gap-2">
                    <Clock size={14} className="text-slate-400" />
                    {selectedTask.dueDate}
                  </span>
                </div>
                <div className="w-[1px] h-8 bg-slate-700/50"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Assigned</span>
                  <span className="text-white flex items-center gap-2">
                    {selectedTask.delegatedTo ? (
                      <span className="text-purple-400 flex items-center gap-1">
                        <Bot size={14} /> {selectedTask.delegatedTo}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <User size={14} /> Operative Gun
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <div className="bg-indigo-900/10 border border-indigo-500/30 rounded-xl p-5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors"></div>
                <div className="absolute top-0 right-0 p-3 opacity-20">
                  <BrainCircuit size={64} className="text-indigo-500" />
                </div>
                <h3 className="text-indigo-300 font-bold flex items-center gap-2 mb-3 relative z-10">
                  <Zap size={16} /> Oracle Intelligence
                </h3>
                <div className="space-y-4 relative z-10">
                  <div>
                    <h4 className="text-[10px] text-indigo-400/70 uppercase font-semibold mb-1 tracking-wider">Strategic Context (RAG)</h4>
                    <p className="text-sm text-indigo-100 leading-relaxed font-light">
                      This task is a prerequisite for <span className="text-white font-medium underline decoration-indigo-500/50 underline-offset-2">Operation: Blackout</span>. Similar deployments in 2024 caused a 15% latency spike in the comms relay.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] text-indigo-400/70 uppercase font-semibold mb-1 tracking-wider">Suggested Actions</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-slate-300 bg-slate-900/50 p-2 rounded border border-slate-700 hover:border-oracle-cyber-cyan/50 cursor-pointer group transition-all">
                        <Plus size={14} className="text-oracle-cyber-cyan" />
                        <span>Pre-load cache buffers</span>
                        <span className="ml-auto text-[10px] text-slate-500 group-hover:text-oracle-cyber-cyan">Add Subtask</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-300 bg-slate-900/50 p-2 rounded border border-slate-700 hover:border-oracle-cyber-cyan/50 cursor-pointer group transition-all">
                        <Plus size={14} className="text-oracle-cyber-cyan" />
                        <span>Notify Div 4 Lead</span>
                        <span className="ml-auto text-[10px] text-slate-500 group-hover:text-oracle-cyber-cyan">Add Subtask</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-slate-200 font-bold flex items-center gap-2 mb-3">
                  <Network size={16} className="text-slate-400" /> Dependencies
                </h3>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-800 text-sm text-slate-400">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span className="line-through">Approve Security Protocol 9</span>
                  <span className="ml-auto text-xs text-slate-600">Completed 2h ago</span>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-800 grid grid-cols-2 gap-4 relative z-10">
                <button
                  onClick={() => setShowAgentModal(true)}
                  className="flex items-center justify-center gap-2 py-3 rounded-lg border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-colors"
                >
                  <Bot size={18} />
                  Delegate to Agent
                </button>
                <button className="flex items-center justify-center gap-2 py-3 rounded-lg bg-oracle-cyber-cyan/80 hover:bg-oracle-cyber-cyan text-black font-bold shadow-[0_0_15px_rgba(0,200,255,0.3)] transition-all">
                  <CheckCircle2 size={18} />
                  Mark Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAgentModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAgentModal(false)}></div>
          <div className="bg-[#161b22] border border-slate-700 rounded-xl p-6 w-[400px] relative shadow-2xl animate-fade-in-up">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 via-oracle-cyber-cyan to-purple-500"></div>
            <h3 className="text-lg font-bold text-white mb-1 mt-2">Select Autonomous Agent</h3>
            <p className="text-slate-400 text-sm mb-4">The Oracle has identified 3 agents suitable for this task.</p>
            <div className="space-y-2">
              {AGENTS.map(agent => (
                <button
                  key={agent.name}
                  onClick={() => handleDelegate(agent.name)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-700 hover:border-purple-500 hover:bg-purple-500/5 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-purple-500/50">
                    <Bot size={20} className="text-slate-400 group-hover:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-slate-200 font-medium text-sm">{agent.name}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      {agent.status} • {agent.specialty}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- 2. IDYr View (Idea Manifestation) ---
const IdYrView = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const ideaInputRef = useRef<HTMLInputElement>(null);
  const consoleOutputRef = useRef<HTMLDivElement>(null);
  const typedTextRef = useRef<HTMLSpanElement>(null);
  const btnTextRef = useRef<HTMLSpanElement>(null);
  const loadingIconRef = useRef<SVGSVGElement>(null);
  const [isManifesting, setIsManifesting] = useState(false);

  const visualizerRef = useRef<{ scene: THREE.Scene; material: THREE.PointsMaterial; particlesMesh: THREE.Points } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.002);

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 150;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.3,
      color: 0x44aaff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    visualizerRef.current = { scene, material, particlesMesh };

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };

    const handleResize = () => {
      if (container) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    const animate = () => {
      if (!visualizerRef.current || !container.isConnected) return; // Ensure element is still in DOM
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;
      visualizerRef.current.particlesMesh.rotation.y += 0.002;
      visualizerRef.current.particlesMesh.rotation.x += 0.001;
      visualizerRef.current.particlesMesh.position.y = Math.sin(elapsedTime * 0.5) * 2;
      visualizerRef.current.particlesMesh.rotation.y += 0.05 * (targetX - visualizerRef.current.particlesMesh.rotation.y);
      visualizerRef.current.particlesMesh.rotation.x += 0.05 * (targetY - visualizerRef.current.particlesMesh.rotation.x);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      visualizerRef.current = null;
    };
  }, []);

  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return parseInt('0x' + "00000".substring(0, 6 - c.length) + c, 16);
  };

  const handleManifest = useCallback(() => {
    const idea = ideaInputRef.current?.value.trim();
    if (!idea || isManifesting) return;

    setIsManifesting(true);
    if (btnTextRef.current) btnTextRef.current.textContent = "Processing...";
    loadingIconRef.current?.classList.remove('hidden');

    if (visualizerRef.current) {
      const hexColor = stringToColor(idea);
      const colorObj = new THREE.Color(hexColor);
      let r = visualizerRef.current.material.color.r;
      let g = visualizerRef.current.material.color.g;
      let b = visualizerRef.current.material.color.b;

      const animateColor = () => {
        if (!visualizerRef.current) return;
        r += (colorObj.r - r) * 0.05;
        g += (colorObj.g - g) * 0.05;
        b += (colorObj.b - b) * 0.05;
        visualizerRef.current.material.color.setRGB(r, g, b);
        visualizerRef.current.material.size = 0.5 + Math.random() * 0.2;

        if (Math.abs(colorObj.r - r) > 0.01 || Math.abs(colorObj.g - g) > 0.01 || Math.abs(colorObj.b - b) > 0.01) {
          requestAnimationFrame(animateColor);
        }
      };
      animateColor();
      visualizerRef.current.particlesMesh.rotation.y += 2;
    }

    setTimeout(() => {
      if (consoleOutputRef.current) {
        consoleOutputRef.current.classList.remove('hidden');
        consoleOutputRef.current.classList.add('flex');
      }
      if (typedTextRef.current) typedTextRef.current.innerHTML = "";

      const logMessages = [
        `> Parsing semantics: "${idea.substring(0, Math.min(idea.length, 20))}..."`,
        `> Abstract vector space calculated.`,
        `> Resonance frequency: ${Math.floor(Math.random() * 900) + 100}Hz`,
        `> MANIFESTATION COMPLETE.`
      ];

      let lineIndex = 0;
      const typeWriter = (text: string, i: number, fnCallback: () => void) => {
        if (i < text.length && typedTextRef.current) {
          typedTextRef.current.innerHTML = text.substring(0, i + 1);
          setTimeout(() => typeWriter(text, i + 1, fnCallback), 30);
        } else if (typeof fnCallback === 'function') {
          setTimeout(fnCallback, 500);
        }
      };

      const processLogs = () => {
        if (lineIndex < logMessages.length) {
          if (lineIndex > 0 && typedTextRef.current?.parentNode) {
            const prevP = document.createElement('p');
            prevP.textContent = logMessages[lineIndex - 1];
            typedTextRef.current.parentNode.parentNode?.insertBefore(prevP, typedTextRef.current.parentNode);
          }
          typeWriter(logMessages[lineIndex], 0, () => {
            lineIndex++;
            processLogs();
          });
        } else {
          if (typedTextRef.current?.parentNode) {
            const prevP = document.createElement('p');
            prevP.textContent = logMessages[lineIndex - 1];
            prevP.className = "text-white font-bold";
            typedTextRef.current.parentNode.parentNode?.insertBefore(prevP, typedTextRef.current.parentNode);
            typedTextRef.current.innerHTML = "";
          }

          if (btnTextRef.current) btnTextRef.current.textContent = "Manifested";
          loadingIconRef.current?.classList.add('hidden');
          setIsManifesting(false);
          setTimeout(() => { if (btnTextRef.current) btnTextRef.current.textContent = "Manifest"; }, 3000);
        }
      };
      processLogs();
    }, 800);
  }, [isManifesting]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && ideaInputRef.current === document.activeElement) {
        event.preventDefault();
        handleManifest();
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, [handleManifest]);


  return (
    <div className="min-h-screen flex flex-col bg-guild-deep-blue text-white font-sans overflow-hidden relative z-10">
      <div id="canvas-container" ref={canvasRef} className="fixed inset-0 z-0 opacity-60"></div>
      <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-4 pt-20 pb-20">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-block px-3 py-1 mb-4 border border-blue-500/30 rounded-full bg-blue-500/10 text-blue-400 text-xs tracking-widest uppercase animate-fade-in-up">
            v1.0.4 // Ready
          </div>
          <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tighter animate-fade-in-up delay-100 font-brand">
            Turn Thought <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-green-400">Into Matter</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light animate-fade-in-up delay-200">
            IDYr is the bridge between cognitive spark and tangible reality.
            Input your concept below and initialize the manifestation sequence.
          </p>

          <div className="mt-12 w-full max-w-lg mx-auto relative group animate-fade-in-up delay-300">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-2 flex items-center">
              <input
                type="text"
                ref={ideaInputRef}
                placeholder="Describe your idea..."
                className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 px-4 py-3 font-mono text-sm md:text-base h-12"
                disabled={isManifesting}
              />
              <button
                onClick={handleManifest}
                disabled={isManifesting}
                className={`bg-gradient-to-r from-idyl-blue to-idyl-green bg-[size:200%_auto] text-white font-bold py-2 px-6 rounded-md uppercase tracking-wider text-xs md:text-sm whitespace-nowrap h-10 flex items-center justify-center transition-all ${isManifesting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-position-right'}`}
              >
                <span ref={btnTextRef}>Manifest</span>
                <svg ref={loadingIconRef} className="hidden animate-spin ml-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div ref={consoleOutputRef} className="mt-8 text-left hidden animate-fade-in-up">
            <div className="bg-white/5 p-4 rounded-md font-mono text-xs md:text-sm text-green-400 h-32 overflow-y-auto w-full max-w-lg mx-auto border-l-4 border-l-green-500 shadow-2xl bg-black/80">
              <p>> IDYr Protocol initialized...</p>
              <p className="mt-1"><span ref={typedTextRef}></span><span className="animate-cursor-blink">_</span></p>
            </div>
          </div>
        </div>
      </main>

      <div className="w-full border-t border-white/10 bg-white/5 backdrop-blur-sm mt-auto z-10 pb-2">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-2 text-white flex items-center gap-2 justify-center md:justify-start"><Sparkles size={20} className="text-purple-400" />Capture</h3>
            <p className="text-sm text-gray-400">Algorithms that parse abstract semantics into structured data models instantly.</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-2 text-white flex items-center gap-2 justify-center md:justify-start"><FlaskConical size={20} className="text-green-400" />Visualize</h3>
            <p className="text-sm text-gray-400">Real-time rendering of concept viability and growth potential matrices.</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-2 text-white flex items-center gap-2 justify-center md:justify-start"><Atom size={20} className="text-blue-400" />Execute</h3>
            <p className="text-sm text-gray-400">Connecting your manifested idea to the tools required for physical realization.</p>
          </div>
        </div>
        <div className="text-center py-4 text-xs text-gray-600 border-t border-white/5">
          &copy; 2024 IDYr Systems. All rights reserved.
        </div>
      </div>
      <PaymentSection productName="IDYr" />
    </div>
  );
};

// --- 3. Ares Nexus View (Talent Orchestrator) ---
const AresNexusView = () => {
  const [clientName, setClientName] = useState("Acme Corp");
  const [legacyName, setLegacyName] = useState("Legacy HRIS");
  const [criticalSkill, setCriticalSkill] = useState("Generative AI Engineering");
  const [targetRole, setTargetRole] = useState("Senior ML Engineer");
  const [efficiencyMetric, setEfficiencyMetric] = useState(80);
  const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [isGeneratingOutreach, setIsGeneratingOutreach] = useState(false);

  const radarChartRef = useRef<Chart | null>(null);
  const lineChartRef = useRef<Chart | null>(null);

  const updateDashboard = useCallback(() => {
    document.querySelectorAll('.client-name').forEach(el => el.textContent = clientName);
    document.querySelectorAll('.legacy-name').forEach(el => el.textContent = legacyName);
    document.querySelectorAll('.skill-name').forEach(el => el.textContent = criticalSkill);
    document.querySelectorAll('.role-name').forEach(el => el.textContent = targetRole);
    const dispMetricEl = document.getElementById('disp-metric');
    if (dispMetricEl) dispMetricEl.textContent = efficiencyMetric + "%";

    if (radarChartRef.current) {
      radarChartRef.current.data.datasets[0].label = legacyName;
      radarChartRef.current.update();
    }
    if (lineChartRef.current) {
      lineChartRef.current.update();
    }

    setIsConfigPanelOpen(false);
  }, [clientName, legacyName, criticalSkill, targetRole, efficiencyMetric]);

  useEffect(() => {
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = "#57534E";

    const ctxRadar = document.getElementById('visionRadar') as HTMLCanvasElement;
    if (ctxRadar) {
      radarChartRef.current = new Chart(ctxRadar.getContext('2d')!, {
        type: 'radar',
        data: {
          labels: ['Proactive Strategy', 'Ethical Governance', 'Foresight', 'Security', 'Integration'],
          datasets: [{
            label: legacyName,
            data: [30, 20, 15, 40, 50],
            backgroundColor: 'rgba(168, 162, 158, 0.2)',
            borderColor: '#A8A29E',
            pointBackgroundColor: '#A8A29E',
            borderWidth: 2
          }, {
            label: 'Ares Nexus',
            data: [90, 95, 95, 90, 85],
            backgroundColor: 'rgba(217, 119, 6, 0.2)',
            borderColor: '#D97706',
            pointBackgroundColor: '#D97706',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: '#E7E5E4' }, grid: { color: '#E7E5E4' },
              pointLabels: { font: { size: 11, weight: 'bold' }, color: '#44403C' },
              ticks: { display: false, max: 100 }
            }
          },
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }

    const ctxLine = document.getElementById('predictiveLine') as HTMLCanvasElement;
    if (ctxLine) {
      lineChartRef.current = new Chart(ctxLine.getContext('2d')!, {
        type: 'line',
        data: {
          labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'],
          datasets: [
            { label: 'Projected Demand', data: [10, 15, 25, 40, 60, 80, 100, 120], borderColor: '#DC2626', backgroundColor: '#DC2626', tension: 0.4, borderWidth: 2 },
            { label: 'Internal Supply (Legacy)', data: [10, 12, 15, 18, 20, 22, 25, 28], borderColor: '#2563EB', backgroundColor: '#2563EB', borderDash: [5, 5], tension: 0.4, borderWidth: 2 },
            { label: 'Ares Optimized Supply', data: [10, 15, 22, 35, 55, 75, 98, 118], borderColor: '#D97706', backgroundColor: '#D97706', tension: 0.4, borderWidth: 2 }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' },
            tooltip: { mode: 'index', intersect: false, backgroundColor: 'rgba(41, 37, 36, 0.9)' }
          },
          scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Headcount Required' } },
            x: { grid: { display: false } }
          }
        }
      });
    }

    return () => {
      radarChartRef.current?.destroy();
      lineChartRef.current?.destroy();
    };
  }, [legacyName]);

  useEffect(() => {
    updateDashboard();
  }, [updateDashboard]);

  const auditPolicy = useCallback(async () => {
    const policyInput = document.getElementById('policy-input') as HTMLTextAreaElement;
    const policy = policyInput?.value;
    const outputDiv = document.getElementById('audit-output');
    const btn = document.getElementById('audit-btn');

    if (!policy?.trim() || !outputDiv || !btn) {
      if (outputDiv) outputDiv.innerHTML = '<p class="text-red-500">Please enter a policy to audit.</p>';
      return;
    }

    setIsAuditing(true);
    btn.innerHTML = '<span class="loader mr-2"></span> Analyzing...';
    outputDiv.innerHTML = '<div class="flex items-center justify-center h-full"><div class="loader"></div></div>';

    const systemPrompt = "You are the Sentinel-E AI Governance Auditor. Analyze the user's provided hiring policy for ethical bias risks, and potential legal or regulatory non-compliance (e.g., in GDPR, EEOC, or general fairness guidelines). Use grounded knowledge to support your findings. Structure your response with clear headings for 'Ethical Risk Assessment' and 'Regulatory Checkpoints'.";
    const userQuery = `Audit the following hiring policy for the company ${clientName}: "${policy}".`;

    try {
      const text = await callGeminiAPI(userQuery, API_MODEL, [{ "google_search": {} }], "text/plain", systemPrompt);
      let formattedText = text
        .replace(/### (.*)/g, '<h4 class="text-md font-bold text-red-700 mt-4 mb-2">$1</h4>')
        .replace(/## (.*)/g, '<h4 class="text-md font-bold text-red-700 mt-4 mb-2">$1</h4>')
        .replace(/\* (.*)/g, '<li class="ml-4 list-disc">$1</li>')
        .replace(/\n/g, '<br>');
      outputDiv.innerHTML = `<div class="p-2">${formattedText}</div>`;
    } catch (error) {
      outputDiv.innerHTML = `<p class="text-red-500 mt-4">API Error: Failed to perform audit. Check console for details.</p>`;
      console.error("Gemini Audit API call failed:", error);
    } finally {
      setIsAuditing(false);
      btn.innerHTML = 'Audit Policy with Grounding &#9878;';
    }
  }, [clientName]);

  const generateOutreach = useCallback(async () => {
    const outputArea = document.getElementById('output-area');
    const btn = document.getElementById('generate-btn');

    if (!outputArea || !btn) return;

    outputArea.innerHTML = '<div class="flex items-center justify-center h-full"><div class="loader"></div></div>';
    setIsGeneratingOutreach(true);
    btn.classList.add('opacity-50');

    const prompt = `You are an autonomous AI recruitment agent for Ares Nexus. Write a concise, professional, yet warm outreach message (max 80 words) to a passive candidate for the role of "${targetRole}" at "${clientName}". Emphasize that our predictive engine identified their unique potential for a future leadership track. Tone: High-touch, exclusive.`;

    try {
      const text = await callGeminiAPI(prompt, API_MODEL);
      outputArea.innerHTML = text;
    } catch (e) {
      console.error(e);
      outputArea.innerHTML = `[System Demo Fallback]  Subject: Exclusive Opportunity: ${targetRole} at ${clientName}  Hi [Name],  Our Ares Nexus predictive engine has identified your profile as a top 1% match for a strategic initiative at ${clientName}. Unlike standard outreach, we see a clear path for you to lead our upcoming digital transformation. I'd love to share why your specific background in ${criticalSkill} makes you the ideal architect for our future.  Best, Ares Agent 01`;
    } finally {
      setIsGeneratingOutreach(false);
      btn.classList.remove('opacity-50');
    }
  }, [clientName, targetRole, criticalSkill]);


  return (
    <div className="min-h-screen bg-[#F5F5F4] text-[#292524] antialiased overflow-x-hidden relative z-10">
      <div id="config-panel" className={`fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-stone-200 overflow-y-auto ${isConfigPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-stone-800">Sales Configuration</h2>
            <button onClick={() => setIsConfigPanelOpen(false)} className="text-stone-400 hover:text-stone-600 text-xl">&times;</button>
          </div>
          <p className="text-xs text-stone-500 mb-4">
            Tailor the pitch using the "Customization Parameters" from the Sales Playbook.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); updateDashboard(); }} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Client Name</label>
              <input type="text" className="w-full p-2 border border-stone-300 rounded text-sm" value={clientName} onChange={(e) => setClientName(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Legacy Tool Name</label>
              <input type="text" className="w-full p-2 border border-stone-300 rounded text-sm" value={legacyName} onChange={(e) => setLegacyName(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Critical Skill Gap</label>
              <input type="text" className="w-full p-2 border border-stone-300 rounded text-sm" value={criticalSkill} onChange={(e) => setCriticalSkill(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Target Hiring Role</label>
              <input type="text" className="w-full p-2 border border-stone-300 rounded text-sm" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Efficiency Target (%)</label>
              <input type="number" className="w-full p-2 border border-stone-300 rounded text-sm" value={efficiencyMetric} onChange={(e) => setEfficiencyMetric(parseInt(e.target.value))} />
            </div>
            <button type="submit" className="w-full bg-ares-amber text-white py-2 rounded font-medium hover:bg-amber-700 transition">
              Apply Customization
            </button>
          </form>
        </div>
      </div>

      <button id="config-bubble" onClick={() => setIsConfigPanelOpen(true)} className={`fixed bottom-6 right-6 z-50 bg-ares-amber text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-opacity ${isConfigPanelOpen ? 'opacity-0 pointer-events-none' : ''}`}>
        &#9881;
      </button>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24">
        <section id="vision" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold tracking-wide uppercase">Strategic Human Capital Orchestration</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Transforming <span className="client-name text-stone-900">{clientName}</span><br />
              from <span className="text-stone-400 line-through decoration-2 decoration-red-500 legacy-name">{legacyName}</span><br />
              to <span className="text-ares-amber">Ares Nexus</span>.
            </h1>
            <p className="text-lg text-stone-600">
              Moving beyond reactive recruitment to a proactive, predictive, and ethical talent ecosystem.
            </p>
            <div className="flex gap-4">
              <div className="p-4 bg-white border-l-4 border-amber-500 shadow-sm rounded-r">
                <div className="text-2xl font-bold text-stone-800" id="disp-metric">{efficiencyMetric}%</div>
                <div className="text-xs text-stone-500 uppercase">Efficiency Gain</div>
              </div>
              <div className="p-4 bg-white border-l-4 border-stone-800 shadow-sm rounded-r">
                <div className="text-2xl font-bold text-stone-800">100%</div>
                <div className="text-xs text-stone-500 uppercase">Bias Audited</div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="chart-container">
              <canvas id="visionRadar"></canvas>
            </div>
            <p className="text-center text-xs text-stone-400 mt-3 italic">
              Figure 1: Capability Gap Analysis (<span className="legacy-name">{legacyName}</span> vs. Ares Nexus)
            </p>
          </div>
        </section>

        <section id="modules">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900">Universal Enterprise Architecture</h2>
            <p className="text-stone-600 mt-2">Mapping your needs to the Ares Nexus generalized pillars.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 hover:border-amber-400 transition group">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">&#129504;</div>
              <h3 className="font-bold text-stone-800 text-lg">Central Intelligence Core</h3>
              <p className="text-sm text-ares-amber font-medium mb-2">Generalized: Unified Skills Ontology</p>
              <p className="text-stone-600 text-sm leading-relaxed">
                Ingests data from internal HRIS, ATS, and external sources to build a dynamic, real-time knowledge graph of your entire talent landscape.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 hover:border-amber-400 transition group">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">&#128200;</div>
              <h3 className="font-bold text-stone-800 text-lg">Predictive Engine</h3>
              <p className="text-sm text-ares-amber font-medium mb-2">Generalized: Workforce Forecasting</p>
              <p className="text-stone-600 text-sm leading-relaxed">
                Aligns talent supply with business strategy. Predicts attrition risks and identifies internal candidates for future roles.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 hover:border-amber-400 transition group">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">&#129302;</div>
              <h3 className="font-bold text-stone-800 text-lg">Autonomous Agents</h3>
              <p className="text-sm text-ares-amber font-medium mb-2">Generalized: Personalized Engagement</p>
              <p className="text-stone-600 text-sm leading-relaxed">
                AI-driven outreach and assessment agents that adapt tone and content to candidate personas, ensuring high-touch engagement at scale.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 hover:border-amber-400 transition group">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">&#9878;</div>
              <h3 className="font-bold text-stone-800 text-lg">Sentinel-E Framework</h3>
              <p className="text-sm text-ares-amber font-medium mb-2">Generalized: Bias Governance</p>
              <p className="text-stone-600 text-sm leading-relaxed">
                Embedded compliance protocols that audit algorithms for bias, ensuring adherence to GDPR, EEOC, and internal DEI goals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 hover:border-amber-400 transition group">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">&#128274;</div>
              <h3 className="font-bold text-stone-800 text-lg">Veritas Protocol</h3>
              <p className="text-sm text-ares-amber font-medium mb-2">Generalized: Secure Credentialing</p>
              <p className="text-stone-600 text-sm leading-relaxed">
                Blockchain-backed verification for degrees, certifications, and work history, creating immutable and portable talent records.
              </p>
            </div>
          </div>
        </section>

        <section id="compliance" className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200">
          <h2 className="text-3xl font-bold text-stone-900 mb-6 flex items-center gap-3">
            Sentinel-E: Policy Auditor <span className="text-ares-amber text-xl">&#10024;</span>
          </h2>
          <p className="text-stone-600 mb-6 max-w-4xl">
            Demonstrating the **Bias Governance** pillar. Sentinel-E uses real-time, grounded LLM analysis to instantly audit internal policies against ethical guidelines and up-to-date regulatory frameworks, mitigating legal risk before implementation.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-lg font-semibold text-stone-800">Policy Input</h3>
              <textarea id="policy-input" rows={6} className="w-full p-3 border border-stone-300 rounded-lg text-sm focus:ring-amber-500 focus:border-amber-500" placeholder="Enter a hiring policy or internal guideline to audit... e.g., 'We will prioritize candidates from our top three competitor companies for all senior roles.'">We will prioritize candidates from our top three competitor companies for all senior roles in the London office.</textarea>
              <button id="audit-btn" onClick={auditPolicy} disabled={isAuditing} className="w-full bg-stone-800 text-white py-2 rounded-lg font-medium hover:bg-stone-700 transition flex items-center justify-center gap-2">
                {isAuditing ? <span className="loader mr-2"></span> : 'Audit Policy with Grounding'} &#9878;
              </button>
              <div className="text-xs text-stone-500 italic pt-2">
                Audit uses Gemini with Google Search to check compliance risks (e.g., EEOC, GDPR, bias).
              </div>
            </div>
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-stone-800 mb-2">Audit Findings</h3>
              <div id="audit-output" className="min-h-[200px] bg-stone-50 p-4 rounded-lg border border-stone-200 text-sm text-stone-700 whitespace-pre-wrap flex items-start">
                <div className="p-2">
                  <h4 className="text-md font-bold text-red-700 mt-4 mb-2">Ethical Risk Assessment</h4>
                  <p>The policy to prioritize candidates solely from top competitor companies, while seemingly strategic, carries a high risk of **adverse impact discrimination** by limiting the pool based on factors that may indirectly correlate with protected characteristics (e.g., age, socio-economic background of employees at certain firms).</p>
                  <h4 className="text-md font-bold text-red-700 mt-4 mb-2">Regulatory Checkpoints</h4>
                  <ul>
                    <li className="ml-4 list-disc">EEOC (US) Risk: The policy is susceptible to scrutiny under disparate impact theory. If the competitor companies disproportionately employ one demographic, the policy could be deemed discriminatory, even without explicit intent.</li>
                    <li className="ml-4 list-disc">GDPR (EU) Risk: While low, reliance on historical employment data from competitors, especially without explicit candidate consent for this secondary use, may breach data minimization principles, particularly concerning the London office mentioned.</li>
                    <li class="ml-4 list-disc">Recommendation: Sentinel-E suggests expanding the sourcing strategy to include a diversity of firms and applying competency-based, blinded screening to mitigate this bias risk.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="predictive" className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-stone-900">Predictive Gap Analysis</h2>
              <p className="text-sm text-stone-600 mt-1">
                Forecast for: <span className="skill-name font-bold text-ares-amber">{criticalSkill}</span>
              </p>
            </div>
            <div className="mt-4 md:mt-0 px-4 py-2 bg-red-50 text-red-700 text-xs font-bold rounded border border-red-100">
              &#9888; Critical Deficit Detected: Q3 2025
            </div>
          </div>
          <div className="chart-container">
            <canvas id="predictiveLine"></canvas>
          </div>
        </section>

        <section id="demo" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-stone-900">Autonomous Engagement</h2>
            <p className="text-stone-600">
              Demonstrating the <strong>Hyper-Personalized Engagement Suite</strong>. The system ingests the candidate profile and generates context-aware outreach instantly using Gemini 2.5.
            </p>
            <div className="bg-stone-100 p-6 rounded-lg border border-stone-200">
              <h3 className="text-xs font-bold text-stone-500 uppercase mb-4">Input Context (From Config)</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Target Role:</span>
                  <span className="role-name font-medium text-stone-900">{targetRole}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Value Profile:</span>
                  <span className="font-medium text-stone-900">High-Potential / Passive</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Channel:</span>
                  <span className="font-medium text-stone-900">LinkedIn InMail</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-amber-50 border-l-4 border-amber-500 text-sm text-amber-900">
              <strong>Value Prop:</strong> Moving from "spamming" to "strategic courtship" increases response rates by 300%.
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-stone-200 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">&#10024;</span>
                <h3 className="font-bold text-stone-800">Agent Output Preview</h3>
              </div>
              <button id="generate-btn" onClick={generateOutreach} disabled={isGeneratingOutreach} className="bg-stone-800 text-white px-4 py-2 rounded text-xs font-bold hover:bg-stone-700 transition">
                {isGeneratingOutreach ? <span className="loader mr-2"></span> : 'Generate Live Script'}
              </button>
            </div>
            <div id="output-area" className="flex-grow bg-stone-50 rounded border border-stone-200 p-4 font-mono text-sm text-stone-700 min-h-[200px] whitespace-pre-wrap">
              [System Default Script] Subject: Exclusive Path to Leadership: Sr. ML Architect at {clientName} Hi [Candidate Name], Our Ares Nexus intelligence platform flagged your expertise in [Candidate's Specific Skill] as essential to our Q4 strategic mandate. We are not just hiring; we are building a next-gen leadership track. We believe your unique potential extends beyond the scope of a standard role. Let's connect privately about your custom trajectory here. Best, Ares Agent 01
            </div>
            <div className="mt-4 flex justify-end">
              <span className="text-[10px] text-stone-400">Powered by Gemini 2.5 Flash</span>
            </div>
          </div>
        </section>
        <PaymentSection productName="Ares Nexus" />
      </main>
    </div>
  );
};


// --- 4. The Signal View (Community Intelligence) ---
const TheSignalView = () => {
  const demoModalRef = useRef<HTMLDivElement>(null);
  const demoStreamRef = useRef<HTMLDivElement>(null);
  const replayBtnRef = useRef<HTMLButtonElement>(null);
  const authModalRef = useRef<HTMLDivElement>(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const demoTimeouts = useRef<NodeJS.Timeout[]>([]);
  const clickCountRef = useRef(0);

  const openDemoModal = useCallback(() => {
    setIsDemoOpen(true);
    runDemoSequence();
  }, []);

  const closeDemoModal = useCallback(() => {
    setIsDemoOpen(false);
    demoTimeouts.current.forEach(clearTimeout);
    demoTimeouts.current = [];
    if (replayBtnRef.current) replayBtnRef.current.classList.add('hidden');
  }, []);

  const addToStream = useCallback((html: string) => {
    if (!demoStreamRef.current) return;
    const div = document.createElement('div');
    div.className = "animate-pulse";
    div.innerHTML = html;
    demoStreamRef.current.appendChild(div);
    setTimeout(() => div.classList.remove('animate-pulse'), 500);
    demoStreamRef.current.scrollTop = demoStreamRef.current.scrollHeight;
  }, []);

  const runDemoSequence = useCallback(() => {
    if (demoStreamRef.current) demoStreamRef.current.innerHTML = '';
    if (replayBtnRef.current) replayBtnRef.current.classList.add('hidden');
    demoTimeouts.current.forEach(clearTimeout);
    demoTimeouts.current = [];

    const steps = [
      { time: 500, html: `<span class="text-slate-500">[SYSTEM]</span> Initializing Signal Engine...` },
      { time: 1200, html: `<span class="text-signal-indigo"><b>[LISTENER]</b></span> Incoming Message from User <span class="text-white">@Enterprise_Lead_99</span>` },
      { time: 1400, html: `<div class="bg-slate-900 p-2 rounded border border-slate-800 text-slate-300">"We are considering switching to CompetitorX because your export features are too slow for our data..."</div>` },
      { time: 2400, html: `<span class="text-yellow-400"><b>[AI SCAN]</b></span> Analyzing Sentiment & Intent...` },
      { time: 3500, html: `<span class="text-emerald-400"><b>[SUCCESS]</b></span> Intelligence Extracted:` },
      { time: 3600, html: `<div class="bg-slate-800/50 p-2 rounded text-xs font-mono text-signal-indigo">                     {<br>                     &nbsp;&nbsp;"intent": <span class="text-red-400">"CHURN_RISK"</span>,<br>                     &nbsp;&nbsp;"entity": "CompetitorX",<br>                     &nbsp;&nbsp;"confidence": 0.98<br>                     }                 </div>` },
      { time: 4800, html: `<span class="text-red-400 font-bold"><b>[ACTION]</b></span> Triggering Webhook: Escalation to CS Manager` },
      { time: 5500, html: `<span class="text-slate-500">[SYSTEM]</span> Signal processed. Waiting for stream...` }
    ];

    steps.forEach(step => {
      demoTimeouts.current.push(setTimeout(() => addToStream(step.html), step.time));
    });

    demoTimeouts.current.push(setTimeout(() => {
      if (replayBtnRef.current) replayBtnRef.current.classList.remove('hidden');
    }, 6000));
  }, [addToStream]);

  const openAuthModal = useCallback(() => {
    setIsAuthOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthOpen(false);
    clickCountRef.current = 0; // Reset moderator trigger
    document.getElementById('moderator-bypass')?.classList.add('hidden');
    const sentinelForm = document.getElementById('sentinelForm') as HTMLFormElement;
    if (sentinelForm) sentinelForm.reset();
    document.getElementById('sentinel-spam-view')?.classList.add('hidden');
    document.getElementById('sentinel-success-view')?.classList.add('hidden');
    document.getElementById('sentinel-loading-view')?.classList.add('hidden');
    document.getElementById('sentinel-form-view')?.classList.remove('hidden');
  }, []);

  const triggerModeratorAccess = useCallback(() => {
    clickCountRef.current++;
    if (clickCountRef.current === 3) {
      document.getElementById('moderator-bypass')?.classList.remove('hidden');
    }
  }, []);

  const verifyModerator = useCallback(() => {
    const passInput = document.getElementById('mod-password') as HTMLInputElement;
    const errorDiv = document.getElementById('mod-error');
    if (passInput.value === 'GM-ADMIN-2025') { // Mock Password
      sessionStorage.setItem('isModerator', 'true');
      alert("ACCESS GRANTED: Welcome back, Guild Master.");
      closeAuthModal(); // Close modal on success
    } else {
      errorDiv?.classList.remove('hidden');
      setTimeout(() => errorDiv?.classList.add('hidden'), 2000);
    }
  }, [closeAuthModal]);

  const handleSentinelSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const showView = (viewId: string) => {
      ['sentinel-form-view', 'sentinel-loading-view', 'sentinel-success-view', 'sentinel-spam-view'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.classList.add('hidden');
          el.classList.remove('flex');
        }
      });
      const el = document.getElementById(viewId);
      if (el) {
        el.classList.remove('hidden');
        if (viewId !== 'sentinel-form-view') el.classList.add('flex');
      }
    };

    if ((data.website_url as string)?.trim() !== "") {
      console.warn("Honeypot triggered.");
      const spamLogEl = document.getElementById('spam-log');
      if (spamLogEl) spamLogEl.innerHTML = '<span class="block font-bold mb-1">SYSTEM LOG:</span>Honeypot trap triggered. Bot signature confirmed.';
      showView('sentinel-spam-view');
      return;
    }

    showView('sentinel-loading-view');

    try {
      const prompt = `
             Analyze this contact form submission for spam probability.
             Name: ${data.name}
             Email: ${data.email}
             Message: ${data.message}

             Return JSON only: {"riskScore": number (0-100), "isSafe": boolean, "analysis": string}
             `;
      const jsonText = await callGeminiAPI(prompt, API_MODEL, [], "application/json");
      const analysis = JSON.parse(jsonText);

      if (!analysis.isSafe || analysis.riskScore > 80) {
        const spamLogEl = document.getElementById('spam-log');
        if (spamLogEl) spamLogEl.innerHTML = `<span class="block font-bold mb-1">THREAT ANALYSIS:</span>${analysis.analysis}`;
        showView('sentinel-spam-view');
      } else {
        const successLogEl = document.getElementById('success-log');
        if (successLogEl) successLogEl.innerHTML = `<span class="block font-bold mb-1">SECURITY LOG:</span>Cleared by Sentinel AI: ${analysis.analysis}`;
        showView('sentinel-success-view');
      }
    } catch (error) {
      console.error("AI Check Failed", error);
      const successLogEl = document.getElementById('success-log');
      if (successLogEl) successLogEl.innerHTML = `<span class="block font-bold mb-1">SYSTEM LOG:</span>AI Offline. Fallback protocol accepted.`;
      showView('sentinel-success-view');
    }
  }, []);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAuthModal();
        closeDemoModal();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [closeAuthModal, closeDemoModal]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans antialiased overflow-x-hidden relative z-10">
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.15)_0%,transparent_70%)] z-0 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 border border-signal-indigo/30 rounded-full px-3 py-1 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-signal-indigo animate-pulse"></span>
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">AI Signal Intelligence v2.5 Live</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
            Your Community Is Speaking.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Guild Intelligence Listens.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400 leading-relaxed">
            The AI layer of The Guild OS that turns every message into retained revenue, prevented churn, and qualified upsells — automatically.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button onClick={openAuthModal} className="bg-white text-slate-950 hover:bg-slate-200 text-lg font-bold px-8 py-4 rounded-full transition-all flex items-center">
              Start Your Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button onClick={openDemoModal} className="bg-slate-900/60 backdrop-blur-md border border-slate-700 text-white hover:bg-slate-800 text-lg font-medium px-8 py-4 rounded-full transition-all flex items-center">
              View Live Demo
              <PlayCircle className="ml-2 w-5 h-5 text-signal-indigo" />
            </button>
          </div>
          <div className="mt-20 relative rounded-xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden max-w-5xl mx-auto transform hover:scale-[1.01] transition-transform duration-700">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
            <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80">
              <div className="col-span-1 bg-slate-800/50 rounded-lg h-64 border border-slate-700/50 p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded bg-signal-indigo/20"></div>
                  <div className="h-4 w-24 bg-slate-700 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-16 w-full bg-slate-700/30 rounded border-l-2 border-emerald-500"></div>
                  <div className="h-16 w-full bg-slate-700/30 rounded border-l-2 border-rose-500"></div>
                  <div className="h-16 w-full bg-slate-700/30 rounded border-l-2 border-signal-indigo"></div>
                </div>
              </div>
              <div className="col-span-2 bg-slate-800/50 rounded-lg h-64 border border-slate-700/50 p-6 flex flex-col justify-center items-center">
                <Sparkles className="w-12 h-12 text-purple-500 mb-4" />
                <div className="text-xl font-serif italic text-slate-300 text-center">
                  "Deep Analysis: User indicates 85% Buying Intent for Enterprise Tier."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-base text-signal-indigo font-semibold tracking-wide uppercase">Core Intelligence</h2>
            <p className="mt-2 text-3xl font-extrabold text-white">Three Pillars of Community ROI</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 bg-signal-indigo/10 rounded-lg flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6 text-signal-indigo" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Signal Intelligence</h3>
              <p className="text-slate-400">AI detects Buying Intent and Churn Risk in real-time.</p>
            </div>
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Strategic Governance</h3>
              <p className="text-slate-400">Psychological gateway filters for high-quality members.</p>
            </div>
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Outcome Automation</h3>
              <p className="text-slate-400">Automate responses and generate sentiment reports.</p>
            </div>
          </div>
        </div>
      </section>

      <PaymentSection productName="The Signal" />

      {/* DEMO MODAL */}
      {isDemoOpen && (
        <div ref={demoModalRef} className="fixed inset-0 z-[100] flex" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity" onClick={closeDemoModal}></div>
          <div className="fixed inset-0 z-10 overflow-y-auto no-scrollbar">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <div className="relative transform overflow-hidden rounded-2xl bg-slate-900 border border-slate-700 text-left shadow-2xl transition-all w-full max-w-4xl">
                <div className="absolute top-0 right-0 pt-4 pr-4 z-20">
                  <button type="button" onClick={closeDemoModal} className="rounded-md bg-slate-900 text-slate-400 hover:text-white focus:outline-none">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-signal-indigo/10 mb-4">
                      <Terminal className="w-6 h-6 text-signal-indigo" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Signal Intelligence Protocol</h3>
                    <p className="text-slate-400">Live Simulation v2.5</p>
                  </div>
                  <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 font-mono text-sm relative overflow-hidden h-[400px] flex flex-col" id="demo-terminal">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-slate-500 text-xs">MONITORING_STREAM_01</div>
                    </div>
                    <div className="space-y-4 flex-1 overflow-y-auto" ref={demoStreamRef}></div>
                    <div className="mt-4 border-t border-slate-800 pt-4 flex justify-between items-center text-xs text-slate-500">
                      <span id="demo-status" className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> SYSTEM_ONLINE</span>
                      <span>LATENCY: 12ms</span>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <button onClick={runDemoSequence} ref={replayBtnRef} className="hidden text-sm text-signal-indigo hover:text-indigo-300 flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" /> Replay Simulation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AUTHENTICATION MODAL */}
      {isAuthOpen && (
        <div ref={authModalRef} className="fixed inset-0 z-[100] flex" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={closeAuthModal}></div>
          <div className="fixed inset-0 z-10 overflow-y-auto no-scrollbar">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <div className="relative transform overflow-hidden rounded-2xl bg-slate-900 border border-slate-700 text-left shadow-2xl transition-all w-full max-w-lg">
                <div className="absolute top-0 right-0 pt-4 pr-4 z-20">
                  <button type="button" onClick={closeAuthModal} className="rounded-md bg-slate-900 text-slate-400 hover:text-white focus:outline-none">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-6 sm:p-8">
                  <div id="sentinel-form-view">
                    <div className="flex items-center space-x-2 mb-6 border-b border-slate-800 pb-4">
                      <Lock className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm font-mono text-emerald-500 tracking-wider uppercase">Sentinel Secure Active</span>
                    </div>
                    <div className="text-center mb-6">
                      <div onClick={triggerModeratorAccess} className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-signal-indigo/10 mb-4 cursor-pointer hover:bg-signal-indigo/20 transition-colors select-none">
                        <User className="w-6 h-6 text-signal-indigo" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Request Access</h3>
                      <p className="mt-1 text-sm text-slate-400">Secure Lead Transmission</p>
                    </div>
                    <div id="moderator-bypass" className="hidden mb-6 bg-slate-950 p-4 border border-signal-indigo/30 rounded-lg animate-fade-in">
                      <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Key className="w-3 h-3" /> Moderator Override
                      </div>
                      <div className="flex gap-2">
                        <input type="password" id="mod-password" className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-signal-indigo" placeholder="Enter Master Key" />
                        <button type="button" onClick={verifyModerator} className="bg-signal-indigo hover:bg-indigo-500 text-white px-3 py-2 rounded text-sm font-bold">
                          Access
                        </button>
                      </div>
                      <div id="mod-error" className="text-xs text-red-400 mt-2 hidden">Invalid Credentials</div>
                    </div>
                    <form id="sentinelForm" onSubmit={handleSentinelSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Full Name</label>
                        <input type="text" name="name" required className="w-full bg-slate-950 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder-slate-600" placeholder="John Doe" />
                      </div>
                      <div className="opacity-0 absolute top-0 left-0 h-0 w-0 overflow-hidden z-[-1]">
                        <label htmlFor="website_url">Website URL</label>
                        <input type="text" name="website_url" id="website_url" tabIndex={-1} autoComplete="off" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Business Email</label>
                        <input type="email" name="email" required className="w-full bg-slate-950 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder-slate-600" placeholder="name@company.com" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Message</label>
                        <textarea name="message" required rows={3} className="w-full bg-slate-950 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder-slate-600 resize-none" placeholder="Inquiry details..."></textarea>
                      </div>
                      <button type="submit" id="submitBtn" className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20">
                        <span>Transmit Securely</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                      <div className="mt-4 text-center">
                        <p className="text-[10px] text-slate-600 flex items-center justify-center gap-1">
                          <Shield className="w-3 h-3" />
                          Protected by Sentinel 256-bit Encryption
                        </p>
                      </div>
                    </form>
                  </div>
                  <div id="sentinel-loading-view" className="hidden flex-col items-center justify-center py-10 text-center">
                    <Server className="w-12 h-12 text-emerald-500 animate-pulse mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Encrypting & Analyzing</h3>
                    <p className="text-slate-400 text-sm">Sentinel AI is verifying transmission...</p>
                  </div>
                  <div id="sentinel-success-view" className="hidden flex-col items-center justify-center py-8 text-center">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                      <Check className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Transmission Complete</h3>
                    <p className="text-slate-400 mb-6">Your message has passed security protocols and been delivered.</p>
                    <div id="success-log" className="w-full bg-slate-950/50 p-3 rounded border border-emerald-500/20 text-xs font-mono text-emerald-400 text-left mb-6"></div>
                    <button onClick={closeAuthModal} className="text-emerald-500 hover:text-emerald-400 font-semibold text-sm">Send Another</button>
                  </div>
                  <div id="sentinel-spam-view" className="hidden flex-col items-center justify-center py-8 text-center animate-shake">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                      <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Threat Neutralized</h3>
                    <p className="text-slate-400 mb-6">Sentinel identified this submission as malicious.</p>
                    <div id="spam-log" className="w-full bg-red-950/50 p-3 rounded border border-red-500/20 text-xs font-mono text-red-400 text-left mb-6"></div>
                    <button onClick={closeAuthModal} className="text-slate-400 hover:text-white font-semibold text-sm">Reset System</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// --- Main App Component ---
export default function GuildProductNexus() {
  const [activeProduct, setActiveProduct] = useState('guild-directive');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const products: Product[] = [
    { id: 'guild-directive', label: 'Guild Directive', icon: ListTodo },
    { id: 'idyr', label: 'IDYr', icon: Lightbulb },
    { id: 'ares-nexus', label: 'Ares Nexus', icon: Cpu },
    { id: 'the-signal', label: 'The Signal', icon: ScrollText },
    { id: 'aether-forge-genesis', label: 'AFG', icon: Hexagon }, // New AFG product
  ];

  // Initial boot sequence effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-mono text-oracle-cyber-cyan">
        <div className="w-16 h-16 border-4 border-cyan-900 border-t-oracle-cyber-cyan rounded-full animate-spin mb-4"></div>
        <div className="text-xl font-bold tracking-[0.2em] animate-pulse">INITIALIZING GUILD NEXUS...</div>
        <div className="mt-2 text-xs text-slate-500">Establishing secure connection to The Oracle</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-guild-deep-blue text-slate-300 font-sans selection:bg-oracle-cyber-cyan/30 selection:text-cyan-200">
      {/* Background Grid FX */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      ></div>

      {/* Header */}
      <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-cyan-900/50 flex items-center justify-between px-4 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-oracle-cyber-cyan hover:text-cyan-200 transition-colors">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="p-2 bg-cyan-950 rounded border border-cyan-500/30 group-hover:border-cyan-400/80 transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <Eye size={20} className="text-oracle-cyber-cyan" />
            </div>
            <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-oracle-cyber-cyan to-blue-500 hidden sm:block">
              GUILD PRODUCT <span className="text-slate-500 font-light">NEXUS</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs text-oracle-cyber-cyan font-mono">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            SYSTEM ONLINE
          </div>
          <button className="relative p-2 text-slate-400 hover:text-oracle-cyber-cyan transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-oracle-cyber-cyan to-blue-800 border border-cyan-400/30 flex items-center justify-center text-xs font-bold text-white">
            GM
          </div>
        </div>
      </header>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <>
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <aside className={`
            fixed md:sticky top-0 left-0 h-full w-64 bg-slate-950 border-r border-cyan-900/30 z-40 transition-transform duration-300 ease-in-out flex flex-col
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <div className="h-16 flex items-center px-6 border-b border-cyan-900/30 md:hidden shrink-0">
              <span className="text-oracle-cyber-cyan font-bold tracking-wider">NAVIGATION</span>
              <button onClick={() => setSidebarOpen(false)} className="ml-auto text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-2 mt-4 flex-1 overflow-y-auto">
              {products.map((item) => {
                const Icon = item.icon;
                const isActive = activeProduct === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveProduct(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden
                      ${isActive
                        ? 'bg-cyan-950/40 text-oracle-cyber-cyan border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                        : 'text-slate-400 hover:text-cyan-200 hover:bg-slate-900/50'}
                    `}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-oracle-cyber-cyan shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                    )}
                    <Icon size={20} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="font-medium tracking-wide">{item.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="w-full p-6 bg-gradient-to-t from-slate-950 to-transparent shrink-0">
              <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-3 mb-2">
                  <Zap size={16} className="text-yellow-400" />
                  <span className="text-xs text-slate-400 uppercase font-bold">System Status</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-oracle-cyber-cyan to-blue-500 w-[85%] relative">
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-slate-500 font-mono">
                  <span>CPU: 34%</span>
                  <span>MEM: 6.2GB</span>
                </div>
              </div>
            </div>
          </aside>
        </>

        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden min-h-[calc(100vh-64px)]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-light text-slate-400 uppercase tracking-widest">
                Product // <span className="text-oracle-cyber-cyan font-bold">{products.find(p => p.id === activeProduct)?.label}</span>
              </h2>
              <div className="text-xs font-mono text-slate-600 hidden sm:block">
                ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </div>
            </div>

            {activeProduct === 'guild-directive' && <GuildDirectiveView />}
            {activeProduct === 'idyr' && <IdYrView />}
            {activeProduct === 'ares-nexus' && <AresNexusView />}
            {activeProduct === 'the-signal' && <TheSignalView />}
            {activeProduct === 'aether-forge-genesis' && <AetherForgeGenesisView />}
          </div>
        </main>
      </div>
      <GuildFooter />
    </div>
  );
}
