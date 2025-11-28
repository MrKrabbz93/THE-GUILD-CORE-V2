import React, { useEffect, useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { Users, BrainCircuit } from 'lucide-react';
import { geminipro } from '@/utils/gemini';

const data = [
  { subject: 'Strategy', A: 40, B: 90, fullMark: 100 },
  { subject: 'Ethics', A: 30, B: 95, fullMark: 100 },
  { subject: 'Foresight', A: 20, B: 98, fullMark: 100 },
  { subject: 'Security', A: 60, B: 85, fullMark: 100 },
  { subject: 'Integration', A: 50, B: 90, fullMark: 100 },
];

export const AresNexus: React.FC = () => {
  const [candidate, setCandidate] = useState('');
  const [outreach, setOutreach] = useState('');
  const [loading, setLoading] = useState(false);

  const generateOutreach = async () => {
    setLoading(true);
    const result = await generateResponse(`Write a short, high-touch recruitment outreach email for a candidate named ${candidate || 'Candidate'} for a Senior AI Architect role. Focus on their potential impact.`);
    setOutreach(result);
    setLoading(false);
  };

  return (
    <div className="h-full p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-y-auto">
      {/* Intro */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-2">Ares Nexus</h2>
          <p className="text-slate-400">Strategic Human Capital Orchestration. Transforming reactive hiring into predictive talent ecosystems.</p>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-guild-800">
           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
             <BrainCircuit className="text-guild-accent" /> Capability Gap Analysis
           </h3>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                 <PolarGrid stroke="#334155" />
                 <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                 <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155"/>
                 <Radar name="Legacy System" dataKey="A" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.3} />
                 <Radar name="Ares Nexus" dataKey="B" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.5} />
                 <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}/>
               </RadarChart>
             </ResponsiveContainer>
           </div>
           <div className="flex justify-center gap-6 mt-2 text-xs">
             <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-400/50 rounded-full"></div> Legacy</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500/50 rounded-full"></div> Ares Nexus</div>
           </div>
        </div>
      </div>

      {/* Agent Demo */}
      <div className="glass-panel p-6 rounded-xl flex flex-col">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
             <Users className="text-guild-purple" /> Autonomous Recruitment Agent
          </h3>
          <p className="text-sm text-slate-400">Generate context-aware outreach instantly using Gemini 2.5.</p>
        </div>

        <div className="flex gap-2 mb-4">
          <input 
            type="text" 
            placeholder="Candidate Name" 
            className="flex-1 bg-guild-950 border border-guild-800 rounded px-3 py-2 text-white outline-none focus:border-guild-purple"
            value={candidate}
            onChange={(e) => setCandidate(e.target.value)}
          />
          <button 
            onClick={generateOutreach}
            disabled={loading}
            className="bg-guild-purple text-white px-4 py-2 rounded font-bold hover:bg-violet-500 transition-all disabled:opacity-50"
          >
            {loading ? 'Thinking...' : 'Generate'}
          </button>
        </div>

        <div className="flex-1 bg-guild-950 rounded border border-guild-800 p-4 font-mono text-sm text-slate-300 overflow-y-auto whitespace-pre-wrap">
          {outreach || "// Agent output will appear here..."}
        </div>
      </div>
    </div>
  );
};