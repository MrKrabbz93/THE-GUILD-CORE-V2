import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Shield, Search, Lock } from 'lucide-react';
import { geminipro } from '@/utils/gemini';

const data = Array.from({ length: 50 }, () => ({
  x: Math.floor(Math.random() * 100),
  y: Math.floor(Math.random() * 100),
  risk: Math.random() > 0.7 ? 'high' : 'low'
}));

export const TrustEngine: React.FC = () => {
  const [log, setLog] = useState<{id: number, action: string, status: string}[]>([
    { id: 1042, action: 'Transaction #9921', status: 'Verifying...' },
    { id: 1041, action: 'Login Attempt', status: 'Approved' },
  ]);
  const [analysis, setAnalysis] = useState<string>('');
  const [isAuditing, setIsAuditing] = useState(false);

  const runAudit = async () => {
    setIsAuditing(true);
    setAnalysis('Connecting to Neural Core...');
    const result = await generateResponse("Perform a mock SOC2 compliance audit summary for a fintech transaction log.");
    setAnalysis(result);
    setIsAuditing(false);
    
    setLog(prev => prev.map(item => item.id === 1042 ? {...item, status: 'Verified Immutable'} : item));
  };

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-y-auto">
      {/* Left: Visualization */}
      <div className="glass-panel p-6 rounded-xl flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Shield className="text-guild-accent" /> Live Risk Matrix
        </h3>
        <p className="text-sm text-slate-400 mb-4">Real-time behavioral analysis of transaction vectors.</p>
        
        <div className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" dataKey="x" name="Value" stroke="#64748b" />
              <YAxis type="number" dataKey="y" name="Risk Score" stroke="#64748b" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
              <Scatter name="Transactions" data={data}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.risk === 'high' ? '#ef4444' : '#00C8FF'} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Right: Audit Log & AI */}
      <div className="flex flex-col gap-6">
        <div className="glass-panel p-6 rounded-xl flex-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Lock className="text-guild-purple" /> Immutable Ledger
            </h3>
            <button 
              onClick={runAudit}
              disabled={isAuditing}
              className="px-4 py-2 bg-guild-800 hover:bg-guild-700 text-white text-xs font-bold rounded flex items-center gap-2 transition-all"
            >
              {isAuditing ? 'Auditing...' : <><Search size={14}/> Run AI Audit</>}
            </button>
          </div>

          <div className="space-y-2 mb-4">
            {log.map(item => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-guild-950/50 rounded border border-guild-800">
                <span className="text-sm text-slate-300">{item.action}</span>
                <span className={`text-xs font-mono px-2 py-1 rounded ${item.status.includes('Verifying') ? 'bg-yellow-500/20 text-yellow-400' : 'bg-guild-success/20 text-guild-success'}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          {analysis && (
            <div className="p-4 bg-guild-accent/10 border border-guild-accent/30 rounded-lg">
              <h4 className="text-xs font-bold text-guild-accent uppercase mb-2">Gemini Insight</h4>
              <p className="text-sm text-slate-300 whitespace-pre-line">{analysis}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};