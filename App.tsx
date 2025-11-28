import React, { useState } from 'react';
import { ViewState, Product } from './types';
import { NexusDirective } from './components/modules/NexusDirective';
import { IDYr } from './components/modules/IDYr';
import { TrustEngine } from './components/modules/TrustEngine';
import { AresNexus } from './components/modules/AresNexus';
import { OracleHub } from './components/modules/OracleHub';
import { Helix } from './components/modules/Helix';
import { GuildMaster } from './components/modules/GuildMaster';
import { PaymentModal } from './components/PaymentModal';
import { ShoppingCart, ArrowLeft, LayoutGrid, Sparkles, Lock, Users, BarChart3, Cpu, Radio } from 'lucide-react';

const PRODUCTS: Product[] = [
  { id: 'NEXUS', name: 'Nexus Directive', tagline: 'Task Intelligence', price: 199, description: 'Command center for elite operations.', features: ['Priority Queues', 'Division Tracking'] },
  { id: 'IDYR', name: 'IDYr', tagline: 'Idea Manifestation', price: 149, description: 'Visualizing concepts into reality.', features: ['Particle Engine', 'Semantic Analysis'] },
  { id: 'TRUST', name: 'TrustEngine', tagline: 'Fraud Detection', price: 499, description: 'Eliminate risk with behavioral AI.', features: ['Immutable Ledger', 'Live Matrix'] },
  { id: 'ARES', name: 'Ares Nexus', tagline: 'HR Orchestration', price: 299, description: 'Predictive talent ecosystem.', features: ['Gap Analysis', 'Agent Outreach'] },
  { id: 'ORACLE', name: 'Oracle Hub', tagline: 'Crypto Terminal', price: 249, description: 'Market signals from the noise.', features: ['Traffic Analysis', 'AI Chat'] },
  { id: 'HELIX', name: 'Helix', tagline: 'Agent Framework', price: 599, description: 'Recursive autonomy engine.', features: ['Self-Critique', 'Graph Memory'] },
  { id: 'GUILD', name: 'Guild Master', tagline: 'Signal Intel', price: 349, description: 'Community ROI automation.', features: ['Intent Detection', 'Churn Prevention'] },
];

export default function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [buyingProduct, setBuyingProduct] = useState<Product | null>(null);

  const renderModule = () => {
    switch(view) {
      case 'NEXUS': return <NexusDirective />;
      case 'IDYR': return <IDYr />;
      case 'TRUST': return <TrustEngine />;
      case 'ARES': return <AresNexus />;
      case 'ORACLE': return <OracleHub />;
      case 'HELIX': return <Helix />;
      case 'GUILD': return <GuildMaster />;
      default: return null;
    }
  };

  const currentProduct = PRODUCTS.find(p => p.id === view);

  return (
    <div className="min-h-screen bg-guild-950 text-slate-200 font-sans selection:bg-guild-accent/30">
      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      ></div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 glass-panel border-b border-guild-800 h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {view !== 'HOME' && (
             <button onClick={() => setView('HOME')} className="p-2 hover:bg-guild-800 rounded-full transition-colors text-slate-400 hover:text-white">
               <ArrowLeft size={20} />
             </button>
          )}
          <div className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-guild-accent to-blue-600 rounded-lg flex items-center justify-center text-black">G</div>
            THE GUILD
          </div>
        </div>

        {view !== 'HOME' && currentProduct && (
          <button 
            onClick={() => setBuyingProduct(currentProduct)}
            className="flex items-center gap-2 bg-white hover:bg-slate-200 text-black px-4 py-2 rounded-lg font-bold transition-all"
          >
            <ShoppingCart size={18} /> Buy {currentProduct.name}
          </button>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20 min-h-screen flex flex-col">
        {view === 'HOME' ? (
          <div className="flex-1 p-8 max-w-7xl mx-auto w-full animate-fade-in">
            <header className="text-center mb-16 mt-10">
               <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
                 Construct Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-guild-accent to-guild-purple">Legacy</span>.
               </h1>
               <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                 Access the ultimate suite of cognitive tools. Integrate logic, creativity, and signal intelligence into a single operating system.
               </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
              {PRODUCTS.map((prod, i) => {
                const Icon = [LayoutGrid, Sparkles, Lock, Users, BarChart3, Cpu, Radio][i];
                return (
                  <div key={prod.id} 
                    onClick={() => setView(prod.id)}
                    className="group glass-panel p-8 rounded-2xl border border-guild-800 hover:border-guild-accent/50 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,200,255,0.1)] relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                       <Icon size={100} />
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-guild-800 flex items-center justify-center mb-6 text-white group-hover:bg-guild-accent group-hover:text-black transition-colors">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{prod.name}</h3>
                    <p className="text-sm text-slate-400 mb-4">{prod.description}</p>
                    <div className="flex items-center gap-2 text-xs font-bold text-guild-accent uppercase tracking-wider">
                      Explore Module <ArrowLeft className="rotate-180" size={12} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-[calc(100vh-80px)]">
             {renderModule()}
          </div>
        )}
      </main>

      {/* Payment Modal */}
      {buyingProduct && (
        <PaymentModal product={buyingProduct} onClose={() => setBuyingProduct(null)} />
      )}
    </div>
  );
}