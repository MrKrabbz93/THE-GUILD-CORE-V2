import React, { useState } from 'react';
import { LayoutDashboard, CheckCircle2, Plus, Zap, AlertTriangle, Clock } from 'lucide-react';
import { Task } from '../../types';

export const NexusDirective: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 'T-101', title: 'Deploy Sentinel Shield Patch v4.2', division: 'Cyber Security', priority: 'HIGH', status: 'IN_PROGRESS', dueDate: '2025-10-24' },
    { id: 'T-102', title: 'Analyze Vault Prime Market', division: 'Finance', priority: 'MEDIUM', status: 'PENDING', dueDate: '2025-10-25' },
    { id: 'T-103', title: 'Design Guild UI System', division: 'Design', priority: 'CRITICAL', status: 'IN_PROGRESS', dueDate: '2025-10-23' },
  ]);

  const [filter, setFilter] = useState<'ALL' | 'CRITICAL'>('ALL');

  const filteredTasks = filter === 'ALL' ? tasks : tasks.filter(t => t.priority === 'CRITICAL');

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-guild-800 pb-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Nexus Directive</h2>
          <p className="text-slate-400">Command Center // Active Protocols</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1 rounded text-xs font-bold ${filter === 'ALL' ? 'bg-guild-accent text-black' : 'bg-guild-800 text-slate-400'}`}
          >
            ALL
          </button>
          <button 
            onClick={() => setFilter('CRITICAL')}
            className={`px-3 py-1 rounded text-xs font-bold ${filter === 'CRITICAL' ? 'bg-guild-danger text-black' : 'bg-guild-800 text-slate-400'}`}
          >
            CRITICAL
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-xl border-l-4 border-guild-accent">
          <div className="flex justify-between items-center">
            <h3 className="text-slate-400 text-sm">Active Directives</h3>
            <LayoutDashboard size={18} className="text-guild-accent" />
          </div>
          <p className="text-2xl font-bold text-white mt-1">{tasks.length}</p>
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-4 border-guild-success">
          <div className="flex justify-between items-center">
            <h3 className="text-slate-400 text-sm">Efficiency Rating</h3>
            <Zap size={18} className="text-guild-success" />
          </div>
          <p className="text-2xl font-bold text-white mt-1">94.2%</p>
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-4 border-guild-danger">
          <div className="flex justify-between items-center">
            <h3 className="text-slate-400 text-sm">Critical Events</h3>
            <AlertTriangle size={18} className="text-guild-danger" />
          </div>
          <p className="text-2xl font-bold text-white mt-1">{tasks.filter(t => t.priority === 'CRITICAL').length}</p>
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {filteredTasks.map(task => (
          <div key={task.id} className="glass-panel p-4 rounded-lg hover:border-guild-accent/50 transition-all cursor-pointer group">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className={`mt-1 w-2 h-2 rounded-full ${task.priority === 'CRITICAL' ? 'bg-guild-danger shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-guild-accent'}`}></div>
                <div>
                  <h4 className="text-white font-medium group-hover:text-guild-accent transition-colors">{task.title}</h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span className="bg-guild-800 px-2 py-0.5 rounded text-slate-300">{task.division}</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {task.dueDate}</span>
                  </div>
                </div>
              </div>
              <div className="text-xs font-mono text-slate-600">{task.id}</div>
            </div>
          </div>
        ))}
        
        <button className="w-full py-4 border-2 border-dashed border-guild-800 rounded-lg text-slate-500 hover:text-white hover:border-guild-accent hover:bg-guild-800/20 transition-all flex flex-col items-center justify-center gap-2">
           <Plus size={24} />
           <span className="text-sm font-bold uppercase">Initialize New Directive</span>
        </button>
      </div>
    </div>
  );
};