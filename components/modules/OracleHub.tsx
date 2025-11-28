import React, { useState } from 'react';
    import { TrendingUp, Activity, Shield, Terminal, MessageSquare } from 'lucide-react';
    import { geminipro } from '@/utils/gemini';
    
    export const OracleHub: React.FC = () => {
      const [messages, setMessages] = useState<{sender: 'user' | 'oracle', text: string}[]>([
        { sender: 'oracle', text: "Systems online. Monitoring 14,203 assets. How may I assist?" }
      ]);
      const [input, setInput] = useState('');
    
      const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input) return;
        
        const userMsg = input;
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInput('');
    
        const response = await generateResponse(`Act as a futuristic crypto market oracle. Answer briefly: ${userMsg}`, 'gemini-2.5-flash');
        setMessages(prev => [...prev, { sender: 'oracle', text: response }]);
      };
    
      return (
        <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Main Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'BTC', val: '$64,231', change: '+2.4%', color: 'text-guild-success' },
                { label: 'ETH', val: '$3,452', change: '+1.1%', color: 'text-guild-success' },
                { label: 'SOL', val: '$145.67', change: '-0.5%', color: 'text-guild-danger' },
                { label: 'DOM', val: '54.2%', change: '+0.1%', color: 'text-blue-400' },
              ].map((stat, i) => (
                <div key={i} className="glass-panel p-4 rounded-xl border-t border-guild-800">
                  <div className="text-slate-500 text-xs font-bold">{stat.label}</div>
                  <div className="text-xl font-mono font-bold text-white mt-1">{stat.val}</div>
                  <div className={`text-xs ${stat.color} font-bold`}>{stat.change}</div>
                </div>
              ))}
            </div>
    
            <div className="glass-panel rounded-xl p-6 border border-guild-800 h-80 relative overflow-hidden group">
               <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
               <div className="relative z-10 flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-white flex items-center gap-2">
                   <TrendingUp size={18} className="text-guild-accent" />
                   Network Traffic Analysis
                 </h3>
               </div>
               {/* CSS Chart */}
               <div className="h-56 flex items-end justify-between gap-1 mt-4 px-2">
                 {[30, 45, 32, 50, 70, 45, 60, 55, 75, 60, 80, 70, 85, 60, 50, 65, 55, 40, 60, 75, 90, 85, 70, 60].map((h, i) => (
                   <div key={i} className="w-full bg-guild-800 hover:bg-guild-accent transition-colors rounded-t-sm relative group/bar">
                     <div className="absolute bottom-0 left-0 w-full bg-guild-accent/50 transition-all duration-500" style={{ height: `${h}%` }}></div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
    
          {/* Oracle Chat */}
          <div className="glass-panel rounded-xl flex flex-col border border-guild-800 overflow-hidden">
            <div className="p-4 bg-guild-900 border-b border-guild-800 flex items-center gap-2">
              <MessageSquare size={16} className="text-guild-purple" />
              <span className="font-bold text-white text-sm">Oracle Interface v2.1</span>
            </div>
            
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-lg text-sm ${m.sender === 'user' ? 'bg-guild-accent/10 text-guild-accent border border-guild-accent/30' : 'bg-guild-800 text-slate-300'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
    
            <form onSubmit={handleSend} className="p-3 bg-guild-950 border-t border-guild-800">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Query the Oracle..."
                className="w-full bg-guild-900 text-white rounded px-3 py-2 text-sm outline-none border border-guild-800 focus:border-guild-purple"
              />
            </form>
          </div>
        </div>
      );
    };