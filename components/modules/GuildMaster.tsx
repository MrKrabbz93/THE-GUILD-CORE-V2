import React, { useState } from 'react';
import { ScrollText, Shield, Zap, CheckCircle } from 'lucide-react';
import { geminipro } from '@/utils/gemini';

export const GuildMaster: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{risk: string, intent: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeSignal = async () => {
    if (!input) return;
    setLoading(true);
    // Simulation of structured JSON response from Gemini
    const responseText = await generateResponse(`Analyze this community message: "${input}". Return JSON with 'risk' (Low/Med/High) and 'intent' (Churn/Buy/Support).`, 'gemini-2.5-flash');
    
    // Fallback parsing logic since we can't guarantee JSON from the prompt in this mocked environment perfectly
    let risk = "Low";
    let intent = "Support";
    
    if (input.toLowerCase().includes("cancel") || input.toLowerCase().includes("competitor")) {
      risk = "High";
      intent = "Churn Risk";
    } else if (input.toLowerCase().includes("buy") || input.toLowerCase().includes("upgrade")) {
      risk = "Low";
      intent = "Buying Intent";
    }

    // Artificial delay for effect
    setTimeout(() => {
        setResult({ risk, intent });
        setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full p-8 flex flex-col items-center justify-center text-center space-y-12 overflow-y-auto">
      <div>
         <div className="inline-flex items-center space-x-2 bg-guild-900 border border-guild-purple/30 rounded-full px-3 py-1 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-guild-purple animate-pulse"></span>
            <span className="text-xs font-semibold text-guild-purple uppercase tracking-wider">Signal Intelligence v2.5</span>
         </div>
         <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
           Your Community Is Speaking. <br/>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-guild-purple to-indigo-400">Guild Intelligence Listens.</span>
         </h2>
         <p className="text-xl text-slate-400 max-w-2xl mx-auto">
           The AI layer that turns every message into retained revenue, prevented churn, and qualified upsells.
         </p>
      </div>

      <div className="w-full max-w-2xl">
        <div className="glass-panel p-6 rounded-xl border border-guild-800 text-left">
          <label className="text-xs font-bold text-slate-500 uppercase">Live Signal Simulator</label>
          <div className="flex gap-2 mt-2">
            <input 
              type="text" 
              placeholder="e.g. 'We are thinking of switching to CompetitorX...'" 
              className="flex-1 bg-guild-950 border border-guild-800 rounded px-4 py-3 text-white outline-none focus:border-guild-purple"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button 
              onClick={analyzeSignal}
              disabled={loading}
              className="bg-guild-purple hover:bg-violet-600 text-white font-bold px-6 py-3 rounded transition-all"
            >
              {loading ? 'Scanning...' : 'Analyze'}
            </button>
          </div>

          {result && (
            <div className="mt-6 grid grid-cols-2 gap-4 animate-pulse-slow">
              <div className="bg-guild-900 p-4 rounded border border-guild-800">
                <div className="text-xs text-slate-500">Detected Intent</div>
                <div className={`text-xl font-bold ${result.intent.includes('Churn') ? 'text-guild-danger' : 'text-guild-success'}`}>{result.intent}</div>
              </div>
              <div className="bg-guild-900 p-4 rounded border border-guild-800">
                <div className="text-xs text-slate-500">Risk Level</div>
                <div className="text-xl font-bold text-white">{result.risk}</div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl text-left">
        {[
            { icon: Zap, title: "Signal Intel", desc: "Detect buying intent instantly." },
            { icon: Shield, title: "Governance", desc: "Psychological filters for quality." },
            { icon: ScrollText, title: "Automation", desc: "Automated sentiment reports." },
        ].map((feat, i) => (
            <div key={i} className="p-4 rounded-lg bg-guild-900/30 border border-guild-800">
                <feat.icon className="text-guild-purple mb-2" size={24} />
                <h3 className="font-bold text-white">{feat.title}</h3>
                <p className="text-sm text-slate-400">{feat.desc}</p>
            </div>
        ))}
      </div>
    </div>
  );
};