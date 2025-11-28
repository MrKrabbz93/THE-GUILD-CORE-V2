import React, { useState } from 'react';
import { ArrowDown, CheckCircle, Play, RotateCw } from 'lucide-react';

export const Helix: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const runSimulation = async () => {
    setLogs([]);
    setActiveStep(1);
    addLog("PHASE 1: Deconstructing intent...", "text-guild-accent");
    await delay(1000);
    
    setActiveStep(2);
    addLog("PHASE 2: Formulating strategy. Arbiter selected.", "text-guild-purple");
    await delay(1200);

    setActiveStep(3);
    addLog("PHASE 3: Executing. Operative 'Coder-01' dispatched.", "text-guild-success");
    addLog("> Writing schema...", "text-slate-500");
    addLog("> Validating dependencies...", "text-slate-500");
    await delay(1500);

    setActiveStep(4);
    addLog("PHASE 4: Critique complete. No regressions found.", "text-guild-danger");
    addLog("MISSION COMPLETE.", "text-white font-bold");
    setActiveStep(5);
  };

  const addLog = (msg: string, color: string) => {
    setLogs(prev => [...prev, `<span class="${color}">${msg}</span>`]);
  };

  const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

  return (
    <div className="h-full p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-y-auto">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-display font-bold text-white">Helix Framework</h2>
          <p className="text-slate-400">Recursive Autonomy. A self-evolving task execution engine.</p>
        </div>

        {/* Diagram */}
        <div className="flex flex-col items-center space-y-2">
          {['Deconstruct & Interpret', 'Formulate & Justify', 'Execute & Articulate', 'Self-Critique & Refine'].map((step, i) => (
             <div key={i} className="flex flex-col items-center w-full max-w-sm">
                <div className={`w-full p-4 rounded-lg border-2 text-center transition-all duration-500 ${activeStep === i + 1 ? 'border-white bg-guild-800 scale-105 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'border-guild-800 bg-guild-950 text-slate-500'}`}>
                  <div className="text-xs uppercase tracking-widest mb-1 opacity-50">Phase 0{i+1}</div>
                  <div className="font-bold">{step}</div>
                </div>
                {i < 3 && <ArrowDown className={`my-2 transition-colors ${activeStep > i + 1 ? 'text-guild-accent' : 'text-guild-800'}`} />}
             </div>
          ))}
        </div>
      </div>

      <div className="glass-panel p-1 rounded-xl flex flex-col h-full overflow-hidden">
        <div className="bg-guild-950 p-3 border-b border-guild-800 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-slate-500 font-mono">helix_core::agent_monitor</div>
        </div>
        
        <div className="flex-1 bg-black p-4 font-mono text-sm overflow-y-auto space-y-2">
          {logs.length === 0 && <div className="text-slate-600">System Standby... Waiting for signal.</div>}
          {logs.map((log, i) => (
            <div key={i} dangerouslySetInnerHTML={{__html: `> ${log}`}} />
          ))}
        </div>

        <div className="p-4 bg-guild-900 border-t border-guild-800 flex justify-center">
          {activeStep === 0 || activeStep === 5 ? (
             <button onClick={runSimulation} className="bg-white text-black font-bold px-6 py-2 rounded hover:bg-slate-200 flex items-center gap-2">
               <Play size={16} /> Run Mission Protocol
             </button>
          ) : (
            <button disabled className="text-slate-500 flex items-center gap-2">
              <RotateCw size={16} className="animate-spin" /> Processing...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};